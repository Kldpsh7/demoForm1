const path = require('path');

const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/',indexController.getIndex);
router.get('/getAppointments',indexController.getAppointments);
router.post('/postAppointment',indexController.postAppointments);
router.post('/deleteAppointment',indexController.deleteAppointments);
router.post('/editAppointment',indexController.editAppointments);

module.exports = router;