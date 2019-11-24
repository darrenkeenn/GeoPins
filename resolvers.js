const { AuthenticationError } = require('apollo-server');
const Pin = require('./models/Pin');

const authenticated = next => (_, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  return next(_, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((_, args, ctx) => ctx.currentUser),
    getPins: async (_, args, ctx) => {
      const pins = await Pin.find({})
        .populate('author')
        .populate('comments.author');

      return pins;
    },
  },
  Mutation: {
    createPin: authenticated(async (_, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser,
      }).save();
      const pinAdded = await Pin.populate(newPin, 'author');
      return pinAdded;
    }),
    deletePin: authenticated(async (_, args, ctx) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      return pinDeleted;
    }),
  },
};
