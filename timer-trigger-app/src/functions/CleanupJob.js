const { app } = require('@azure/functions');

app.timer('CleanupJob', {
    schedule: '*/3 * * * * *',
    handler: (myTimer, context) => {
        context.log(`cleanup job ran at ${new Date().toISOString()}`);
    }
});
