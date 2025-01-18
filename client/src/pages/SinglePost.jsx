// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:postId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // Pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#3D3D3D', // Dark Gray for loading text
          fontSize: '1.2rem',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0', // Ivory background to match Header
        minHeight: '100vh',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#ffffff', // White card background
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #C4B454', // Soft Gold border
        }}
      >
        <h3
          style={{
            backgroundColor: '#3D3D3D', // Dark Gray for header
            color: '#ffffff', // White text for contrast
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {post.postAuthor} <br />
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 'normal',
              color: '#D3D3D3', // Light Gray for subtitle
            }}
          >
            had this post on {post.createdAt}
          </span>
        </h3>
        <div
          style={{
            backgroundColor: '#F1F1F1', // Light Gray for post content
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #C4C4C4', // Subtle Gray border
          }}
        >
          <blockquote
            style={{
              fontSize: '1.25rem',
              fontStyle: 'italic',
              borderLeft: '4px solid #3D3D3D', // Dark Gray accent
              paddingLeft: '1rem',
              margin: 0,
              color: '#555', // Neutral dark gray text
              lineHeight: '1.6',
            }}
          >
            {post.postText}
          </blockquote>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <CommentList comments={post.comments} />
        </div>
        <div
          style={{
            backgroundColor: '#ffffff', // White card background
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '1px solid #C4B454', // Soft Gold border
          }}
        >
          <CommentForm postId={post._id} />
        </div>
      </div>
    </main>
  );
};

export default SinglePost;