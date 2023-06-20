const express = require('express');
const { addGuest, getGuest, getAllGuests, updateGuest, deleteGuest } = require('../controllers/guest.controller');

const router = express.Router();

router.post('/', addGuest)

router.get('/', getAllGuests)

router.get('/:id', getGuest)

router.put('/:id', updateGuest)

router.delete('/:id', deleteGuest)



module.exports = router;