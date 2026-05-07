const con = require("./db_connect")

async function createReviewTable(){
    let sql = `
        CREATE TABLE IF NOT EXISTS review (
        reviewId INT AUTO_INCREMENT,
        userId INT NOT NULL,
        songName VARCHAR(50),
        albumName VARCHAR(50),
        artistName VARCHAR(50) NOT NULL,
        rating INT NOT NULL, 
        content VARCHAR(255),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT reviewPK PRIMARY KEY(reviewId),
        CONSTRAINT userFK FOREIGN KEY(userId) REFERENCES user(userId)
        );`
        await con.query(sql)

}

createReviewTable()

async function getAllReviews(){
    let sql = `
    SELECT * FROM review;
    `
    let [result] = await con.query(sql)
    return result
}

async function createReview(review){
    let sql =`
    INSERT INTO review(userId, songName, albumName, artistName, 
    rating, content,date)
    VALUES(?, ?, ?, ?, ?, ?, NOW())`

    await con.query(sql, [review.userId,
        review.songName, 
        review.albumName, 
        review.artistName, 
        review.rating, 
        review.content])
    
    

}

async function getReviewsByArtistName(artistName){
    console.log(artistName)
    let sql =`
    SELECT songName, albumName, artistName, rating FROM review
    WHERE artistName = ?`

    let [result] = await con.query(sql, [artistName])

    return result

}

async function deleteReview(review){
    let sql =`
    DELETE FROM review
    WHERE reviewId = ?`

    await con.query(sql, [review.reviewId])
}

async function updateReview(review){
    let sql =`
    UPDATE review
    SET rating = ?, content =?
    WHERE reviewId =?;`

    await con.query(sql, [review.rating,
        review.content,
        review.reviewId])
}


module.exports = { getAllReviews, createReview, getReviewsByArtistName, deleteReview, updateReview }