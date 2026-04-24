const con = require("./db_connect")

async function createUserTable(){
    let sql = `
        CREATE TABLE IF NOT EXISTS user (
        userId INT AUTO_INCREMENT,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(25) NOT NULL,
        CONSTRAINT userPK PRIMARY KEY(userId)
        ); `
    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
        SELECT * FROM user;
        `
        await con.query(sql)
}

module.exports = { getAllUsers }