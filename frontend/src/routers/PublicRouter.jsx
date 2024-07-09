import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import NotFoundPage from "../components/pages/NotFoundPage";
import Home from "../components/pages/Home";
import ProductDetails from "../components/pages/ProductDetails";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import Cart from "../components/pages/Cart";
import GoogleCallback from "../components/pages/GoogleCallback";

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
                  }, {
                        path: "/cart",
                        element: <Cart />
                  },{
                        path:"/auth/google/callback",
                        element:<GoogleCallback/>
                  }
            ]
      }
])