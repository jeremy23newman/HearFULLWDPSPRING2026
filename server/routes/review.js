const express = require("express")
const router = express.Router()
const Review = require("../models/review")

router
.get('/getAllReviews', async(req, res) =>{
    try{
        const reviews = await Review.getAllReviews()
        res.send(reviews)
    } catch(err){
        res.status(401).send({message: err.message})
    }
})

.post('/createReview', async(req, res) =>{
    try{
        await Review.createReview(req.body)
        res.send({
            message: "Review created successfully"})
    } catch(err){
        res.status(400).send({message: err.message})
    }
})


 .post('/getReviewsByArtistName', async(req, res) => {
    try {
        const artistName = req.body.artistName

        console.log("REQ BODY:", req.body)
        console.log("artistName in route:", artistName)

        const reviews = await Review.getReviewsByArtistName(artistName)

        res.send(reviews)
    } catch(err) {
        res.status(400).send({ message: err.message })
    }
})

 .patch('/updateReview', async(req, res) =>{
    try{
        const review = await Review.updateReview(req.body)
        res.send({message: "Review updated successfully" })
    } catch(err){
        res.status(400).send({message: err.message})
    }
 })

.delete('/deleteReview', async(req, res) =>{
    try{
        const review = await Review.deleteReview(req.body)
        res.send({message: "Review deleted successfully" })
    } catch(err){
        res.status(400).send({message: err.message})
    }
})


module.exports = router