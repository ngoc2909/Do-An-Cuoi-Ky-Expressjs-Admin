var express = require('express');
var router = express.Router();

var admin = require('../controllers/admin');

// Create a new Note
router.post('/admin', admin.create);

// Retrieve all
router.get('/admin', admin.findAll);

// Retrieve a single
router.get('/admin/:adminId',admin.findOne);

// Update
router.put('/admin/:adminId', admin.update);

// Delete
router.delete('/admin/:adminId', admin.delete);

module.exports = router;
