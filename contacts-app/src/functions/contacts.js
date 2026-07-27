const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

const tableClient = TableClient.fromConnectionString(process.env.AzureWebJobsStorage, 'Contacts');

app.storageBlob('contacts', {
    path: 'incoming/{name}',
    connection: 'AzureWebJobsStorage',
    source: 'eventGrid',
    handler: async (blob, context) => {
	   
        const contact = JSON.parse(blob.toString());
	    context.log(JSON.stringify({email: contact.email, name: contact.name, etag}));
	    context.log('triggerMetadata:', JSON.stringify(context.triggerMetadata));
	    const etag = context.triggerMetadata.properties.eTag;

	   try{
		   const existing = await tableClient.getEntity('contact', contact.email);
		   if(existing.blobEtag === etag){
			   context.log(`duplicate event, skipping ${contact.email}`);
			   return;
		   }
	      }
	      catch(err){
		      if(err.statusCode !== 404 ) throw err;
	      }

	    await tableClient.upsertEntity({
		    partitionKey: 'contact',
		    rowKey: contact.email,
		    name: contact.name,
		    blobEtag: etag
	    });
	    context.log(`created contact: ${contact.email}`);
    }
});
