const express = require("express")
const router = express.Router()
const Review = require("../models/review")

router.get('/getAllReviews', async(req, res) =>{
    try{
        const reviews = await Review.getAllReviews()
        res.send(reviews)
    } catch(err){
        res.status(401).send({message: err.message})
    }
})

module.exports = router