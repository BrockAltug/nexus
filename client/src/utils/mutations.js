import { gql } from '@apollo/client';

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add a new post
export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// Mutation to add a comment to a post
export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// Mutation to remove a post
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      postText
    }
  }
`;

// Mutation to remove a comment from a post
export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      postText
      comments {
        _id
        commentText
      }
    }
  }
`;

// Mutation to add a new message
export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!, $recipientId: ID!) {
    addMessage(messageText: $messageText, recipientId: $recipientId) {
      _id
      messageText
      sender {
        _id
        username
      }
      recipient {
        _id
        username
      }
      createdAt
    }
  }
`;

// Mutation to remove a message
export const REMOVE_MESSAGE = gql`
  mutation removeMessage($messageId: ID!) {
    removeMessage(messageId: $messageId) {
      _id
      messageText
    }
  }
`;