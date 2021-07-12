import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { env } from './env';
import express from 'express';

createConnection({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: 'pog',
})
  .then(async (connection) => {
    console.log(
      connection.isConnected ? 'DB is CONNECTED' : 'Trouble connecting to DB'
    );
  })
  .catch((e: Error) => console.log(`Error: ${e.message}`));

const app = express();

app.listen(env.PORT, () => {
  console.log(`Server started on http://localhost:${env.PORT}`);
});
