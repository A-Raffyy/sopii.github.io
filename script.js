/* =========================================
   1. KONFIGURASI KONTEN
   ========================================= */

// Isi Surat Cinta (Gunakan \n untuk baris baru)
const suratCinta = `Halo Sayangku yang paling cantik, selamat ulang tahun ya! 🎉

Hari ini adalah hari yang paling aku tunggu, karena di hari ini, dunia menyambut seseorang yang sekarang jadi pusat duniaku. Terima kasih sudah lahir dan tumbuh jadi wanita yang luar biasa.

Aku selalu bersyukur bisa kenal, dekat, dan akhirnya bisa sama-sama kamu. Kamu itu support system terbaik aku. Saat aku capek ngerjain tugas kuliah, atau lagi banyak pikiran, senyum kamu selalu berhasil bikin semuanya terasa lebih ringan.

Maaf ya kalau aku belum bisa jadi pacar yang sempurna, tapi aku janji akan selalu berusaha ngasih yang terbaik buat kamu. Semoga di umur yang baru ini, kamu makin bahagia, sehat selalu, dan semua yang kamu impikan bisa tercapai.

I love you more than words can say. Happy birthday, my love! ❤️`;

// Tanggal Ulang Tahun Selanjutnya (Format: YYYY-MM-DDTHH:MM:SS)
const targetDate = new Date("2008-07-14T00:00:00").getTime(); // CONTOH: Ganti dengan tanggal yang sesuai

/* =========================================
   2. MUSIK & TOMBOL SURPRISE
   ========================================= */
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");
let isPlaying = false;

// Fungsi play/pause musik
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.textContent = "🎵";
  } else {
    bgMusic.play();
    musicIcon.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});

// Tombol Buka Kejutan
const btnKejutan = document.getElementById("btn-kejutan");
const suratSection = document.getElementById("surat-section");
const typewriterText = document.getElementById("typewriter-text");

btnKejutan.addEventListener("click", () => {
  // Ledakan Confetti
  createConfetti();

  // Play musik otomatis jika belum play
  if (!isPlaying) {
    bgMusic.play();
    musicIcon.textContent = "⏸️";
    isPlaying = true;
  }

  // Tampilkan bagian surat
  suratSection.classList.add("show");

  // Scroll ke surat
  setTimeout(() => {
    suratSection.scrollIntoView({ behavior: "smooth" });
  }, 100);

  // Animasi Mengetik
  typeWriterEffect();

  // Hilangkan tombol agar tidak diklik dua kali
  btnKejutan.style.display = "none";
});

/* =========================================
   3. ANIMASI MENGETIK (TYPEWRITER)
   ========================================= */
let i = 0;
const speed = 30; // Kecepatan ketik (ms)

function typeWriterEffect() {
  if (i < suratCinta.length) {
    // Handle newline
    if (suratCinta.charAt(i) === "\n") {
      typewriterText.innerHTML += "<br>";
    } else {
      typewriterText.innerHTML += suratCinta.charAt(i);
    }
    i++;
    setTimeout(typeWriterEffect, speed);
  }
}

/* =========================================
   4. EFEK CONFETTI
   ========================================= */
function createConfetti() {
  const colors = ["#ffb6c1", "#dda0dd", "#ff69b4", "#fff", "#fecfef"];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random warna, posisi, dan rotasi
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = -10 + "px";

    // Random physics
    const fallDuration = Math.random() * 3 + 2 + "s";
    const rotate = Math.random() * 360 + "deg";

    confetti.animate(
      [
        { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${rotate})`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 2000 + 3000,
        easing: "cubic-bezier(.37,0,.63,1)",
        fill: "forwards",
      },
    );

    document.body.appendChild(confetti);

    // Hapus elemen setelah selesai agar tidak berat (memory leak)
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

/* =========================================
   5. MODAL GALERI GAMBAR
   ========================================= */
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close-modal");
const galleryImages = document.querySelectorAll(".gallery-img");

galleryImages.forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
// Tutup modal jika klik di luar gambar
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

/* =========================================
   6. COUNTDOWN MUNDUR
   ========================================= */
const updateCountdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(updateCountdown);
    document.querySelector(".countdown-timer").innerHTML =
      "<h3>Hari ini Ulang Tahunnya! 🎉</h3>";
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d < 10 ? "0" + d : d;
  document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
  document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
  document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
}, 1000);

/* =========================================
   7. SCROLL ANIMATION (INTERSECTION OBSERVER)
   ========================================= */
const reveals = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("active");
    observer.unobserve(entry.target); // Hanya animasi 1x saat pertama dilihat
  });
}, revealOptions);

reveals.forEach((reveal) => {
  revealOnScroll.observe(reveal);
});

/* =========================================
   8. EFEK HATI JATUH DI BACKGROUND
   ========================================= */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "🌸"; // Bisa diganti emoji love ❤️
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // 4 - 7 detik

  document.getElementById("falling-hearts").appendChild(heart);

  // Hapus dari DOM
  setTimeout(() => {
    heart.remove();
  }, 7000);
}
// Buat hati setiap 1.5 detik
setInterval(createHeart, 1500);

/* =========================================
   9. EFEK CURSOR SPARKLE
   ========================================= */
document.addEventListener("mousemove", function (e) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  // Posisi kursor
  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";

  document.getElementById("cursor-sparkles").appendChild(sparkle);

  // Hapus sparkle setelah animasi selesai
  setTimeout(() => {
    sparkle.remove();
  }, 800);
});
