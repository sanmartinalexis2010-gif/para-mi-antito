// ==========================================
// INTERACCIONES DEL USUARIO
// ==========================================

// ==========================================
// BOTÓN CENTRAL - MOSTRAR MENSAJE ESPECIAL
// ==========================================

document.getElementById('center-button').addEventListener('click', function() {
    // Efecto de click (encoger)
    this.style.transform = 'translate(-50%, -50%) scale(0.1)';
    this.style.opacity = '0';
    
    // Ocultar corazón y supernova
    const giantHeart = document.getElementById('giant-heart');
    giantHeart.style.transition = 'all 1s';
    giantHeart.style.opacity = '0';
    giantHeart.style.transform = 'scale(2)';
    
    const supernovaContainer = document.getElementById('supernova-container');
    supernovaContainer.style.transition = 'all 1s';
    supernovaContainer.style.opacity = '0';
    
    // Mostrar mensaje especial después de transición
    setTimeout(() => {
        document.getElementById('special-message').classList.add('visible');
    }, 800);
});

// ==========================================
// MOSTRAR PÁGINA FINAL
// ==========================================

function showFinalPage() {
    const specialMessage = document.getElementById('special-message');
    specialMessage.style.opacity = '0';
    specialMessage.style.pointerEvents = 'none';
    
    setTimeout(() => {
        document.getElementById('final-page').classList.add('active');
    }, 500);
}

// ==========================================
// UTILIDADES
// ==========================================

// Función para reiniciar la experiencia
function restartExperience() {
    location.reload();
}

// Exportar funciones globales si es necesario
window.showFinalPage = showFinalPage;
window.restartExperience = restartExperience;