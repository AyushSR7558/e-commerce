import express from 'express';
import cors from "cors"
import {shared} from "@e-commerce/shared"

const app = express();

app.use(cors({
  origin: "*",
  allowedHeaders: ['Authorization', 'Authentication', 'Content-Type'],
}))

app.get('/', (req, res) => {
  console.log('REQUEST HIT');
  shared();
  res.send('OK');
});

app.listen(6001, () => {
  console.log('SERVER STARTED');
});
