import { createSupabaseServer } from "@/supabase/server";
import { Category } from "@/types";

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
			const { data: categoriesData, error } = await supabase
				.from("category")
				.select("*")
				.eq("store_id", storeId);

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}

			// Fetch products associated with these categories			const collectionsWithProducts = await Promise.all(
			const categoriesWithProducts = await Promise.all(
				categoriesData.map(async (category: Category) => {
					const { data: productsData, error: productsError } = await supabase
						.from("products")
						.select("*")
						.contains("category_id", [category.id]);

					if (productsError) {
						console.error("Supabase Error:", productsError);
						return { ...category, products: [] };
					}

					return {
						...category,
						products: productsData || [],
					};
				})
			);

			return categoriesWithProducts;
		},

		category: async (
			_: any,
			{ storeId, categoryId }: { storeId: string; categoryId: string }
		) => {
			const supabase = createSupabaseServer();
			const { data: categoryData, error: categoryError } = await supabase
				.from("category")
				.select("*")
				.eq("store_id", storeId)
				.eq("id", categoryId)
				.single();

			if (categoryError) {
				console.error("Supabase Error:", categoryError);
				return null;
			}

			// Fetch products associated with this category
			const { data: productsData, error: productsError } = await supabase
				.from("products")
				.select("*")
				.contains("category_id", [categoryId]);

			if (productsError) {
				console.error("Supabase Error:", productsError);
				return null;
			}

			// Add products to the category object
			return {
				...categoryData,
				products: productsData || [], // Ensure it's an array
			};
		},

		collections: async (_: any, { storeId }: { storeId: string }) => {
			const supabase = createSupabaseServer();
			const { data: collectionsData, error } = await supabase
				.from("collection")
				.select("*")
				.eq("store_id", storeId);

			if (error) {
				console.error("Supabase Error:", error);
				return null;
			}
			const collectionsWithProducts = await Promise.all(
				collectionsData.map(async (collection) => {
					const { data: productsData, error: productsError } = await supabase
						.from("products")
						.select("*")
						.eq("collection_id", collection.id);

					if (productsError) {
						console.error("Supabase Error:", productsError);
						return { ...collection, products: [] };
					}

					return {
						...collection,
						products: productsData || [],
					};
				})
			);

			return collectionsWithProducts;
		},

		collection: async (
			_: any,
			{ storeId, collectionId }: { storeId: string; collectionId: string }
		) => {
			const supabase = createSupabaseServer();
			const { data: collectionData, error: collectionError } = await supabase
				.from("collection")
				.select("*")
				.eq("store_id", storeId)
				.eq("id", collectionId)
				.single();

			if (collectionError) {
				console.error("Supabase Error:", collectionError);
				return null;
			}

			// Fetch products associated with this collection
			const { data: productsData, error: productsError } = await supabase
				.from("products")
				.select("*")
				.eq("collection_id", collectionId);

			if (productsError) {
				console.error("Supabase Error:", productsError);
				return null;
			}

			// Add products to the collection object
			return {
				...collectionData,
				products: productsData || [], // Ensure it's an array
			};
		},
	},
};
