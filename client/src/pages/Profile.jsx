import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

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
          fontWeight: '500',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user?.username) {
    return (
      <h4
        style={{
          textAlign: 'center',
          color: '#3D3D3D', // Dark Gray text
          marginTop: '2rem',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0', // Ivory background consistent with Header
        minHeight: '100vh',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            backgroundColor: '#3D3D3D', // Dark Gray for header background
            color: '#ffffff', // White text
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: 'bold',
          }}
        >
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div
          style={{
            backgroundColor: '#ffffff', // White card background
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid #C4B454', // Soft Gold border
            marginBottom: '2rem',
          }}
        >
          <PostList
            posts={user.posts}
            title={`${user.username}'s posts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>

        {!userParam && (
          <div
            style={{
              backgroundColor: '#ffffff', // White card background
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #C4B454', // Soft Gold border
            }}
          >
            <PostForm />
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;