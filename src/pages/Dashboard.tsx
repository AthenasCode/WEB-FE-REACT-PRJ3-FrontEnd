import { Main } from "../layout/Main";
import { TotalValueByClientGraph } from "../components/TotalValueByClientGraph";
import { useGetOpp } from "../hooks/useGetOpp";
import { calcTotalValueByClient } from "../utils/dashboardUtils";

const Dashboard = () => {
  const { data, error, isLoading } = useGetOpp();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const graphDataTotalValueByClient = Array.isArray(data) ? calcTotalValueByClient(data) : Promise.reject(new Error("Invalid data format"));

  return (
    <Main>
      <div className="container mx-auto p-4">
        <h1 className="text-blue-900 text-2xl font-bold mb-4 flex items-center">Dashboard</h1>
        <p>Clientes: Valor Estimado vs Ejecutado</p>
        <TotalValueByClientGraph data={graphDataTotalValueByClient}/>
      </div>
    </Main>
  );
};

export default Dashboard;
