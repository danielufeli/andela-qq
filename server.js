import express from 'express';
import 'airbnb-browser-shims';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Quick Credit');
});

const port = process.env.PORT || 3000;
console.log(`Server Running on port ${port}`);
const server = app.listen(port);
export default server;
