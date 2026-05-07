import { fetchData } from "./main.js"
import{getCurrentUser} from "./user.js"
document.addEventListener("DOMContentLoaded", () => {

    const reviewForm = document.getElementById("reviewForm")

    console.log("reviewForm:", reviewForm)

    if(reviewForm){
        reviewForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            console.log("SUBMIT FIRED")
        })
    }
})
let reviewForm = document.getElementById("reviewForm")
let currentUser = await getCurrentUser()

if(reviewForm) reviewForm.addEventListener('submit', review)
    async function review(e){
    e.preventDefault()

    let songName = document.getElementById("songname").value
    let albumName = document.getElementById("albumname").value
    let artistName = document.getElementById("artistname").value
    let rating = document.getElementById("ratingnumb").value
    let content = document.getElementById("description").value
    let userId = currentUser?.userId

    const review = {
        songName: songName,
        albumName: albumName,
        artistName: artistName,
        rating: rating,
        content: content,
        userId: userId
    }
    try{
        const data = await fetchData("/reviews/createReview", review, 'POST')
        document.getElementById("status").innerText = data.message
        console.log(data)
    } catch(err){
        console.log(err)
    }

    console.log(review)
}