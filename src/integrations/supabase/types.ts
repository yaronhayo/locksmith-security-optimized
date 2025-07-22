export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      keywords: {
        Row: {
          category: string
          competition: string | null
          created_at: string | null
          id: number
          is_long_tail: boolean | null
          keyword: string
          location: string | null
          relevance_score: number | null
          search_volume: number | null
          service_type: string[] | null
          updated_at: string | null
        }
        Insert: {
          category: string
          competition?: string | null
          created_at?: string | null
          id?: number
          is_long_tail?: boolean | null
          keyword: string
          location?: string | null
          relevance_score?: number | null
          search_volume?: number | null
          service_type?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          competition?: string | null
          created_at?: string | null
          id?: number
          is_long_tail?: boolean | null
          keyword?: string
          location?: string | null
          relevance_score?: number | null
          search_volume?: number | null
          service_type?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          lat: number
          lng: number
          name: string
          slug: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          lat: number
          lng: number
          name: string
          slug: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          lat?: number
          lng?: number
          name?: string
          slug?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          location: string | null
          name: string
          rating: number
          sentiment: string | null
          verified: boolean | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          location?: string | null
          name: string
          rating: number
          sentiment?: string | null
          verified?: boolean | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          rating?: number
          sentiment?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string | null
          id: number
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: number
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          address: string
          created_at: string | null
          email: string | null
          error_message: string | null
          formatted_address: string | null
          gate_code: string | null
          id: number
          message: string | null
          name: string
          notes: string | null
          page_metrics: Json | null
          phone: string
          place_id: string | null
          recaptcha_token: string | null
          service: string | null
          source_url: string | null
          status: string
          timeframe: string | null
          traffic_source:
            | Database["public"]["CompositeTypes"]["traffic_source_type"]
            | null
          type: string
          unit_number: string | null
          updated_at: string | null
          vehicle_info: Json | null
          visitor_info: Json | null
        }
        Insert: {
          address: string
          created_at?: string | null
          email?: string | null
          error_message?: string | null
          formatted_address?: string | null
          gate_code?: string | null
          id?: number
          message?: string | null
          name: string
          notes?: string | null
          page_metrics?: Json | null
          phone: string
          place_id?: string | null
          recaptcha_token?: string | null
          service?: string | null
          source_url?: string | null
          status?: string
          timeframe?: string | null
          traffic_source?:
            | Database["public"]["CompositeTypes"]["traffic_source_type"]
            | null
          type: string
          unit_number?: string | null
          updated_at?: string | null
          vehicle_info?: Json | null
          visitor_info?: Json | null
        }
        Update: {
          address?: string
          created_at?: string | null
          email?: string | null
          error_message?: string | null
          formatted_address?: string | null
          gate_code?: string | null
          id?: number
          message?: string | null
          name?: string
          notes?: string | null
          page_metrics?: Json | null
          phone?: string
          place_id?: string | null
          recaptcha_token?: string | null
          service?: string | null
          source_url?: string | null
          status?: string
          timeframe?: string | null
          traffic_source?:
            | Database["public"]["CompositeTypes"]["traffic_source_type"]
            | null
          type?: string
          unit_number?: string | null
          updated_at?: string | null
          vehicle_info?: Json | null
          visitor_info?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      traffic_source_type: {
        source: string | null
        medium: string | null
        campaign: string | null
        keyword: string | null
        click_path: string[] | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
