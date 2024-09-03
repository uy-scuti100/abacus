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
	apply_to?: "all" | "specific" | null;
	sale_price: number | null;
	has_end_date: boolean | null;
	buy_x?: number | null;
	code?: string | null;
	discount_amount?: number | null;
	discount_percentage?: number | null;
	get_y_free?: number | null;
	id?: string;
	limit_one_per_customer?: boolean | null;
	limit_total_uses?: boolean | null;
	max_uses?: number | null;
	name?: string | null;
	product_ids?: string[] | null;
	type?:
		| "percentage"
		| "fixed"
		| "free_shipping"
		| "sale_price"
		| "buy_x_get_y"
		| null;
	valid_from?: string | null;
	valid_to?: string | null;

	store_id?: string | null;
	created_at?: string;
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
			row.original.type === "percentage" && row.original.discount_percentage
				? `${row.original.discount_percentage}%`
				: "-",
	},
	{
		accessorKey: "discountAmount",
		header: "Disc($)",
		cell: ({ row }) =>
			(row.original.type === "fixed" || row.original.type === "sale_price") &&
			row.original.discount_amount
				? `${row.original.discount_amount}`
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
