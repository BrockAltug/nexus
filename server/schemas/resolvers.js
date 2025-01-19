const { User, Post, Message } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts').populate('messages');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts').populate('messages');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    messages: async (parent, { senderId, recipientId }) => {
      const filter = { $or: [{ sender: senderId, recipient: recipientId }, { sender: recipientId, recipient: senderId }] };
      return Message.find(filter)
        .sort({ createdAt: 1 }) // Sorting from oldest to newest
        .populate('sender')
        .populate('recipient');
    },
    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId })
        .populate('sender')
        .populate('recipient');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('posts')
          .populate('messages');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        const post = await Post.create({
          postText,
          postAuthor: context.user.username,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { posts: post._id } }
        );
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findByIdAndUpdate(
          postId,
          { $addToSet: { comments: { commentText, commentAuthor: context.user.username } } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { posts: post._id } }
        );
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: { _id: commentId, commentAuthor: context.user.username } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addMessage: async (parent, { messageText, recipientId }, context) => {
      if (context.user) {
        const message = await Message.create({
          messageText,
          sender: context.user._id,
          recipient: recipientId,
        });
        const populatedMessage = await Message.findById(message._id)
          .populate('sender')
          .populate('recipient');
        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { messages: message._id } }
        );
        await User.findByIdAndUpdate(
          recipientId,
          { $addToSet: { messages: message._id } }
        );
        return populatedMessage;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeMessage: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findOneAndDelete({
          _id: messageId,
          sender: context.user._id,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { messages: message._id } }
        );
        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;