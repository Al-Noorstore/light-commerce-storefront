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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_products: {
        Row: {
          badge: string | null
          best_seller: boolean | null
          category: string
          color: string | null
          created_at: string | null
          currency: string | null
          data_ai_hint: string | null
          deleted: boolean | null
          delivery_charges: number | null
          description: string
          features: string[] | null
          id: string
          image_url: string
          name: string
          on_sale: boolean | null
          original_price: number | null
          price: number
          quantity: number | null
          rating: number | null
          reviews_count: number | null
          shipping: Json | null
          size: string | null
          sku: string | null
          social_media_link: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          badge?: string | null
          best_seller?: boolean | null
          category: string
          color?: string | null
          created_at?: string | null
          currency?: string | null
          data_ai_hint?: string | null
          deleted?: boolean | null
          delivery_charges?: number | null
          description: string
          features?: string[] | null
          id?: string
          image_url: string
          name: string
          on_sale?: boolean | null
          original_price?: number | null
          price: number
          quantity?: number | null
          rating?: number | null
          reviews_count?: number | null
          shipping?: Json | null
          size?: string | null
          sku?: string | null
          social_media_link?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          badge?: string | null
          best_seller?: boolean | null
          category?: string
          color?: string | null
          created_at?: string | null
          currency?: string | null
          data_ai_hint?: string | null
          deleted?: boolean | null
          delivery_charges?: number | null
          description?: string
          features?: string[] | null
          id?: string
          image_url?: string
          name?: string
          on_sale?: boolean | null
          original_price?: number | null
          price?: number
          quantity?: number | null
          rating?: number | null
          reviews_count?: number | null
          shipping?: Json | null
          size?: string | null
          sku?: string | null
          social_media_link?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          additional_data: Json | null
          created_at: string
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          delivery_address: string | null
          delivery_city: string | null
          delivery_postal_code: string | null
          form_name: string
          form_type: string
          id: string
          notes: string | null
          order_details: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          additional_data?: Json | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_address?: string | null
          delivery_city?: string | null
          delivery_postal_code?: string | null
          form_name: string
          form_type: string
          id?: string
          notes?: string | null
          order_details?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          additional_data?: Json | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_address?: string | null
          delivery_city?: string | null
          delivery_postal_code?: string | null
          form_name?: string
          form_type?: string
          id?: string
          notes?: string | null
          order_details?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          created_at: string | null
          heading: string | null
          id: number
          image_url: string
          link_url: string | null
          position: number
          subheading: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          heading?: string | null
          id?: never
          image_url: string
          link_url?: string | null
          position: number
          subheading?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          heading?: string | null
          id?: never
          image_url?: string
          link_url?: string | null
          position?: number
          subheading?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          currency: string | null
          id: number
          order_id: number
          price_at_purchase: number
          product_id: number
          product_image: string | null
          product_name: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          id?: never
          order_id: number
          price_at_purchase: number
          product_id: number
          product_image?: string | null
          product_name?: string | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          id?: never
          order_id?: number
          price_at_purchase?: number
          product_id?: number
          product_image?: string | null
          product_name?: string | null
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
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: string
          city: string | null
          country: string | null
          created_at: string | null
          customer_id: string | null
          customer_name: string
          delivery_charges: number | null
          email: string
          id: number
          notes: string | null
          order_number: string | null
          payment_method: string | null
          payment_proof_url: string | null
          phone: string | null
          province: string | null
          status: string
          subtotal: number | null
          total: number | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_name: string
          delivery_charges?: number | null
          email: string
          id?: never
          notes?: string | null
          order_number?: string | null
          payment_method?: string | null
          payment_proof_url?: string | null
          phone?: string | null
          province?: string | null
          status?: string
          subtotal?: number | null
          total?: number | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_name?: string
          delivery_charges?: number | null
          email?: string
          id?: never
          notes?: string | null
          order_number?: string | null
          payment_method?: string | null
          payment_proof_url?: string | null
          phone?: string | null
          province?: string | null
          status?: string
          subtotal?: number | null
          total?: number | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          badge: string | null
          buy_now_link: string | null
          buy_now_text: string | null
          category: string
          created_at: string
          id: number
          image: string
          name: string
          original_price: string | null
          price: string
          rating: number | null
          stock: number | null
          updated_at: string
        }
        Insert: {
          badge?: string | null
          buy_now_link?: string | null
          buy_now_text?: string | null
          category: string
          created_at?: string
          id?: number
          image: string
          name: string
          original_price?: string | null
          price: string
          rating?: number | null
          stock?: number | null
          updated_at?: string
        }
        Update: {
          badge?: string | null
          buy_now_link?: string | null
          buy_now_text?: string | null
          category?: string
          created_at?: string
          id?: number
          image?: string
          name?: string
          original_price?: string | null
          price?: string
          rating?: number | null
          stock?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seasonal_banners: {
        Row: {
          created_at: string | null
          end_date: string
          id: number
          image_url: string
          start_date: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: never
          image_url: string
          start_date: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: never
          image_url?: string
          start_date?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: number
          logo_url: string | null
          site_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          logo_url?: string | null
          site_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          logo_url?: string | null
          site_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string | null
          id: number
          platform: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          platform: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: never
          platform?: string
          url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
