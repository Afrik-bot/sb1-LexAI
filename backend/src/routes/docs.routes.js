import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../config/swagger.js';

export function setupDocsRoutes(router) {
  const docsRouter = Router();
  
  docsRouter.use('/docs', swaggerUi.serve);
  docsRouter.get('/docs', swaggerUi.setup(swaggerOptions));
  
  router.use(docsRouter);
}