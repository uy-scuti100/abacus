import React from "react";
import { useSignOut } from "@/hooks/useSignOut";

const SignOutButton = () => {
	const signOut = useSignOut();

	const handleSignOut = async () => {
		await signOut();
	};

	return <button onClick={handleSignOut}>Log Out</button>;
};

export default SignOutButton;
