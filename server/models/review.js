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
        date TIMESTAMP NOT NULL,
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
    await con.query(sql)
}

module.exports = { getAllReviews }