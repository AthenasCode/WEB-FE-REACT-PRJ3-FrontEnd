import { Main } from "../layout/Main";
import { TotalValueByClientGraph } from "../components/TotalValueByClientGraph";
import { OpportunitiesByBusinessLineGraph } from "../components/OpportunitiesByBusinessLineGraph";
import { useGetOpp } from "../hooks/useGetOpp";
import { calcTotalValueByClient, calcOpportunitiesByBusinessLine } from "../utils/dashboardUtils";

const Dashboard = () => {
  const { data, error, isLoading } = useGetOpp();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const graphDataTotalValueByClient = Array.isArray(data) ? calcTotalValueByClient(data) : Promise.reject(new Error("Invalid data format"));

  const graphDataOpportunitiesByBusinessLine = Array.isArray(data)
  ? calcOpportunitiesByBusinessLine(data)
  : Promise.reject(new Error("Invalid data format"));

  return (
    <Main>
      <div className="flex justify-center items-center min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-blue-900 text-2xl font-bold mb-4 flex items-center">Dashboard</h1>
          <TotalValueByClientGraph data={graphDataTotalValueByClient} />
          <OpportunitiesByBusinessLineGraph data={graphDataOpportunitiesByBusinessLine} />
        </div>
      </div>
    </Main>
  );
};

export default Dashboard;
