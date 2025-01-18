import { Link } from 'react-router-dom';
import { FaComment } from 'react-icons/fa'; // Importing a chat/comment icon

const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  if (!posts.length) {
    return (
      <h3
        style={{
          textAlign: 'center',
          color: '#708090', // Light Slate Gray for "No Posts Yet"
          marginTop: '1rem',
          fontWeight: 'normal',
        }}
      >
        No Posts Yet
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
      {showTitle && (
        <h3
          style={{
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            color: '#3D3D3D', // Dark Gray for heading
          }}
        >
          {title}
        </h3>
      )}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            backgroundColor: '#ffffff', // White background for each post
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '1.5rem',
            overflow: 'hidden',
          }}
        >
          <h4
            style={{
              backgroundColor: '#3D3D3D', // Dark Gray for header
              color: '#F5F5F0', // Ivory text
              padding: '1rem',
              margin: '0',
              fontSize: '1.25rem',
            }}
          >
            {showUsername ? (
              <Link
                to={`/profiles/${post.postAuthor}`}
                style={{
                  color: '#F5F5F0', // Ivory text for username
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                {post.postAuthor} <br />
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    color: '#F5F5F0', // Ivory text for date
                  }}
                >
                  had this post on {post.createdAt}
                </span>
              </Link>
            ) : (
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 'normal',
                  color: '#F5F5F0', // Ivory text for date
                }}
              >
                You had this post on {post.createdAt}
              </span>
            )}
          </h4>
          <div
            style={{
              backgroundColor: '#F5F5F0', // Ivory background for content
              padding: '1rem',
            }}
          >
            <p
              style={{
                margin: '0',
                fontSize: '1rem',
                lineHeight: '1.5',
                color: '#2F4F4F', // Slate Gray text
              }}
            >
              {post.postText}
            </p>
          </div>
          <Link
            to={`/posts/${post._id}`}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent', // Transparent background
              color: '#3D3D3D', // Dark Gray text for icon
              width: '2.5rem', // Smaller circle width
              height: '2.5rem', // Smaller circle height
              fontSize: '1.2rem',
              textDecoration: 'none',
              borderRadius: '50%', // Circular shape around the icon
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background on hover
              e.target.style.color = '#F5F5F0'; // White text for icon on hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'; // Transparent background
              e.target.style.color = '#3D3D3D'; // Dark Gray text for icon
            }}
          >
            <FaComment
              style={{
                pointerEvents: 'none', // Disables hover effect on the icon itself
              }}
            /> {/* Comment icon */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;