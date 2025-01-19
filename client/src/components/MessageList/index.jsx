import { useLayoutEffect, useRef } from 'react';

const MessageList = ({ messages, loggedInUserId, recipientId }) => {
  const messageListRef = useRef();

  // Filter and sort messages (oldest to newest)
  const filteredMessages = messages
    .filter(
      (msg) =>
        (msg.sender._id === loggedInUserId && msg.recipient._id === recipientId) ||
        (msg.sender._id === recipientId && msg.recipient._id === loggedInUserId)
    )
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Automatically scroll the message window to the bottom when new messages arrive
  useLayoutEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  return (
    <div
      ref={messageListRef}
      style={{
        backgroundColor: '#F5F5F0',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #C4B454',
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {filteredMessages.length ? (
        filteredMessages.map((msg) => {
          const isSender = msg.sender._id === loggedInUserId;
          return (
            <div
              key={msg._id}
              style={{
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                backgroundColor: isSender ? '#ffffff' : '#3D3D3D',
                color: isSender ? '#2F4F4F' : '#F5F5F0',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                maxWidth: '70%',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: isSender ? 'right' : 'left',
                marginLeft: isSender ? 'auto' : '0',
                wordWrap: 'break-word',
              }}
            >
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5' }}>
                {msg.messageText}
              </p>
              <small
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  fontSize: '0.85rem',
                  color: isSender ? '#708090' : '#D3D3D3',
                }}
              >
                {isSender ? 'You' : msg.sender.username} · {msg.createdAt}
              </small>
            </div>
          );
        })
      ) : (
        <p
          style={{
            textAlign: 'center',
            color: '#708090',
            fontSize: '1rem',
          }}
        >
          No messages yet. Start the conversation!
        </p>
      )}
    </div>
  );
};

export default MessageList;