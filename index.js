import express from 'express';
import 'express-async-errors';
import 'airbnb-browser-shims';
import routes from './server/routes/routes';

const app = express();

routes(app);

const port = process.env.PORT || 3000;
console.log(`Server Running on port ${port}`);
const server = app.listen(port);
export default server;
