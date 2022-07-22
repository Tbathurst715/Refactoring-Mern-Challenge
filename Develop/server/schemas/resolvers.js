const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {

    me: async (parent, { userId }, context) => {
      return User.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email can not be found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Password not correct");
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: bookId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Need to be logged in!");
    },

      deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedBooks: bookId },
          },
          {
            new: true,
            
          }
        );
      }
      throw new AuthenticationError("Need to be logged in!");
        
      
    },
  },
};

module.exports = resolvers;