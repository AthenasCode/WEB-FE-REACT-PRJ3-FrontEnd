import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export function OpportunitiesByStatusGraph(props: any) {
    const data = Array.isArray(props.data) ? props.data : [];

    const series = data.map(
        (item: { count: number }) => item.count
    );
    const labels = data.map(
        (item: { status: string }) => item.status
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
                    return `${val} oportunidades`; // Muestra los valores absolutos
                },
            },
        },

        title: {
            text: "Frecuencia de Oportunidades por estado",
            align: "center",
        },
    };

    return <Chart options={options} series={series} type="pie" height={650} width={1000} />;
}
