"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// local imports
import { useStoreModal } from "@/hooks/useStoreModal";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, PlusCircle } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import StoreIcon from "../public/store.svg";
import Chevron from "../public/chevron.svg";
import { Store } from "@/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
	setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}

export default function StoreSwitcher({
	className,
	items = [],
	setIsRefreshing,
}: StoreSwitcherProps) {
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();

	const formattedItems = Array.isArray(items)
		? items.map((item) => ({
				label: item.name,
				value: item.id,
				id: item.id,
		  }))
		: [];

	const [isOpen, setIsOpen] = useState(false);
	// here we want to know which store to show as the current store so we re comparing the first store by iterating over all the stores available and comparing it with the id from the params we get from the page that ware currently on.. that is ( in our url..)

	const currentStore = formattedItems.find((item) => item.value === params.id);

	//down here is the trigger function that we use to select a particular store
	const onStoreSelect = (store: {
		value: string;
		label: string;
		id: string;
	}) => {
		if (store.id === params.id) {
			return;
		} else {
			setIsRefreshing(true);
			setIsOpen(false);
			router.push(`/${store.id}`);
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={isOpen}
					aria-label="Select a store"
					className={cn("w-full justify-between", className)}
				>
					<Image
						src={StoreIcon}
						alt="store-icon"
						width={22}
						height={22}
						className="mr-2"
					/>
					<span>{currentStore?.label}</span>
					<Image
						src={Chevron}
						alt="chevron-icon"
						width={16}
						height={16}
						className="ml-auto shrink-0 opacity-50"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search store..." />
						<CommandEmpty>No store found</CommandEmpty>
						<CommandGroup heading="Stores">
							{formattedItems.map((item) => (
								<CommandItem
									key={item.value}
									onSelect={() => onStoreSelect(item)}
									className="text-sm"
									onClick={() => {}}
								>
									<Image
										src={StoreIcon}
										alt="store-icon"
										width={16}
										height={16}
										className="mr-2"
									/>
									{item.label}

									<Check
										className={cn(
											"ml-auto h-4 w-4",
											currentStore?.value === item.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setIsOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className="mr-2 h-5 w-5" />
								Add new store..
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
