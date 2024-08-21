import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

interface DashBoardPageProps {
	params: { id: string };
}

const DashboardPage: React.FC<DashBoardPageProps> = async ({ params }) => {
	const supabase = createSupabaseServer();

	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;
	if (!userId) {
		redirect("/login");
	}

	const { data: store, error } = await supabase
		.from("stores")
		.select("*")
		.eq("id", params.id)
		.eq("vendor_id", userId)
		.single();

	if (!store) {
		redirect("/store");
	}

	return (
		<div className="p-4">
			<div>Active Store is {store?.name} and this will be dashboard page</div>
		</div>
	);
};

export default DashboardPage;
