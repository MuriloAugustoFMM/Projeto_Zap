const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/',taskController.getTasks);
router.get('/:id',taskController.getTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.updateStatusTask);
router.post('/', taskController.createTask);
router.delete('/:id',taskController.deleteTask);

module.exports = router;