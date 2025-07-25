
//ini untuk landing layar depan

const landingOverlay = document.getElementById('landingOverlay');
    const openWebsiteBtn = document.getElementById('openWebsiteBtn');

    // Add click event listener to the button
    openWebsiteBtn.addEventListener('click', () => {
        landingOverlay.classList.add('hidden');
    });

    














//ini untuk jam atau waktu
const countdownElement = document.getElementById('countdown');
const weddingDate = new Date('August 4, 2025 09:00:00').getTime(); // Ganti dengan tanggal dan waktu pernikahan Anda

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Kami Telah Menikah!";
    } else {
        countdownElement.innerHTML = `
            <div>${days}<span>Hari</span></div>
            <div>${hours}<span>Jam</span></div>
            <div>${minutes}<span>Menit</span></div>
            <div>${seconds}<span>Detik</span></div>
        `;
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Call immediately to avoid delay













    const confettiButton = document.getElementById('confettiButton');

    // Fungsi untuk memicu confetti
    function fireConfetti() {
        confetti({
            particleCount: 100, // Jumlah partikel
            spread: 70, // Jangkauan sebaran
            origin: { y: 0.6 }, // Titik asal (dari tengah bawah)
            colors: ['#ffc0cb', '#f5b041', '#a0522d', '#b8860b'] // Warna confetti, sesuaikan dengan tema Anda
        });
        
    }

    // Event listener untuk tombol confetti
    confettiButton.addEventListener('click', fireConfetti);

    // Opsional: Confetti saat website terbuka pertama kali
    // Anda bisa menambahkan fireConfetti() di dalam fungsi revealWebsite()
    // Misalnya, setelah window.scrollTo() di fungsi revealWebsite()
    // setTimeout(() => {
    //     landingOverlay.style.display = 'none';
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //     fireConfetti(); // Tambahkan baris ini
    //     checkScrollAnimations();
    // }, 1000);

    // ... (kode Anda yang sudah ada) ...
;














// --- Efek Salju/Bunga Berjatuhan ---
    const canvas = document.getElementById('fallingCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 200; // Jumlah partikel yang jatuh
    const particleType = 'snowflake'; // Ganti 'snowflake' atau 'flower'

    // Atur ukuran kanvas agar sesuai dengan viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Panggil saat inisialisasi

    // Fungsi untuk membuat partikel baru
    function createParticle() {
        if (particleType === 'snowflake') {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 5 + 1, // Ukuran salju
                density: Math.random() * 0.5 + 0.1, // Kecepatan jatuh
                color: 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')', // Transparansi salju
                opacity: Math.random() * 0.5 + 0.5,
                drift: Math.random() * 2 - 1, // Pergeseran horizontal
                angle: Math.random() * Math.PI * 2 // Untuk efek berputar
            };
        } else if (particleType === 'flower') {
            // Anda bisa menggunakan gambar kelopak bunga di sini
            // Untuk demo, kita akan gunakan bentuk sederhana atau warna
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 15 + 10, // Ukuran kelopak bunga
                density: Math.random() * 0.7 + 0.2, // Kecepatan jatuh
                color: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#DA70D6'][Math.floor(Math.random() * 4)], // Warna pink/ungu
                opacity: Math.random() * 0.6 + 0.4,
                drift: Math.random() * 3 - 1.5, // Pergeseran horizontal
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: Math.random() * 0.05 - 0.025 // Kecepatan rotasi
            };
        }
    }

    // Inisialisasi partikel
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }

    // Fungsi untuk menggambar partikel
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas

        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];

            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;

            if (particleType === 'snowflake') {
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            } else if (particleType === 'flower') {
                // Gambar bentuk kelopak bunga sederhana atau kotak jika tidak ada gambar
                ctx.save(); // Simpan state canvas
                ctx.translate(p.x, p.y); // Pindahkan origin ke posisi partikel
                ctx.rotate(p.angle); // Putar partikel
                ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI * 2); // Contoh elips sebagai kelopak
                ctx.restore(); // Kembalikan state canvas
            }
            ctx.fill();

            // Perbarui posisi partikel
            p.y += p.density * 2; // Kecepatan jatuh
            p.x += p.drift; // Pergeseran horizontal (angin)
            p.angle += p.rotationSpeed || 0; // Rotasi bunga

            // Jika partikel keluar dari bawah, kembalikan ke atas secara acak
            if (p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = -p.radius; // Muncul di atas layar
                p.density = Math.random() * 0.5 + 0.1;
                p.opacity = Math.random() * 0.5 + 0.5;
                p.drift = Math.random() * 2 - 1;
                p.angle = Math.random() * Math.PI * 2;
                if (particleType === 'flower') {
                     p.rotationSpeed = Math.random() * 0.05 - 0.025;
                }
            }

            // Jika partikel keluar dari samping, muncul di sisi berlawanan
            if (p.x > canvas.width) {
                p.x = 0;
            } else if (p.x < 0) {
                p.x = canvas.width;
            }
        }

        requestAnimationFrame(drawParticles); // Ulangi frame animasi
    }

    // Mulai animasi setelah DOMContentLoaded
    drawParticles();





















document.addEventListener('DOMContentLoaded', () => {
    // ... (Kode yang sudah ada di bagian atas: guest name, countdown, open button, overlay) ...

    // --- Scroll Animations ---
    const animatedItems = document.querySelectorAll(
        '.main-section.hidden-item, ' + // Semua section utama dengan hidden-item
        '.event-detail.from-left, ' +    // Detail event dari kiri
        '.event-detail.from-right, ' +   // Detail event dari kanan
        '.gallery-item.from-left, ' +    // Item galeri dari kiri
        '.gallery-item.from-right, ' +   // Item galeri dari kanan
        '.event-location.hidden-item, ' + // Lokasi event
        '.turutPria .event-detail.from-left, ' + // Turut mengundang pria
        '.turutWanita .event-detail.from-left'   // Turut mengundang wanita
    );

    const observerOptions = {
        root: null, // Mengamati elemen di dalam viewport browser
        threshold: 0.2, // Pemicu saat 20% elemen terlihat
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan kelas untuk memulai animasi
                entry.target.classList.add('animate-visible');
                // Hentikan pengamatan setelah elemen dianimasikan (opsional, tapi baik untuk performa)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Amati setiap elemen yang perlu dianimasikan
    animatedItems.forEach(item => {
        observer.observe(item);
    });













    
    // Fungsi untuk memicu confetti
    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffc0cb', '#f5b041', '#a0522d', '#b8860b']
        });
    };

    // Event listener untuk tombol confetti
    const confettiButton = document.getElementById('confettiButton');
    if (confettiButton) {
        confettiButton.addEventListener('click', fireConfetti);
    }

    // Awalnya semua konten utama tersembunyi
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('hidden');
    }

    // Event listener untuk tombol "Buka Undangan"
    const openWebsiteBtn = document.getElementById('openWebsiteBtn');
    if (openWebsiteBtn) {
        openWebsiteBtn.addEventListener('click', () => {
            const landingOverlay = document.getElementById('landingOverlay');
            if (landingOverlay) {
                landingOverlay.classList.add('hidden'); // Memulai animasi fade-out dan slide-up
                // Setelah animasi selesai, sembunyikan overlay sepenuhnya dan tampilkan konten utama
                landingOverlay.addEventListener('transitionend', () => {
                    landingOverlay.style.display = 'none';
                    if (mainContent) {
                        mainContent.classList.remove('hidden'); // Menghapus class 'hidden' dari main-content
                        mainContent.classList.add('visible'); // Menambahkan class 'visible' (jika ada transisi lain)
                    }
                    // Gulir ke atas halaman setelah overlay hilang
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Panggil fireConfetti() saat website terbuka
                    fireConfetti();
                    // Panggil checkScrollAnimations() untuk memastikan elemen pertama terlihat
                    // Tidak perlu panggil checkScrollAnimations() karena Intersection Observer akan melakukannya secara otomatis
                }, { once: true }); // Pastikan event listener hanya berjalan sekali
            }
        });
    }

    // ... (Kode untuk falling canvas, RSVP, Wishes, Navbar aktif) ...






















    // Get guest name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestNameDisplay = document.getElementById('guest-name-display');
    if (guestNameDisplay && guestName) {
        guestNameDisplay.textContent = decodeURIComponent(guestName);
    } else if (guestNameDisplay) {
        guestNameDisplay.textContent = 'Tamu Undangan'; // Default text if no name
    }

    // ... (Kode untuk falling canvas, RSVP, Wishes, Navbar aktif tetap di sini) ...

});





















// ... (Kode JavaScript Anda yang sudah ada di bagian atas) ...

// --- Function to copy text to clipboard ---
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const messageSpan = buttonElement.nextElementSibling;
        if (messageSpan && messageSpan.classList.contains('copy-message')) {
            messageSpan.style.display = 'inline';
            setTimeout(() => {
                messageSpan.style.display = 'none';
            }, 2000); // Hide after 2 seconds
        }
        
        // Optional: Change button text temporarily
        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
        }, 2000); // Revert button text after 2 seconds

    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Gagal menyalin. Silakan salin manual.'); // Fallback alert
    });
}

// ... (Sisa kode JavaScript Anda, termasuk event listener untuk background music) ...

























// ... (Kode JavaScript Anda yang sudah ada di bagian atas) ...

// --- Background Music Control ---
const backgroundMusic = document.getElementById('background-music');

// Tambahkan event listener pada tombol "Buka Undangan"
openWebsiteBtn.addEventListener('click', () => {
    // Play the music when the button is clicked
    backgroundMusic.play().catch(error => {
        console.error("Autoplay was prevented:", error);
        // Fallback: If autoplay is blocked, you might show a play button later
    });
});

// Anda bisa menambahkan tombol mute/unmute jika diinginkan di bagian lain dari website
// Contoh (opsional, tambahkan tombol di HTML):

const muteButton = document.createElement('button');
muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
muteButton.id = 'muteToggle';
muteButton.style.position = 'fixed';
muteButton.style.bottom = '90px';
muteButton.style.left = '20px';
muteButton.style.zIndex = '1002';
muteButton.style.backgroundColor = 'rgba(0,0,0,0.5)';
muteButton.style.color = 'white';
muteButton.style.border = 'none';
muteButton.style.borderRadius = '50%';
muteButton.style.width = '50px';
muteButton.style.height = '50px';
muteButton.style.cursor = 'pointer';
document.body.appendChild(muteButton);

muteButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        backgroundMusic.pause();
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});


// ... (Sisa kode JavaScript Anda) ...


















// URL Google Apps Script Anda. Ini adalah URL Web App yang sama untuk POST dan GET.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzet5feTS_5DyF24yGsmPwS-or6gdSgS7sNV2gb4Y0GEEVPBzs5oSOYcxctzVOIoMJc1g/exec'; // Ganti dengan URL Web App Anda!

// --- RSVP Form Handler (tetap sama) ---
const rsvpForm = document.getElementById('rsvp-form');
const rsvpMessage = document.getElementById('rsvp-message');

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    rsvpMessage.textContent = 'Mengirimkan konfirmasi kehadiran Anda...';
    rsvpMessage.style.color = 'blue';

    try {
        const response = await fetch(SCRIPT_URL, { method: 'POST', body: new FormData(rsvpForm) });
        const result = await response.json();

        if (response.ok && result.result === 'success') {
            rsvpMessage.textContent = 'Konfirmasi Anda sudah dikirim! Terima kasih.';
            rsvpMessage.style.color = 'green';
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            throw new Error(`Gagal mengirim konfirmasi: ${result.error || response.statusText}`);
        }
    } catch (error) {
        console.error('Error pada RSVP form!', error.message);
        rsvpMessage.textContent = `Terjadi kesalahan: ${error.message}. Silakan coba lagi.`;
        rsvpMessage.style.color = 'red';
    }
});

// --- Wishes Form Handler & Display ---
const wishesForm = document.getElementById('wishes-form');
const wishesMessage = document.getElementById('wishes-message');

const currentWishContainer = document.getElementById('current-wish-container'); // Container untuk satu ucapan
const prevWishBtn = document.getElementById('prevWishBtn');
const nextWishBtn = document.getElementById('nextWishBtn');

let allWishes = []; // Array untuk menyimpan semua ucapan
let currentWishIndex = 0; // Indeks ucapan yang sedang ditampilkan

// Fungsi untuk menampilkan ucapan tertentu
function displayWish(index) {
    if (allWishes.length === 0) {
        currentWishContainer.innerHTML = '<p>Belum ada ucapan yang masuk.</p>';
        prevWishBtn.disabled = true;
        nextWishBtn.disabled = true;
        return;
    }

    if (index < 0) {
        currentWishIndex = allWishes.length - 1; // Kembali ke terakhir jika mundur dari yang pertama
    } else if (index >= allWishes.length) {
        currentWishIndex = 0; // Kembali ke pertama jika maju dari yang terakhir
    } else {
        currentWishIndex = index;
    }

    const wish = allWishes[currentWishIndex];
    const name = wish.name || 'Anonim';
    const message = wish.message || 'Tidak ada pesan.';
    const timestamp = wish.timestamp ? new Date(wish.timestamp).toLocaleString() : '';

    currentWishContainer.innerHTML = `
        <div class="wish-item">
            <h4>${name}</h4>
            <p>${message}</p>
            <small>${timestamp}</small>
        </div>
    `;

    // Atur status tombol (enabled/disabled)
    prevWishBtn.disabled = allWishes.length <= 1;
    nextWishBtn.disabled = allWishes.length <= 1;

    // Opsional: Jika ingin tombol dinonaktifkan di ujung
    // prevWishBtn.disabled = currentWishIndex === 0;
    // nextWishBtn.disabled = currentWishIndex === allWishes.length - 1;
}

// Fungsi untuk mengambil dan menampilkan wishes
async function loadWishes() {
    currentWishContainer.innerHTML = '<p>Memuat ucapan...</p>';
    prevWishBtn.disabled = true;
    nextWishBtn.disabled = true;

    try {
        const response = await fetch(SCRIPT_URL);
        if (!response.ok) {
            throw new Error(`Gagal memuat ucapan: ${response.statusText}`);
        }
        const wishes = await response.json();

        if (wishes.length === 0) {
            allWishes = [];
            displayWish(0); // Tampilkan pesan "Belum ada ucapan"
            return;
        }

        // Simpan semua ucapan, dan balikkan urutannya agar yang terbaru di depan
        allWishes = wishes.reverse();
        currentWishIndex = 0; // Mulai dari ucapan terbaru

        displayWish(currentWishIndex); // Tampilkan ucapan pertama (terbaru)

    } catch (error) {
        console.error('Error memuat ucapan:', error);
        currentWishContainer.innerHTML = `<p style="color: red;">Terjadi kesalahan saat memuat ucapan: ${error.message}</p>`;
    }
}

// Event listener untuk tombol navigasi
prevWishBtn.addEventListener('click', () => {
    displayWish(currentWishIndex - 1);
});

nextWishBtn.addEventListener('click', () => {
    displayWish(currentWishIndex + 1);
});

wishesForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    wishesMessage.textContent = 'Mengirimkan pesan harapan Anda...';
    wishesMessage.style.color = 'blue';

    try {
        const response = await fetch(SCRIPT_URL, { method: 'POST', body: new FormData(wishesForm) });
        const result = await response.json();

        if (response.ok && result.result === 'success') {
            wishesMessage.textContent = 'Pesan harapan Anda sudah dikirim! Terima kasih.';
            wishesMessage.style.color = 'green';
            wishesForm.reset();

            setTimeout(() => {
                wishesMessage.textContent = '';
                loadWishes(); // Perbarui daftar wishes setelah pengiriman
            }, 2000);
        } else {
            throw new Error(`Gagal mengirim ucapan: ${result.error || response.statusText}`);
        }
    } catch (error) {
        console.error('Error pada Wishes form!', error.message);
        wishesMessage.textContent = `Terjadi kesalahan: ${error.message}. Silakan coba lagi.`;
        wishesMessage.style.color = 'red';
    }
});

// Panggil fungsi loadWishes saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadWishes);

