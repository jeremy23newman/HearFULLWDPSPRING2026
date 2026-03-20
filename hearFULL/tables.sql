CREATE TABLE IF NOT EXISTS user (
    userId INT AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(25) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userId)
);

CREATE TABLE IF NOT EXISTS review (
    reviewId INT AUTO_INCREMENT,
    userId INT NOT NULL,
    songName VARCHAR(50),
    albumName VARCHAR(50),
    artistName VARCHAR(50) NOT NULL,
    rating INT NOT NULL, 
    content VARCHAR(255),
    date VARCHAR(50) NOT NULL
    CONSTRAINT reviewPK PRIMARY KEY(reviewId),
    CONSTRAINT userFK FOREIGN KEY(userId) REFERENCES user(userId)
);

CREATE TABLE IF NOT EXISTS reply(
    replyId INT AUTO_INCREMENT,
    userId INT NOT NULL,
    reviewId INT NOT NULL,
    approvalStatus BOOLEAN NOT NULL,
    content VARCHAR(255),
    date VARCHAR(50) NOT NULL
    CONSTRAINT replyPK PRIMARY KEY(replyId),
    CONSTRAINT userFK FOREIGN KEY(userId) REFERENCES user(userId),
    CONSTRAINT reviewFK FOREIGN KEY(reviewId) REFERENCES review(reviewId)
);