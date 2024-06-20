import React from "react";

const Skeleton = () => {
	return (
		<div className="">
			<div className="flex md:flex-row items-start justify-between mb-4 gap-4">
				<div className="flex flex-col gap-3">
					<div className="w-52 h-4 bg-clr-1 animate-pulse rounded-md"></div>
					<div className="w-52 h-2 bg-clr-1 animate-pulse rounded-md"></div>
				</div>
				<div className="w-24 h-9 bg-clr-1 animate-pulse rounded-3xl"></div>
			</div>
			<div className="w-full h-px bg-clr-1 animate-pulse mb-4"></div>
			<div className="flex items-center py-4">
				<div className="w-full sm:w-1/3 h-8 bg-clr-1 animate-pulse rounded-md"></div>
			</div>
			<div className="rounded-md border bg-clr-1 animate-pulse mb-3">
				<div className="w-full h-12 bg-clr-2 animate-pulse"></div>
				<div className="space-y-4 p-4">
					{Array(5)
						.fill("")
						.map((_, index) => (
							<div
								key={index}
								className="flex space-x-4 justify-between w-full items-center"
							>
								<div className="w-2/6 h-8 bg-clr-2 animate-pulse rounded-md"></div>
								<div className="w-8 h-8 bg-clr-2 animate-pulse rounded-full"></div>
								<div className="w-1/6 h-8 bg-clr-2 animate-pulse rounded-md"></div>
								<div className="flex w-auto items-center gap-px">
									<span className="w-2 h-2 bg-clr-2 animate-pulse rounded-full"></span>
									<span className="w-2 h-2 bg-clr-2 animate-pulse rounded-full"></span>
									<span className="w-2 h-2 bg-clr-2 animate-pulse rounded-full"></span>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className="flex justify-end gap-6 mb-3">
				<div className="w-24 h-9 bg-clr-1 animate-pulse rounded-3xl"></div>
				<div className="w-24 h-9 bg-clr-1 animate-pulse rounded-3xl"></div>
			</div>

			<div className="mt-10 mb-20">
				<div className="grid w-full h-full grid-cols-2 pb-6 gap-y-12 gap-x-3 md:grid-cols-3">
					{Array(4)
						.fill("")
						.map((_, index) => (
							<div
								key={index}
								className="animate-pulse relative rounded-2xl border border-clr-2 w-full h-[250px] group overflow-hidden bg-clr-1"
							>
								<div className="h-full w-full" />
							</div>
						))}
				</div>
			</div>

			{/* API */}
			<div className="mt-12">
				<div className="w-24 h-9 bg-clr-1 animate-pulse rounded-3xl mb-1"></div>
				<div className="w-52 h-2 bg-clr-1 animate-pulse rounded-md mb-2"></div>
				<div className="w-full h-px bg-clr-1 animate-pulse mb-4"></div>

				<div className="space-y-4">
					{Array(5)
						.fill("")
						.map((_, index) => (
							<div
								key={index}
								className="p-4 border rounded-md bg-clr-1 animate-pulse"
							>
								<div className="flex justify-between items-center gap-2 mb-4">
									<div className="flex gap-2 items-center">
										<div className="w-4 h-4 bg-clr-2 rounded-full"></div>
										<div className="w-24 h-6 bg-clr-2 rounded-md"></div>
										<div className="w-16 h-6 bg-clr-2 rounded-md"></div>
									</div>
									<div className="w-8 h-8 bg-clr-2 rounded-md"></div>
								</div>
								<div className="flex items-center justify-between">
									<div className="w-full h-6 bg-clr-2 rounded-md"></div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Skeleton;
