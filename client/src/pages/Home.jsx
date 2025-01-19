import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
  const backgroundImage = '/images/background.png'; // Path to the image in the public folder

  if (Auth.loggedIn()) {
    const username = Auth.getProfile().data.username;

    return (
      <main
        style={{
          padding: '2rem',
          backgroundColor: '#F5F5F0', // Ivory background as fallback
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${backgroundImage})`, // Add the background image
          backgroundSize: 'cover', // Ensure the image covers the entire background
          backgroundPosition: 'center', // Center the background image
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            backgroundColor: '#FFFFFF', // White background for card
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid #C4B454', // Soft Gold border
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              color: '#3D3D3D', // Dark Gray text
              marginBottom: '1rem',
              fontWeight: 'bold',
            }}
          >
            Welcome back, {username}!
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#708090', // Light Slate Gray for subtitle
              marginBottom: '2rem',
            }}
          >
            Discover what's new, connect with friends, and explore your world.
          </p>
          <div>
            <Link
              to="/posts"
              style={{
                display: 'inline-block',
                backgroundColor: '#F5F5F0', // Ivory background for button
                color: '#3D3D3D', // Dark Gray text
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                margin: '0 0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '1px solid #C4B454', // Soft Gold border
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray on hover
                e.target.style.color = '#F5F5F0'; // Ivory text on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#F5F5F0';
                e.target.style.color = '#3D3D3D';
              }}
            >
              Explore Posts
            </Link>
            <Link
              to="/me"
              style={{
                display: 'inline-block',
                backgroundColor: '#F5F5F0', // Ivory background for button
                color: '#3D3D3D', // Dark Gray text
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                margin: '0 0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '1px solid #C4B454', // Soft Gold border
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray on hover
                e.target.style.color = '#F5F5F0'; // Ivory text on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#F5F5F0';
                e.target.style.color = '#3D3D3D';
              }}
            >
              View Profile
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0', // Ivory background as fallback
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, // Add the background image
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the background image
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          backgroundColor: '#FFFFFF', // White background for card
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid #C4B454', // Soft Gold border
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            color: '#3D3D3D', // Dark Gray text
            marginBottom: '1rem',
            fontWeight: 'bold',
          }}
        >
          Welcome to Nexus!
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#708090', // Light Slate Gray for subtitle
            marginBottom: '2rem',
          }}
        >
          Connect, Share, and Explore – All in one place.
        </p>
        <div>
          <Link
            to="/signup"
            style={{
              display: 'inline-block',
              backgroundColor: '#F5F5F0', // Ivory background for button
              color: '#3D3D3D', // Dark Gray text
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              margin: '0 0.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: '1px solid #C4B454', // Soft Gold border
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray on hover
              e.target.style.color = '#F5F5F0'; // Ivory text on hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#F5F5F0';
              e.target.style.color = '#3D3D3D';
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{
              display: 'inline-block',
              backgroundColor: '#F5F5F0', // Ivory background for button
              color: '#3D3D3D', // Dark Gray text
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              margin: '0 0.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: '1px solid #C4B454', // Soft Gold border
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray on hover
              e.target.style.color = '#F5F5F0'; // Ivory text on hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#F5F5F0';
              e.target.style.color = '#3D3D3D';
            }}
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;