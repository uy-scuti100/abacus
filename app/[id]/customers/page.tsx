// export default function page() {
// 	return <div>page</div>;
// }

// import PhoneNumberValidtor from "./_components/phone-number-validator";

// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Heading from "@/providers/heading";
// import { Plus } from "lucide-react";
// import Link from "next/link";

// export default async function page({ params }: { params: { id: string } }) {
// 	const storeId = params.id;
// 	return (
// 		<div className="flex items-center justify-between mb-4">
// 			<Heading
// 				title="
//                 Contacts

//             "
// 				description="Manage and track your customers, leads and site members."
// 			/>
// 			<Link
// 				href={`/${storeId}/customers/new`}
// 				className={cn(buttonVariants({ variant: "default" }))}
// 			>
// 				<Plus className="sm:mr-2 h-4 w-4" />
// 				<span className="hidden sm:block"> Add New Customer</span>
// 			</Link>
// 		</div>
// 	);
// }

// global imports

import CustomerClient from "./_components/customerClient";

// local imports

export default async function page({ params }: { params: { id: string } }) {
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 px-4 pt-6">
				<CustomerClient storeId={params.id} />
			</div>
		</div>
	);
}
