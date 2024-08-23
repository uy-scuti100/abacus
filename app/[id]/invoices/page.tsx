// import { createSupabaseServer } from "@/supabase/server";
// import CustomerClient from "./_components/customerClient";
// import { redirect } from "next/navigation";

// // local imports

// export default async function page({ params }: { params: { id: string } }) {
// 	const supabase = createSupabaseServer();

// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();

// 	if (!user) {
// 		redirect("/login");
// 	}
// 	return (
// 		<div className="flex-col">
// 			<div className="flex-1 space-y-4 p-4 pt-6">
// 				<CustomerClient storeId={params.id} />
// 			</div>
// 		</div>
// 	);
// }
export default function page() {
	return (
		<div className="p-4">
			<h1>This will be the invoices page</h1>
		</div>
	);
}
