const { app } = require('@azure/functions');

app.storageBlob('ProcessUpload', {
    path: 'incoming/{name}',
    connection: 'AzureWebJobsStorage',
    return: app.output.storageBlob({
	    path: 'processed/{name}-report.txt',
	    connection: 'AzureWebJobsStorage',
    }),
    handler: (blob, context) => {
	const name = context.triggerMetadata.name;
	const timestamp = new Date().toISOString();
        context.log(`Processed blob "${name}" with size ${blob.length} bytes`);
	return `Processed file: ${name} at ${timestamp}`;
    }
});
