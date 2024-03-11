const typeDefs = `
type Category{
  _id:ID
  name:String!
}
type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
}
type Order {
 _id: ID
 purchasedDate: String
 products: [Product]
 seller_id: ID  
 buyer_id: ID
}
type User {
    _id: ID
    name: String
    username: String 
    email: String
    password: String
    orders: [Order]
}
type Checkout {
    session: ID
  }
type Auth {
    token: ID
    user: User
}
input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }
type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!):[Product]
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!):  Checkout
    auth: Auth
}
type Mutation {
    addUser(name: String!, username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(name: String, username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }


`;
module.exports = typeDefs;
