import { createSupabaseServer } from "@/supabase/server";
import { Category } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function Page({
	params,
}: {
	params: { id: string; productId: string };
}) {
	const supabase = createSupabaseServer();
	const storeId = params.id;
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;
	const productId = params.productId;
	if (!userId) {
		redirect("/login");
	}

	const { data: store, error } = await supabase
		.from("stores")
		.select("*")
		.eq("id", storeId)
		.single();
	if (error || !store) {
		redirect("/");
	}

	return <div>Page ID: {productId}</div>;
}
