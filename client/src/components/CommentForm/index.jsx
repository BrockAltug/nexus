import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F5F0', // Ivory background
        color: '#2F4F4F', // Dark Gray text
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        border: '1px solid #C4B454', // Soft Gold border
      }}
    >
      <h4
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          color: '#3D3D3D', // Dark Gray for heading
        }}
      >
        What are your thoughts on this post?
      </h4>

      {Auth.loggedIn() ? (
        <>
          <p
            style={{
              margin: '0 0 1rem',
              color: characterCount === 280 || error ? '#E63946' : '#708090', // Error or Light Slate Gray
              fontSize: '0.9rem',
            }}
          >
            Character Count: {characterCount}/280
            {error && (
              <span style={{ marginLeft: '0.5rem', color: '#E63946' }}>
                {error.message}
              </span>
            )}
          </p>
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <textarea
              name="commentText"
              placeholder="Add your comment..."
              value={commentText}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #C4B454', // Soft Gold border
                fontSize: '1rem',
                lineHeight: '1.5',
                resize: 'vertical',
              }}
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              style={{
                backgroundColor: '#FFFFFF', // White background
                color: '#3D3D3D', // Dark Gray text
                padding: '0.8rem 1.5rem',
                border: '1px solid #C4B454', // Soft Gold border
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background on hover
                e.target.style.color = '#F5F5F0'; // White text on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#FFFFFF'; // White background when not hovered
                e.target.style.color = '#3D3D3D'; // Dark Gray text when not hovered
              }}
            >
              Add Comment
            </button>
          </form>
        </>
      ) : (
        <p
          style={{
            fontSize: '1rem',
            color: '#2F4F4F', // Dark Gray text
            marginTop: '1rem',
          }}
        >
          You need to be logged in to share your comments. Please{' '}
          <Link
            to="/login"
            style={{
              color: '#3D3D3D', // Dark Gray for links
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            login
          </Link>{' '}
          or{' '}
          <Link
            to="/signup"
            style={{
              color: '#3D3D3D', // Dark Gray for links
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            signup
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default CommentForm;