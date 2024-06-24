"use client";
// global imports
import { Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

import Heading from "@/providers/heading";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/providers/apiList";
import useFetchData from "@/hooks/useFetchCategories";
import { Category, Customers } from "@/types";
import Skeleton from "@/components/global/skeleton";
import Note from "@/components/global/note";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CustomerClientProps {
	storeId: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});

const CustomerClient: React.FC<CustomerClientProps> = ({ storeId }) => {
	const {
		data: customers,
		isLoading,
		isFetching,
	} = useFetchData<Customers>({
		storeId,
		tableName: "customers",
		queryKey: ["customers"],
	});

	if (isFetching || isLoading) {
		return <Skeleton />;
	}

	return (
		<div className="pb-10">
			<div className="flex items-center justify-between mb-4">
				<Heading
					title="
                 Contacts

             "
					description="Manage and track your customers, leads and site members."
				/>
				<Link
					href={`/${storeId}/customers/new`}
					className={cn(buttonVariants({ variant: "default" }))}
				>
					<Plus className="sm:mr-2 h-4 w-4" />
					<span className="hidden sm:block"> Add New Customer</span>
				</Link>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={
					customers?.map((customer) => ({
						...customer,
						createdAt: dateFormatter.format(new Date(customer.created_at)),
					})) || []
				}
				searchKey="email"
			/>

			<Heading
				title="DEVELOPER API"
				description="API calls for All and Single Customers"
			/>
			<Separator />
			<Note id={storeId} />
			<ApiList entityName="customer" apikey="myapikey" entityId="id" />
		</div>
	);
};

export default CustomerClient;
