"use client";
import { useState, useEffect } from "react";

export const UseOrigin = () => {
	const [isMounted, setIsMounted] = useState(false);
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return "";
	}

	return origin;
};
