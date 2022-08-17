import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import readDir from './helpers/handle-routes';
import db from './database/config';
import express from 'express';
import { IDirInfo } from './interfaces/readDir';

class Server {
  private app;
  private port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // Connect to database
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Routes
    this.apiRoutes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  async apiRoutes() {
    // This handles the automatic creation of routes by taking files ending with "_route" in the routes folder
    const _route = '/api';
    const _path = path.join(__dirname, 'routes');
    const _replace = '_route';
    const routes = (await readDir(_path, _replace)) as IDirInfo[];

    routes.map((route) => {
      const apiPath = path.join(_route, route.name).replace(/[\\]/g, '/');
      const filePath = path.join(_path, route.filename);

      // import file from `${filePath}`;

      import(`${filePath}`).then((file) => this.app.use(apiPath, file));
    });
  }

  middlewares() {
    // Cors
    this.app.use(
      cors({
        origin: process.env.WEB_URL || 'http://localhost:3000',
        credentials: true,
      }),
    );

    // Reading and parsing of body
    this.app.use(express.json());

    // Cookie parsing
    this.app.use(cookieParser());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port:', this.port);
    });
  }
}

export default Server;
