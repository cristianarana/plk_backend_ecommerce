import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { connectDatabase } from './config/database';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function bootstrap() {
  await connectDatabase();

  const PORT = Number(process.env.APP_PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`PLK ecommerce backend escuchando en el puerto ${PORT}`);
  });
}

void bootstrap();