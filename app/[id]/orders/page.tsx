import { Dashboard } from "@/app/_components/dashboard";
import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
	const supabase = createSupabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}
	return (
		<div className="p-4">
			{/* <Dashboard /> */}
			This will be the orders page
		</div>
	);
}
