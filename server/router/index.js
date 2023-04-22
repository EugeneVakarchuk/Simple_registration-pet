const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { body } = require('express-validator');

// Create new root router

const router = new Router();




// All routes
// /registration route have validation
// /users route have authMiddleware which checks if user is logged.

router.post('/registration',
  body('username').isLength({ min: 4, max: 16 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 16 }),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users',
  authMiddleware,
  userController.getUsers)

module.exports = router;