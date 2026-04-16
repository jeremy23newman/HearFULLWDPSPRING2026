let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")

if(loginForm) loginForm.addEventListener('submit', login)
    function login(e) {
    e.preventDefault()

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    const user = {
        username: username,
        password: password
    }
    console.log(user)
    }


if(registerForm) registerForm.addEventListener('submit', register)
    function register(e){
    e.preventDefault()

    let firstname = document.getElementById("firstname").value
    let lastname = document.getElementById("lastname").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    const user = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password
    }
    console.log(user)

    }

