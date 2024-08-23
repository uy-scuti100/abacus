import { createSupabaseServer } from "@/supabase/server";
import { CustomerForm } from "../_components/customer-form";

export default async function page({
	params,
}: {
	params: { id: string; customerId: string };
}) {
	const storeId = params.id;
	const supabase = createSupabaseServer();
	const { data: customer, error } = await supabase
		.from("customers")
		.select("*")
		.eq("id", params.customerId)
		.single();
	return (
		<div className="p-4">
			<CustomerForm initialData={customer} storeId={storeId} />
		</div>
	);
}
