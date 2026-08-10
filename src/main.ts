import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './config/database';

const app = express();
app.use(express.json());

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PLK Ecommerce API',
      version: '1.0.0',
      description: 'Documentación de endpoints de la API de PLK Ecommerce',
    },
    servers: [{ url: `http://localhost:${Number(process.env.APP_PORT) || 3000}` }],
  },
  apis: ['./src/modules/**/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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