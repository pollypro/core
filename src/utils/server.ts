import { Application } from 'express';
import http from 'http';

const normalizePort = (value: string) => {
  const port = parseInt(value, 10);

  // Named pipe
  if (isNaN(port)) { return value; }

  // Port is a number
  if (port >= 0) { return port; }

  return false;
}

export const runApp = (app: Application) => {
  const port = normalizePort(process.env.PORT || '3011');
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port);

  // TODO: fix the error type
  server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  });
}
