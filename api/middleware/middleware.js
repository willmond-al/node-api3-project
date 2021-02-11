const Posts = require('../posts/posts-model')
const Users = require('../users/users-model')

function logger(req, res, next) {
  // do your magic!\
  const timeStamp = new Date()
  console.log(timeStamp)
  next()
}

const validateUserId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params
  try{
    const user = await Users.getById(id)
    if(!user){
      res.status(400).json({message: `no user with id: ${id}`})
    } else {
      req.user = user
      next()
    }
  } catch(err) {
    res.status(500).json(`server error: ${err}`)
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json('missing user data')
  } else if (!req.body.name) {
    res.status(400).json('user missing name')
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json('missing post data')
  } else if (!req.body.text) {
    res.status(400).json('post missing text')
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}