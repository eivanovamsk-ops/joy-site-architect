import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  GraduationCap, 
  MessageSquare, 
  Loader2, 
  Eye, 
  Check,
  Package,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface OrderItem {
  id: string;
  product_name: string;
  product_slug: string;
  quantity: number;
  price_at_purchase: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_name: string | null;
  shipping_phone: string | null;
  shipping_address: string | null;
  notes: string | null;
  telegram: string | null;
  city: string | null;
  delivery_method: string | null;
  payment_type: string | null;
  company_details: string | null;
  company_file_url: string | null;
  is_guest_order: boolean | null;
  guest_email: string | null;
}

interface CourseApplication {
  id: string;
  created_at: string;
  name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  telegram: string | null;
  city: string | null;
  specialization: string | null;
  organization: string | null;
  payment_type: string | null;
  course_name: string;
  course_date: string | null;
  message: string | null;
  status: string;
}

interface Feedback {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [applications, setApplications] = useState<CourseApplication[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [loadingOrderItems, setLoadingOrderItems] = useState<string | null>(null);
  
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }
      
      try {
        const { data, error } = await supabase.rpc('is_admin');
        if (error) throw error;
        setIsAdmin(data);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };
    
    if (!authLoading) {
      checkAdmin();
    }
  }, [user, authLoading]);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !checkingAdmin) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/");
        toast({
          variant: "destructive",
          title: "Доступ запрещён",
          description: "У вас нет прав для просмотра этой страницы",
        });
      }
    }
  }, [user, isAdmin, authLoading, checkingAdmin, navigate, toast]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAdmin) return;
      
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  // Fetch course applications
  useEffect(() => {
    const fetchApplications = async () => {
      if (!isAdmin) return;
      
      try {
        const { data, error } = await supabase
          .from("course_applications")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setApplications(data || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoadingApplications(false);
      }
    };
    
    if (isAdmin) fetchApplications();
  }, [isAdmin]);

  // Fetch feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      if (!isAdmin) return;
      
      try {
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setFeedback(data || []);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoadingFeedback(false);
      }
    };
    
    if (isAdmin) fetchFeedback();
  }, [isAdmin]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);
      
      if (error) throw error;
      
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
      toast({ title: "Статус обновлён" });
    } catch (error) {
      toast({ variant: "destructive", title: "Ошибка обновления" });
    }
  };

  const updateApplicationStatus = async (appId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("course_applications")
        .update({ status })
        .eq("id", appId);
      
      if (error) throw error;
      
      setApplications(applications.map(a => a.id === appId ? { ...a, status } : a));
      toast({ title: "Статус обновлён" });
    } catch (error) {
      toast({ variant: "destructive", title: "Ошибка обновления" });
    }
  };

  const markFeedbackAsRead = async (feedbackId: string) => {
    try {
      const { error } = await supabase
        .from("feedback")
        .update({ is_read: true })
        .eq("id", feedbackId);
      
      if (error) throw error;
      
      setFeedback(feedback.map(f => f.id === feedbackId ? { ...f, is_read: true } : f));
      toast({ title: "Отмечено как прочитанное" });
    } catch (error) {
      toast({ variant: "destructive", title: "Ошибка обновления" });
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy, HH:mm", { locale: ru });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
  };

  const fetchOrderItems = async (orderId: string) => {
    if (orderItems[orderId]) {
      setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
      return;
    }
    
    setLoadingOrderItems(orderId);
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
      
      if (error) throw error;
      setOrderItems(prev => ({ ...prev, [orderId]: data || [] }));
      setExpandedOrderId(orderId);
    } catch (error) {
      toast({ variant: "destructive", title: "Ошибка загрузки товаров" });
    } finally {
      setLoadingOrderItems(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Ожидает", variant: "secondary" },
      confirmed: { label: "Подтверждён", variant: "default" },
      shipped: { label: "Отправлен", variant: "default" },
      delivered: { label: "Доставлен", variant: "outline" },
      cancelled: { label: "Отменён", variant: "destructive" },
      new: { label: "Новая", variant: "secondary" },
      rejected: { label: "Отклонена", variant: "destructive" },
    };
    
    const config = statusMap[status] || { label: status, variant: "secondary" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (authLoading || checkingAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Админ-панель</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Заказы</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                {orders.filter(o => o.status === "pending").length} ожидают обработки
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Заявки на курсы</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">
                {applications.filter(a => a.status === "new").length} новых
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Обратная связь</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
              <p className="text-xs text-muted-foreground">
                {feedback.filter(f => !f.is_read).length} непрочитанных
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Заявки на курсы</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Обратная связь</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            {loadingOrders ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Заказов пока нет</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-muted-foreground">
                              #{order.id.slice(0, 8)}
                            </span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.created_at)}
                          </p>
                          <p className="font-bold text-lg">{formatPrice(order.total_amount)}</p>
                          {(order.shipping_name || order.is_guest_order) && (
                            <div className="text-sm space-y-1">
                              {order.shipping_name && <p><strong>Получатель:</strong> {order.shipping_name}</p>}
                              {order.shipping_phone && <p><strong>Телефон:</strong> {order.shipping_phone}</p>}
                              {order.guest_email && <p><strong>Email:</strong> {order.guest_email}</p>}
                              {order.telegram && <p><strong>Telegram:</strong> {order.telegram}</p>}
                              {order.city && <p><strong>Город:</strong> {order.city}</p>}
                              {order.shipping_address && <p><strong>Адрес:</strong> {order.shipping_address}</p>}
                              {order.delivery_method && <p><strong>Доставка:</strong> {order.delivery_method === 'pickup' ? 'Самовывоз' : 'Доставка'}</p>}
                              {order.payment_type && <p><strong>Оплата:</strong> {order.payment_type}</p>}
                              {order.company_details && <p><strong>Реквизиты компании:</strong> {order.company_details}</p>}
                              {order.company_file_url && (
                                <p><strong>Файл реквизитов:</strong>{' '}
                                  <a href={order.company_file_url} target="_blank" rel="noreferrer" className="text-primary underline">Скачать</a>
                                </p>
                              )}
                              {order.is_guest_order && <p className="text-xs text-muted-foreground">Гостевой заказ</p>}
                            </div>
                          )}
                          {order.notes && (
                            <p className="text-sm text-muted-foreground">
                              <strong>Примечание:</strong> {order.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => fetchOrderItems(order.id)}
                            disabled={loadingOrderItems === order.id}
                          >
                            {loadingOrderItems === order.id ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Eye className="h-4 w-4 mr-1" />
                            )}
                            Состав
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOrderStatus(order.id, "confirmed")}
                            disabled={order.status === "confirmed" || order.status === "shipped" || order.status === "delivered"}
                          >
                            <Check className="h-4 w-4 mr-1" /> Подтвердить
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOrderStatus(order.id, "shipped")}
                            disabled={order.status === "shipped" || order.status === "delivered"}
                          >
                            <Package className="h-4 w-4 mr-1" /> Отправлен
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOrderStatus(order.id, "delivered")}
                            disabled={order.status === "delivered"}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Доставлен
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateOrderStatus(order.id, "cancelled")}
                            disabled={order.status === "cancelled"}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Отменить
                          </Button>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      {expandedOrderId === order.id && orderItems[order.id] && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Состав заказа:</h4>
                          {orderItems[order.id].length === 0 ? (
                            <p className="text-sm text-muted-foreground">Товары не найдены</p>
                          ) : (
                            <ul className="space-y-2">
                              {orderItems[order.id].map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                  <span>{item.product_name} × {item.quantity}</span>
                                  <span className="font-medium">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Course Applications Tab */}
          <TabsContent value="applications">
            {loadingApplications ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : applications.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Заявок на курсы пока нет</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{app.name}{app.last_name ? ` ${app.last_name}` : ''}</span>
                            {getStatusBadge(app.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(app.created_at)}
                          </p>
                          <p className="text-primary font-medium">{app.course_name}</p>
                          {app.course_date && (
                            <p className="text-sm">Дата курса: {app.course_date}</p>
                          )}
                          <div className="text-sm space-y-1">
                            <p><strong>Email:</strong> {app.email}</p>
                            {app.phone && <p><strong>Телефон:</strong> {app.phone}</p>}
                            {app.telegram && <p><strong>Telegram:</strong> {app.telegram}</p>}
                            {app.city && <p><strong>Город:</strong> {app.city}</p>}
                            {app.specialization && <p><strong>Специализация:</strong> {app.specialization}</p>}
                            {app.organization && <p><strong>Организация:</strong> {app.organization}</p>}
                            {app.payment_type && (
                              <p><strong>Оплата:</strong> {app.payment_type === 'company' ? 'От компании' : 'От частного лица'}</p>
                            )}
                          </div>
                          {app.message && (
                            <p className="text-sm text-muted-foreground">
                              <strong>Сообщение:</strong> {app.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(app.id, "confirmed")}
                            disabled={app.status === "confirmed"}
                          >
                            <Check className="h-4 w-4 mr-1" /> Подтвердить
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateApplicationStatus(app.id, "rejected")}
                            disabled={app.status === "rejected"}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Отклонить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            {loadingFeedback ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : feedback.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Сообщений пока нет</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <Card key={item.id} className={!item.is_read ? "border-primary" : ""}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{item.name}</span>
                            {!item.is_read && (
                              <Badge variant="default">Новое</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.created_at)}
                          </p>
                          <div className="text-sm">
                            <p><strong>Email:</strong> {item.email}</p>
                            {item.phone && <p><strong>Телефон:</strong> {item.phone}</p>}
                          </div>
                          <p className="text-sm bg-muted p-3 rounded-lg">{item.message}</p>
                        </div>
                        {!item.is_read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markFeedbackAsRead(item.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Прочитано
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
