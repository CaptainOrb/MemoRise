var buttons = document.getElementsByClassName("register-button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", redirect_register);
}

function redirect_register() {
    window.location.href = "codeLoginRegister/register.html";
}

document.getElementById("login-button").addEventListener("click", redirect_login);

function redirect_login(){
    window.location = "codeLoginRegister/login.html"
}

document.getElementById("start-button").addEventListener("click", redirect_startButton);

function redirect_startButton(){
    window.location = "codeLoginRegister/register.html"
}
