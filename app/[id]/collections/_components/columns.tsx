"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellActions";
import Image from "next/image";

export type CollectionColumn = {
	id: string;
	name: string;
	avatar: string;
	createdAt: string;
};

export const columns: ColumnDef<CollectionColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "avatar",
		header: "Avatar",
		cell: ({ row }) => (
			<div className="border-foreground/30 border p-1 rounded-full w-[50px] h-[50px]">
				<Image
					src={row.original.avatar as string}
					alt={row.original.name}
					width={50}
					height={50}
					className="rounded-full object-cover w-full h-full"
				/>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
