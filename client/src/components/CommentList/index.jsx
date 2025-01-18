const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return (
      <h3
        style={{
          textAlign: 'center',
          color: '#708090', // Light Slate Gray for "No Comments Yet"
          marginTop: '1rem',
          fontWeight: 'normal',
        }}
      >
        No Comments Yet
      </h3>
    );
  }

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
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #C4B454', // Soft Gold border for the heading
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          color: '#3D3D3D', // Dark Gray for heading
        }}
      >
        Comments
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              backgroundColor: '#ffffff', // White background for individual comments
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: '1.5rem',
            }}
          >
            <h5
              style={{
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
                color: '#3D3D3D', // Dark Gray for author name
              }}
            >
              {comment.commentAuthor}{' '}
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#708090', // Light Slate Gray for timestamp
                  fontWeight: 'normal',
                }}
              >
                commented on {comment.createdAt}
              </span>
            </h5>
            <p
              style={{
                margin: '0',
                fontSize: '1rem',
                lineHeight: '1.5',
                color: '#2F4F4F', // Slate Gray for comment text
              }}
            >
              {comment.commentText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;