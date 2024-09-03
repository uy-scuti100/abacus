"use client";
// global imports
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns, CouponsColumn } from "./columns";
import Heading from "@/providers/heading";
import { DataTable } from "@/components/ui/data-table";
import useFetchData from "@/hooks/useFetchCategories";
import { Customers } from "@/types";
import Skeleton from "@/components/global/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomerClientProps {
	storeId: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});

export default function CouponClient({ storeId }: CustomerClientProps) {
	const path = usePathname(); // This will give you the current path
	const [lastPart, setLastPart] = useState("");

	useEffect(() => {
		const splitUrl = path?.split("/") || []; // Split the path by "/" and handle null case
		const lastPart = splitUrl[splitUrl.length - 1];
		setLastPart(lastPart);
	}, [path]);

	// const searchKey =
	// 	lastPart === "products"
	// 		? "title"
	// 		: lastPart === "customers"
	// 		? "first_name"
	// 		: "name";

	const {
		data: coupons,
		isLoading,
		isFetching,
	} = useFetchData<CouponsColumn>({
		storeId,
		tableName: "coupons",
		queryKey: ["coupons"],
	});

	// console.log(coupons);
	if (isFetching || isLoading) {
		return <Skeleton />;
	}

	return (
		<div className="pb-10">
			<div className="flex items-center justify-between mb-4">
				<Heading
					title="Coupons"
					description="Boost sales by giving customers special offers and discounts."
				/>
				<Link
					href={`/${storeId}/coupons/new`}
					className={cn(
						buttonVariants({ variant: "default" }),
						"rounded-full py-6 px-4 "
					)}
				>
					<Plus className="sm:mr-2 h-4 w-4" />
					<span className="hidden sm:block"> Add New Coupon</span>
				</Link>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={
					coupons?.map((coupon) => ({
						...coupon,
						createdAt: dateFormatter.format(
							new Date(coupon.created_at as string)
						),
					})) || []
				}
				searchKey="name"
			/>
		</div>
	);
}

{
	/* <Heading
				title="DEVELOPER API"
				description="API calls for All and Single Customers"
			/>
			<Separator />
			<Note id={storeId} />
			<ApiList entityName="customer" apikey="myapikey" entityId="id" /> */
}
