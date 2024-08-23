"use client";
// global imports
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// local imports
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import Heading from "@/providers/heading";
import { DataTable } from "@/components/ui/data-table";
import useFetchData from "@/hooks/useFetchCategories";
import { Product } from "@/types";
import Skeleton from "@/components/global/skeleton";
import { cn } from "@/lib/utils";

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

				<Link
					href={`/${storeId}/products/new`}
					className={cn(
						buttonVariants({ variant: "default" }),
						"rounded-full py-6 px-4 "
					)}
				>
					<Plus className="sm:mr-2 h-4 w-4" />

					<span className="hidden sm:block">New</span>
				</Link>
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
				searchKey="title"
			/>
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
