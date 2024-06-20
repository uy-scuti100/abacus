import { createSupabaseBrowser } from "@/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useUser() {
	const supabase = createSupabaseBrowser();
	return useQuery({
		queryKey: ["vendor"],
		queryFn: async () => {
			const { data: currentUser } = await supabase.auth.getUser();
			const id = currentUser.user?.id;
			if (id) {
				const { data: user } = await supabase
					.from("vendors")
					.select("*")
					.eq("id", id)
					.single();

				return user;
			}
			return null;
		},
	});
}
