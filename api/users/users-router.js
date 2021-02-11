const express = require('express');

const Users = require('./users-model')

const router = express.Router();
const mw = require('../middleware/middleware');
const Posts = require('../posts/posts-model');

router.get('/', mw.logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'error retrieving users'
    })
  })
});

router.get('/:id', mw.logger, mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', mw.logger, mw.validateUser, (req, res) => {

  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'error adding the user'
    })
  })
});

router.put('/:id', mw.logger, mw.validateUserId, mw.validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'error updating user'
    })
  })
});

router.delete('/:id', mw.logger, mw.validateUserId, (req, res) => {

  Users.remove(req.params.id)
  .then(resp => {
    res.status(200).json({message: `user id ${req.params.id} is gone`})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'error removing user'
    })
  })
});

router.get('/:id/posts', mw.logger, mw.validateUserId, (req, res) => {

    Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `error getting posts for user id:${req.params.id}`
      })
    })
});

router.post('/:id/posts', mw.logger, mw.validateUserId, mw.validatePost, (req, res) => {

  const postInfo = {...req.body, user_id: req.params.id}
  Posts.insert(postInfo)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('could not add post')
  })
});

module.exports = router
