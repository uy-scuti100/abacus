// export type Json =
// 	| string
// 	| number
// 	| boolean
// 	| null
// 	| Json[]
// 	| { [key: string]: Json };

export interface Customers {
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
}

export interface Product {
	id: string;
	additional_information?: Json | null;
	brand?: string | null;
	category_id: string[];
	collection_id?: string | null;
	cost_of_good?: number | null;
	created_at?: string;
	description: string;

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
}

export interface Category {
	avatar: string | null;
	description: string | null;
	name: string;
	store_id: string;
	vendor_id: string | null;
	id: string;
	created_at: string;
	product_count: number | null;
	slug: string | null;
	tags: string[] | null;
}

export interface Collection {
	id: string;
	avatar: string | null;
	description: string | null;
	name: string;
	store_id: string;
	vendor_id: string | null;
	product_count: number | null;
	created_at: string;
	slug: string | null;
	tags: string[] | null;
}
export interface Store {
	id: string;
	vendor_id: string | null;
	name: string;
	about?: string | null;
	created_at: string;
}

// export interface Coupon {
// 	id: string;
// 	name: string;
// 	code: string;
// 	type: "percentage" | "fixed" | "freeShipping" | "salePrice" | "buyXGetY";
// 	discountPercentage?: number;
// 	discountAmount?: number;
// 	buyX?: number;
// 	getYFree?: number;
// 	validFrom: string; // Assuming this will be in ISO date format
// 	validTo: string; // Assuming this will be in ISO date format
// 	limitTotalUses?: boolean;
// 	maxUses?: number;
// 	limitOnePerCustomer?: boolean;
// 	applyTo: "all" | "specific";
// 	productIds?: string[]; // Assuming product IDs are stored as a comma-separated string
// 	minPurchaseAmount?: number;
// 	created_at: string;
// }

export interface Coupon {
	apply_to?: "all" | "specific" | null;
	sale_price: number | null;
	has_end_date: boolean | null;
	buy_x?: number | null;
	code?: string | null;
	discount_amount?: number | null;
	discount_percentage?: number | null;
	get_y_free?: number | null;
	id?: string | null;
	limit_one_per_customer?: boolean | null;
	limit_total_uses?: boolean | null;
	max_uses?: number | null;
	name?: string | null;
	product_ids?: string[] | null;
	type?:
		| "percentage"
		| "fixed"
		| "free_shipping"
		| "sale_price"
		| "buy_x_get_y"
		| null;
	valid_from?: string | null;
	valid_to?: string | null;

	store_id?: string | null;
	created_at?: string;
}
