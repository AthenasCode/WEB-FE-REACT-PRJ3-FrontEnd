import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUpdateOpportunity } from "../hooks/useUpdateOpportunity"; // Cambia a tu hook de actualización
import { useGetOpportunityById } from "../hooks/useGetOpportunityById"; // Hook para obtener la oportunidad existente
import { Main } from "../layout/Main";
import { OpportunityType } from "../hooks/useCreateOpportunity"; // Asegúrate de definir este tipo en un archivo separado si no lo tienes
import { useParams } from "react-router-dom";

function UpdateOpportunity() {
  const { id } = useParams<{ id: string }>();
  const opportunityId = parseInt(id as string, 10);
  const { data: opportunityData } = useGetOpportunityById(opportunityId); // Cargar los datos actuales
  const { mutate: updateOpportunity, isSuccess, isError } = useUpdateOpportunity();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<OpportunityType>();
  const [statusOptions, setStatusOptions] = useState<string[]>([]);

  // Filtrar opciones del estado según el estado actual de la oportunidad
  useEffect(() => {
    if (opportunityData) {
      reset(opportunityData); // Rellenar el formulario con datos actuales
      switch (opportunityData.status) {
        case "Apertura":
          setStatusOptions(["Apertura", "En Estudio"]);
          break;
        case "En Estudio":
          setStatusOptions(["En Estudio", "Orden de Compra"]);
          break;
        case "Orden de Compra":
          setStatusOptions(["Orden de Compra", "Finalizada"]);
          break;
        case "Finalizada":
          setStatusOptions(["Finalizada"]);
          break;
        default:
          setStatusOptions(["Apertura"]);
      }
    }
  }, [opportunityData, reset]);

  const onSubmit = (data: OpportunityType) => {
    const formattedData = {
      ...data,
      estimated_value: parseFloat(data.estimated_value.toString()),
    };
    console.log("Updated Opportunity Information: ", formattedData);
    updateOpportunity(formattedData);
  };

  return (
    <Main>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Actualizar Oportunidad
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSuccess && (
            <p className="w-full text-center p-3 text-green-700 bg-green-100 border border-green-300 rounded mb-4">
              Oportunidad actualizada satisfactoriamente
            </p>
          )}
          {isError && (
            <p className="w-full text-center p-3 text-red-700 bg-red-100 border border-red-300 rounded mb-4">
              Error actualizando oportunidad
            </p>
          )}

          <div className="space-y-4">
            {/* Campos editables de la oportunidad */}
            <div>
              <label htmlFor="business_name" className="block text-gray-700 font-medium">
                Nombre del Negocio:
              </label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Nombre del Negocio"
                {...register("business_name", { required: true })}
              />
              {errors.business_name && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="business_line" className="block text-gray-700 font-medium">
                Línea de Negocio:
              </label>
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
              <label htmlFor="opportunity_description" className="block text-gray-700 font-medium">
                Descripción de la Oportunidad:
              </label>
              <textarea
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Descripción de la Oportunidad"
                {...register("opportunity_description", { required: true })}
              />
              {errors.opportunity_description && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="estimated_value" className="block text-gray-700 font-medium">
                Valor Estimado (COP):
              </label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="number"
                placeholder="Valor Estimado"
                {...register("estimated_value", { required: true })}
              />
              {errors.estimated_value && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <div>
              <label htmlFor="estimated_date" className="block text-gray-700 font-medium">
                Fecha Estimada de Realización:
              </label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="date"
                {...register("estimated_date", { required: true })}
              />
              {errors.estimated_date && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            {/* Estado de la Oportunidad */}
            <div>
              <label htmlFor="status" className="block text-gray-700 font-medium">Estado:</label>
              <select
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("status", { required: true })}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6"
              type="submit"
            >
              Actualizar Oportunidad
            </button>
          </div>
        </form>
      </div>
    </Main>
  );
}

export default UpdateOpportunity;
