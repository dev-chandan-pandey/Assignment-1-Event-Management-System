// const express = require('express');
// const { createEvent, getEvents, getEventReport } = require('../controllers/eventController');
// const { protect } = require('../middlewares/authMiddleware');

// const router = express.Router();

// router.route('/').post(protect, createEvent).get(getEvents);
// router.route('/:id/report').get(protect, getEventReport);

// module.exports = router;
const express = require('express');
const { createEvent, getEvents, getEventById, getEventReport } = require('../controllers/eventController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createEvent).get(getEvents);
router.route('/:id').get(protect, getEventById);  // New route to get event by ID
router.route('/:id/report').get(protect, getEventReport);

module.exports = router;
