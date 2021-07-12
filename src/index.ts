import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { env } from './env';
import express from 'express';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Logger from './logger';

createConnection({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['src/models/*.js'],
  synchronize: env.NODE_ENV == 'development',
  dropSchema: env.NODE_ENV == 'development',
  namingStrategy: new SnakeNamingStrategy(),
})
  .then(async (connection) => {
    Logger.info(
      connection.isConnected ? 'DB is CONNECTED' : 'Trouble connecting to DB'
    );
  })
  .catch((e: Error) => Logger.error(`${e.message}`));

const app = express();

app.listen(env.PORT, () => {
  Logger.info(`🚀 Server started on http://localhost:${env.PORT}`);
});
