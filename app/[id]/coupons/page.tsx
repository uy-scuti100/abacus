import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";
import CouponClient from "./_components/couponClient";

// local imports

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
				<CouponClient storeId={params.id} />
			</div>
		</div>
	);
}
// export default function page() {
// 	return (
// 		<div className="p-4">
// 			{/* <h1 className="text-3xl font-bold mb-4">Invoices</h1>
// 			<p className="mb-2">
// 				Welcome to the Invoices page. Here you can manage all your invoices
// 				efficiently.
// 			</p>
// 			<p className="mb-2">
// 				Create, view, and track invoices for your customers. Keep your financial
// 				records organized and up-to-date.
// 			</p>
// 			<p className="mb-4">
// 				Use the tools below to streamline your invoicing process and maintain a
// 				clear overview of your business transactions.
// 			</p> */}
// 		</div>
// 	);
// }
