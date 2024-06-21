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
					.eq("store_id", storeId)
					.order("created_at", { ascending: false });

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
