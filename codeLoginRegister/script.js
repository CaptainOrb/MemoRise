function validateForm() {
    var name = document.getElementById("name").value; 
    var password = document.getElementById("password").value;  
    var confirmPass = document.getElementById("confirmPassword").value

    //VALIDASI NAMA 
    if (!isValidName(name)) {
        alert("Name must only contain alphabet letters or space!")
        return false
    }

    //VALIDASI PASSWORD
    if (password !== confirmPass) {
        alert("The password doesn't match!")
        return false
    }

    window.location.href = "../YourAlbums.html";
    return true
}


function pastitrue(){
    return true;
}

function isValidName(name) {
    var length = name.length
    for (var i = 0; i < length; i++) {
        var char = name.charAt(i);
        if (!(char >= 'A' && char <= 'Z' || char >='a' && char <='z' || char == ' ')) {
            return false
        }
    }
    return true 
}


