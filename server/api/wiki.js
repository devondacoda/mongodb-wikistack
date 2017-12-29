const router = require('express').Router();
const { Page, User } = require('../models/');

router.route('/')
  .get((req, res) => {
    res.redirect('/');
  })
  .post((req, res) => {
    const page = new Page({
      title: req.body.title,
      content: req.body.content,
    });

    page.save()
      .then(() => res.redirect(page.route))
      .catch(error => res.render('error', {
        message: 'Could not complete request',
        error,
      }));
  });

router.get('/add', (req, res) => {
  res.render('addpage');
});

router.get('/:pageURL', (req, res, next) => {
  Page.findOne({ urlTitle: req.params.pageURL })
    .exec()
    .then(page => res.render('wikipage', {
      page,
    }))
    .catch(next);
});


module.exports = router;
