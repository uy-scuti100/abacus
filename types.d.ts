import { Product } from "@/d.types";
interface Media {
	url: string;
}
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

// export interface Product {
// 	vendor_id: string;
// 	store_id: string;
// 	title: string;
// 	categoryId: string;
// 	collectionId: string | null;
// 	status: string;
// 	media: Media[];
// 	type: string;
// 	ribbon: string | null;
// 	brand?: string;
// 	price: number;
// 	on_sale?: boolean;
// 	cost_of_good?: number | null;
// 	inventory?: number | null;
// 	sku: string | null;
// 	description: string;
// 	additional_information?: KeyValuePair[] | null;
// 	variants?: Variant[] | null;
// }

// export interface Product {
// 	additional_information: Json | null;
// 	brand: string | null;
// 	category_id: string;
// 	collection_id: string | null;
// 	cost_of_good: number | null;
// 	created_at: string;
// 	description: string;
// 	id: string;
// 	ribbon: string | null;
// 	inventory: number | null;
// 	media: string[];
// 	on_sale: boolean;
// 	price: number;
// 	sku: string | null;
// 	status: string;
// 	store_id: string;
// 	title: string;
// 	type: string;
// 	variants: Json | null;
// 	vendor_id: string;
// }
export interface Product {
	additional_information: Record<string, any> | null;
	brand: string | null;
	category_id: string;
	collection_id: string | null;
	cost_of_good: number | null;
	created_at: string;
	description: string;
	id: string;
	ribbon: string | null;
	inventory: number | null;
	media: string[];
	on_sale: boolean;
	price: number;
	sku: string | null;
	status: string;
	store_id: string;
	title: string;
	type: string;
	variants: Record<string, any> | null;
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

export interface collection {
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
