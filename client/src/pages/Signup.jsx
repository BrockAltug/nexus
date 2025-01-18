import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0', // Ivory background
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: '#ffffff', // White card background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #C4B454', // Soft Gold border
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#3D3D3D', // Dark Gray text
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            fontSize: '1.8rem',
          }}
        >
          Sign Up
        </h2>
        {data ? (
          <p
            style={{
              textAlign: 'center',
              color: '#3D3D3D', // Dark Gray text
              fontWeight: 'bold',
            }}
          >
            Success! You may now head{' '}
            <Link
              to="/"
              style={{
                color: '#3D3D3D', // Dark Gray link text
                textDecoration: 'underline',
              }}
            >
              back to the homepage
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                }}
              />
              <input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                }}
              />
              <input
                placeholder="Your password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#F5F5F0', // Ivory background for button
                color: '#3D3D3D', // Dark Gray text
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #C4B454', // Soft Gold border
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background
                e.target.style.color = '#F5F5F0'; // Ivory text
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#F5F5F0';
                e.target.style.color = '#3D3D3D';
              }}
            >
              Submit
            </button>
          </form>
        )}
        {error && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#FF4D4D', // Soft Red for error message
              color: '#ffffff',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error.message}
          </div>
        )}
      </div>
    </main>
  );
};

export default Signup;