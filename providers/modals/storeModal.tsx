"use client";
// global imports
import { useState } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSupabaseBrowser } from "@/supabase/client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

//local imports
import { useStoreModal } from "@/hooks/useStoreModal";
import useUser from "@/hooks/useUser";
import { Modal } from "./modal";

const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	about: z
		.string()
		.optional()
		.refine((value) => !value || value.length >= 10, {
			message: "Description must be at least 10 characters long if provided",
		}),
});
// const formSchema = z.object({
// 	name: z.string().min(1, { message: " Store name is required" }),
// 	about: z
// 		.union([
// 			z.string().length(0),
// 			z.string().min(10, {
// 				message: "About must be at least 10 characters long if provided",
// 			}),
// 		])
// 		.optional(),
// });

export const StoreModal = () => {
	const router = useRouter();
	const storeModal = useStoreModal();
	const user = useUser();
	const userId = user.data?.id;
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			about: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);

			const supabase = createSupabaseBrowser();
			const { data: store, error } = await supabase
				.from("stores")
				.insert([
					{
						name: values.name,
						about: values.about,
						vendor_id: userId!,
					},
				])
				.select();

			if (error) {
				toast.error("Failed to create Store");
				router.refresh();
				return;
			}

			if (store && store.length > 0) {
				const newStoreId = store[0].id;
				toast.success("Store Created");
				window.location.assign(`/${newStoreId}`);
			} else {
				toast.error("Failed to create Store");
				router.refresh();
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Modal
			title="Create Your store"
			description="Add a new store to manage your products"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col w-full"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Acme Shoe Store"
											{...field}
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
											disabled={loading}
											placeholder="Short information about your store"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col sm:flex-row gap-5 py-4 rounded-lg justify-end ">
							<Button disabled={loading} type="submit">
								Continue
							</Button>
							<Button
								disabled={loading}
								variant="outline"
								onClick={storeModal.onClose}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};
