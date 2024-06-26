import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import NotFoundPage from "../components/pages/NotFoundPage";
import Home from "../components/pages/Home";

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
                  }
            ]
      }
])