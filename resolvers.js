const { AuthenticationError } = require('apollo-server');

const authenticated = next => (_, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  return next(_, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((_, args, ctx) => ctx.currentUser),
  },
};
