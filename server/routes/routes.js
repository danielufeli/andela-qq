import bodyParser from 'body-parser';
import users from './users';
import loans from './loans';

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/loans', loans);
};
