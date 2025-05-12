// 1. Countdown
const targetDate = new Date('2025-05-30T00:00:00');
const daysEl   = document.getElementById('days');
const hoursEl  = document.getElementById('hours');
const minsEl   = document.getElementById('mins');
const secsEl   = document.getElementById('secs');

function updateCountdown() {
  const now  = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    clearInterval(timer);
    daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
    return;
  }
  const sec = 1000, min = sec * 60, hr = min * 60, day = hr * 24;
  const days  = Math.floor(diff / day);
  const hours = Math.floor((diff % day) / hr);
  const mins  = Math.floor((diff % hr) / min);
  const secs  = Math.floor((diff % min) / sec);

  daysEl.textContent  = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minsEl.textContent  = String(mins).padStart(2, '0');
  secsEl.textContent  = String(secs).padStart(2, '0');
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// 2. Netlify Forms + feedback
const form     = document.getElementById('subscribe-form');
const emailIn  = document.getElementById('email-input');
const msgEl    = document.getElementById('subscribe-message');


  // Validación básica de e-mail
  const email = emailIn.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    msgEl.textContent = 'Por favor ingresa un e-mail válido.';
    return;
  }

  // Envío a Netlify
  const formData = new FormData(form);
  fetch('/', {
    method: 'POST',
    body: formData
  })
  .then(res => {
    if (res.ok) {
      msgEl.textContent = '¡Gracias! Te has suscrito correctamente.';
      form.reset();
    } else {
      throw new Error('Error en el envío');
    }
  })
  .catch(() => {
    msgEl.textContent = 'Hubo un error al suscribirte. Intenta de nuevo.';
  });
});
