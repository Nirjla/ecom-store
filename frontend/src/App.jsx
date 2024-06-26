import { RouterProvider } from "react-router-dom";
import { publicRouter } from "./routers/PublicRouter";

export default function App() {
  return (<>
    <RouterProvider router={publicRouter} />

  </>)
}