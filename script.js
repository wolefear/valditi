const pages = document.querySelectorAll('.page');

function showPage(id) {
  pages.forEach(p => {
    p.classList.remove('active');
    p.classList.remove('fade-out');
  });
  document.getElementById(id).classList.add('active');
}

// Page navigation
document.querySelector('#page1 .btn').onclick = () => {
  showPage('memory1');
  startMemorySlideshow();
};
document.querySelector('#page4 .btn').onclick = () => showPage('page1');

// Auto-advance memory pages with smooth fade transitions
function startMemorySlideshow() {
  const memoryPages = ['memory1', 'memory2', 'memory3', 'memory4', 'memory5', 'memory6'];
  let currentIndex = 0;

  const interval = setInterval(() => {
    // Add fade-out to current page
    const currentPage = document.getElementById(memoryPages[currentIndex]);
    if (currentPage) {
      currentPage.classList.add('fade-out');
    }

    // Wait for fade-out, then switch to next page
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < memoryPages.length) {
        showPage(memoryPages[currentIndex]);
      } else {
        clearInterval(interval);
        showPage('page4'); // Go to final message
      }
    }, 1000); // Fade-out duration
  }, 6000); // 6 seconds per memory page
}

// Audio control
const audioBtn = document.querySelector('.audio-btn');
const audio = document.querySelector('audio');
const icon = audioBtn.querySelector('i');

audioBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    icon.classList.remove('fa-music');
    icon.classList.add('fa-pause');
    audioBtn.style.backgroundColor = '#2a2a2a';
  } else {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-music');
    audioBtn.style.backgroundColor = '#2a2a2a';
  }
});

audio.addEventListener('ended', () => {
  icon.classList.remove('fa-pause');
  icon.classList.add('fa-music');
});

// Spotify button
document.getElementById('spotify-btn').addEventListener('click', function() {
  window.location.href = 'https://open.spotify.com/playlist/5PesXesIwkGKvQl2gnJlfl?si=3eav3E6PS0qegU7nghvlrg&pi=xgOSEAieR4-_D';
});

/* CONFETTI */
const canvas = document.getElementById("confetti");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let pieces = [];

  function startConfetti() {
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        s: Math.random() * 5 + 2,
        v: Math.random() * 3 + 2
      });
    }
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.fillStyle = "rgba(255,255,255,0.4)"; // White confetti for black background
      ctx.fillRect(p.x, p.y, p.s, p.s);
      p.y += p.v;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(animate);
  }

  // Auto-start confetti when page loads
  startConfetti();
}