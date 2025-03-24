const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.createUser);

// router.get('/:id', jobController.getJob);

// router.get('/search/:key', jobController.searchJobs);

// router.put('/:id', jobController.updateJob);

// router.delete('/:id', jobController.deleteJob);

// router.get('/', jobController.getAllJobs);

module.exports = router;