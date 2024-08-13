import Image from "next/image";

export default function HeroImage() {
	return (
		<div className="mt-10 border-[5px] border-primary-500 rounded-2xl overflow-hidden md:w-[80%] mx-auto shadow-xl">
			<Image
				src="/hero-image.png"
				width={1920}
				height={1080}
				alt="hero"
				className="object-cover rounded-lg w-full h-full "
			/>
		</div>
	);
}
