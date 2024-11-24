import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home"; // Ajusta la ruta según tu estructura
import { useGetClients } from "../hooks/useGetClients"; // Mockearemos este hook

jest.mock("../hooks/useGetClients"); // Mock del hook personalizado
const mockUseGetClients = useGetClients as jest.Mock;

describe("Home Component", () => {
  beforeEach(() => {
    // Mock del hook para devolver datos de prueba
    mockUseGetClients.mockReturnValue({
      data: [
        {
          id: "1",
          nit: "123456",
          name: "Cliente 1",
          direction: "Dirección 1",
          city: "Ciudad 1",
          country: "País 1",
          email: "cliente1@example.com",
          active: true,
          contacts: [],
        },
        {
          id: "2",
          nit: "654321",
          name: "Cliente 2",
          direction: "Dirección 2",
          city: "Ciudad 2",
          country: "País 2",
          email: "cliente2@example.com",
          active: false,
          contacts: [],
        },
      ],
    });
  });

  describe("Static elements rendering", () => {
    test("renders the title", () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const title = screen.getByText(/Lista de Clientes/i);
      expect(title).toBeInTheDocument();
    });

    test("renders the add client button", () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const addClientButton = screen.getByText(/\+ Añadir Cliente/i);
      expect(addClientButton).toBeInTheDocument();
    });
  });

  describe("DataGrid functionality", () => {
    test("renders clients in the DataGrid", () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const firstClient = screen.getByText("Cliente 1");
      const secondClient = screen.getByText("Cliente 2");

      expect(firstClient).toBeInTheDocument();
      expect(secondClient).toBeInTheDocument();
    });

    test("toggles the active status of a client", () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const toggleButton = screen.getByText(/Desactivar/i);
      expect(toggleButton).toBeInTheDocument();

      // Simula el click para cambiar el estado
      fireEvent.click(toggleButton);

      // Verifica que el texto del botón cambió
      expect(toggleButton).toHaveTextContent(/Activar/i);
    });
  });

  describe("Navigation links", () => {
    test("renders the edit client button with correct styles when active", () => {
        render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      
        // Obtén todos los botones con el texto "Editar"
        const editButtons = screen.getAllByRole("button", { name: /Editar/i });
      
        // Verifica que al menos hay uno presente
        expect(editButtons).toHaveLength(2);
      
        // Verifica el estilo del primer botón
        expect(editButtons[0]).toHaveStyle("background-color: #6b5b95");
      });

      test("edit button is disabled for inactive clients", () => {
        render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      
        // Obtén el botón del cliente inactivo con id "2"
        const inactiveEditButton = screen.getByTestId("edit-button-2");
      
        // Verifica que está deshabilitado y tiene los estilos correspondientes
        expect(inactiveEditButton).toBeDisabled();
        expect(inactiveEditButton).toHaveStyle("cursor: not-allowed");
      });
  });

  describe("LocalStorage functionality", () => {
    test("saves clients to localStorage when data is available", () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const savedData = localStorage.getItem("clients");
      expect(savedData).not.toBeNull();
      const parsedData = JSON.parse(savedData!);
      expect(parsedData.length).toBe(2);
    });

    test("loads clients from localStorage if no data is available", () => {
      // Borra datos mockeados del hook para simular que no hay datos
      mockUseGetClients.mockReturnValue({ data: null });
      localStorage.setItem(
        "clients",
        JSON.stringify([
          {
            id: "3",
            nit: "789101",
            name: "Cliente 3",
            direction: "Dirección 3",
            city: "Ciudad 3",
            country: "País 3",
            email: "cliente3@example.com",
            active: true,
            contacts: [],
          },
        ])
      );

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const clientFromStorage = screen.getByText("Cliente 3");
      expect(clientFromStorage).toBeInTheDocument();
    });
  });
});
