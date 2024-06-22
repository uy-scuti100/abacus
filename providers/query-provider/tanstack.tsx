"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client

export default function QueryProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		new QueryClient({
			// defaultOptions: {
			// 	queries: {
			// 		refetchOnWindowFocus: false,
			// 	},
			// },
		})
	);
	return (
		//
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
