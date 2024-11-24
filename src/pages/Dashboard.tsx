import { useGetTotalValueByClient } from "../hooks/useGetTotalValueByClient";
import { Main } from "../layout/Main";
import { TotalValueByClientGraph } from "../components/TotalValueByClientGraph";

const Dashboard = () => {
  const { data, error, isLoading } = useGetTotalValueByClient();
  const graphDataTotalValueByClient = data?.totalValueByClient;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


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
