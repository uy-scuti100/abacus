import Benefits from "./_components/benefits";
import Header from "./_components/header";
import HeroImage from "./_components/hero-image";
import HeroSection from "./_components/hero-section";
import SocialProof from "./_components/social-proof";

export default function page() {
	return (
		<section>
			<Header />
			<div className="container px-4 md:px-[2rem]">
				<HeroSection />
				<HeroImage />
				<SocialProof />
				<Benefits />
			</div>
		</section>
	);
}

// <div className="flex justify-center items-center h-screen text-6xl flex-col capitalize gap-10">
// 			<h1>landing page</h1>
// 			<Link
// 				className={cn(buttonVariants({ variant: "default" }))}
// 				href={"/login"}
// 			>
// 				login
// 			</Link>
// 			<Link
// 				className={cn(buttonVariants({ variant: "default" }))}
// 				href={"/store"}
// 			>
// 				store
// 			</Link>
