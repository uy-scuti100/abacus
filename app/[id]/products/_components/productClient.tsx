"use client";
// global imports
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// local imports

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

import Heading from "@/providers/heading";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/providers/apiList";
import useFetchData from "@/hooks/useFetchCategories";
import { Product } from "@/types";
import Skeleton from "@/components/global/skeleton";
import Note from "@/components/global/note";

interface ProductClientProps {
	storeId: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});
const ProductClient: React.FC<ProductClientProps> = ({ storeId }) => {
	const router = useRouter();
	const {
		data: products,
		isLoading,
		isFetching,
	} = useFetchData<Product>({
		storeId,
		tableName: "products",
		queryKey: ["products"],
	});

	if (isFetching || isLoading) {
		return <Skeleton />;
	}

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${products?.length || 0})`}
					description="Products available in your store."
				/>

				<Button onClick={() => router.push(`/${storeId}/products/new`)}>
					<Plus className="sm:mr-2 h-4 w-4" />
					<span className="hidden sm:block">New</span>
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={
					products?.map((product) => ({
						...product,
						media: product.media[0] || "",
						created_at: product.created_at
							? dateFormatter.format(new Date(product.created_at))
							: "",
					})) || []
				}
				searchKey="name"
			/>

			<Heading
				title="DEVELOPER API"
				description="API calls for All and Single products"
			/>
			<Note id={storeId} />
			<Separator />
			<ApiList entityName="products" entityId="slug" apikey="myapikey" />
		</>
	);
};

export default ProductClient;

{
	/* <p suppressHydrationWarning className="text-xs">
	
</p>; */
}

// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//    dateStyle: "medium",
// });
