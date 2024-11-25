import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export function OpportunitiesByBusinessLineGraph(props: any) {
    const data = Array.isArray(props.data) ? props.data : [];

    const series = data.map(
        (item: { percentage: number }) => item.percentage
    );
    const labels = data.map(
        (item: { businessLine: string }) => item.businessLine
    );

    const options: ApexOptions = {
        chart: {
            type: "pie",
            toolbar: {
                show: true, 
                tools: {
                    download: true, 
                },
            },
        },
        labels: labels,
        legend: {
            position: "bottom",
        },
        tooltip: {
            y: {
                formatter: function (val: any) {
                    return `${val.toFixed(2)}%`;
                },
            },
        },
        title: {
            text: "Porcentaje de Oportunidades por Línea de Negocio",
            align: "center",
        },
    };

    return <Chart options={options} series={series} type="pie" height={650} width={1000} />;
}
