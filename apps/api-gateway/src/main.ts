/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { urlencoded } from 'express';
import * as path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import proxy from "express-http-proxy";
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Authentication', 'Content-Type'],
  }),
);

// app.use(morgan('dev')); // This is the middle ware which will log the req
// app.use(express.json({ limit: '100mb' }));// We are limiting the size of the request body
// app.use(urlencoded({ limit: '100mb', extended: true }));
// app.use(cookieParser());// Parsing the cookie 
// app.set("trust proxy", 1);

  app.use(morgan('dev'));// This will log the request. So that it will be easier for debugging
  app.use(express.json({limit:'100mb'})); // We are limiting the size of the request body
  app.use(urlencoded({limit: '100mb', extended: true}));
  app.set("trust proxy", 1);
  app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => 100,
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip!,
});

app.use(limiter);

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use("/", proxy("http://127.0.0.1:6001"))

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
