import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import db from './database/config';
import dbInit from './database/init';
import entryRouter from './api/routes/entry_route';
import userRouter from './api/routes/user_route';
import authRouter from './api/routes/auth_route';
import accountRouter from './api/routes/account_route';

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
      dbInit();
      // db.sync({ force: true });
      console.log('Database online');
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  async apiRoutes() {
    this.app.use('/entry', entryRouter);
    this.app.use('/account', accountRouter);
    this.app.use('/user', userRouter);
    this.app.use('/auth', authRouter);
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
