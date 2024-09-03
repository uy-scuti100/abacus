import { Dashboard } from "@/app/_components/dashboard";
import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
	const supabase = createSupabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}
	return (
		<div className="p-4">
			<div className="max-w-4xl mx-auto py-8">
				<h1 className="text-3xl font-bold mb-4">Orders Management</h1>
				<p className="text-gray-600 mb-6">
					Welcome to the Orders Management page. Here you can view, track, and
					manage all customer orders efficiently.
				</p>
				<h2 className="text-2xl font-semibold mb-3">Key Features:</h2>
				<ul className="list-disc pl-6 mb-6">
					<li>View all orders in real-time</li>
					<li>Track order status and update as needed</li>
					<li>Manage customer information and order details</li>
					<li>Generate reports and analytics</li>
				</ul>
				<p className="text-gray-600">
					Use the tools and features available on this page to streamline your
					order management process and enhance customer satisfaction.
				</p>
			</div>
		</div>
	);
}
