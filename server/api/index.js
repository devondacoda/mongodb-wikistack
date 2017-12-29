const router = require('express').Router();
const wikiRouter = require('./wiki');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/wiki', wikiRouter);

module.exports = router;
