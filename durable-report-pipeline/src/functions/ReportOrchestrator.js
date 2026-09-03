const df = require('durable-functions')
df.app.orchestration('ReportOrchestrator', function*(context){
	const input = context.df.getInput()
	const validateResult = yield context.df.callActivity('Validate', input)
	const transformResult = yield context.df.callActivity('Transform', validateResult)
	const archiveResult = yield context.df.callActivity('Archive', transformResult)
	return archiveResult
})
