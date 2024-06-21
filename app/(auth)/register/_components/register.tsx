"use client";
import { Button } from "../../../../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { handleSocialLogin, login, signup } from "@/actions/client/actions";
import Link from "next/link";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Image from "next/image";

export default function Register() {
	const [passwordReveal, setPasswordReveal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [signingIn, setSigningIn] = useState(false);
	const [google, setGoogle] = useState(false);

	const handleSignUp = async () => {
		setSigningIn(true);
		try {
			await signup(email, password);
		} catch (error) {
			console.log(error);
			console.error("Signup error:", error);
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
				<Card className="border-none shadow-none">
					<CardHeader className="space-y-2">
						<Link href={"/store"}>
							<Image
								src={"/logo-short.svg"}
								alt="abacus logo"
								width={150}
								height={150}
								className="mx-auto"
							/>
						</Link>
						<CardTitle className="text-2xl text-center capitalize grot">
							Create an account
						</CardTitle>
						<CardDescription className="text-center">
							Enter your info below to create your account
						</CardDescription>
					</CardHeader>

					<CardContent className="grid gap-4 min-w-[400px]">
						<div className="w-full animate-in">
							<div className="grid gap-2 mb-5">
								<Label htmlFor="email" className="opacity-50 text-md">
									Email
								</Label>
								<Input
									name="email"
									placeholder="you@example.com"
									value={email}
									disabled={signingIn}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2 mb-3">
								<Label htmlFor="password" className="opacity-50 text-md">
									Password
								</Label>
								<div className="relative">
									<Input
										type={passwordReveal ? "text" : "password"}
										name="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										disabled={signingIn}
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
								<div className="grid gap-2 mb-3">
									<Label htmlFor="password" className="opacity-50 text-md">
										Confirm Password
									</Label>
									<div className=" relative">
										<Input
											type={passwordReveal ? "text" : "password"}
											name="password"
											placeholder="••••••••"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											disabled={signingIn}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() => setPasswordReveal(!passwordReveal)}
										>
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
										{password.length > 1 && password !== confirmPassword ? (
											<div className="text-red-500 text-sm">
												Passwords do not match
											</div>
										) : password.length > 1 && password === confirmPassword ? (
											<div className="text-green-500 text-sm">
												Passwords match
											</div>
										) : null}
									</div>
								</div>
							</div>

							<Button
								onClick={handleSignUp}
								disabled={
									signingIn ||
									email.length === 0 ||
									password.length === 0 ||
									confirmPassword.length === 0 ||
									password !== confirmPassword
								}
								className="inline-flex items-center justify-center w-full py-3 mb-6 text-sm font-medium transition-colors rounded-full shadow whitespace-nowrap disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-clr-800 disabled:bg-clr-8"
							>
								{signingIn ? "Signing up..." : "Sign Up"}
							</Button>

							<div className="text-center text-sm gap-2  justify-center flex items-center">
								<p className="text-sm text-center first-letter:uppercase">
									already have an account?
								</p>
								<Link className="text-clr-6" href="/login">
									Login
								</Link>
							</div>
						</div>

						{/* <Button
								onClick={handleSignIn}
								disabled={
									signingIn ||
									email.length === 0 ||
									password.length === 0 ||
									confirmPassword.length === 0 ||
									password !== confirmPassword
								}
								className="w-full px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground bg-background hover:bg-secondary/90 disabled:cursor-not-allowed"
							>
								{loggingIn ? "Logging In ..." : "Log in"}
							</Button> */}

						<div className="relative mt-5">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="px-2 bg-background text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
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
				</Card>
			</div>
		</div>
	);
}
