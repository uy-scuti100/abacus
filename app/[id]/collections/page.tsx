import { createSupabaseServer } from "@/supabase/server";
import CategoryClient from "./_components/collectionClient";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
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
				<CategoryClient storeId={params.id} />
			</div>
		</div>
	);
}
