const { app, input } = require('@azure/functions');

const rulesInput = input.storageBlob({
	path: 'rules/rules.json',
	connection: 'AzureWebJobsStorage',
});

app.storageBlob('applyRules', {
    path: 'incoming/{name}',
    connection: 'AzureWebJobsStorage',
	source: 'eventGrid',
	extraInputs: [rulesInput],
    handler: (blob, context) => {
	    const rules = context.extraInputs.get(rulesInput);
	    context.log(`Rules: ${rules}`);
        context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
    }
});
