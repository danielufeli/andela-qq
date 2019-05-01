import bodyParser from 'body-parser';
import users from './users';

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
};
