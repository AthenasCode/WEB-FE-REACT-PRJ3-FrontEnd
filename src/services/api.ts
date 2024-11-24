export const BASE_URL =   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  let responseBody;
  try {
    responseBody = await response.json(); // Intenta parsear como JSON
  } catch (error) {
    responseBody = await response.text(); // Si falla, asume que es texto plano
  }

  if (!response.ok) {
    throw new Error(
      typeof responseBody === "string"
        ? responseBody // Muestra texto si es texto plano
        : responseBody?.message || "An error occurred"
    );
  }

  return responseBody;
};