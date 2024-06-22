"use client";
// global imports
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import useUser from "@/hooks/useUser";
import { Modal } from "./modal";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
const modules = {
	toolbar: [
		[
			{ header: "1" },
			{ header: "2" },
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
			"blockquote",
			"strike",
			"underline",
			"italic",
			"bold",
		],
	],
};

const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
];
const formSchema = z.object({
	title: z.string({ message: "Title is required" }),
	description: z.string({ message: "Descripton is required" }),
});

interface ProductModalProps {
	addDataToSection: (title: string, description: string) => void;
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	currentData: { title: string; description: string };
}

type ProductFormValues = z.infer<typeof formSchema>;

export const ProductModal: React.FC<ProductModalProps> = ({
	openModal,
	setOpenModal,
	addDataToSection,
	currentData,
}) => {
	const router = useRouter();
	const user = useUser();
	const userId = user.data?.id;
	const [loading, setLoading] = useState(false);

	const placeholder =
		"30-Day Return Policy:\n\n•Customers can return items within 30 days of purchase for a full refund or exchange.\n\n•Items must be in original condition with all tags attached.\n\n•Proof of purchase is required.";

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});
	useEffect(() => {
		form.reset({
			title: currentData.title,
			description: currentData.description,
		});
	}, [currentData, form]);

	const onSubmit = (data: ProductFormValues) => {
		if (data.description === "" || data.title === "") {
			toast.error("Name and description is required!");
			return;
		}
		addDataToSection(data.title, data.description);
		toast.success("Additional Info Added!");
		setOpenModal(false);
		form.reset();
	};

	return (
		<Modal
			title="ADDITIONAL INFO SECTIONS"
			description="Share information like return policy or care instructions with your customers."
			isOpen={openModal}
			onClose={() => setOpenModal(false)}
		>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col w-full"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="e.g, Return policy "
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
									<FormLabel>Description</FormLabel>
									<FormControl>
										<>
											<ReactQuill
												modules={modules}
												formats={formats}
												theme="snow"
												style={{
													height: 200,
													borderRadius: "2px solid red",
													marginBottom: "40px",
												}}
												{...field}
												placeholder={placeholder}
												defaultValue=""
											/>
										</>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col sm:flex-row gap-5 py-4 rounded-lg justify-end ">
							<Button disabled={loading} type="submit">
								Add Info
							</Button>
							<Button
								disabled={loading}
								variant="outline"
								onClick={() => setOpenModal(false)}
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
