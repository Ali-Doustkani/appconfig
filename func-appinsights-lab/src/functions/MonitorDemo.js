const { app } = require('@azure/functions');

app.http('MonitorDemo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
	const shouldFail = request.query.get('fail') === 'true';
	context.log(`MonitorDemo invoked. fail=${shouldFail}`);
	if (shouldFail) {
		context.error('simulated failure path hit');
		throw new Error('simulated faillure: ?fail=true was passed');
	}

	return {
		status: 200,
		jsonBody: {
			message: 'Success',
			timestamp: new Date().toISOString()
		}
	};
	    
        
    }
});
