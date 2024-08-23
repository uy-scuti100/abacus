"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellActions";
export type CustomersColumn = {
	address: string | null;
	created_at: string;
	email: string;
	first_name: string | null;
	id: string;
	last_name: string | null;
	phone_numer: string | null;
	role: string | null;
	store_id: string | null;
	subscribed: boolean;
	tags: string[] | null;
	vendor_id: string | null;
};

export const columns: ColumnDef<CustomersColumn>[] = [
	{
		accessorKey: "first_name",
		header: "FirstName",
	},
	{
		accessorKey: "last_name",
		header: "LastName",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone_numer",
		header: "Phone",
	},
	{
		accessorKey: "subscribed",
		header: "Sub'd",
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
