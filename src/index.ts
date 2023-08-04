
import http from 'http';
import dotenv from "dotenv";

import app from "./app";
import database from './db';

dotenv.config();


const port = process.env.SERVER_PORT ?? 3000;
const server = http.createServer(app);

database.once('connected', () => {
  console.log('🗃️  Database Connected');
});
server.listen(port, () => console.log(`🚀 App listening on port ${port}`));