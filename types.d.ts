interface KeyValuePair {
	key: string;
	value: string;
}
interface Variant {
	variantId: string;
	name: string;
	price: number;
	inventory?: number;
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
}
export interface Store {
	id: string;
	vendor_id: string | null;
	name: string;
	about?: string | null;
	created_at: string;
}
