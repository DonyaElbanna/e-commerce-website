const Guest = require('../models/guest.model');
// const { default: guestService } = require('../services/guest.service');
const AppError = require('../utils/AppError.util');
const addGuest = async(req, res) => {
    // const guest = new Guest(req.body)
    // await guest.save()
    // res.status(201).send(guest)
    // const guest = await guestService.addGuest(req.body)
     res.status(201).json({guest:guest})
}

const getGuest = async(req, res, next) => {
    const guest = await Guest.findById({_id:req.params.id})
    if (!guest) {
        return next(new AppError('No guest found with this id', 404))
    }
    res.status(200).send(guest) 
}

const getAllGuests = async(req, res, next) => {
    const guests = await Guest.find({})
    res.status(200).send(guests)
}

const updateGuest = async(req, res, next) => {
    const guest = await Guest.findByIdAndUpdate({_id:req.params.id}, req.body)
    if (!guest) {
        return next(new AppError('No guest found with this id', 404))
    }

    const newGuest = await Guest.findById({_id:req.params.id})

    if(JSON.stringify(newGuest) === JSON.stringify(guest)) {
        return next(new AppError('No Thing updated here, Check Your data !', 400))
    }

    res.status(200).send(newGuest)
}

const deleteGuest = async(req, res, next) => {
    const guest = await Guest.findByIdAndDelete({_id:req.params.id})
    if (!guest) {
        return next(new AppError('No guest found with this id', 404))
    }
    res.status(200).send("Guest Removed Successfully")
}

module.exports = {addGuest, getGuest, getAllGuests, updateGuest, deleteGuest}