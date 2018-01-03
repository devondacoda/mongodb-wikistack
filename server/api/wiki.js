const router = require('express').Router();
const { Page, User } = require('../models/');

router.route('/')
  .get((req, res) => {
    Page.find()
      .exec()
      .then(pages => res.render('index', {
        pages,
      }));
  })
  .post((req, res) => {
    const page = new Page({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    });

    const user = User.findOrCreate(req.body)
      .then(() => page.save())
      .then(() => res.redirect(page.route))
      .catch(error => res.render('error', {
        message: 'Could not complete request',
        error,
      }));
  });

router.get('/add', (req, res) => {
  res.render('addpage');
});

router.get('/search', (req, res, next) => {
  Page.findByTags(req.query.tags)
    .then(pages => res.render('index', { pages }))
    .catch(next);
});

router.get('/:pageURL', (req, res, next) => {
  Page.findOne({ urlTitle: req.params.pageURL })
    .exec()
    .then(page => res.render('wikipage', { page }))
    .catch(next);
});

router.get('/:pageURL/similar', (req, res, next) => {
  Page.findOne({ urlTitle: req.params.pageURL })
    .then(page => page.findSimilar())
    .then(pages => res.render('index', { pages }))
    .catch(next);
});

module.exports = router;
