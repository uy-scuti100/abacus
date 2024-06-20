// import { Category } from "@/d.types";
// import { createSupabaseBrowser } from "@/supabase/client";
// import { useQuery } from "@tanstack/react-query";

// export default function useFetchCategories(storeId: string) {
// 	const supabase = createSupabaseBrowser();

// 	return useQuery({
// 		queryKey: ["categories"],
// 		queryFn: async () => {
// 			const { data: currentUser } = await supabase.auth.getUser();
// 			const id = currentUser.user?.id;

// 			if (id) {
// 				const { data: categories, error } = await supabase
// 					.from("category")
// 					.select("*")
// 					.eq("vendor_id", id)
// 					.eq("store_id", storeId);

// 				if (error) {
// 					console.error("Error fetching categories:", error);
// 					return [];
// 				}

// 				return categories as Category[];
// 			}
// 			return [];
// 		},
// 	});
// }

import { createSupabaseBrowser } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface FetchDataOptions {
	storeId: string;
	tableName: "category" | "collection" | "products" | "stores" | "vendors";
	queryKey: string[];
}

export default function useFetchData<T>({
	storeId,
	tableName,
	queryKey,
}: FetchDataOptions) {
	const supabase = createSupabaseBrowser();

	return useQuery({
		queryKey,
		queryFn: async () => {
			if (storeId) {
				const { data, error } = await supabase
					.from(tableName)
					.select("*")
					.eq("store_id", storeId);

				if (error) {
					console.error(`Error fetching data from ${tableName}:`, error);
					return [] as [];
				}

				return data as T[];
			}

			return [] as T[];
		},
	});
}
