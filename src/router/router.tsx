import { createBrowserRouter } from "react-router-dom";
import  AddClient  from "../pages/AddClient";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/AddClient",
    element: <AddClient/>,
  },

]);
