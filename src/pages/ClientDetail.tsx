import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/api"; // Ensure you have the fetcher function
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { Main } from "../layout/Main";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: client,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => fetcher(`/clients/${id}/`),
    enabled: !!id, // Only run the query if id is defined
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching client information.</div>;

  return (
    <Main>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4 gap-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
          <h1 className="text-2xl font-bold mb-4 flex items-center">
            Información de: {client.name}
          </h1>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg p-4">
          <tbody>
            <tr>
              <td className="py-3 px-4 font-semibold">NIT:</td>
              <td className="py-3 px-4">{client.nit}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Direccion:</td>
              <td className="py-3 px-4">{client.direction}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Ciudad:</td>
              <td className="py-3 px-4">{client.city}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Pais:</td>
              <td className="py-3 px-4">{client.country}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Email:</td>
              <td className="py-3 px-4">{client.email}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Activo:</td>
              <td className="py-3 px-4">{client.active ? "Si" : "No"}</td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          Contactos:
        </h1>
        {client.contacts.length === 0 ? ( // Check if there are no contacts
          <h1 className="text-xl font-bold text-red-500">No hay contactos para este cliente.</h1> // Display message
        ) : (
          <div className="client-detail grid grid-cols-1 gap-4">
            {client.contacts.map(
              (
                contact: {
                  firstname: string | null | undefined;
                  lastName: string | null | undefined;
                  email: string | null | undefined;
                  phoneNumber: string | null | undefined;
                },
                index: Key | null | undefined
              ) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center">
                  <img src="https://via.placeholder.com/150" alt={`${contact.firstname} ${contact.lastName}`} className="w-32 h-32 object-cover rounded-lg mr-4" />
                  <div>
                    <h1 className="text-xl font-bold">{contact.firstname} {contact.lastName}</h1>
                    <p className="text-gray-600">Telefono: {contact.phoneNumber}</p>
                    <p className="text-gray-600">E-mail: {contact.email}</p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </Main>
  );
};

export default ClientDetail;
