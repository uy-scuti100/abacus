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
import { Category } from "@/types";
import Skeleton from "@/components/global/skeleton";
import Note from "@/components/global/note";
import CategoryCardsWrapper from "./category-cards-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryClientProps {
	storeId: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});

const CategoryClient: React.FC<CategoryClientProps> = ({ storeId }) => {
	const {
		data: categories,
		isLoading,
		isFetching,
	} = useFetchData<Category>({
		storeId,
		tableName: "category",
		queryKey: ["categories"],
	});

	if (isFetching || isLoading) {
		return <Skeleton />;
	}

	return (
		<div className="pb-10">
			<div className="flex items-center justify-between">
				<Heading
					title={`Categories (${categories?.length || 0})`}
					description="Group related products into categories and add them to your store."
				/>
				<Link
					href={`/${storeId}/categories/new`}
					className={cn(buttonVariants({ variant: "default" }))}
				>
					<Plus className="mr-2 h-4 w-4" />
					New
				</Link>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={
					categories?.map((category) => ({
						...category,
						avatar: category.avatar || "",
						createdAt: dateFormatter.format(new Date(category.created_at)),
					})) || []
				}
				searchKey="name"
			/>
			<CategoryCardsWrapper categories={categories} storeId={storeId} />
			<Heading
				title="DEVELOPER API"
				description="API calls for All and Single Categories"
			/>
			<Separator />
			<Note id={storeId} />
			<ApiList entityName="category" apikey="myapikey" entityId="id" />
		</div>
	);
};

export default CategoryClient;
