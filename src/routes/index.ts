import express from 'express';
const router = express.Router();
router.get('/', function(_req, res, _next) {
  res.render('index', { title: 'premier league' });
});
export default router;
