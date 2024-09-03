"use client";

import { redirect } from "next/navigation";
import { CouponForm, CouponList } from "./component";
import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/supabase/client";
// import CouponForm from "@/components/CouponForm";
// import CouponList from "@/components/CouponList";

export default function CouponsPage() {
	const supabase = createSupabaseBrowser();

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				redirect("/login");
			}
		};

		fetchUser();
	}, []);

	const [showForm, setShowForm] = useState(false);
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Coupons Management</h2>

			<div className="mb-6">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => setShowForm(!showForm)}
				>
					{showForm ? "Hide Coupon Form" : "Create New Coupon"}
				</button>
			</div>

			{showForm && <CouponForm />}

			<CouponList />

			<div className="mt-8">
				<h3 className="text-xl font-semibold mb-2">Available Coupon Types:</h3>
				<ul className="list-disc list-inside">
					<li>Percentage Discount</li>
					<li>Fixed Cash Discount</li>
					<li>Free Shipping</li>
					<li>Sale Price</li>
					<li>Buy X Get Y Free</li>
				</ul>
			</div>

			<div className="mt-4">
				<h3 className="text-xl font-semibold mb-2">Coupon Options:</h3>
				<ul className="list-disc list-inside">
					<li>Set valid date range</li>
					<li>Limit total number of uses</li>
					<li>Limit to one use per customer</li>
					<li>Apply to specific products or all products</li>
					<li>Set minimum purchase amount</li>
				</ul>
			</div>
		</div>
	);
}

// local imports
// import { createSupabaseServer } from "@/supabase/server";

// import { redirect } from "next/navigation";
// import CategoryClient from "./_components/categoryClient";

// export default async function Page({ params }: { params: { id: string } }) {
// 	const supabase = createSupabaseServer();
// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();

// 	if (!user) {
// 		redirect("/login");
// 	}

// 	return (
// 		<div className="flex-col p-3">
// 			<div className="flex-1 space-y-4 pt-6">
// 				<CategoryClient storeId={params.id} />
// 			</div>
// 		</div>
// 	);
// }
