const typeDefs = `
type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
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
`;
module.exports = typeDefs;
