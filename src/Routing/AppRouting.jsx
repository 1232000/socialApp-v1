
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/auth/Home/Home';
import Login from '../pages/auth/Login/Login';
import Register from '../pages/auth/Register/Register';
import Profile from '../pages/auth/Profile/Profile';
import Layout from '../Layouts/Layout/Layout';
import NotFound from '../pages/auth/NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PostDetails from '../pages/auth/PostDetails/PostDetails';
import ChangePassword from '../Components/ChangePassword/ChangePassword';

export const router = createBrowserRouter([
    { path: "/" , element: <Layout/> , children:[
      { index: true , element: <ProtectedRoute> <Home/> </ProtectedRoute> },
      { path: "postDetails/:id" , element: <ProtectedRoute> <PostDetails/> </ProtectedRoute> },
      { path: "profile" , element: <ProtectedRoute> <Profile/> </ProtectedRoute> },
      { path: "register" , element: <Register/> },
      { path: "login" , element: <Login/> },
      { path: "changePassword" , element: <ProtectedRoute> <ChangePassword/> </ProtectedRoute> },
      { path: "*" , element: <NotFound/> },
    ]}
  ])
