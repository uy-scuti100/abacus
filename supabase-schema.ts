export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			category: {
				Row: {
					avatar: string | null;
					created_at: string;
					description: string | null;
					id: string;
					name: string;
					product_count: number | null;
					slug: string | null;
					store_id: string;
					vendor_id: string | null;
				};
				Insert: {
					avatar?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					name: string;
					product_count?: number | null;
					slug?: string | null;
					store_id: string;
					vendor_id?: string | null;
				};
				Update: {
					avatar?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					product_count?: number | null;
					slug?: string | null;
					store_id?: string;
					vendor_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "category_store_id_fkey";
						columns: ["store_id"];
						isOneToOne: false;
						referencedRelation: "stores";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "category_vendor_id_fkey";
						columns: ["vendor_id"];
						isOneToOne: false;
						referencedRelation: "vendors";
						referencedColumns: ["id"];
					}
				];
			};
			collection: {
				Row: {
					avatar: string | null;
					created_at: string;
					description: string | null;
					id: string;
					name: string;
					product_count: number | null;
					slug: string | null;
					store_id: string;
					vendor_id: string | null;
				};
				Insert: {
					avatar?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					name: string;
					product_count?: number | null;
					slug?: string | null;
					store_id: string;
					vendor_id?: string | null;
				};
				Update: {
					avatar?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					product_count?: number | null;
					slug?: string | null;
					store_id?: string;
					vendor_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "collection_store_id_fkey";
						columns: ["store_id"];
						isOneToOne: false;
						referencedRelation: "stores";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "collection_vendor_id_fkey";
						columns: ["vendor_id"];
						isOneToOne: false;
						referencedRelation: "vendors";
						referencedColumns: ["id"];
					}
				];
			};
			customers: {
				Row: {
					address: string | null;
					created_at: string;
					email: string;
					first_name: string | null;
					id: string;
					last_name: string | null;
					phone_numer: string | null;
					role: string | null;
					store_id: string | null;
					subscribed: boolean;
					tags: string[] | null;
					vendor_id: string | null;
				};
				Insert: {
					address?: string | null;
					created_at?: string;
					email: string;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
					phone_numer?: string | null;
					role?: string | null;
					store_id?: string | null;
					subscribed?: boolean;
					tags?: string[] | null;
					vendor_id?: string | null;
				};
				Update: {
					address?: string | null;
					created_at?: string;
					email?: string;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
					phone_numer?: string | null;
					role?: string | null;
					store_id?: string | null;
					subscribed?: boolean;
					tags?: string[] | null;
					vendor_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "customers_store_id_fkey";
						columns: ["store_id"];
						isOneToOne: false;
						referencedRelation: "stores";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "customers_vendor_id_fkey";
						columns: ["vendor_id"];
						isOneToOne: false;
						referencedRelation: "vendors";
						referencedColumns: ["id"];
					}
				];
			};
			products: {
				Row: {
					additional_information: Json | null;
					brand: string | null;
					category_id: string[];
					collection_id: string | null;
					cost_of_good: number | null;
					created_at: string;
					description: string;
					id: string;
					inventory: string | null;
					media: string[];
					on_sale: boolean;
					price: number;
					ribbon: string | null;
					sku: string | null;
					slug: string | null;
					status: string;
					store_id: string;
					title: string;
					type: string;
					variants: Json | null;
					vendor_id: string;
				};
				Insert: {
					additional_information?: Json | null;
					brand?: string | null;
					category_id: string[];
					collection_id?: string | null;
					cost_of_good?: number | null;
					created_at?: string;
					description: string;
					id?: string;
					inventory?: string | null;
					media: string[];
					on_sale?: boolean;
					price: number;
					ribbon?: string | null;
					sku?: string | null;
					slug?: string | null;
					status: string;
					store_id: string;
					title: string;
					type: string;
					variants?: Json | null;
					vendor_id: string;
				};
				Update: {
					additional_information?: Json | null;
					brand?: string | null;
					category_id?: string[];
					collection_id?: string | null;
					cost_of_good?: number | null;
					created_at?: string;
					description?: string;
					id?: string;
					inventory?: string | null;
					media?: string[];
					on_sale?: boolean;
					price?: number;
					ribbon?: string | null;
					sku?: string | null;
					slug?: string | null;
					status?: string;
					store_id?: string;
					title?: string;
					type?: string;
					variants?: Json | null;
					vendor_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "products_collection_id_fkey";
						columns: ["collection_id"];
						isOneToOne: false;
						referencedRelation: "collection";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "products_store_id_fkey";
						columns: ["store_id"];
						isOneToOne: false;
						referencedRelation: "stores";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "products_vendor_id_fkey";
						columns: ["vendor_id"];
						isOneToOne: false;
						referencedRelation: "vendors";
						referencedColumns: ["id"];
					}
				];
			};
			stores: {
				Row: {
					about: string | null;
					created_at: string;
					id: string;
					name: string;
					vendor_id: string;
				};
				Insert: {
					about?: string | null;
					created_at?: string;
					id?: string;
					name: string;
					vendor_id: string;
				};
				Update: {
					about?: string | null;
					created_at?: string;
					id?: string;
					name?: string;
					vendor_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "stores_vendor_id_fkey";
						columns: ["vendor_id"];
						isOneToOne: false;
						referencedRelation: "vendors";
						referencedColumns: ["id"];
					}
				];
			};
			vendors: {
				Row: {
					address: string | null;
					"api-key": string;
					avatar: string | null;
					created_at: string;
					email: string | null;
					full_name: string | null;
					id: string;
				};
				Insert: {
					address?: string | null;
					"api-key"?: string;
					avatar?: string | null;
					created_at?: string;
					email?: string | null;
					full_name?: string | null;
					id?: string;
				};
				Update: {
					address?: string | null;
					"api-key"?: string;
					avatar?: string | null;
					created_at?: string;
					email?: string | null;
					full_name?: string | null;
					id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "users_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
			PublicSchema["Views"])
	? (PublicSchema["Tables"] &
			PublicSchema["Views"])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
	? PublicSchema["Enums"][PublicEnumNameOrOptions]
	: never;
