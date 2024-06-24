import { createSupabaseServer } from "@/supabase/server";
import { CustomerForm } from "../_components/customer-form";

export default async function page({
	params,
}: {
	params: { id: string; categoryId: string };
}) {
	const storeId = params.id;
	const supabase = createSupabaseServer();
	const { data: customers, error } = await supabase
		.from("customers")
		.select("*")
		.eq("id", params.categoryId)
		.single();
	return (
		<div>
			<CustomerForm initialData={customers} storeId={storeId} />
		</div>
	);
}
