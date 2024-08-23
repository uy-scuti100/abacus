"use client";
// global imports
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// local imports

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

import Heading from "@/providers/heading";
import { DataTable } from "@/components/ui/data-table";

import useFetchData from "@/hooks/useFetchCategories";
import { Collection } from "@/types";
import Skeleton from "@/components/global/skeleton";
import CollectionCardsWrapper from "./collection-cards-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryClientProps {
	storeId: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});
const CollectionClient: React.FC<CategoryClientProps> = ({ storeId }) => {
	const router = useRouter();
	const {
		data: collections,
		isLoading,
		isFetching,
	} = useFetchData<Collection>({
		storeId,
		tableName: "collection",
		queryKey: ["collections"],
	});

	if (isFetching || isLoading) {
		return <Skeleton />;
	}

	return (
		<>
			<div className="flex gap-5 items-center justify-between">
				<Heading
					title={`Collections (${collections?.length || 0})`}
					description="Group products into collections to enhance customer shopping experience and boost sales."
				/>

				<Link
					href={`/${storeId}/collections/new`}
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
					collections?.map((collection) => ({
						...collection,
						avatar: collection.avatar || "",
						createdAt: dateFormatter.format(new Date(collection.created_at)),
					})) || []
				}
				searchKey="name"
			/>
			<CollectionCardsWrapper collections={collections} storeId={storeId} />
		</>
	);
};

export default CollectionClient;

{
	/* <p suppressHydrationWarning className="text-xs">
	
</p>; */
}

// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//    dateStyle: "medium",
// });
{
	/* <Heading
				title="DEVELOPER API"
				description="API calls for All and Single Collections"
			/>
			<Note id={storeId} />
			<Separator />
			<ApiList entityName="collection" entityId="id" apikey="myapikey" /> */
}
