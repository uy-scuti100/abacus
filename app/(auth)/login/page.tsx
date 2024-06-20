import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("./_components/signin"), {
	ssr: false,
});

export default function page() {
	return (
		<section className="h-screen flex justify-center items-center">
			<SignIn />
		</section>
	);
}
