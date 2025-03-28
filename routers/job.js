const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require('../middleware/verifyToken');

router.post('/', verifyAndAdmin, jobController.createJob);

router.put('/:id', verifyAndAdmin, jobController.updateJob);

router.delete('/:id', verifyAndAdmin, jobController.deleteJob);

router.get('/:id', jobController.getJob);

router.get('/search/:key', jobController.searchJobs);

router.get('/', jobController.getAllJobs);

module.exports = router;