// ==========================================
// SISTEMA DE SCROLL Y MENSAJES
// ==========================================

// Elementos del DOM
const container = document.getElementById('space-container');
const scrollContent = document.getElementById('scroll-content');
const progressBar = document.getElementById('progress-bar');
const kmCounter = document.getElementById('km');
const messages = document.querySelectorAll('.space-message');

// Variables de control
let isScrolling = false;
let scrollTimeout;

// ==========================================
// EVENT LISTENER DE SCROLL
// ==========================================

container.addEventListener('scroll', () => {
    const scrollLeft = container.scrollLeft;
    const maxScroll = scrollContent.offsetWidth - window.innerWidth;
    const progress = (scrollLeft / maxScroll) * 100;
    
    // Actualizar barra de progreso
    progressBar.style.width = progress + '%';
    
    // Actualizar contador de distancia
    const km = Math.floor(scrollLeft / 10);
    kmCounter.textContent = km.toLocaleString();
    
    // Velocidad de la nave (efecto warp)
    targetSpeed = 0.5;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        targetSpeed = 0;
    }, 100);
    
    // Mostrar mensajes según progreso
    messages.forEach((msg) => {
        const msgPosition = (parseFloat(msg.style.left) / 100) * maxScroll;
        if (scrollLeft > msgPosition - window.innerWidth / 2) {
            msg.classList.add('visible');
        }
    });
    
    // Detectar final del viaje (95% del recorrido)
    if (progress > 95) {
        triggerSupernova();
    }
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

// Scroll automático suave al inicio
setTimeout(() => {
    container.scrollTo({ left: 0, behavior: 'smooth' });
}, 100);

// ==========================================
// ESTRELLAS FUGACES ALEATORIAS
// ==========================================

setInterval(() => {
    if (Math.random() > 0.7 && !supernovaTriggered) {
        const shootingStar = document.createElement('div');
        shootingStar.style.cssText = `
            position: fixed;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, white, transparent);
            top: ${Math.random() * 50}%;
            left: ${Math.random() * 100}%;
            transform: rotate(-45deg);
            animation: shoot 1s ease-out forwards;
            z-index: 5;
            pointer-events: none;
        `;
        document.body.appendChild(shootingStar);
        
        setTimeout(() => shootingStar.remove(), 1000);
    }
}, 2000);