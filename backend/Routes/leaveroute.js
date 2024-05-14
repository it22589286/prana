const express = require('express');
const router = express.Router();
const {
    createLeave,
    getLeaves,
    getLeave,
    updateLeave,
    deleteLeave
} = require('../controllers/leavecontroller');

router.post('/create', createLeave);
router.get('/get', getLeaves);
router.get('/get/:id', getLeave);
router.put('/update/:id', updateLeave);
router.delete('/delete/:id', deleteLeave);

module.exports = router;
