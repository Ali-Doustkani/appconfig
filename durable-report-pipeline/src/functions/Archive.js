const df = require('durable-functions')

df.app.activity('Archive', {
	handler: async(input, context) => {
		context.log(`Archive received: ${JSON.stringify(input)}`)
		return `archived:${JSON.stringify(input)}`
	}
})
