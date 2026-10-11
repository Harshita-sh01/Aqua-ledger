const express = require('express');
const { dispatch, getActive } = require('../controllers/alertController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
router.get('/active', protect, authorize('admin', 'dispatch_operator'), getActive);
router.post('/:id/dispatch', protect, authorize('admin', 'dispatch_operator'), dispatch);
module.exports = router;
