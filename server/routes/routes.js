import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import users from './users';
import adminusers from './adminusers';
import loans from './loans';
import swaggerSpec from '../../config/swagger';

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/users', adminusers);
  app.use('/api/v1/loans', loans);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
