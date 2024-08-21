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
			Back in stock-request page. this will feature a bulk transactional email
			messaging logic, that vendors use to remind potential customers of the
			restock and availability of previously out of stock items that has been
			restocked{" "}
		</div>
	);
}
