import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useState } from "react";

interface TagsInputProps {
	tags: string[] | null | undefined;
	setTags: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
	const [inputValue, setInputValue] = useState<string>("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === ",") {
			event.preventDefault();
			if (inputValue.trim()) {
				setTags([...(tags || []), inputValue.trim()]);
				setInputValue("");
			}
		} else if (event.key === "Backspace" && !inputValue) {
			setTags((tags || []).slice(0, -1));
		}
	};

	const handleRemoveTag = (index: number) => {
		setTags((tags || []).filter((_, i) => i !== index));
	};

	return (
		<ScrollArea>
			<div className="tags-input-container">
				{tags?.map((tag, index) => (
					<div className="tag" key={index}>
						{tag}
						<button type="button" onClick={() => handleRemoveTag(index)}>
							×
						</button>
					</div>
				))}
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					placeholder="Separate with comma ( , ) or enter key ( ↵ )."
					className=""
				/>
			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default TagsInput;
