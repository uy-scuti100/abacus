"use client";
import { useEffect, useState } from "react";

export default function Customercare() {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return (
		<svg
			className="w-[60px] h-[60px]"
			viewBox="0 0 120 120"
			id="Layer_1"
			version="1.1"
			xmlSpace="preserve"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			fill="#000000"
		>
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				{" "}
				<style>
					{
						".st0{fill:#FFAC5A} .st1{fill:#3A485E} .st2{fill:#FF9FB4} .st3{fill:#FFD551} .st4{fill:#EDBF9A} .st5{fill:#FFD9B6} .st6{fill:#FF778E}"
					}
				</style>{" "}
				<g>
					{" "}
					<path
						className="st0"
						d="M80.8,62.9H39.2c-1.7,0-3-1.4-2.8-3.1l2-20.8C38.3,25.8,48,15,60,15l0,0c12,0,21.7,10.8,21.7,24l2,20.8 C83.8,61.5,82.4,62.9,80.8,62.9z"
					></path>{" "}
					<g>
						{" "}
						<path
							className="st1"
							d="M80.5,38h-3v10h3c1.7,0,3.1-1.1,3.1-2.6v-4.9C83.6,39.2,82.3,38,80.5,38z"
						></path>{" "}
						<path
							className="st1"
							d="M36.3,40.6v4.9c0,1.4,1.4,2.6,3.1,2.6h3V38h-3C37.7,38,36.3,39.2,36.3,40.6z"
						></path>{" "}
					</g>{" "}
					<path
						className="st2"
						d="M99.8,105H20V82.7c0-5.1,3.7-9.7,9.2-11.4l23-7c5.1-1.6,10.5-1.6,15.5,0l23,7c5.5,1.7,9.2,6.3,9.2,11.4 L99.8,105L99.8,105z"
					></path>{" "}
					<rect
						className="st3"
						height="2.9"
						width="13.3"
						x="65.3"
						y="87.2"
					></rect>{" "}
					<rect
						className="st4"
						height="23.5"
						width="16.9"
						x="51.5"
						y="50.4"
					></rect>{" "}
					<path
						className="st5"
						d="M79.1,38.7c0,13-8.6,26.2-19.2,26.2S40.8,51.7,40.8,38.7S49.4,17.9,60,17.9S79.1,25.7,79.1,38.7z"
					></path>{" "}
					<g>
						{" "}
						<path
							className="st1"
							d="M67.6,56.2c-1.4,0-1.7,0-3.4-0.1h-1.7v-1.3h1.7c7.7,0.1,10.3,0.2,12.7-1.8c2.5-2,2-7.2,2-7.3l1.3-0.1 c0,0.2,0.6,5.9-2.5,8.4C75.5,55.9,72.6,56.2,67.6,56.2z"
						></path>{" "}
					</g>{" "}
					<g>
						{" "}
						<path
							className="st6"
							d="M38.4,91.7h-0.6c-0.6,0-1.1,0.5-1.1,1.1V105h2.8V92.8C39.5,92.2,39,91.7,38.4,91.7z"
						></path>{" "}
						<path
							className="st6"
							d="M82.2,91.7h-0.6c-0.6,0-1.1,0.5-1.1,1.1V105h2.8V92.8C83.4,92.2,82.9,91.7,82.2,91.7z"
						></path>{" "}
						<polygon
							className="st6"
							points="68.4,66 60,73.7 51.5,66 50.2,64.9 41.2,67.7 54.7,79.7 60,73.9 65.2,79.7 78.7,67.7 69.7,64.9 "
						></polygon>{" "}
						<path
							className="st6"
							d="M61.2,57.7h4.6c0.7,0,1.3-0.6,1.2-1.2v-1.7c0-0.6-0.5-1.2-1.2-1.2h-4.6c-0.6,0-1.2,0.5-1.2,1.2v1.7 C60,57.1,60.5,57.7,61.2,57.7z"
						></path>{" "}
					</g>{" "}
					<path
						className="st0"
						d="M73.4,23.2c-1.2,2.7-2.9,5.1-4.9,7.2c-5,5.3-12.1,8.6-20,8.6c-2.7,0-5.3-0.4-7.8-1.1 c0.4-12.2,8.5-19.7,18.7-20c0.2,0,0.4,0,0.6,0C65.3,17.9,69.9,19.8,73.4,23.2z"
					></path>{" "}
					<path
						className="st0"
						d="M79,35.4c-3.9-0.9-7.5-2.6-10.5-5c2-2.1,3.7-4.5,4.9-7.2C76.3,26.2,78.4,30.3,79,35.4z"
					></path>{" "}
				</g>{" "}
			</g>
		</svg>
	);
}
