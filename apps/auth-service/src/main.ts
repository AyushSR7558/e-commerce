import express from 'express';
import cors from "cors"
import {errorHandler} from "@e-commerce/shared"
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: "*",
  allowedHeaders: ['Authorization', 'Authentication', 'Content-Type'],
}))
app.use(cookieParser());


app.listen(6001, () => {
  console.log('SERVER STARTED');
});
