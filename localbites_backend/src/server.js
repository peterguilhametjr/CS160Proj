import Hapi from '@hapi/hapi';
import routes from './routes';
import { db } from './database';

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000,
        host: 'localhost',
    });

    routes.forEach(route => server.route(route));

    try {
        await db.connect(); // Connect to MySQL before starting the server
        await server.start();
        console.log(`Server is listening on ${server.info.uri}`);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');
    try {
        await server.stop({ timeout: 1000 });
        db.end();
        console.log('Server Stopped');
        process.exit(0);
    } catch (err) {
        console.error('Error stopping server:', err);
        process.exit(1);
    }
});

start();
