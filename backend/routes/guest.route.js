const express = require('express');
const { addGuest, getGuest, getAllGuests, updateGuest, deleteGuest } = require('../controllers/guest.controller');
const { extractJwtAdminFromCookie } = require('../middlewares/tokenextractor.middleware');

const router = express.Router();

router.get('/:id', getGuest)
router.post('/', addGuest)

//admin route
router.get('/',extractJwtAdminFromCookie, getAllGuests)
router.put('/:id', extractJwtAdminFromCookie, updateGuest)
router.delete('/:id',extractJwtAdminFromCookie, deleteGuest)



module.exports = router;