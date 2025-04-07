const router = require('express').Router();
const jobController = require('../controllers/jobController');
const {verifyToken, verifyAndAuth, verifyCompany} = require('../middleware/verifyToken');

router.post('/', verifyAndAuth, jobController.createJob);

router.put('/:id', verifyAndAuth, jobController.updateJob);

router.delete('/:id', verifyAndAuth, jobController.deleteJob);

router.get('/:id', jobController.getJob);

router.get('/search/:key', jobController.searchJobs);

router.get('/', jobController.getAllJobs);

module.exports = router;