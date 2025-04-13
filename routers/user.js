const router = require('express').Router();
const {verifyToken, verifyAndAuth, verifyCompany} = require('../middleware/verifyToken');
const userController = require('../controllers/userController');

router.put('/', verifyAndAuth,  userController.updateUser);

router.delete('/:id', verifyAndAuth, userController.deleteUser);

router.get('/', verifyAndAuth, userController.getUser);

// router.get('/', userController.getAllUser);

// add skill
router.post('/skills', verifyAndAuth,  userController.addSkills);

// get skill
router.get('/skills', verifyAndAuth,  userController.getSkills);

// delete skill
router.delete('/skills/:id', verifyAndAuth,  userController.deleteSkills);

module.exports = router;