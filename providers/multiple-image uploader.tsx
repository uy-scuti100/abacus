"use client";

import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string[]) => void;
	onRemove: (value: string) => void;
}

const MultipleImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
}) => {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		onChange(images);
	}, [images, onChange]);

	const handleUploadSuccess = (result: any) => {
		setImages((prevImages) => [...prevImages, result?.info?.secure_url]);
	};

	// const handleImageRemove = (url: string) => {
	// 	const newImages = images.filter((imageUrl) => imageUrl !== url);
	// 	setImages(newImages);
	// 	onRemove(url);
	// };
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<div className="flex flex-col gap-4">
			{/* Image previews */}
			<div className="grid w-full h-full grid-cols-2 pb-6 gap-y-12 gap-x-3 md:grid-cols-3">
				{images.map((url) => (
					<div
						key={url}
						className="relative rounded-2xl border border-clr-2 w-full h-[250px] group overflow-hidden"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="sm"
							>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image
							src={url}
							fill
							alt={url}
							onLoad={() => setImageLoading(false)}
							className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover"
							sizes="(max-width: 480px) 100vw,
                                        (max-width: 768px) 75vw,
                                        (max-width: 1060px) 50vw,
                                        33vw"
						/>
					</div>
				))}
			</div>

			{/* Upload button */}
			<div className="flex items-center justify-center py-6 px-8 w-[500px] min-w-[350px] h-[200px] rounded-md border border-clr-3 border-dotted bg-clr-2">
				<CldUploadWidget
					onSuccess={handleUploadSuccess}
					uploadPreset="yselapnu"
				>
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
								className="flex items-center justify-center h-full w-full py-6 px-8 bg-clr-2 hover:bg-clr-2"
							>
								<Plus className="h-4 w-4 mr-2" />
								Upload an image
							</Button>
						);
					}}
				</CldUploadWidget>
			</div>
		</div>
	);
};

export default MultipleImageUpload;
