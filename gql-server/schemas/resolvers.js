const {
  getPosts,
  getPostById,
  postByUser,
  commentByPost,
  createPostService,
} = require("../services/postService");
const resolvers = {
  Query: {
    //Posts
    posts: () => {
      return getPosts();
    },
    post: (parent, args) => {
      return getPostById(args.id, headers);
    },
    postByUser: (parent, args) => {
      return postByUser(args.userId);
    },
    commentsByPost: (parent, args) => {
      return commentByPost(args.postId);
    },
  },
  Mutation: {
    createPost: (parent, args, context) => {
      const headers = context.headers;
      const body = args;
      return createPostService(body, headers);
    },
  },
};

module.exports = { resolvers };
