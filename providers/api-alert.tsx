// global imports
"use client";
import { Copy, Database, Server } from "lucide-react";
import { toast } from "react-hot-toast";

// local imports
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
	title: string;
	description: string;
	variant: "public" | "admin";
}
const textMap: Record<ApiAlertProps["variant"], string> = {
	public: "Public",
	admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
	public: "secondary",
	admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
	title,
	description,
	variant = "public",
}) => {
	const onCopy = () => {
		navigator.clipboard.writeText(description);
		toast.success("API route copied to the clipboard. ");
	};

	return (
		<Alert className=" p-4 overflow-hidden">
			<div className="flex justify-between items-center mb-8">
				<AlertTitle className="flex items-center gap-3">
					<Database className="w-4 h-4" />
					<div className="flex items-center gap-2">
						{title}
						<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
					</div>
				</AlertTitle>
				<Button variant="outline" size="icon" onClick={onCopy}>
					<Copy className="h-4 w-4" />
				</Button>
			</div>
			<AlertDescription className="flex sm:hidden">
				<code className="rounded-md bg-clr-1 text-sm  text-ellipsis overflow-hidden p-4">
					{description.substring(0, 50)}
				</code>
			</AlertDescription>
			<AlertDescription className="sm:flex hidden">
				<code className="rounded-md bg-clr-1 text-sm  text-ellipsis overflow-hidden p-4">
					{description}
				</code>
			</AlertDescription>
		</Alert>
	);
};
