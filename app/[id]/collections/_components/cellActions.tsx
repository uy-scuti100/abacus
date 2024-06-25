"use client";

// global imports
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Copy, Edit, Loader, MoreHorizontal, Trash } from "lucide-react";

// local imports
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CollectionColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertModal } from "@/providers/modals/alertModal";
import { createSupabaseBrowser } from "@/supabase/client";

interface CellActionProps {
	data: CollectionColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const onDelete = async () => {
		try {
			setIsLoading(true);
			// setIsRefreshing(true);
			const supabase = createSupabaseBrowser();
			const { error } = await supabase
				.from("collection")
				.delete()
				.eq("id", data.id)
				.select();
			if (!error) {
				toast.success("Collection deleted!");
				setIsRefreshing(true);
				router.refresh();
			} else {
				toast.error("Failed to delete Collection");
				console.error("ailed to delete Collection:", error);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success("Collection id copied to the clipboard");
	};
	return (
		<>
			{isRefreshing && (
				<div className="fixed inset-0 bg-black/50 z-[500] flex justify-center items-center text-white">
					<Loader className="animate-spin duration-1000 " size={50} />
				</div>
			)}
			<AlertModal
				title="Are you sure you wannt to delete this collection"
				description="this action cannot be undone"
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={onDelete}
				loading={isLoading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" /> Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => router.push(`/${params?.id}/collections/${data.id}`)}
					>
						<Edit className="mr-2 h-4 w-4" /> Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpen(true)}>
						<Trash className="mr-2 h-4 w-4" /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
