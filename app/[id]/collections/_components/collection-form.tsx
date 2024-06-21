"use client";
// global imports
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

// local imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/providers/heading";
import { AlertModal } from "@/providers/modals/alertModal";
import { Category } from "@/types";

import { createSupabaseBrowser } from "@/supabase/client";
import useUser from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import SingleImageUpload from "@/providers/single-image-uploader";

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name is required and must be at least 2 characters" }),
	avatar: z.string().min(1, { message: "Image is required" }),
	description: z
		.string()
		.optional()
		.refine((value) => !value || value.length >= 10, {
			message: "Description must be at least 10 characters long if provided",
		}),
});

type CollectionFormValues = z.infer<typeof formSchema>;

interface CollectionFormProps {
	initialData: Category | null;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({
	initialData,
}) => {
	// console.log(initialData);
	const params = useParams();
	const router = useRouter();
	const user = useUser();
	const userId = user.data?.id;

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const title = initialData ? "Edit Collection" : "Create Collection";
	const description = initialData
		? "Edit a Collection."
		: "Add a new collection";
	const action = initialData ? "Save changes" : "Create Collection";

	const form = useForm<CollectionFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					name: initialData.name,
					avatar: initialData.avatar || "",
					description: initialData.description || "",
			  }
			: {
					name: "",
					avatar: "",
					description: "",
			  },
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			if (initialData) {
				const supabase = createSupabaseBrowser();
				const updatedCollectionData = {
					name: values.name.toLowerCase(),
					avatar: values.avatar,
					description: values.description,
				};

				const { data: collection, error } = await supabase
					.from("collection")
					.update(updatedCollectionData)
					.eq("id", initialData.id)

					.select();

				if (error) {
					toast.error("Failed to updated Category");
					router.refresh();
					return;
				}

				if (collection) {
					toast.success("Collection Updated");
					router.push(`/${params.id}/collections`);
				} else {
					toast.error("Failed to update Collection");
					router.refresh();
				}
			} else {
				const supabase = createSupabaseBrowser();
				const { data: collection, error } = await supabase
					.from("collection")
					.insert([
						{
							name: values.name,
							avatar: values.avatar,
							description: values.description,
							vendor_id: userId,
							store_id: params.id as string,
						},
					])
					.select();

				if (error) {
					toast.error("Failed to create Collection");
					router.refresh();
					return;
				}

				if (collection) {
					toast.success("Collection Created");
					router.push(`/${params.id}/collections`);
				} else {
					toast.error("Failed to create Collection");
					router.refresh();
				}
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			// setIsRefreshing(true);
			const supabase = createSupabaseBrowser();
			const { error } = await supabase
				.from("collection")
				.delete()
				.eq("id", params.categoryId)
				.select();
			if (!error) {
				toast.success("Collection deleted!");
				setIsRefreshing(true);
				router.refresh();
			} else {
				toast.error("Failed to delete Collection");
				console.error("Error updating Post:", error);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};
	return (
		<div className="h-full">
			{isRefreshing && (
				<div className="fixed inset-0 bg-black/50 z-[500] flex justify-center items-center text-white">
					<Loader className="animate-spin duration-1000 " size={50} />
				</div>
			)}
			<AlertModal
				title="Are you sure you wannt to delete this collection"
				description="this action cannot be undone"
				isOpen={isOpen}
				onClose={() => setIsOpen((prev) => !prev)}
				onConfirm={onDelete}
				loading={isLoading}
			/>
			<div className="flex items-center justify-between ">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={isLoading}
						variant="destructive"
						size="icon"
						onClick={() => setIsOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-auto"
				>
					<FormField
						control={form.control}
						name="avatar"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormControl>
									<SingleImageUpload
										value={field.value}
										disabled={isLoading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange("")}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Collection Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Collection name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="mb-6">
									<FormLabel className="flex items-center gap-2">
										Description <Badge variant={"custom"}>Optional</Badge>
									</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Short information about your collection"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={isLoading} className="sm:mr-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</div>
	);
};

// the states above{ open and loading states } are to be used to trigger a confirmation of command which might be for deleting or updating a store, product, categories or whatever... somethings that says.... are sure you want to delete this store? we could have made it look like create store modal as well which will be available globally but the reason we aren't doing this is because the create store makes calls to a single api route which our store-modal solely for creation of store as in { prismadb.store.create({ values})}... but this states are for  alert models that will be used for diffeent crud operations like delete, update and other functionalities to come.....
