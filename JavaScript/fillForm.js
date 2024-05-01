function addEventListeners() {
    const postCodeInput = document.getElementsByName('Post-Code')[0];
    const telInput = document.getElementsByName('phoneNumber')[0];
    const nikInput = document.getElementsByName('NIK')[0];

    postCodeInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Hanya menerima angka
    });

    telInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Hanya menerima angka
    });

    nikInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Hanya menerima angka
    });
}

// Panggil fungsi untuk menambahkan event listener saat halaman dimuat
addEventListeners();

// Fungsi validasi
function validate() {
    var NIK = document.forms["fill-Form"]["NIK"].value;
    var firstName = document.forms["fill-Form"]["firstName"].value;
    var lastName = document.forms["fill-Form"]["lastName"].value;
    var streetAddress = document.forms["fill-Form"]["Street-Address"].value;
    var postCode = document.forms["fill-Form"]["Post-Code"].value;
    var city = document.forms["fill-Form"]["City"].value;
    var phoneNumber = document.forms["fill-Form"]["phoneNumber"].value;
    var email = document.forms["fill-Form"]["emailAddress"].value;
    
    if(NIK.length !== 16){
        alert("NIK harus terdiri dari 16 angka!");
        return false;
    }

    if(NIK === "" || firstName === "" || lastName === "" || streetAddress === "" || postCode === "" || city === "" || phoneNumber === "" || email === ""){
        alert("Harap isi semua bagian formulir!");
        return false;
    }
    

    window.location.href = "payment.html";
    return false;
}