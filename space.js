// ==========================================
// CONFIGURACIÓN DEL ESPACIO 3D CON THREE.JS
// ==========================================

// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Variables de animación
let speed = 0;
let targetSpeed = 0;

// ==========================================
// CREACIÓN DE ESTRELLAS
// ==========================================

const starsGeometry = new THREE.BufferGeometry();
const starsCount = 8000;
const posArray = new Float32Array(starsCount * 3);
const colorsArray = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i += 3) {
    // Posiciones aleatorias en el espacio
    posArray[i] = (Math.random() - 0.5) * 2000;
    posArray[i+1] = (Math.random() - 0.5) * 2000;
    posArray[i+2] = (Math.random() - 0.5) * 2000;
    
    // Colores variados (blanco, azul claro, rosa claro)
    const colorChoice = Math.random();
    if (colorChoice > 0.8) {
        colorsArray[i] = 1;     // R
        colorsArray[i+1] = 0.7; // G
        colorsArray[i+2] = 0.9;   // B (rosa)
    } else if (colorChoice > 0.6) {
        colorsArray[i] = 0.7;   // R
        colorsArray[i+1] = 0.8;   // G
        colorsArray[i+2] = 1;     // B (azul)
    } else {
        colorsArray[i] = 1;     // R
        colorsArray[i+1] = 1;     // G
        colorsArray[i+2] = 1;     // B (blanco)
    }
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const starsMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const starMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starMesh);

// ==========================================
// NEBULOSAS (ESFERAS TRANSLÚCIDAS)
// ==========================================

const nebulas = [];
const nebulaColors = [0xff69b4, 0x9b59b6, 0x3498db, 0xe74c3c];

for (let i = 0; i < 5; i++) {
    const geometry = new THREE.SphereGeometry(Math.random() * 50 + 20, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: nebulaColors[i],
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
    });
    const nebula = new THREE.Mesh(geometry, material);
    nebula.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500 - 200
    );
    scene.add(nebula);
    nebulas.push(nebula);
}

// Posición inicial de cámara
camera.position.z = 500;

// ==========================================
// FUNCIÓN DE ANIMACIÓN PRINCIPAL
// ==========================================

function animateSpace() {
    requestAnimationFrame(animateSpace);
    
    // Suavizar la velocidad de navegación
    speed += (targetSpeed - speed) * 0.05;
    
    // Rotar estrellas lentamente
    starMesh.rotation.y += 0.0002 + speed * 0.01;
    starMesh.rotation.x += 0.0001;
    
    // Animar nebulosas
    nebulas.forEach((nebula, i) => {
        nebula.rotation.y += 0.001 * (i + 1);
        nebula.position.z += speed * 2;
        
        // Resetear posición cuando pasa la cámara
        if (nebula.position.z > 500) {
            nebula.position.z = -500;
        }
    });
    
    // Mover estrellas hacia la cámara (efecto warp)
    const positions = starMesh.geometry.attributes.position.array;
    for(let i = 2; i < positions.length; i += 3) {
        positions[i] += speed * 5;
        if (positions[i] > 500) {
            positions[i] = -500;
        }
    }
    starMesh.geometry.attributes.position.needsUpdate = true;
    
    // Renderizar escena
    renderer.render(scene, camera);
}

// Iniciar animación
animateSpace();

// ==========================================
// RESPONSIVE
// ==========================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// PARALLAX CON MOUSE
// ==========================================

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    camera.position.x = mouseX * 20;
    camera.position.y = -mouseY * 20;
    camera.lookAt(0, 0, 0);
});