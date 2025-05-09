// 1. Definir fecha objetivo
const targetDate = new Date('2025-05-30T00:00:00');

// 2. Referencias al DOM
const daysEl   = document.getElementById('days');
const hoursEl  = document.getElementById('hours');
const minsEl   = document.getElementById('mins');
const secsEl   = document.getElementById('secs');

// 3. Función para calcular y renderizar
function updateCountdown() {
  const now   = new Date();
  const diff  = targetDate - now;

  if (diff <= 0) {
    // Si ya pasó la fecha, detenemos
    clearInterval(timer);
    daysEl.textContent  = '00';
    hoursEl.textContent = '00';
    minsEl.textContent  = '00';
    secsEl.textContent  = '00';
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

  // 4. Renderizar con ceros a la izquierda
  daysEl.textContent  = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minsEl.textContent  = String(mins).padStart(2, '0');
  secsEl.textContent  = String(secs).padStart(2, '0');
}

// 5. Iniciar el intervalo
const timer = setInterval(updateCountdown, 1000);
// llamada inicial para no esperar 1 segundo
updateCountdown();
