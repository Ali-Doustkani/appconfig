const {app} = require('@azure/functions')
const df = require('durable-functions')

app.http('HttpStart', {
	route: 'orchestrators/{orchestratorName}',
	extraInputs: [df.input.durableClient()],
	handler: async(request, context) => {
		const client = df.getClient(context)
		const body = await request.text()
		const instanceId = await client.startNew(request.params.orchestratorName, { input: body })
		context.log(`started orchestration with id = '${instanceId}'.`)
		return client.createCheckStatusResponse(request, instanceId)
	},
})
