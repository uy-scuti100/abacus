"use client";
// global imports
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

// local imports
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash, X } from "lucide-react";

interface SingleImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}
	return (
		<div
			className={`flex flex-col gap-4 ${
				value ? "w-fit" : "w-auto max-w-[500px]"
			}`}
		>
			{value ? (
				<div
					key={value}
					className="relative rounded-2xl border border-clr-2 w-[200px] h-[250px] overflow-hidden"
				>
					<div className="z-10 absolute top-2 right-2">
						<Button
							type="button"
							onClick={() => onRemove(value)}
							variant="destructive"
							size="sm"
							className="rounded-full"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<Image
						src={value}
						height={250}
						width={200}
						alt={value}
						className="object-cover h-full w-full"
						sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
					/>
				</div>
			) : (
				<div className="flex items-center justify-center py-6 px-8 w-[500px] min-w-[350px] h-[200px] rounded-lg border-[10px] border-clr-3 border-dotted bg-clr-11">
					<CldUploadWidget onSuccess={onUpload} uploadPreset="yselapnu">
						{({ open }) => {
							const onClick = () => {
								open();
							};

							return (
								<Button
									type="button"
									disabled={disabled}
									variant="secondary"
									onClick={onClick}
									className="flex items-center justify-center h-full rounded-lg w-full py-6 bg-transparent hover:bg-transparent text-white"
								>
									<Plus className="h-4 w-4 mr-2" />
									Upload an image
								</Button>
							);
						}}
					</CldUploadWidget>
				</div>
			)}
		</div>
	);
};

export default SingleImageUpload;
