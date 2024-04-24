document.getElementById("nextButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Validasi apakah semua input telah diisi
    var inputs = document.getElementsByClassName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            alert("Harap isi semua bagian formulir!");
            return;
        }
    }

    // Validasi NIK harus 11 angka
    var nikInput = document.getElementsByName("NIK")[0];
    var nikValue = nikInput.value.trim();
    if (nikValue.length !== 11 || isNaN(nikValue)) {
        alert("NIK harus terdiri dari 11 angka!");
        return;
    }

    // Jika semua validasi terpenuhi, navigasikan ke halaman pembayaran
    window.location.href = "./payment.html";
});

        // Validasi input untuk input dengan class postCode, telInput, dan NIK
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