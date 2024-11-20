import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddBlog from "../Pages/AddBlog";
import PrivateRoute from "./PrivateRoute";
import AllBlogs from "../Pages/AllBlogs";
import Wishlist from "../Pages/Wishlist";
import Update from "../Pages/Update";
import BlogDetails from "../Pages/BlogDetails";
import Featured from "../Pages/Featured";
import Profile from "../Pages/Profile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <Update></Update>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "/featured",
        element: <Featured></Featured>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
