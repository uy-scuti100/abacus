"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();
	const user = useUser();
	const userId = user.data?.id;

	const onOpen = useStoreModal((state) => state.onOpen);
	const isOpen = useStoreModal((state) => state.isOpen);
	useEffect(() => {
		if (!isOpen) onOpen();
	}, [isOpen, onOpen]);

	if (!userId) {
		router.push("/login");
	}

	return null;
}
