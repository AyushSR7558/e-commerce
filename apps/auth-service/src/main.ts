import express from 'express';
import cors from 'cors';
import { Http2Server } from 'http2';
import { error } from 'console';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.use(
  cors({
    origin: ["*"],
    allowedHeaders: ['Authorization', 'Authentication', 'Content-Type'],
  }),
);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const server = app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on("error", (err) => {
  console.log("Server Error: ", err);
} )
