const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.patch('/:id', noteController.changeNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
