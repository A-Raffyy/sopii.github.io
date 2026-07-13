const suratCinta = `Halo Sayangku yang paling cantik, selamat ulang tahun ya! 🎉

Hari ini adalah hari yang paling aku tunggu, karena di hari ini, dunia menyambut seseorang yang sekarang jadi pusat duniaku. Terima kasih sudah lahir dan tumbuh jadi wanita yang luar biasa.

Aku selalu bersyukur bisa kenal, dekat, dan akhirnya bisa sama-sama kamu. Kamu itu support system terbaik aku. Saat aku capek ngerjain tugas kuliah, atau lagi banyak pikiran, senyum kamu selalu berhasil bikin semuanya terasa lebih ringan.

Maaf ya kalau aku belum bisa jadi pacar yang sempurna, tapi aku janji akan selalu berusaha ngasih yang terbaik buat kamu. Semoga di umur yang baru ini, kamu makin bahagia, sehat selalu, dan semua yang kamu impikan bisa tercapai.

I love you more than words can say. Happy birthday, my love! ❤️`;

const targetDate = new Date("2008-07-14T00:00:00").getTime();

const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");
let isPlaying = false;

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

const btnKejutan = document.getElementById("btn-kejutan");
const suratSection = document.getElementById("surat-section");
const typewriterText = document.getElementById("typewriter-text");

btnKejutan.addEventListener("click", () => {
  createConfetti();

  if (!isPlaying) {
    bgMusic.play();
    musicIcon.textContent = "⏸️";
    isPlaying = true;
  }

  suratSection.classList.add("show");

  setTimeout(() => {
    suratSection.scrollIntoView({ behavior: "smooth" });
  }, 100);

  typeWriterEffect();

  btnKejutan.style.display = "none";
});

let i = 0;
const speed = 30;

function typeWriterEffect() {
  if (i < suratCinta.length) {
    if (suratCinta.charAt(i) === "\n") {
      typewriterText.innerHTML += "<br>";
    } else {
      typewriterText.innerHTML += suratCinta.charAt(i);
    }
    i++;
    setTimeout(typeWriterEffect, speed);
  }
}

function createConfetti() {
  const colors = ["#ffb6c1", "#dda0dd", "#ff69b4", "#fff", "#fecfef"];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = -10 + "px";

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

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

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

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

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

const reveals = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("active");
    observer.unobserve(entry.target);
  });
}, revealOptions);

reveals.forEach((reveal) => {
  revealOnScroll.observe(reveal);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "🌸";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  document.getElementById("falling-hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 1500);

document.addEventListener("mousemove", function (e) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";

  document.getElementById("cursor-sparkles").appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 800);
});
