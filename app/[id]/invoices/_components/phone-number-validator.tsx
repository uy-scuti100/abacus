"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberValidatorProps {
	value: string | undefined;
	onChange: (value: string) => void;
	onBlur: () => void;
	name: string;
}

const PhoneNumberValidator: React.FC<PhoneNumberValidatorProps> = ({
	value,
	onChange,
	onBlur,
	name,
}) => {
	const validatePhoneNumber = (phone: string) => {
		const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
		return phoneNumberPattern.test(phone);
	};

	const handlePhoneNumberChange = (value: string) => {
		onChange(value);
	};

	return (
		<div>
			<PhoneInput
				country="US" // Default country selected
				value={value}
				onChange={handlePhoneNumberChange}
				onBlur={onBlur}
				inputProps={{ required: true, name }}
			/>
		</div>
	);
};

export default PhoneNumberValidator;
