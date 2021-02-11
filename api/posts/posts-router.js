const express = require('express');

const Posts = require('./posts-model')
const mw = require('../middleware/middleware')

const router = express.Router();

router.get('/', mw.logger, (req, res) => {

  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'error retrieving posts'
    })
  })
});

router.get('/:id', mw.validatePostId, mw.logger, (req, res) => {

  res.status(200).json(req.post)
});

module.exports = router