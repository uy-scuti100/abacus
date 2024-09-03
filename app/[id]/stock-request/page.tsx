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
		<div className="flex-col p-2">
			<div className="flex-1 space-y-4  p-4 rounded-lg bg-white max-w-7xl ">
				<h1 className="text-2xl font-bold mb-4">Stock Request</h1>
				<p className="mb-4">
					This page will feature a bulk transactional email messaging logic that
					vendors use to remind potential customers of the restock and
					availability of previously out-of-stock items that have been
					restocked.
				</p>
				<p className="text-gray-600">Feature coming soon...</p>
			</div>
		</div>
	);
}
