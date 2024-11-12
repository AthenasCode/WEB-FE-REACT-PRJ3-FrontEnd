import { useForm } from "react-hook-form";
import { useCreateOpportunity } from "../hooks/useCreateOpportunity";
import { useGetClients } from "../hooks/useGetClients";
import { Main } from "../layout/Main";
import { ClientType } from "../hooks/useCreateClient";
export type OpportunityType = {
  id: number;
  client_id: number;
  business_name: string;
  business_line: string;
  opportunity_description: string;
  estimated_value: number;
  estimated_date: string;
  status: string;
};

function AddOpportunity() {
  const { mutate: createOpportunity, isSuccess, isError } = useCreateOpportunity();
  const { data: clientsData } = useGetClients();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OpportunityType>();

  const onSubmit = (data: OpportunityType) => {
    const formattedData = {
      ...data,
      client_id: parseInt(data.client_id.toString(), 10),
      estimated_value: parseFloat(data.estimated_value.toString()),
      id: Math.floor(Math.random() * 1000),
      status: "Apertura", 
    };
    
    console.log("Opportunity Information: ", formattedData);
    createOpportunity(formattedData);
    reset();
  };

  return (
    <Main>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Añadir Oportunidad</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSuccess && (
            <p className="w-full text-center p-3 text-green-700 bg-green-100 border border-green-300 rounded mb-4">
              Oportunidad creada satisfactoriamente
            </p>
          )}
          {isError && (
            <p className="w-full text-center p-3 text-red-700 bg-red-100 border border-red-300 rounded mb-4">
              Error creando oportunidad
            </p>
          )}

          <div className="space-y-4">
            {/* Selección de Cliente */}
            <div>
              <label htmlFor="client_id" className="block text-gray-700 font-medium">Cliente:</label>
              <select
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("client_id", { required: true })}
              >
                <option value="">Seleccione un cliente</option>
                {clientsData?.map((client: ClientType) => (
                  <option key={client.id} value={client.id}>
                    {"Nit: "+client.nit+" Nombre: "+client.name}
                  </option>
                ))}
              </select>
              {errors.client_id && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            {/* Campos adicionales para la oportunidad */}
            <div>
              <label htmlFor="business_name" className="block text-gray-700 font-medium">Nombre del Negocio:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Nombre del Negocio"
                {...register("business_name", { required: true })}
              />
              {errors.business_name && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="business_line" className="block text-gray-700 font-medium">Línea de Negocio:</label>
              <select
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("business_line", { required: true })}
              >
                <option value="">Seleccione una línea de negocio</option>
                <option value="outsourcing recursos">Outsourcing Recursos</option>
                <option value="desarrollo web">Desarrollo Web</option>
                <option value="desarrollo mobile">Desarrollo Mobile</option>
                <option value="consultoría TI">Consultoría TI</option>
              </select>
              {errors.business_line && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="opportunity_description" className="block text-gray-700 font-medium">Descripción de la Oportunidad:</label>
              <textarea
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Descripción de la Oportunidad"
                {...register("opportunity_description", { required: true })}
              />
              {errors.opportunity_description && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="estimated_value" className="block text-gray-700 font-medium">Valor Estimado (COP):</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="number"
                placeholder="Valor Estimado"
                {...register("estimated_value", { required: true })}
              />
              {errors.estimated_value && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="estimated_date" className="block text-gray-700 font-medium">Fecha Estimada de Realización:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="date"
                {...register("estimated_date", { required: true })}
              />
              {errors.estimated_date && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            {/* Estado de la Oportunidad (Valor fijo) */}
            <input type="hidden" value="Apertura" {...register("status")} />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6"
              type="submit"
            >
              Crear Oportunidad
            </button>
          </div>
        </form>
      </div>
    </Main>
  );
}

export default AddOpportunity;
