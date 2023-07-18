import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import App from "../App";
import Test from "../Pages/Test";
import Info from "../Pages/Info";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: null,
    children: [
      { index: true, path: "/", element: <App /> },
      { index: true, path: "/:keyword", element: <Info /> },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);
