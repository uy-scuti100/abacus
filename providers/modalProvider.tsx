"use client";

// gloaal imports
import { useEffect, useState } from "react";

// local imports
import { StoreModal } from "./modals/storeModal";

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<>
			<StoreModal />
		</>
	);
};
