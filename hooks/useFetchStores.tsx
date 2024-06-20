import { Store } from "@/types";
import { createSupabaseBrowser } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useFetchStores() {
	const supabase = createSupabaseBrowser();
	return useQuery({
		queryKey: ["stores"],
		queryFn: async () => {
			const { data: currentUser } = await supabase.auth.getUser();
			const id = currentUser.user?.id;
			if (id) {
				const { data: stores, error } = await supabase
					.from("stores")
					.select("*")
					.eq("vendor_id", id);

				if (error) {
					console.error("Error fetching stores:", error);
					return [];
				}

				return stores as Store[];
			}
			return [];
		},
	});
}
