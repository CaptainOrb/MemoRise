// Membuat referensi ke elemen-elemen yang diperlukan
const virtualAccountRadio = document.getElementById("VA");
const selectVirtualAccount = document.getElementsByClassName("paymentMethod")[0];
const backLink = document.getElementsByClassName("back")[0];

// Fungsi untuk menampilkan atau menyembunyikan elemen "Select Virtual Account" berdasarkan status opsi pembayaran
function toggleVirtualAccountDisplay() {
    // Periksa apakah radio button "Virtual Account Billing" terpilih
    if (virtualAccountRadio.checked) {
        // Jika terpilih, tampilkan elemen "Select Virtual Account"
        selectVirtualAccount.style.display = "flex";
    } else {
        // Jika tidak terpilih, sembunyikan elemen "Select Virtual Account"
        selectVirtualAccount.style.display = "none";
    }
}

// Panggil fungsi toggleVirtualAccountDisplay untuk menetapkan tampilan awal elemen "Select Virtual Account"
toggleVirtualAccountDisplay();

// Tambahkan event listener untuk setiap radio button dalam grup "paymentOption"
const paymentOptionRadios = document.getElementsByName('paymentOption');
paymentOptionRadios.forEach(radio => {
    radio.addEventListener("change", toggleVirtualAccountDisplay);
});

document.addEventListener("DOMContentLoaded", function() {
    const checkOutButton = document.getElementsByClassName('checkOut')[0];
    const paymentOptions = document.getElementsByName('paymentOption');
    const virtualAccountOption = document.getElementById('VA');
    const paymentMethods = document.getElementsByName('paymentMethod');

    checkOutButton.addEventListener('click', function(event) {
        event.preventDefault();

        let paymentOptionSelected = false;
        let paymentMethodSelected = false;

        // Periksa apakah opsi pembayaran dipilih
        for (let i = 0; i < paymentOptions.length; i++) {
            if (paymentOptions[i].checked) {
                paymentOptionSelected = true;
                break;
            }
        }

        // Jika opsi pembayaran belum dipilih, tampilkan pesan kesalahan
        if (!paymentOptionSelected) {
            alert("Harap Pilih Payment Option yang Tersedia");
            return;
        }

        // Jika opsi Virtual Account dipilih, periksa apakah setidaknya satu metode pembayaran dipilih
        if (virtualAccountOption.checked) {
            for (let i = 0; i < paymentMethods.length; i++) {
                if (paymentMethods[i].checked) {
                    paymentMethodSelected = true;
                    break;
                }
            }
        } else {
            // Jika opsi Cash on Delivery atau Credit/Debit Card dipilih
            for (let i = 0; i < paymentOptions.length; i++) {
                if ((paymentOptions[i].checked) && (paymentOptions[i].id === 'COD' || paymentOptions[i].id === 'CreditDebit')) {
                    paymentMethodSelected = true;
                    break;
                }
            }
        }

        // Jika metode pembayaran sudah dipilih, lanjutkan dengan Checkout
        // Jika tidak, tampilkan pesan kesalahan
        if (paymentMethodSelected) {
            alert("Berhasil Checkout");
            // Ganti 'fillForm.html' dengan halaman tujuan setelah checkout
            window.location.href = "YourAlbums.html"; // Lempar ke page lain format: "./[nama File HTML].html"
        } else {
            alert("Harap Pilih Payment Method yang Tersedia");
        }
    });
});

