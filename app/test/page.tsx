// "use client";

// import { useEffect } from "react";

// const fetchData = async () => {
// 	const response = await fetch("/api/graphql", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			query: `
//           query {
//             products(storeId: "57a4c8be-5547-42d1-bb43-ffc4e233108e") {
//               id
//               title
//               price
//             }
//           }
//         `,
// 		}),
// 	});

// 	const { data } = await response.json();
// 	console.log(data);
// };

export default async function page() {
	return <h1>Homepage</h1>;
}
