const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    password: String
    username: String!
  }

  type Comment {
    id: ID!
    commentBody: String!
    createdAt: String
    updatedAt: String
    UserId: Int!
    PostId: Int!
    User: User!
  }

  type Like {
    id: ID!
    createdAt: String
    updatedAt: String
    UserId: Int!
    PostId: Int!
  }

  type Post {
    id: ID!
    title: String!
    postText: String!
    createdAt: String
    updatedAt: String
    UserId: Int
    User: User
    Likes: [Like]
  }

  type Query {
    posts: [Post]!
    postByUser(userId: ID!): [Post]!
    post(id: ID!): Post!
    users: [User!]!
    user(id: ID!): User!
    commentsByPost(postId: ID!): [Comment]
  }

  input PostInput {
    title: String!
    postText: String!
  }
  type Mutation {
    deleteUser(id: ID!): User
    createPost(input: PostInput!): Post!
  }
`;

module.exports = { typeDefs };
