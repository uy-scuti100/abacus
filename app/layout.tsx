import "./globals.css";
import { ToastProvider } from "@/providers/toastProvider";
import { ModalProvider } from "@/providers/modalProvider";
import { Inter, Montserrat, Lato } from "next/font/google";
import QueryProvider from "@/providers/query-provider/tanstack";

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

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
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
				<QueryProvider>
					<ToastProvider />
					<ModalProvider />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
