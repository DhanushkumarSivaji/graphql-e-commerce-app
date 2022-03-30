const { gql } = require('apollo-server');


// Scalar Types -> String, Int, Boolean, Float, ID
// Array Types
// Object Types


const typeDefs = gql`
    type Query {
        name: String!
        age: Int
        isVaccinated: Boolean
        weight: Float
        education: [String!]!
        products(filter: ProductsFilterInput): [Product!]
        product(id: ID!) : Product
        categories: [Category!]
        category(id: ID!): Category
    }

    type Product {
      id: ID!
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      image: String!
      onSale: Boolean!
      category: Category
      reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        products(filter: ProductsFilterInput): [Product!]!
    }

    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
    }

    input ProductsFilterInput {
        onSale: Boolean
        avgRating: Int
    }
`

module.exports = {
    typeDefs
}