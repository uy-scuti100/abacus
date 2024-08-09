import "./globals.css";
import { ToastProvider } from "@/providers/toastProvider";
import { ModalProvider } from "@/providers/modalProvider";
import { Montserrat } from "next/font/google";
import QueryProvider from "@/providers/query-provider/tanstack";
import TopLoader from "@/components/global/top-loader";

// const inter = Inter({
// 	subsets: ["latin"],
// 	display: "swap",
// 	variable: "--font-inter",
// });
// ${inter.variable}
const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
});

const defaultUrl = process.env.NEXT_PUBLIC_DOMAIN
	? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Abacus",
	description: "Simple E-commerce Dashboard with Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${montserrat.variable} antialiased`}
			suppressHydrationWarning
		>
			<body>
				<TopLoader />
				<QueryProvider>
					<ToastProvider />
					<ModalProvider />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
