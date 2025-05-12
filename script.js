// === script.js ===

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
    // Llegó la fecha: poner todo a 00 y detener el intervalo
    clearInterval(timer);
    daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
    return;
  }

  const sec  = 1000;
  const min  = sec * 60;
  const hr   = min * 60;
  const day  = hr * 24;

  const days  = Math.floor(diff / day);
  const hours = Math.floor((diff % day) / hr);
  const mins  = Math.floor((diff % hr) / min);
  const secs  = Math.floor((diff % min) / sec);

  daysEl.textContent  = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minsEl.textContent  = String(mins).padStart(2, '0');
  secsEl.textContent  = String(secs).padStart(2, '0');
}

// Iniciar el countdown
const timer = setInterval(updateCountdown, 1000);
updateCountdown(); // llamada inicial

// 2. Netlify Forms + feedback en cliente
const form    = document.getElementById('subscribe-form');
const emailIn = document.getElementById('email-input');
const msgEl   = document.getElementById('subscribe-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  // 2.1 Validación básica de e-mail
  const email = emailIn.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    msgEl.textContent = 'Por favor ingresa un e-mail válido.';
    return;
  }

  // 2.2 Convertir el form a URL-encoded para Netlify
  const body = new URLSearchParams(new FormData(form)).toString();

  // 2.3 Enviar la petición al endpoint de Netlify
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })
    .then(res => {
      if (res.ok) {
        msgEl.textContent = '¡Gracias por suscribirte!';
        form.reset();
      } else {
        throw new Error('Error en el envío');
      }
    })
    .catch(() => {
      msgEl.textContent = 'Hubo un error al suscribirte. Intenta de nuevo.';
    });
});
