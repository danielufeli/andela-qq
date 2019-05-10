import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('You have reached the homepage of Quick Credit Visit: https://danielufeli.github.io/andela-qq/UI/ to view our UI'));

export default router;
