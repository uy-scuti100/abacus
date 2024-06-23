"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellActions";
import Image from "next/image";

export type ProductColumn = {
	id: string;
	title: string;
	price: number;
	media: string;
	inventory?: string | null;
	on_sale?: boolean;
	type: string;
	ribbon?: string | null;
	status: string;
	created_at: string;
};
export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: "title",
		header: "Name",
	},
	{
		accessorKey: "inventory",
		header: "inventory",
	},
	{
		accessorKey: "on_sale",
		header: "OnSale",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "ribbon",
		header: "Ribbon",
	},
	{
		accessorKey: "media",
		header: "Avatar",
		cell: ({ row }) => (
			<div className="border-foreground/30 border p-1 rounded-full w-[50px] h-[50px]">
				<Image
					src={row.original.media[0] as string}
					alt={row.original.title}
					width={50}
					height={50}
					className="rounded-full object-cover w-full h-full"
				/>
			</div>
		),
	},
	{
		accessorKey: "created_at",
		header: "Date",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
