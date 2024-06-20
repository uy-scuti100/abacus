import React from "react";
import { CiMail } from "react-icons/ci";

export default function page({ searchParams }) {
	const { email } = searchParams;
	return (
		<div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
			<div className="rounded-3xl fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
				<div className="flex flex-col items-center space-y-2 justify-centersm:text-left">
					<h2 className="pt-5 text-xl font-bold text-center">
						Verify Your Email
					</h2>
					<div className="pb-5 text-center">
						<CiMail className="w-16 h-16 mx-auto text-foreground" />
					</div>
					<div className="text-sm text-center  text-muted-foreground leading-[200%]">
						We've sent a verification link to
						<span className="text-message-color"> {email} </span>. Please check
						your inbox to confirm. If you do not receive an email, please check
						your spam folder.
						<a />.
					</div>
				</div>
			</div>
		</div>
	);
}
