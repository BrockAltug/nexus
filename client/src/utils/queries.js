import { gql } from '@apollo/client';

// Query to get a user by username
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postText
        createdAt
      }
      messages {
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
  }
`;

// Query to get all posts
export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postText
      postAuthor
      createdAt
    }
  }
`;

// Query to get all messages filtered by sender and recipient
export const QUERY_MESSAGES = gql`
  query getMessages($senderId: ID, $recipientId: ID) {
    messages(senderId: $senderId, recipientId: $recipientId) {
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

// Query to get a single post by its ID
export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
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

// Query to get a single message by its ID
export const QUERY_SINGLE_MESSAGE = gql`
  query getSingleMessage($messageId: ID!) {
    message(messageId: $messageId) {
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

// Query to get the logged-in user's data
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
      messages {
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
  }
`;