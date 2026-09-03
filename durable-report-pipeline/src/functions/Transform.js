const df = require('durable-functions')
df.app.activity('Transform', {
	handler: async (input, context) => {
		context.log(`Transform received: ${JSON.stringify(input)}`)
		return `transformed:${JSON.stringify(input)}`
	}
})
