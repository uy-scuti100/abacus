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
import { Category, Collection } from "@/types";
import Skeleton from "@/components/global/skeleton";
import Note from "@/components/global/note";
import CollectionCardsWrapper from "./collection-cards-wrapper";

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
			<div className="flex items-center justify-between">
				<Heading
					title={`Collections (${collections?.length || 0})`}
					description="Group products into collections to enhance customer shopping experience and boost sales."
				/>

				<Button onClick={() => router.push(`/${storeId}/collections/new`)}>
					<Plus className="sm:mr-2 h-4 w-4" />
					<span className="hidden sm:block">New</span>
				</Button>
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
			<Heading
				title="DEVELOPER API"
				description="API calls for All and Single Collections"
			/>
			<Note id={storeId} />
			<Separator />
			<ApiList entityName="collection" entityId="id" apikey="myapikey" />
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
