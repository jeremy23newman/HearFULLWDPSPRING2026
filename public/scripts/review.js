let reviewForm = document.getElementById("reviewForm")

if(reviewForm) reviewForm.addEventListener('submit', review)
    function review(e){
    e.preventDefault()

    let musicname = document.getElementById("musicname").value
    let artistname = document.getElementById("artistname").value
    let ratingnumb = document.getElementById("ratingnumb").value
    let description = document.getElementById("description").value

    const review = {
        musicname: musicname,
        artistname: artistname,
        ratingnumb: ratingnumb,
        description: description
    }

    console.log(review)
}