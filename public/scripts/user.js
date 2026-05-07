import {fetchData} from "./main.js"

let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")

if(loginForm) loginForm.addEventListener('submit', login)
function login(e) {
    e.preventDefault()

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    if(checkPassword(password)){
    const user = {
        username: username,
        password: password
    }

    fetchData('/users/login', user, 'POST')
    .then(data => {
        if(!data.message){
            setCurrentUser(data)
            window.location = "projectpost.html"
        }
    })
    .catch(err =>{
        let error = document.getElementById("error")
        error.innerText = err.message
        document.getElementById("password").value=""
    })
    console.log(user)
    } else{
        console.log("Incorrect password")
    }
}


if(registerForm) registerForm.addEventListener('submit', register)
    async function register(e){
    e.preventDefault()

    let firstName = document.getElementById("firstname").value
    let lastName = document.getElementById("lastname").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    const user = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    }
    console.log(user)
    try{
        const data = await fetchData('/users/register', user, 'POST')
        console.log(data)
        window.location = "projectlogin.html"
    } catch(err){
        console.log(err)
    }

    }

function checkPassword(password){
        return true;
    }
    
async function setCurrentUser(user) {
  await localStorage.setItem('user', JSON.stringify(user))
}

export async function getCurrentUser() {
  return await JSON.parse(localStorage.getItem('user'))
}

export async function removeCurrentUser() {
  localStorage.removeItem('user')
  window.location = "projectlogin.html"
}

