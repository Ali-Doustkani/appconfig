const { app } = require('@azure/functions');

app.storageBlob('app1', {
    path: 'uploads/{name}',
    connection: 'AzureWebJobsStorage',
    source: 'eventGrid',
    handler: (blob, context) => {
        context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
    }
});
