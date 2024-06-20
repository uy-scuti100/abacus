// global imports
import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

// local imports
export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createSupabaseServer();
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;

	if (!userId) {
		redirect("/login");
	}
	const { data: stores, error } = await supabase
		.from("stores")
		.select("id")
		.eq("vendor_id", userId);

	if (stores) {
		const store = stores[0];
		if (store?.id) {
			redirect(`/${store?.id}`);
		} else if (store?.id === undefined || store?.id === null) {
			return <div>{children}</div>;
		}
	}
}
