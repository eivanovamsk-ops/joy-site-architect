import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart, CartItem } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, X, User, Truck, MapPin, CreditCard, Building2 } from "lucide-react";
import { z } from "zod";

const baseSchema = z.object({
  shippingName: z.string().min(2, "Введите имя получателя").max(100),
  shippingPhone: z.string().min(10, "Введите корректный телефон").max(20),
  email: z.string().email("Введите корректный email"),
  telegram: z.string().max(100).optional(),
  city: z.string().min(2, "Введите город").max(100),
  deliveryMethod: z.enum(["moscow_delivery", "russia_delivery", "pickup"]),
  shippingAddress: z.string().max(500).optional(),
  paymentType: z.enum(["private_cash", "company"]),
  companyDetails: z.string().max(2000).optional(),
  notes: z.string().max(500).optional(),
});

interface Profile {
  full_name: string | null;
  phone: string | null;
  email: string;
}

interface CheckoutFormProps {
  items: CartItem[];
  totalPrice: number;
  isGuest: boolean;
  onBack: () => void;
}

export function CheckoutForm({ items, totalPrice, isGuest, onBack }: CheckoutFormProps) {
  const { clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  // Form state
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [city, setCity] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"moscow_delivery" | "russia_delivery" | "pickup">("moscow_delivery");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentType, setPaymentType] = useState<"private_cash" | "company">("private_cash");
  const [companyDetails, setCompanyDetails] = useState("");
  const [companyFile, setCompanyFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load profile data for authenticated users
  useEffect(() => {
    if (user && !isGuest) {
      fetchProfile();
    }
  }, [user, isGuest]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone, email")
        .eq("id", user!.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setShippingName(data.full_name || "");
      setShippingPhone(data.phone || "");
      setEmail(data.email || user?.email || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Файл слишком большой",
          description: "Максимальный размер файла 5 МБ",
        });
        return;
      }
      setCompanyFile(file);
    }
  };

  const removeFile = () => {
    setCompanyFile(null);
  };

  const uploadCompanyFile = async (orderId: string): Promise<string | null> => {
    if (!companyFile) return null;

    const folder = user ? user.id : `guest-${orderId}`;
    const fileName = `${folder}/${Date.now()}-${companyFile.name}`;

    const { data, error } = await supabase.storage
      .from("company-requisites")
      .upload(fileName, companyFile);

    if (error) {
      console.error("File upload error:", error);
      return null;
    }

    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const formData = {
      shippingName,
      shippingPhone,
      email,
      telegram,
      city: deliveryMethod === "russia_delivery" ? city : "Москва",
      deliveryMethod,
      shippingAddress: deliveryMethod !== "pickup" ? shippingAddress : undefined,
      paymentType,
      companyDetails: paymentType === "company" ? companyDetails : undefined,
      notes,
    };

    // Additional validation for delivery
    if (deliveryMethod !== "pickup" && (!shippingAddress || shippingAddress.length < 10)) {
      setErrors({ shippingAddress: "Введите полный адрес доставки" });
      return;
    }

    // Additional validation for company payment
    if (paymentType === "company" && !companyDetails && !companyFile) {
      setErrors({ companyDetails: "Введите реквизиты или прикрепите файл" });
      return;
    }

    const result = baseSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Generate order id on the client so guest checkout can work without relying on RETURNING/SELECT
      // (anon users are not allowed to read orders, but they can create guest orders)
      const orderId = crypto.randomUUID();

      // Create order
      const orderData: any = {
        id: orderId,
        total_amount: totalPrice,
        shipping_name: shippingName,
        shipping_phone: shippingPhone,
        shipping_address: deliveryMethod === "pickup" ? "Самовывоз: Москва, Варшавское ш., 33с12" : shippingAddress,
        notes: notes || null,
        status: "pending",
        telegram: telegram || null,
        city: deliveryMethod === "russia_delivery" ? city : "Москва",
        delivery_method: deliveryMethod,
        payment_type: paymentType,
        company_details: paymentType === "company" ? companyDetails : null,
        is_guest_order: isGuest,
      };

      if (isGuest) {
        orderData.user_id = null;
        orderData.guest_email = email;
      } else {
        orderData.user_id = user!.id;
      }

      const { error: orderError } = await supabase
        .from("orders")
        .insert(orderData);

      if (orderError) throw orderError;

      const order = { id: orderId };

      // Upload company file if exists
      if (companyFile) {
        const filePath = await uploadCompanyFile(order.id);
        if (filePath) {
          await supabase
            .from("orders")
            .update({ company_file_url: filePath })
            .eq("id", order.id);
        }
      }

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_slug: item.slug,
        product_name: item.name,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send email notifications
      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "order-notification",
            recipientEmail: "moscow@articon.pro",
            idempotencyKey: `order-${order.id}`,
            templateData: {
              orderId: order.id,
              customerName: formData.name,
              customerPhone: formData.phone,
              customerEmail: formData.email || '',
              total: new Intl.NumberFormat("ru-RU").format(totalWithDelivery) + " ₽",
              deliveryMethod: formData.deliveryMethod,
              items: items.map(i => `${i.name} x${i.quantity}`).join(', '),
            },
          },
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }

      clearCart();
      toast({
        title: "Заказ оформлен!",
        description: isGuest 
          ? "Подтверждение отправлено на вашу почту" 
          : "Мы свяжемся с вами для подтверждения",
      });

      if (isGuest) {
        navigate("/");
      } else {
        navigate("/profile");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Ошибка оформления",
        description: error.message || "Попробуйте позже",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Info Section */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <User className="h-4 w-4" />
          Контактные данные
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Имя и фамилия *</Label>
            <Input
              value={shippingName}
              onChange={(e) => setShippingName(e.target.value)}
              placeholder="Иван Иванов"
              className={errors.shippingName ? "border-destructive" : ""}
            />
            {errors.shippingName && (
              <p className="text-sm text-destructive">{errors.shippingName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Телефон *</Label>
            <Input
              value={shippingPhone}
              onChange={(e) => setShippingPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              className={errors.shippingPhone ? "border-destructive" : ""}
            />
            {errors.shippingPhone && (
              <p className="text-sm text-destructive">{errors.shippingPhone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Telegram</Label>
            <Input
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
            />
          </div>
        </div>
      </div>

      {/* Delivery Method Section */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Truck className="h-4 w-4" />
          Способ получения
        </h3>
        
        <RadioGroup 
          value={deliveryMethod} 
          onValueChange={(val) => setDeliveryMethod(val as "moscow_delivery" | "russia_delivery" | "pickup")}
          className="space-y-3"
        >
          <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${deliveryMethod === "moscow_delivery" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="moscow_delivery" id="moscow_delivery" />
            <Label htmlFor="moscow_delivery" className="flex-1 cursor-pointer">
              <span className="font-medium">Доставка по Москве</span>
              <p className="text-sm text-muted-foreground">Курьером до двери</p>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${deliveryMethod === "russia_delivery" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="russia_delivery" id="russia_delivery" />
            <Label htmlFor="russia_delivery" className="flex-1 cursor-pointer">
              <span className="font-medium">Доставка по РФ</span>
              <p className="text-sm text-muted-foreground">Транспортной компанией</p>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${deliveryMethod === "pickup" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="flex-1 cursor-pointer">
              <span className="font-medium">Самовывоз</span>
              <p className="text-sm text-muted-foreground">Москва, Варшавское ш., 33с12</p>
            </Label>
          </div>
        </RadioGroup>

        {deliveryMethod !== "pickup" && (
          <>
            {deliveryMethod === "russia_delivery" && (
              <div className="space-y-2">
                <Label>Город *</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Введите город"
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label>Адрес доставки *</Label>
              <Textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Улица, дом, квартира, подъезд, этаж"
                className={errors.shippingAddress ? "border-destructive" : ""}
              />
              {errors.shippingAddress && (
                <p className="text-sm text-destructive">{errors.shippingAddress}</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Payment Section */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Способ оплаты
        </h3>
        
        <RadioGroup 
          value={paymentType} 
          onValueChange={(val) => setPaymentType(val as "private_cash" | "company")}
          className="space-y-3"
        >
          <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${paymentType === "private_cash" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="private_cash" id="private_cash" />
            <Label htmlFor="private_cash" className="flex-1 cursor-pointer">
              <span className="font-medium">Частное лицо</span>
              <p className="text-sm text-muted-foreground">Перевод на расчётный счёт или наличными при получении</p>
            </Label>
          </div>

          <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${paymentType === "company" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="company" id="company" />
            <Label htmlFor="company" className="flex-1 cursor-pointer flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <div>
                <span className="font-medium">Юридическое лицо</span>
                <p className="text-sm text-muted-foreground">Оплата от компании (по счёту)</p>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {paymentType === "company" && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <Label>Реквизиты компании</Label>
              <Textarea
                value={companyDetails}
                onChange={(e) => setCompanyDetails(e.target.value)}
                placeholder="ИНН, КПП, название организации, расчётный счёт..."
                rows={4}
                className={errors.companyDetails ? "border-destructive" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Или прикрепите файл с реквизитами</Label>
              {companyFile ? (
                <div className="flex items-center gap-2 p-3 bg-background border rounded-lg">
                  <span className="flex-1 text-sm truncate">{companyFile.name}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Выберите файл (до 5 МБ)</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </label>
              )}
              {errors.companyDetails && (
                <p className="text-sm text-destructive">{errors.companyDetails}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div className="space-y-2">
        <Label>Комментарий к заказу</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Пожелания к заказу или доставке"
        />
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Товаров</span>
          <span>{items.reduce((sum, i) => sum + i.quantity, 0)} шт.</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Итого</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Назад
        </Button>
        <Button
          type="submit"
          className="flex-1 gradient-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Оформить заказ
        </Button>
      </div>
    </form>
  );
}
