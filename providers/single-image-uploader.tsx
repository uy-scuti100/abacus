// "use client";
// // global imports
// import { CldUploadWidget } from "next-cloudinary";
// import { useEffect, useState } from "react";

// // local imports
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ImagePlus, Plus, Trash } from "lucide-react";

// interface SingleImageUploadProps {
// 	disabled?: boolean;
// 	onChange: (value: string) => void;
// 	onRemove: (value: string) => void;
// 	value: string[];
// }

// const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
// 	disabled,
// 	onChange,
// 	onRemove,
// 	value,
// }) => {
// 	const [isMounted, setIsMounted] = useState(false);

// 	useEffect(() => {
// 		setIsMounted(true);
// 	}, []);

// 	const onUpload = (result: any) => {
// 		onChange(result.info.secure_url);
// 	};

// 	if (!isMounted) {
// 		return null;
// 	}
// 	return (
// 		<div>
// 			<div className="my-4 flex items-center gap-4">
// 				{value ? (
// 					<div className="relative rounded-md overflow-hidden border border-clr-3 border-dashed ">
// 						<div className="z-10 absolute top-2 right-2">
// 							<Button
// 								type="button"
// 								onClick={onRemove}
// 								variant="destructive"
// 								size="sm"
// 							>
// 								<Trash className="h-4 w-4" />
// 							</Button>
// 						</div>
// 						<Image
// 							height={200}
// 							width={200}
// 							className="object-cover w-[80px] sm:w-[150px] md:w-[200px]"
// 							alt="Image"
// 							src={value}
// 						/>
// 					</div>
// 				) : (
// 					<div className="flex items-center justify-center py-6 px-8 w-[500px] min-w-[350px]  h-[200px] rounded-md border border-clr-3 border-dotted bg-clr-2">
// 						<CldUploadWidget onSuccess={onUpload} uploadPreset="yselapnu">
// 							{({ open }) => {
// 								const onClick = () => {
// 									open();
// 								};

// 								return (
// 									<Button
// 										type="button"
// 										disabled={disabled}
// 										variant="secondary"
// 										onClick={onClick}
// 										className="flex items-center justify-center h-full w-full py-6 px-8 bg-clr-2 hover:bg-clr-2 "
// 									>
// 										<Plus className="h-4 w-4 mr-2" />
// 										Upload an image
// 									</Button>
// 								);
// 							}}
// 						</CldUploadWidget>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default SingleImageUpload;
