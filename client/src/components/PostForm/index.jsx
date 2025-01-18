import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
  const [postText, setPostText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [QUERY_POSTS, 'getPosts', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: {
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postText' && value.length <= 280) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F5F0', // Ivory background
        color: '#2F4F4F', // Slate Gray text
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        border: '1px solid #C4B454', // Soft Gold border
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          color: '#3D3D3D', // Dark Gray for heading
        }}
      >
        What's on your mind?
      </h3>

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
              name="postText"
              placeholder="Here's a new post..."
              value={postText}
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
                backgroundColor: '#FFFFFF', // White for button
                color: '#3D3D3D', // Dark Gray text
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid #C4B454', // Soft Gold border
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray on hover
                e.target.style.color = '#FFFFFF'; // White text on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#FFFFFF'; // Revert to White
                e.target.style.color = '#3D3D3D'; // Revert to Dark Gray text
              }}
            >
              Post
            </button>
            {error && (
              <div
                style={{
                  backgroundColor: '#E63946', // Red for error message
                  color: '#FFFFFF', // White text
                  padding: '1rem',
                  borderRadius: '8px',
                  marginTop: '1rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p
          style={{
            fontSize: '1rem',
            color: '#2F4F4F', // Slate Gray text
            marginTop: '1rem',
          }}
        >
          You need to be logged in to share your posts. Please{' '}
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

export default PostForm;