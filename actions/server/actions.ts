import { Category } from "@/types";
import { createSupabaseServer } from "@/supabase/server";
import { QueryClient } from "@tanstack/react-query";

const initialUser = {
	created_at: "",
	display_name: "",
	email: "",
	id: "",
	image_url: "",
};

export const userFetcherServer = async () => {
	const supabase = createSupabaseServer();
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;
	if (userId) {
		const { data: user } = await supabase
			.from("vendors")
			.select("*")
			.eq("id", userId)
			.single();

		return user;
	}
	return initialUser;
};
// export const useUserServer = async () => {
// 	const queryClient = new QueryClient();

// 	await queryClient.prefetchQuery({
// 		queryKey: ["user-server"],
// 		queryFn: () => userFetcher,
// 	});
// };

export const categoriesFetcher = async (id: string) => {
	const supabase = createSupabaseServer();
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;
	if (userId) {
		const { data: categories, error } = await supabase
			.from("category")
			.select("*")
			.eq("vendor_id", userId)
			.eq("store_id", id);

		if (error) {
			console.error("Error fetching categories:", error);
			return [];
		}

		return categories as Category[];
	}
};
