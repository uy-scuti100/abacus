import { gql } from "apollo-server-micro";

export const typeDefs = gql`
	type VariantValue {
		label: String
		value: String
	}

	type Variant {
		title: String
		values: [VariantValue]
	}

	type AdditionalInformation {
		title: String
		description: String
	}

	type Product {
		id: ID!
		title: String!
		price: Float!
		description: String!
		media: [String!]!
		type: String!
		brand: String
		status: String!
		on_sale: Boolean
		cost_of_good: Float
		inventory: String
		sku: String
		created_at: String
		category_id: [String!]!
		collection_id: String
		variants: Variant
		additional_information: AdditionalInformation
		store_id: String!
		vendor_id: String!
		ribbon: String
		slug: String
	}

	type Category {
		id: ID!
		name: String!
		avatar: String!
		description: String!
		createdAt: String!
		products: [Product!]!
	}

	type Collection {
		id: ID!
		name: String!
		avatar: String!
		description: String!
		createdAt: String!
		products: [Product!]!
	}

	type Query {
		products(storeId: String!): [Product]
		categories(storeId: String!): [Category]
		collections(storeId: String!): [Collection]
		product(storeId: String!, productId: String!): Product
		category(storeId: String!, categoryId: String!): Category
		collection(storeId: String!, collectionId: String!): Collection
	}
`;
