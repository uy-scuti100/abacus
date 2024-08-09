//@ts-ignore
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
	return (
		<>
			<NextTopLoader
				color="#0b62ef"
				initialPosition={0.15}
				crawlSpeed={200}
				height={5}
				crawl={true}
				showSpinner={false}
				easing="ease"
				speed={200}
				shadow="0 0 10px #0b62ef,0 0 5px #0b62ef"
			/>
		</>
	);
}
