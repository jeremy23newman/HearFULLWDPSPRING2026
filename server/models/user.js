const con = require("./db_connect")
const bcrypt = require("bcrypt")


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

async function login(user) {
  let cUser = await getUserByUsername(user.username)
  if(!cUser) throw Error("Username not found!")
  
  let match = await bcrypt.compare(user.password, cUser.password)
  if(!match) throw Error("Password Incorrect!")
  
  return cUser
}

async function getUserByUsername(username) {
  let sql = `
    SELECT * FROM user
    WHERE username = ?
  `

  let result = await con.query(sql, [username])
  return result[0]
}

async function getAllUsers() {
    let sql = `
        SELECT * FROM user;
        `
        console.log("hi")
    let [result] = await con.query(sql)
    return result;
}

async function register(user) {
  let cUser = await getUserByUsername(user.username)
  if(cUser) throw Error("Username already in use!")

  let hashedPassword = await bcrypt.hash(user.password, 10)
  
  let sql = `
    INSERT INTO user(firstName, lastName, password, username)
    VALUES(?, ?, ?, ?)
  `

  await con.query(sql, [user.firstName, user.lastName, hashedPassword, user.username])
  return login(user)
}

async function changePassword(user){
    let cUser = await getUserByUsername(user.username)
    if (!cUser) throw Error("User not found!")
    

    let match = await bcrypt.compare(user.currentPassword, cUser.password)
    if(!match) throw Error("Password Incorrect!")

    let hashedPassword = await bcrypt.hash(user.newPassword, 10)
    
    let updatesql = `
    UPDATE user 
    SET password = ?
    WHERE userId = ?;`

    await con.query(updatesql, [hashedPassword, cUser.userId])
    return await getUserByUsername(user.username)
}

async function deleteUser(user){
    let cUser = await getUserByUsername(user.username)

    let match = await bcrypt.compare(user.currentPassword, cUser.password)
    if(!match) throw Error("Password Incorrect!")
    
    let deletesql =`
    DELETE FROM user
    WHERE userId = ?
    `

    await con.query(deletesql, [cUser.userId])

}

module.exports = { getAllUsers, login, register, changePassword, deleteUser}