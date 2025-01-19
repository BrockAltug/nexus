import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import Posts from './pages/Posts'; // Import the Posts component
import Messages from './pages/Messages'; // Import the Messages component
import SingleMessage from './pages/SingleMessage'; // Import the SingleMessage component
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement: <ErrorPage />, 
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/posts',
        element: <Posts /> // Add the Posts route
      }, {
        path: '/posts/:postId',
        element: <SinglePost />
      }, {
        path: '/messages',
        element: <Messages /> // Add the Messages route
      }, {
        path: '/messages/:messageId',
        element: <SingleMessage /> // Add the SingleMessage route
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);