const { app } = require('@azure/functions');

app.http('GetDbConnection', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
	context.log(`secret: ${process.env.DB_CONNECTION}`);
	return { body: process.env.DB_CONNECTION };
    }
});
