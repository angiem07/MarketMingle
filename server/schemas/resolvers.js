const { User, Product, Order, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_51OswYK07VB9gYcRnIPLLvKIyP36xzKpm3iCzS2ydvHVJRT0x8Fj6gMavRQRA5cQFvAOUQWRf0Fk6USbHj7Vm7vW900hTmNa3Zx");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      let params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.find(_id).populate("category");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
      }
      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const userOrders = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        return userOrders.orders.id(_id);
      }
      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];
      for (const product of order.products) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return {
        id: session.id,
      };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log("user", user);
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("inwt");
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log("token", token);
      return { token, user };
    },
  },
};
module.exports = resolvers;
