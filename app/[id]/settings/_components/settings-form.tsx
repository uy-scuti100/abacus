"use client";
// global imports
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Copy, Database, Key, Loader, Trash2 } from "lucide-react";
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

import { UseOrigin } from "@/hooks/useOrigin";
import { Store } from "@/types";
import { AlertModal } from "@/providers/modals/alertModal";
import Heading from "@/providers/heading";
import { ApiAlert } from "@/providers/api-alert";
import { Badge } from "@/components/ui/badge";
import { createSupabaseBrowser } from "@/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	about: z
		.string()
		.optional()
		.refine((value) => !value || value.length >= 10, {
			message: "Description must be at least 10 characters long if provided",
		}),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
	initialData: Store;
	apiKey: string | null;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
	initialData,
	apiKey,
}) => {
	const params = useParams();
	const router = useRouter();
	const origin = UseOrigin();

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData.name,
			about: initialData.about || "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);

			const supabase = createSupabaseBrowser();
			if (!params.id) {
				toast.error("Invalid store ID");
				setIsLoading(false);
				return;
			}

			const updatedStoreData = {
				name: values.name,
				about: values.about,
			};

			const { data: store, error } = await supabase
				.from("stores")
				.update(updatedStoreData)
				.eq("id", params.id)
				.select();

			if (error) {
				toast.error("Failed to update Store");
				router.refresh();
				return;
			}

			if (store) {
				toast.success("Store Updated");
				setIsRefreshing(true);
				router.refresh();
				router.push(`/${params.id}`);
			} else {
				toast.error("Failed to update Store");
				console.error("Error updating the store:", error);
				router.refresh();
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
				.from("stores")
				.delete()
				.eq("id", params.id)
				.select();
			if (!error) {
				toast.success("Store deleted!");
				setIsRefreshing(true);
				router.push("/store");
			} else {
				toast.error("Failed to upodate Post");
				console.error("Error updating Post:", error);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};
	const onCopy = () => {
		if (apiKey) {
			navigator.clipboard.writeText(apiKey);
			toast.success("API key copied.");
		}
	};
	return (
		<>
			{isRefreshing && (
				<div className="fixed inset-0 bg-black/50 z-[500] flex justify-center items-center text-white">
					<Loader className="animate-spin duration-1000 " size={50} />
				</div>
			)}
			<AlertModal
				title="You will lose all the data related to this store "
				description="This is a destructive action that cannot be undone"
				isOpen={isOpen}
				onClose={() => setIsOpen((prev) => !prev)}
				onConfirm={onDelete}
				loading={isLoading}
			/>
			<div className="flex items-center justify-between ">
				<Heading
					title="Settings and Preferences"
					description="Manage your store information"
				/>
				<Button
					disabled={isLoading}
					variant="destructive"
					size="icon"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="mb-8">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										placeholder="Acme Shoe Store"
										{...field}
										className="max-w-[500px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="about"
						render={({ field }) => (
							<FormItem className="mb-6">
								<FormLabel className="flex items-center gap-2">
									Description <Badge variant={"custom"}>Optional</Badge>
								</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										placeholder="Short information about your store"
										{...field}
										className="max-w-[500px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-col sm:flex-row gap-5 py-4 rounded-lg justify-start ">
						<Button disabled={isLoading} type="submit">
							Save changes
						</Button>
					</div>
				</form>
			</Form>
			<Separator />

			<Alert className=" p-4">
				<div className="flex justify-between items-center mb-8">
					<AlertTitle className="flex items-center gap-3">
						<Key className="w-4 h-4" />
						<div className="flex items-center gap-2">
							<Badge variant={"custom"} className="text-base">
								My API-Key
							</Badge>
						</div>
					</AlertTitle>
					<Button variant="outline" size="icon" onClick={onCopy}>
						<Copy className="h-4 w-4" />
					</Button>
				</div>
				<AlertDescription className="flex">
					<code className="rounded-md bg-clr-1 text-sm  text-ellipsis overflow-hidden p-4">
						{apiKey?.substring(0, 50)}
					</code>
				</AlertDescription>
			</Alert>

			{/* <Separator /> */}
			{/* <ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/${params.id}`}
				variant="public"
			/> */}
		</>
	);
};

// the states above{ open and loading states } are to be used to trigger a confirmation of command which might be for deleting or updating a store, product, categories or whatever... somethings that says.... are sure you want to delete this store? we could have made it look like create store modal as well which will be available globally but the reason we aren't doing this is because the create store makes calls to a single api route which our store-modal solely for creation of store as in { prismadb.store.create({ values})}... but this states are for  alert models that will be used for diffeent crud operations like delete, update and other functionalities to come.....
