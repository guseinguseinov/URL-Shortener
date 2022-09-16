import http, { Server } from "http";
import app from './app';

const port: number = Number(process.env.PORT) || 8080;
const server: Server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listen to http://localhost:${port}`);
})