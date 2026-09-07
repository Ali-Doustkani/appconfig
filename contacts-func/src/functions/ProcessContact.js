const { app } = require('@azure/functions');
const {TableClient} = require('@azure/data-tables')

const tableClient = TableClient.fromConnectionString(process.env.AzureWebJobsStorage, 'Contacts')

app.storageBlob('ProcessContact', {
    path: 'incoming/{name}',
    connection: 'AzureWebJobsStorage',
    source: 'eventGrid',
    handler: async (blob, context) => {
	const etag = context.triggerMetadata.eTag
	    const {email,name}=JSON.parse(blob.toString())
	    let existing
	    try{
		    existing=await tableClient.getEntity('contact', email)
	    }catch(err){
		    if(err.statusCode!==404)throw err
	    }
	    if(existing && existing.BlobEtag === etag){
		    context.log(`duplicate event, skipping: ${email}`)
		    return
	    }
	context.log(`processing contact ${email}, etag ${etag}`)
	    await tableClient.upsertEntity({
		    partitionKey: 'contact',
		    rowKey: email,
		    Name: name,
		    BlobEtag: etag
	    }, 'Replace')
	    context.log(`created contact: ${email}`)
    
});
