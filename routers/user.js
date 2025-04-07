const router = require('express').Router();
const userController = require('../controllers/userController');

router.put('/:id', userController.updateUser);

router.delete('/:id',  userController.deleteUser);

router.get('/:id',userController.getUser);

router.get('/', userController.getAllUser);

module.exports = router;