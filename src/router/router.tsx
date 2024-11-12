import { createBrowserRouter } from "react-router-dom";
import AddClient from "../pages/AddClient";
import Home from "../pages/Home";
import ClientDetail from "../pages/ClientDetail";
import EditClient from "../pages/EditClient";
import Opport from "../pages/Opport";
import AddOpportunity from "../pages/AddOpportunity"; // Asegúrate de que este archivo esté disponible

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
    path: "/opport", // Ruta para la página de oportunidades
    element: <Opport />,
  },
  {
    path: "/add-opportunity", // Ruta para la creación de oportunidades
    element: <AddOpportunity />, // Esta es la página donde el usuario podrá crear nuevas oportunidades
  },
]);
