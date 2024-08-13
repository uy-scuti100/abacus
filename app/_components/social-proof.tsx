import Image from "next/image";

export default function Carousel() {
	const images = [
		"/nike.png",
		"/samsung.png",
		"/tech-crunch.png",
		"/nike.png",
		"/samsung.png",
		"/tech-crunch.png",
		"/nike.png",
		"/samsung.png",
		"/tech-crunch.png",
	];
	return (
		<div className="pt-10 flex flex-wrap items-center justify-center paddy">
			<h3 className="text-center md:text-left font-semibold  md:text-xl md:leading-[32px] leading-[24px] mb-10 md:mb-0 ">
				Trusted by 198<sup>+</sup> Businesses
			</h3>
			<div className="mx-auto overflow-hidden select-none marquee relative">
				<div className="flex overflow-hidden scroll-smooth whitespace-nowrap">
					<div className="flex items-center justify-center md:justify-start gap-8  logo_carousel">
						{images.map((image) => (
							<Image
								key={image}
								src={image}
								alt="image"
								width={150}
								height={60}
								className="object-contain w-[150px] h-[60px] md:w-[180px] md:h-[72px] md:ml-10 opacity-50 grayscale"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
