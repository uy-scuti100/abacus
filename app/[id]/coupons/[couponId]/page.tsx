import { createSupabaseServer } from "@/supabase/server";
import { CouponForm } from "../_components/coupon-form";
import { Coupon } from "@/types";

export default async function page({
	params,
}: {
	params: { id: string; couponId: string };
}) {
	const storeId = params.id;
	const supabase = createSupabaseServer();
	const { data: coupon, error } = await supabase
		.from("coupons")
		.select("*")
		.eq("id", params.couponId)
		.single();

	const typedCoupon = coupon as Coupon | null;

	return (
		<div className="p-4">
			<CouponForm initialData={typedCoupon} storeId={storeId} />
		</div>
	);
}
