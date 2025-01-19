import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_MESSAGES } from '../../utils/queries';
import Auth from '../../utils/auth';

const MessageForm = ({ recipientId }) => {
  const [messageText, setMessageText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loggedInUserId = Auth.getProfile()?.data?._id;

  const [addMessage] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      try {
        const existingMessages = cache.readQuery({
          query: QUERY_MESSAGES,
          variables: { senderId: loggedInUserId, recipientId },
        });

        if (existingMessages) {
          cache.writeQuery({
            query: QUERY_MESSAGES,
            variables: { senderId: loggedInUserId, recipientId },
            data: {
              messages: [...existingMessages.messages, addMessage],
            },
          });
        }
      } catch (err) {
        console.error('Error updating cache:', err);
      }
    },
    onCompleted: () => {
      setMessageText('');
      setCharacterCount(0);
      setIsSubmitting(false);
    },
    onError: (err) => {
      console.error('Error sending message:', err);
      setIsSubmitting(false);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!messageText.trim()) return;

    setIsSubmitting(true);

    try {
      await addMessage({
        variables: {
          recipientId,
          messageText,
        },
      });
    } catch (err) {
      console.error('Error sending message:', err);
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1000) {
      setMessageText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F5F0',
        color: '#2F4F4F',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        border: '1px solid #C4B454',
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          color: '#3D3D3D',
        }}
      >
        Send a Message
      </h3>

      {Auth.loggedIn() ? (
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <textarea
            name="messageText"
            placeholder="Write your message..."
            value={messageText}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #C4B454',
              fontSize: '1rem',
              lineHeight: '1.5',
              resize: 'vertical',
            }}
            onChange={handleChange}
          ></textarea>

          <p
            style={{
              fontSize: '0.85rem',
              color: characterCount === 1000 ? '#E63946' : '#3D3D3D',
              textAlign: 'right',
            }}
          >
            {characterCount}/1000
          </p>

          <button
            type="submit"
            disabled={isSubmitting || !messageText.trim()}
            style={{
              backgroundColor: isSubmitting ? '#D3D3D3' : '#FFFFFF',
              color: '#3D3D3D',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #C4B454',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      ) : (
        <p
          style={{
            fontSize: '1rem',
            color: '#2F4F4F',
            marginTop: '1rem',
          }}
        >
          You need to be logged in to send messages. Please{' '}
          <Link
            to="/login"
            style={{
              color: '#3D3D3D',
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
              color: '#3D3D3D',
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

export default MessageForm;