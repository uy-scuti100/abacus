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
		<div className="flex-col p-2">
			<div className="flex-1 space-y-4  p-4 rounded-lg bg-white max-w-7xl ">
				<div className="container bg-white w-full rounded-xl p-4 ">
					<h1 className="text-3xl font-bold mb-6">Invoice Management</h1>
					<p className="text-lg mb-4">
						Welcome to your invoice dashboard. Here you can manage all your
						invoices efficiently.
					</p>

					<h2 className="text-2xl font-semibold mb-4">Features</h2>
					<ul className="list-disc list-inside mb-6">
						<li className="mb-2">Create and edit invoices</li>
						<li className="mb-2">Track payment status</li>
						<li className="mb-2">Generate reports</li>
						<li className="mb-2">Manage clients</li>
					</ul>

					<p className="text-lg mb-6">
						Use the tools below to start managing your invoices and streamline
						your billing process.
					</p>

					<div className="bg-gray-100 p-6 rounded-lg">
						<h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
						<div className="flex space-x-4">
							<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
								Create New Invoice
							</button>
							<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
								View All Invoices
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
