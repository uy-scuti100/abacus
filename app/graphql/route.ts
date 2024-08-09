import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

import { createSchema, createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
	graphqlEndpoint: "/graphql",
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
	fetchAPI: {
		Response,
	},
});

export {
	handleRequest as GET,
	handleRequest as POST,
	handleRequest as OPTIONS,
};
