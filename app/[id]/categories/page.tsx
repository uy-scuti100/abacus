// local imports
import { createSupabaseServer } from "@/supabase/server";
import CategoryClient from "./_components/categoryClient";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createSupabaseServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex-col p-3">
			<div className="flex-1 space-y-4 pt-6">
				<CategoryClient storeId={params.id} />
			</div>
		</div>
	);
}
