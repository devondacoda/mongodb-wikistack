const router = require('express').Router();
const wikiRouter = require('./wiki');

router.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

router.get('/search', (req, res, next) => {
  res.render('searchpage');
});

router.use('/wiki', wikiRouter);

module.exports = router;
