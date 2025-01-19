import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import { QUERY_MESSAGES } from '../utils/queries';
import { ADD_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';

const SingleMessage = () => {
  const { messageId } = useParams(); // Represents the recipient's user ID
  const loggedInUserId = Auth.getProfile()?.data?._id;

  // Fetch messages between logged-in user and the recipient
  const { loading, data, error } = useQuery(QUERY_MESSAGES, {
    variables: { senderId: loggedInUserId, recipientId: messageId },
    skip: !messageId || !loggedInUserId,
  });

  // Mutation to add a new message
  const [addMessage, { error: addError }] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      { query: QUERY_MESSAGES, variables: { senderId: loggedInUserId, recipientId: messageId } },
    ],
  });

  const messages = data?.messages || [];

  const handleFormSubmit = async (messageText) => {
    try {
      await addMessage({
        variables: {
          recipientId: messageId,
          messageText,
        },
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Unable to fetch messages. Please try again later.</div>;
  }

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0',
        minHeight: '100vh',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #C4B454',
        }}
      >
        <h3>Conversation</h3>

        {/* Message List */}
        <MessageList
          messages={messages}
          loggedInUserId={loggedInUserId}
          recipientId={messageId}
        />

        {/* Message Form */}
        <MessageForm recipientId={messageId} onSend={handleFormSubmit} />

        {addError && <div>Error sending message. Please try again later.</div>}
      </div>
    </main>
  );
};

export default SingleMessage;