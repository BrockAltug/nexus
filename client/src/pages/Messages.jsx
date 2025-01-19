import { useQuery } from '@apollo/client';
import MessageList from '../components/MessageList';
import { QUERY_MESSAGES } from '../utils/queries';
import Auth from '../utils/auth';

const Messages = () => {
  const loggedInUserId = Auth.getProfile()?.data?._id;

  const { loading, data, error } = useQuery(QUERY_MESSAGES, {
    variables: { recipientId: loggedInUserId }, // Query messages where the logged-in user is the recipient
    skip: !loggedInUserId, // Skip query if the user is not logged in
  });

  if (!loggedInUserId) {
    return (
      <main
        style={{
          padding: '2rem',
          backgroundColor: '#F5F5F0', // Ivory background
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#3D3D3D', // Dark Gray text
          fontSize: '1.2rem',
        }}
      >
        Please log in to view your messages.
      </main>
    );
  }

  const messages = data?.messages || [];

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0', // Ivory background, consistent with Header
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '2rem',
        }}
      >
        <div
          className="message-list-container"
          style={{
            width: '100%',
            backgroundColor: '#ffffff', // Clean white card
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid #C4B454', // Soft Gold border
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                color: '#708090', // Light Slate Gray for text
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Loading...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: 'center',
                color: '#E63946', // Red for error message
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Error loading messages. Please try again later.
            </div>
          ) : messages.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: '#708090', // Light Slate Gray for empty state
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              You have no messages.
            </div>
          ) : (
            <MessageList
              messages={messages}
              title="Messages Sent to You"
              style={{
                color: '#3D3D3D', // Dark Gray for the title
                fontWeight: '600',
                fontSize: '1.5rem',
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Messages;