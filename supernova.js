// ==========================================
// EFECTO DE SUPERNOVA Y CORAZÓN GIGANTE
// ==========================================

let supernovaTriggered = false;

// ==========================================
// DISPARAR SUPERNOVA
// ==========================================

function triggerSupernova() {
    if (supernovaTriggered) return;
    supernovaTriggered = true;
    
    // Ocultar indicadores
    document.getElementById('scroll-hint').style.opacity = '0';
    document.getElementById('distance-counter').style.opacity = '0';
    
    // Mostrar canvas de supernova
    const supernovaContainer = document.getElementById('supernova-container');
    supernovaContainer.style.opacity = '1';
    supernovaContainer.style.pointerEvents = 'all';
    
    const canvas = document.getElementById('supernova-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    // Configuración de partículas
    let frame = 0;
    const particles = [];
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff6347', '#ffd700', '#ff4500', '#ffffff'];
    
    // Crear partículas de explosión
    for (let i = 0; i < 500; i++) {
        const angle = (Math.PI * 2 * i) / 500;
        const velocity = Math.random() * 15 + 5;
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 100 + Math.random() * 50,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2
        });
    }
    
    // ==========================================
    // ANIMACIÓN DE EXPLOSIÓN
    // ==========================================
    
    function animateSupernova() {
        // Dejar rastro
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let activeParticles = 0;
        
        // Dibujar partículas
        particles.forEach((p) => {
            if (p.life > 0) {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98; // Fricción
                p.vy *= 0.98;
                p.life--;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 20;
                ctx.shadowColor = p.color;
                ctx.fill();
                
                activeParticles++;
            }
        });
        
        // Flash central inicial
        if (frame < 50) {
            const gradient = ctx.createRadialGradient(
                canvas.width/2, canvas.height/2, 0,
                canvas.width/2, canvas.height/2, 300
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - frame/50})`);
            gradient.addColorStop(0.5, `rgba(255, 105, 180, ${0.8 - frame/60})`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        frame++;
        
        // Continuar animación o formar corazón
        if (activeParticles > 0 || frame < 200) {
            requestAnimationFrame(animateSupernova);
        } else {
            formGiantHeart();
        }
    }
    
    animateSupernova();
}

// ==========================================
// FORMAR CORAZÓN GIGANTE
// ==========================================

function formGiantHeart() {
    const heartContainer = document.getElementById('giant-heart');
    heartContainer.style.opacity = '1';
    
    const heartParticles = [];
    const numParticles = 200;
    
    // Fórmula paramétrica del corazón
    for (let i = 0; i < numParticles; i++) {
        const t = (i / numParticles) * Math.PI * 2;
        
        // Ecuación del corazón: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        heartContainer.appendChild(particle);
        
        heartParticles.push({
            element: particle,
            targetX: x * 15 + 300,
            targetY: y * 15 + 300,
            currentX: 300 + (Math.random() - 0.5) * 100,
            currentY: 300 + (Math.random() - 0.5) * 100
        });
    }
    
    // ==========================================
    // ANIMAR FORMACIÓN DEL CORAZÓN
    // ==========================================
    
    let formationFrame = 0;
    
    function animateFormation() {
        formationFrame++;
        let settled = 0;
        
        heartParticles.forEach(p => {
            // Interpolación suave hacia posición objetivo
            const dx = p.targetX - p.currentX;
            const dy = p.targetY - p.currentY;
            
            p.currentX += dx * 0.05;
            p.currentY += dy * 0.05;
            
            p.element.style.left = p.currentX + 'px';
            p.element.style.top = p.currentY + 'px';
            
            // Verificar si llegó a destino
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                settled++;
            }
        });
        
        // Continuar hasta que todas las partículas se asienten
        if (settled < numParticles || formationFrame < 100) {
            requestAnimationFrame(animateFormation);
        } else {
            // Mostrar botón después de formar el corazón
            setTimeout(() => {
                document.getElementById('center-button').classList.add('visible');
            }, 500);
        }
    }
    
    animateFormation();
}