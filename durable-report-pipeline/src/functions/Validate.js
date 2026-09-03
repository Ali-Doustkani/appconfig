const df = require('durable-functions')
df.app.activity('Validate', {
	handler: async (input, context) => {
		context.log(`Validate received: ${JSON.stringify(input)}`)
		return `validated: ${JSON.stringify(input)}`
	}
})
		
