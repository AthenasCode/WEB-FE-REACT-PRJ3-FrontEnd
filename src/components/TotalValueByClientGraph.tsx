import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useGetClients } from "../hooks/useGetClients";

export function TotalValueByClientGraph(props: any) {
    const data = Array.isArray(props.data) ? props.data : [];
    const { data: clientsData } = useGetClients();

    const series = [
        {
            name: "Valor total estimado",
            data: data.map(
                (client: { totalEstimatedValue: any }) => client.totalEstimatedValue
            ),
        },
        {
            name: "Valor total ejecutado",
            data: data.map(
                (client: { totalExecutedValue: any }) => client.totalExecutedValue
            ),
        },
    ];
    const options: ApexOptions = {
        chart: {
            type: "bar" as const,
        },
        xaxis: {
            categories: data.map(
                (client: { clientId: any }) => {
                    const clientInfo = clientsData?.find((c: { id: any }) => c.id === client.clientId);
                    return clientInfo ? clientInfo.name : "Desconocido";
                }
            ),
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        yaxis: {
            title: {
                text: "Valor",
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val: any) {
                    return `$${val}`;
                },
            },
        },
        title: {
            text: "Valor Total Estimado vs Valor Total Ejecutado en Oportunidades",
            align: "center",
        },
    };
    return (
        <Chart options={options} series={series} type="bar" height={650} width={1000} />
    );
}