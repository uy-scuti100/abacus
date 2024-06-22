import { Product } from "@/d.types";
// interface Media {
// 	url: string;
// }
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

	inventory?: number | null;
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
// export interface Product {
// 	id: string;
// 	vendor_id: string;
// 	store_id: string;
// 	title: string;
// 	category_id: string;
// 	collection_id: string | null;
// 	status: string;
// 	media: string[];
// 	type: string;
// 	ribbon: string | null;
// 	brand: string | null;
// 	price: number;
// 	on_sale: boolean;
// 	cost_of_good: number | null;
// 	inventory: number | null;
// 	sku: string | null;
// 	description: string;
// 	additional_information: KeyValuePair[] | null;
// 	variants: Variant[] | null;
// 	created_at: string;
// 	slug: string | null;
// }

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
