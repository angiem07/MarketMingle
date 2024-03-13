import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import CartPage from './pages/CartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <NoMatch />,
    children: [
      // Redirect from the index route to "/login" by default
      {
        index: true,
        element: isAuthenticated() ? (
          <Navigate to="/home" replace />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/orderHistory",
        element: <OrderHistory />,
      },
      {
        path: "/products/:id",
        element: <Detail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: "/home",
        element: isAuthenticated() ? (
          <Home />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// Placeholder for authentication check
// Implement this function based on your authentication logic
function isAuthenticated() {
  // This should be replaced with actual logic to check if the user is authenticated
  const token = localStorage.getItem("id_token");
  return !!token;
}