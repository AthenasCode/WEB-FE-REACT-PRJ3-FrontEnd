export  function calcTotalValueByClient(data: any):any {
    if (!Array.isArray(data)) {
        return Promise.reject(new Error("Invalid data format"));
    }
    const result: any = {};
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const clientId = element.client_id;
        const estimatedValue = parseFloat(element.estimated_value) || 0;
        const executedValue = element.status === "Finalizada" ? estimatedValue : 0;
        if (!result[parseInt(clientId)]) {
            result[parseInt(clientId)] = {
                clientId: parseInt(clientId),
                clientName: "",
                totalEstimatedValue: 0,
                totalExecutedValue: 0
            };
        }
        result[clientId].totalEstimatedValue += estimatedValue;
        result[clientId].totalExecutedValue += executedValue;
    }
    return Object.values(result);
}

export function calcOpportunitiesByBusinessLine(data: any): any {
    if (!Array.isArray(data)) {
        return Promise.reject(new Error("Invalid data format"));
    }

    const totalOpportunities = data.length;
    const businessLineCounts: Record<string, number> = {};

    data.forEach((item: { business_line: string }) => {
        const businessLine = item.business_line || "Desconocido";
        businessLineCounts[businessLine] = (businessLineCounts[businessLine] || 0) + 1;
    });

    const result = Object.entries(businessLineCounts).map(([businessLine, count]) => ({
        businessLine,
        count,
        percentage: (count / totalOpportunities) * 100,
    }));

    return result;
}
export function calcOpportunitiesByStatus(data: any): any {
    if (!Array.isArray(data)) {
        return Promise.reject(new Error("Invalid data format"));
    }

    const statusCounts: Record<string, number> = {};

    data.forEach((item: { status: string }) => {
        const status = item.status || "Desconocido";
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const result = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count,
    }));

    return result;
}