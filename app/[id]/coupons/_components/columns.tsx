"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellActions";
// export type CouponsColumn = {
// 	id: string;
// 	name: string;
// 	code: string;
// 	type: "percentage" | "fixed" | "freeShipping" | "salePrice" | "buyXGetY";
// 	discountPercentage?: number;
// 	discountAmount?: number;
// 	validFrom: string;
// 	validTo: string;
// 	applyTo: "all" | "specific";
// 	productIds?: string[];
// 	created_at: string;
// };
export interface CouponsColumn {
	buyx: number | null;
	code: string | null;
	discountamount: number | null;
	discountpercentage: number | null;
	getyfree: number | null;
	id: string;
	limitonepercustomer: boolean | null;
	limittotaluses: boolean | null;
	maxuses: number | null;
	minpurchaseamount: number | null;
	name: string | null;
	product_ids: string[] | null;
	type: string | null;
	validfrom: string | null;
	validto: string | null;
	created_at: string;
}

export const columns: ColumnDef<CouponsColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "code",
		header: "Code",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "discountPercentage",
		header: "Disc(%)",
		cell: ({ row }) =>
			row.original.type === "percentage" && row.original.discountpercentage
				? `${row.original.discountpercentage}%`
				: "-",
	},
	{
		accessorKey: "discountAmount",
		header: "Disc($)",
		cell: ({ row }) =>
			(row.original.type === "fixed" || row.original.type === "salePrice") &&
			row.original.discountamount
				? `${row.original.discountamount}`
				: "-",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: () => "Active",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
