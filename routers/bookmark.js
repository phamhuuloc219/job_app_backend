const router = require('express').Router();
const bookmarkController = require('../controllers/bookmarkController');

router.post('/', bookmarkController.createBookmark);

router.delete('/:id', bookmarkController.deleteBookmark);

router.get('/:userId', bookmarkController.getBookmarks);

module.exports = router;