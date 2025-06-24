/*--------------------------------------------------------------------------*/
/*---------------------------- flowers  -----------------------------*/
/*--------------------------------------------------------------------------*/
const options = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const flowers = entry.target.querySelectorAll('.flower');

        if (entry.isIntersecting) {
          flowers.forEach((img, i) => {
            setTimeout(() => img.classList.add('enter'), i * 150);
            img.classList.remove('exit');
          });
        } else {
          flowers.forEach((img, i) => {
            setTimeout(() => img.classList.add('exit'), i * 150);
            img.classList.remove('enter');
          });
        }
      });
    }, options);

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    /*--------------------------------------------------------------------------*/
/*---------------------------- CountDown  -----------------------------*/
/*--------------------------------------------------------------------------*/
const countdownDate = new Date('2025-10-25T19:00:00').getTime();
const countdownEl = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    countdownEl.innerHTML = "¡Llegó el gran día!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `
    <div class="countdown-item">
      <div class="countdown-number">${days}</div>
      <div class="countdown-label">días</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-number">${hours}</div>
      <div class="countdown-label">hs</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-number">${minutes}</div>
      <div class="countdown-label">min</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-number">${seconds}</div>
      <div class="countdown-label">seg</div>
    </div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);
/*--------------------------------------------------------------------------*/
/*---------------------------- Carrusel  -----------------------------*/
/*--------------------------------------------------------------------------*/

// Carrusel automático con miniaturas
const images = document.querySelectorAll('.carousel-img');
const thumbs = document.querySelectorAll('.carousel-thumb');
let current = 0;
let interval = null;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
    thumbs[i].classList.toggle('active', i === index);
  });
  current = index;
}

function nextImage() {
  let next = (current + 1) % images.length;
  showImage(next);
}

thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    showImage(i);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextImage, 3000);
}

resetInterval();