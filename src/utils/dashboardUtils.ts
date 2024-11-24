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