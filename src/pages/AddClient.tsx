import { useForm, useFieldArray } from "react-hook-form";
import { useCreateClient } from "../hooks/useCreateClient";
import { Main } from "../layout/Main";

export type ContactType = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: number;
};
export type ClientType = {
  nit: number;
  name: string;
  direction: string;
  city: string;
  country: string;
  email: string;
  active: boolean;
  contacts: ContactType[];
};

function AddClient() {
  const { mutate: createClient, isSuccess, isError } = useCreateClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = (data: ClientType) => {
    console.log("Client Information: ", data);
    createClient({
      ...data,
      nit: Number(data.nit),
      id: Math.floor(Math.random() * 1000),
    });
  };

  return (
    <Main >
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Añadir Cliente</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSuccess && (
            <p className="w-full text-center p-3 text-green-700 bg-green-100 border border-green-300 rounded mb-4">
              Cliente creado satisfactoriamente
            </p>
          )}
          {isError && (
            <p className="w-full text-center p-3 text-red-700 bg-red-100 border border-red-300 rounded mb-4">
              Error creando cliente
            </p>
          )}
  
          <div className="space-y-4">
            {/* Campos para Cliente */}
            <div>
              <label htmlFor="nit" className="block text-gray-700 font-medium">NIT:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="number"
                placeholder="NIT"
                {...register("nit", { required: true })}
              />
              {errors.nit && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>
  
            <div>
              <label htmlFor="nombre" className="block text-gray-700 font-medium">Nombre:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Nombre"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>
  
            <div>
              <label htmlFor="direccion" className="block text-gray-700 font-medium">Dirección:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Dirección"
                {...register("direction", { required: true })}
              />
              {errors.direction && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>
  
            <div>
              <label htmlFor="Ciudad" className="block text-gray-700 font-medium">Ciudad:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Ciudad"
                {...register("city", { required: true })}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>
  
            <div>
              <label htmlFor="País" className="block text-gray-700 font-medium">País:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="País"
                {...register("country", { required: true })}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>
  
            <div>
              <label htmlFor="Correo" className="block text-gray-700 font-medium">Correo:</label>
              <input
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                placeholder="Correo"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
            </div>
  
            <div className="flex items-center">
              <input
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                type="checkbox"
                {...register("active")}
              />
              <label htmlFor="Activar Cliente" className="text-gray-700 font-medium">Activar Cliente</label>
            </div>
  
            {/* Otros campos del cliente... */}
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Contactos</h2>
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-300 rounded p-4 mb-4 bg-gray-50">
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-700 font-medium">Nombre:</label>
                    <input
                      className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="text"
                      placeholder="Nombre"
                      {...register(`contacts.${index}.firstname`, { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Apellido:</label>
                    <input
                      className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="text"
                      placeholder="Apellido"
                      {...register(`contacts.${index}.lastName`, { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Correo:</label>
                    <input
                      className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="email"
                      placeholder="Correo"
                      {...register(`contacts.${index}.email`, { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Teléfono:</label>
                    <input
                      className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="number"
                      placeholder="Teléfono"
                      {...register(`contacts.${index}.phoneNumber`, { required: true })}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-4 text-red-500 hover:text-red-700 font-medium"
                  >
                    Eliminar Contacto
                  </button>
                </div>
              </div>
            ))}
  
            <button
              type="button"
              onClick={() => append({ firstname: "", lastName: "", email: "", phoneNumber: 0 })}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Agregar Contacto
            </button>
  
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Main>
  );
  
}

export default AddClient;
