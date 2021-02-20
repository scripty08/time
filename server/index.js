import { Server, IndexController } from '@scripty/server';
import dotenv from 'dotenv'
import { mongo } from '@scripty/mongo';
import { AuthController } from '@scripty/auth';
import { TimesController } from './times/TimesController';

const init = async () => {
  dotenv.config();

  let server = new Server();

  const mongoConfig = {
    server: process.env.server,
    db: process.env.db,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port || 27017,
    options: {
      "encrypt": true
    }
  };

  const mongoose = await mongo(mongoConfig);

  await server.setDatabase(mongoose);
  await server.addController(new AuthController());
  await server.addController(new IndexController({ title: '@scripty/time' }));
  await server.addController(new TimesController());
  server.start(3001);
};

init().catch((err) => {
  console.error(err.message);
});
