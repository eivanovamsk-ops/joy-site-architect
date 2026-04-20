export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bundle_requests: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      callback_requests: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          source: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          source?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          source?: string | null
        }
        Relationships: []
      }
      course_applications: {
        Row: {
          city: string | null
          course_date: string | null
          course_name: string
          created_at: string
          email: string
          id: string
          last_name: string | null
          message: string | null
          name: string
          organization: string | null
          payment_type: string | null
          phone: string | null
          specialization: string | null
          status: string
          telegram: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          course_date?: string | null
          course_name: string
          created_at?: string
          email: string
          id?: string
          last_name?: string | null
          message?: string | null
          name: string
          organization?: string | null
          payment_type?: string | null
          phone?: string | null
          specialization?: string | null
          status?: string
          telegram?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          course_date?: string | null
          course_name?: string
          created_at?: string
          email?: string
          id?: string
          last_name?: string | null
          message?: string | null
          name?: string
          organization?: string | null
          payment_type?: string | null
          phone?: string | null
          specialization?: string | null
          status?: string
          telegram?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price_at_purchase: number
          product_name: string
          product_slug: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price_at_purchase: number
          product_name: string
          product_slug: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price_at_purchase?: number
          product_name?: string
          product_slug?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          city: string | null
          company_details: string | null
          company_file_url: string | null
          created_at: string
          delivery_method: string | null
          guest_email: string | null
          id: string
          is_guest_order: boolean | null
          notes: string | null
          payment_type: string | null
          shipping_address: string | null
          shipping_name: string | null
          shipping_phone: string | null
          status: string
          telegram: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          city?: string | null
          company_details?: string | null
          company_file_url?: string | null
          created_at?: string
          delivery_method?: string | null
          guest_email?: string | null
          id?: string
          is_guest_order?: boolean | null
          notes?: string | null
          payment_type?: string | null
          shipping_address?: string | null
          shipping_name?: string | null
          shipping_phone?: string | null
          status?: string
          telegram?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          city?: string | null
          company_details?: string | null
          company_file_url?: string | null
          created_at?: string
          delivery_method?: string | null
          guest_email?: string | null
          id?: string
          is_guest_order?: boolean | null
          notes?: string | null
          payment_type?: string | null
          shipping_address?: string | null
          shipping_name?: string | null
          shipping_phone?: string | null
          status?: string
          telegram?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          course_application_id: string | null
          course_name: string | null
          created_at: string
          customer_email: string | null
          customer_phone: string | null
          error_code: string | null
          error_message: string | null
          id: string
          payment_url: string | null
          raw_response: Json | null
          status: string
          tbank_order_id: string
          tbank_payment_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          course_application_id?: string | null
          course_name?: string | null
          created_at?: string
          customer_email?: string | null
          customer_phone?: string | null
          error_code?: string | null
          error_message?: string | null
          id?: string
          payment_url?: string | null
          raw_response?: Json | null
          status?: string
          tbank_order_id: string
          tbank_payment_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          course_application_id?: string | null
          course_name?: string | null
          created_at?: string
          customer_email?: string | null
          customer_phone?: string | null
          error_code?: string | null
          error_message?: string | null
          id?: string
          payment_url?: string | null
          raw_response?: Json | null
          status?: string
          tbank_order_id?: string
          tbank_payment_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_course_application_id_fkey"
            columns: ["course_application_id"]
            isOneToOne: false
            referencedRelation: "course_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_add_order_items: { Args: { _order_id: string }; Returns: boolean }
      get_user_role: { Args: { _user_id: string }; Returns: string }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
