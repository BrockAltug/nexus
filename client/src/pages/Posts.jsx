import { useQuery } from '@apollo/client';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import { QUERY_POSTS } from '../utils/queries';

const Posts = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

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
          className="post-form-container"
          style={{
            width: '100%',
            backgroundColor: '#ffffff', // Clean white card
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid #C4B454', // Soft Gold border
          }}
        >
          <PostForm />
        </div>
        <div
          className="post-list-container"
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
          ) : (
            <PostList
              posts={posts}
              title="Explore the Latest Posts"
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

export default Posts;