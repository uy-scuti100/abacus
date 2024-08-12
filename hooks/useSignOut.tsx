import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/supabase/client";

export const useSignOut = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const signOut = async () => {
		const supabase = createSupabaseBrowser();
		try {
			await supabase.auth.signOut();
			queryClient.clear();
			router.replace("/");
		} catch (error) {
			console.error("Signout error:", error);
		}
	};

	return signOut;
};
