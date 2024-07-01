import { RouterProvider } from "react-router-dom";
import { publicRouter } from "./routers/PublicRouter";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function App() {
  return (<>
    <ToastContainer />
    <RouterProvider router={publicRouter} />

  </>)
}