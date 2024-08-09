import { createSupabaseServer } from "@/supabase/server";

export const resolvers = {
	Query: {
		products: async (_: any, { storeId }: { storeId: string }) => {
			const supabase = createSupabaseServer();
			const { data, error } = await supabase
				.from("products")
				.select("*")
				.eq("store_id", storeId);

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			return data;
		},
		product: async (
			_: any,
			{ storeId, productId }: { storeId: string; productId: string }
		) => {
			const supabase = createSupabaseServer();
			const { data, error } = await supabase
				.from("products")
				.select("*")
				.eq("store_id", storeId)
				.eq("id", productId)
				.single();

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			return data;
		},
		categories: async (_: any, { storeId }: { storeId: string }) => {
			const supabase = createSupabaseServer();
			const { data, error } = await supabase
				.from("category")
				.select("*")
				.eq("store_id", storeId);

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			return data;
		},
		category: async (
			_: any,
			{ storeId, categoryId }: { storeId: string; categoryId: string }
		) => {
			const supabase = createSupabaseServer();
			const { data, error } = await supabase
				.from("category")
				.select("*")
				.eq("store_id", storeId)
				.eq("id", categoryId)
				.single();

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			return data;
		},
		collections: async (_: any, { storeId }: { storeId: string }) => {
			const supabase = createSupabaseServer();
			const { data, error } = await supabase
				.from("collection")
				.select("*")
				.eq("store_id", storeId);

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			return data;
		},
		collection: async (
			_: any,
			{ storeId, collectionId }: { storeId: string; collectionId: string }
		) => {
			const supabase = createSupabaseServer();
			const { data, error } = await supabase
				.from("collection")
				.select("*")
				.eq("store_id", storeId)
				.eq("id", collectionId)
				.single();

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			return data;
		},
	},
};
