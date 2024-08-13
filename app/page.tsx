import HowItWorks from "./_components/how-it-works";
import Benefits from "./_components/benefits";
import Header from "./_components/header";
import HeroImage from "./_components/hero-image";
import HeroSection from "./_components/hero-section";
import SocialProof from "./_components/social-proof";
import Testimonials from "./_components/testimonials";
import Faq from "./_components/faq";
import Footer from "./_components/footer";

export default function page() {
	return (
		<section>
			<Header />
			<div className="container px-4 md:px-[2rem]">
				<HeroSection />
				<HeroImage />
				<SocialProof />
				<Benefits />
				<HowItWorks />
				<Testimonials />
				<Faq />
				<Footer />
			</div>
		</section>
	);
}
