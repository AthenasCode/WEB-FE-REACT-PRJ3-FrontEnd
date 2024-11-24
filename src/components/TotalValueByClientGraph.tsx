import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
export function TotalValueByClientGraph(props: any) {
    const series = [
        {
            name: "Valor total estimado",
            data: props.data.map(
                (client: { totalEstimatedValue: any }) => client.totalEstimatedValue
            ),
        },
        {
            name: "Valor total ejecutado",
            data: props.data.map(
                (client: { totalExecutedValue: any }) => client.totalExecutedValue
            ),
        },
    ];
    const options: ApexOptions = {
        chart: {
            type: "bar" as const,
        },
        xaxis: {
            categories: props.data.map(
                (client: { clientName: any }) => client.clientName
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
    };
    return (
        <Chart options={options} series={series} type="bar" />
    );
}