import { createBrowserRouter } from "react-router-dom";
import AddClient from "../pages/AddClient";
import Home from "../pages/Home";
import ClientDetail from "../pages/ClientDetail";
import EditClient from "../pages/EditClient";
import Opport from "../pages/Opport";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/AddClient",
    element: <AddClient />,
  },
  {
    path: "/client/:id",
    element: <ClientDetail />,
  },
  {
    path: "/edit-client/:id",
    element: <EditClient />,
  },
  {
    path: "opport", // Ruta para la página de oportunidades
    element: <Opport />,
  },
]);
