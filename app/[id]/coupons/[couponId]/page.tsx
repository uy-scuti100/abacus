import { createSupabaseServer } from "@/supabase/server";
import { CouponForm } from "../_components/coupon-form";

export default async function page({
	params,
}: {
	params: { id: string; customerId: string };
}) {
	const storeId = params.id;
	const supabase = createSupabaseServer();
	const { data: coupon, error } = await supabase
		.from("coupons")
		.select("*")
		.eq("id", params.customerId)
		.single();
	return (
		<div className="p-4">
			<CouponForm initialData={coupon} storeId={storeId} />
		</div>
	);
}
