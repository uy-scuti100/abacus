"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiArrowRightSFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const FormSchema = z
	.object({
		email: z.string().email({ message: "Invalid Email Address" }),
		password: z.string().min(6, { message: "Password is too short" }),
		"confirm-pass": z.string().min(6, { message: "Password is too short" }),
	})
	.refine(
		(data) => {
			if (data["confirm-pass"] !== data.password) {
				return false;
			} else {
				return true;
			}
		},
		{ message: "Password does't match", path: ["confirm-pass"] }
	);

export default function SignUp({ redirectTo }: { redirectTo: string }) {
	const queryString =
		typeof window !== "undefined" ? window.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	const verify = urlParams.get("verify");
	const existEmail = urlParams.get("email");

	const [passwordReveal, setPasswordReveal] = useState(false);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
			"confirm-pass": "",
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const { email, password } = data;
		const supabase = createBrowserClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		);
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			console.log(error);
			form;
		}
	};

	return (
		<div className=" whitespace-nowrap p-5 space-x-5 overflow-hidden  items-center align-top  ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn(`space-y-3 inline-block w-full `)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className=" font-semibold  test-sm">
									Email Address
								</FormLabel>
								<FormControl>
									<Input
										className="h-8"
										placeholder="example@gmail.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold">
									Password
								</FormLabel>
								<FormControl>
									<div className=" relative">
										<Input
											className="h-8"
											type={passwordReveal ? "text" : "password"}
											{...field}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() => setPasswordReveal(!passwordReveal)}
										>
											{passwordReveal ? (
												<FaRegEye className=" group-hover:scale-105 transition-all" />
											) : (
												<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
											)}
										</div>
									</div>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirm-pass"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold">
									Confirm Password
								</FormLabel>
								<FormControl>
									<div className=" relative">
										<Input
											className="h-8"
											type={passwordReveal ? "text" : "password"}
											{...field}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() => setPasswordReveal(!passwordReveal)}
										>
											{passwordReveal ? (
												<FaRegEye className=" group-hover:scale-105 transition-all" />
											) : (
												<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
											)}
										</div>
									</div>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full h-8 bg-indigo-500 hover:bg-indigo-600 transition-all text-white flex items-center gap-2"
					>
						Continue
						<RiArrowRightSFill className=" size-4" />
					</Button>
					<div className="text-center text-sm">
						<h1>
							Already have account?{" "}
							<Link
								href={redirectTo ? `/login?next=` + redirectTo : "/login"}
								className="text-blue-400"
							>
								Signin
							</Link>
						</h1>
					</div>
				</form>
			</Form>
			{/* verify email */}
			{/* <div
				className={cn(
					`w-full inline-block h-80 text-wrap align-top space-y-3  `
				)}
			>
				<div className="flex h-full items-center justify-center flex-col space-y-5">
					<SiMinutemailer className=" size-8" />

					<h1 className="text-2xl font-semibold text-center">Verify email</h1>
					<p className="text-center text-sm">
						{" A verification code has been sent to "}
						<span className="font-bold">
							{verify === "true" ? existEmail : form.getValues("email")}
						</span>
					</p>
				</div>
			</div> */}
		</div>
	);
}
