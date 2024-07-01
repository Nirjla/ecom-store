import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import NotFoundPage from "../components/pages/NotFoundPage";
import Home from "../components/pages/Home";
import ProductDetails from "../components/pages/ProductDetails";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";

export const publicRouter = createBrowserRouter([
      {
            path: "/",
            element: <Root />,
            errorElement: <NotFoundPage />,
            children: [
                  {
                        path: "/",
                        element: <Home />,
                        index: true
                  }, {
                        path: "/items/:id",
                        element: <ProductDetails />
                  }, {
                        path: "/register",
                        element: <Register />
                  }, {
                        path: "/login",
                        element: <Login />
                  }
            ]
      }
])