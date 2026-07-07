const { app } = require('@azure/functions');

app.storageQueue('processOrder', {
    queueName: 'orders',
    connection: 'AzureWebJobsStorage',
    handler: (queueItem, context) => {
        context.log(`processing order ${JSON.stringify(queueItem)}`);
    }
});
