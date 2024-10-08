"use client";
// global imports
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "./modal";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
	title: string;
	description: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
	title,
	description,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title={title}
			description={description}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="pt-6 space-x-2 flex items-center gap-5 justify-end w-full">
				<Button disabled={loading} variant="outline" onClick={onClose}>
					Cancel
				</Button>
				<Button disabled={loading} variant="destructive" onClick={onConfirm}>
					Continue
				</Button>
			</div>
		</Modal>
	);
};
