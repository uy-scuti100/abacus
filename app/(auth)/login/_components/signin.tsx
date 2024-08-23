"use client";
import React, { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { handleSocialLogin, login } from "@/actions/client/actions";
import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
	const [passwordReveal, setPasswordReveal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loggingIn, setLoggingIn] = useState(false);
	const [google, setGoogle] = useState(false);
	const searchParams = useSearchParams();

	const handleSignIn = async () => {
		setLoggingIn(true);
		try {
			await login(email, password);
		} catch (error) {
			console.error("Signin error:", error);
		} finally {
			setEmail("");
			setPassword("");
		}
	};

	const handleSocialLoginClick = async (provider: Provider) => {
		setGoogle(true);
		try {
			await handleSocialLogin(provider);
		} catch (error) {
			console.error("Social login error:", error);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="grid justify-center w-full sm:w-[26rem] sm:p-5">
				<div className="text-center space-y-8">
					<Link href={"/store"}>
						<Image
							src={"/logo-short.svg"}
							alt="abacus logo"
							width={150}
							height={150}
							className="mx-auto"
						/>
					</Link>

					<p className="text-sm pb-5">
						Welcome back! Please sign in to continue
					</p>
				</div>

				{/* <div className="flex items-center gap-5">
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800"></div>
					<div className="text-sm">or</div>
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800"></div>
				</div> */}
				<Card className="border-none shadow-none">
					<CardHeader className="space-y-2">
						<CardContent className="grid gap-4 min-w-[400px]">
							{/* <div className="w-full animate-in"> */}
							{/* <div className="grid gap-2 mb-5">
									<Label htmlFor="email" className="opacity-50 text-md">
										Email
									</Label>
									<Input
										name="email"
										placeholder="you@example.com"
										value={email}
										disabled={loggingIn}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="grid gap-2 mb-3">
									<Label htmlFor="password" className="opacity-50 text-md">
										Password
									</Label>
									<div className="relative mb-5">
										<Input
											type={passwordReveal ? "text" : "password"}
											name="password"
											placeholder="••••••••"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											disabled={loggingIn}
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
									<Button
										type="submit"
										className="inline-flex items-center justify-center w-full py-3 mb-6 text-sm font-medium transition-colors rounded-full shadow whitespace-nowrap disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-clr-800 disabled:bg-clr-8"
										onClick={handleSignIn}
										disabled={
											loggingIn || email.length === 0 || password.length === 0
										}
									>
										<AiOutlineLoading3Quarters
											className="block animate-spin"
											style={{ display: loggingIn ? "block" : "none" }}
										/>
										{loggingIn ? (
											<span>Logging in...</span>
										) : (
											<span>Log in</span>
										)}
									</Button>
								</div>

								{searchParams?.get("message") && (
									<p className="my-4 p-4 bg-foreground/10 text-destructive text-center">
										{searchParams.get("message")}
									</p>
								)} */}
							{/* <div className="text-center text-sm gap-2  justify-center flex items-center">
									<p className="text-sm text-center first-letter:uppercase">
										dont have an account?
									</p>
									<Link className="text-clr-6" href="/register">
										register
									</Link>
								</div> */}
							{/* </div> */}

							{/* <div className="relative mt-5">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="px-2 bg-background text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div> */}
							<div className="grid grid-cols-1">
								<Button
									variant="outline"
									onClick={() => handleSocialLoginClick("google")}
									disabled={google}
									className="flex items-center justify-center disabled:cursor-not-allowed"
								>
									{google && <FiLoader className="mr-2 animate-spin" />}
									<FcGoogle className="w-4 h-4 mr-2" />
									Google
								</Button>
							</div>
						</CardContent>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
