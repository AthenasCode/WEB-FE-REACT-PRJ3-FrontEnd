import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Main } from "../layout/Main";
import { useGetClients } from "../hooks/useGetClients";
import { useState, useEffect } from "react";

// Tipos
interface OpportunityType {
  id?: number;
  client_id: number;
  business_name: string;
  business_line: "outsourcing recursos" | "desarrollo web" | "desarrollo mobile" | "consultoría TI";
  opportunity_description: string;
  estimated_value: number;
  estimated_date: string;
  status: string;
}

interface Client {
  id: string;
  name: string;
  active: boolean;
}

const BUSINESS_LINES = [
  { value: "outsourcing recursos", label: "Outsourcing Recursos" },
  { value: "desarrollo web", label: "Desarrollo Web" },
  { value: "desarrollo mobile", label: "Desarrollo Mobile" },
  { value: "consultoría TI", label: "Consultoría TI" }
] as const;

function AddOpportunity() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OpportunityType>();
  
  const navigate = useNavigate();
  const { data: clientsData } = useGetClients();
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (clientsData) {
      const activeClients = clientsData.filter(client => client.active);
      setClients(activeClients);
    } else {
      const storedClients = localStorage.getItem('clients');
      if (storedClients) {
        const parsedClients = JSON.parse(storedClients);
        const activeClients = parsedClients.filter(client => client.active);
        setClients(activeClients);
      }
    }
  }, [clientsData]);

  const onSubmit = async (data: OpportunityType) => {
    try {
      const newOpportunity = {
        ...data,
        id: new Date().getTime(),
        client_id: Number(data.client_id),
        estimated_value: Number(data.estimated_value),
        status: "Apertura"
      };

      const stored = localStorage.getItem('opportunities');
      const existingOpportunities = stored ? JSON.parse(stored) : [];
      const updatedOpportunities = [...existingOpportunities, newOpportunity];
      
      localStorage.setItem('opportunities', JSON.stringify(updatedOpportunities));
      navigate("/opport");
      
    } catch (error) {
      console.error('Error al procesar la oportunidad:', error);
      setError('Error al procesar la oportunidad. Por favor, intente nuevamente.');
    }
  };

  return (
    <Main>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md mx-auto">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Crear Oportunidad
        </h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Cliente */}
          <div>
            <label htmlFor="client_id" className="block text-gray-700 font-medium">
              Cliente: <span className="text-red-500">*</span>
            </label>
            <select
              id="client_id"
              className={`mt-1 block w-full rounded-md border border-gray-300 p-3
                focus:border-blue-300 focus:ring focus:ring-blue-200 
                focus:ring-opacity-50 ${errors.client_id ? 'border-red-500' : ''}`}
              {...register("client_id", { 
                required: "Seleccione un cliente",
                validate: value => value !== "" || "Debe seleccionar un cliente" 
              })}
            >
              <option value="">Seleccione un cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.client_id && (
              <p className="text-red-500 text-xs mt-1">{errors.client_id.message}</p>
            )}
          </div>

          {/* Campo Nombre de Negocio */}
          <div>
            <label htmlFor="business_name" className="block text-gray-700 font-medium">
              Nombre de Negocio: <span className="text-red-500">*</span>
            </label>
            <input
              id="business_name"
              type="text"
              className={`mt-1 block w-full rounded-md border border-gray-300 p-3
                focus:border-blue-300 focus:ring focus:ring-blue-200 
                focus:ring-opacity-50 ${errors.business_name ? 'border-red-500' : ''}`}
              placeholder="Ej: Proyecto E-commerce"
              {...register("business_name", {
                required: "El nombre del negocio es requerido",
                minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" }
              })}
            />
            {errors.business_name && (
              <p className="text-red-500 text-xs mt-1">{errors.business_name.message}</p>
            )}
          </div>

          {/* Campo Línea de Negocio */}
          <div>
            <label htmlFor="business_line" className="block text-gray-700 font-medium">
              Línea de Negocio: <span className="text-red-500">*</span>
            </label>
            <select
              id="business_line"
              className={`mt-1 block w-full rounded-md border border-gray-300 p-3
                focus:border-blue-300 focus:ring focus:ring-blue-200 
                focus:ring-opacity-50 ${errors.business_line ? 'border-red-500' : ''}`}
              {...register("business_line", {
                required: "Seleccione una línea de negocio"
              })}
            >
              <option value="">Seleccione una línea de negocio</option>
              {BUSINESS_LINES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.business_line && (
              <p className="text-red-500 text-xs mt-1">{errors.business_line.message}</p>
            )}
          </div>

          {/* Campo Descripción */}
          <div>
            <label htmlFor="opportunity_description" className="block text-gray-700 font-medium">
              Descripción: <span className="text-red-500">*</span>
            </label>
            <textarea
              id="opportunity_description"
              className={`mt-1 block w-full rounded-md border border-gray-300 p-3
                focus:border-blue-300 focus:ring focus:ring-blue-200 
                focus:ring-opacity-50 ${errors.opportunity_description ? 'border-red-500' : ''}`}
              placeholder="Describa los detalles de la oportunidad"
              rows={4}
              {...register("opportunity_description", {
                required: "La descripción es requerida",
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres"
                }
              })}
            />
            {errors.opportunity_description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.opportunity_description.message}
              </p>
            )}
          </div>

          {/* Campo Valor Estimado */}
          <div>
            <label htmlFor="estimated_value" className="block text-gray-700 font-medium">
              Valor Estimado (COP): <span className="text-red-500">*</span>
            </label>
            <input
              id="estimated_value"
              type="number"
              className={`mt-1 block w-full rounded-md border border-gray-300 p-3
                focus:border-blue-300 focus:ring focus:ring-blue-200 
                focus:ring-opacity-50 ${errors.estimated_value ? 'border-red-500' : ''}`}
              placeholder="Ej: 1000000"
              min="0"
              step="1000"
              {...register("estimated_value", {
                required: "El valor estimado es requerido",
                min: {
                  value: 0,
                  message: "El valor debe ser mayor a 0"
                },
                validate: {
                  isNumber: value => !isNaN(Number(value)) || "Debe ser un número válido"
                }
              })}
            />
            {errors.estimated_value && (
              <p className="text-red-500 text-xs mt-1">{errors.estimated_value.message}</p>
            )}
          </div>

          {/* Campo Fecha Estimada */}
          <div>
            <label htmlFor="estimated_date" className="block text-gray-700 font-medium">
              Fecha Estimada: <span className="text-red-500">*</span>
            </label>
            <input
              id="estimated_date"
              type="date"
              className={`mt-1 block w-full rounded-md border border-gray-300 p-3
                focus:border-blue-300 focus:ring focus:ring-blue-200 
                focus:ring-opacity-50 ${errors.estimated_date ? 'border-red-500' : ''}`}
              {...register("estimated_date", {
                required: "La fecha estimada es requerida",
                validate: {
                  futureDate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    return selectedDate >= today || "La fecha debe ser igual o posterior a hoy";
                  }
                }
              })}
            />
            {errors.estimated_date && (
              <p className="text-red-500 text-xs mt-1">{errors.estimated_date.message}</p>
            )}
          </div>

          {/* Campo Estado (oculto) */}
          <input type="hidden" value="Apertura" {...register("status")} />

          {/* Botón Submit */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/opport")}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear Oportunidad"}
            </button>
          </div>
        </form>
      </div>
    </Main>
  );
}

export default AddOpportunity;