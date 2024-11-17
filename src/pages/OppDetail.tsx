import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOpportunityById } from "../hooks/useGetOpportunityById";
import { Main } from "../layout/Main";

const OppDetail = () => {
  const { id } = useParams<{ id: string }>();
  const opportunity_id = id ? parseInt(id, 10) : null;

  if (!opportunity_id) {
    return <div>Error: ID de oportunidad inválido</div>;
  }

  const {
    data: opportunity,
    isLoading,
    isError,
  } = useGetOpportunityById(opportunity_id);

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching followups</div>;

  return (
    <>
      {opportunity && (
        <Main>
          <div className="container mx-auto p-4">
            <div className="flex items-center mb-4 gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
                onClick={() => navigate(-1)}
              >
                ‹ Regresar
              </button>
              <h1 className="text-2xl font-bold mb-4 flex items-center mb-0">
                Detalles de oportunidad
              </h1>
            </div>
            <table className="min-w-full bg-white shadow-md rounded-lg p-4">
              <tbody>
                <tr>
                  <td className="py-3 px-4 font-semibold">ID:</td>
                  <td className="py-3 px-4">{opportunity.id}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">
                    Nombre de negocio:
                  </td>
                  <td className="py-3 px-4">{opportunity.business_name}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Descripcion:</td>
                  <td className="py-3 px-4">
                    {opportunity.opportunity_description}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Fecha estimada:</td>
                  <td className="py-3 px-4">{opportunity.estimated_date}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Linea de negocio:</td>
                  <td className="py-3 px-4">{opportunity.business_line}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Estado:</td>
                  <td className="py-3 px-4">{opportunity.status}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Valor estimado:</td>
                  <td className="py-3 px-4">{opportunity.estimated_value}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Cliente:</td>
                  <td className="py-3 px-4">
                    <Link
                      to={"/client/" + opportunity.client_id}
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      Ver Cliente
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Main>
      )}
    </>
  );
};

export default OppDetail;
