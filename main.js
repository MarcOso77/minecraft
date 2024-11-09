import * as THREE from 'three';

// Initialisation de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Ciel bleu

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajout du sol
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(geometry, material);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Ajout des cubes (arbres)
function addTree(x, z) {
    const treeTrunk = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 1),
        new THREE.MeshBasicMaterial({ color: 0x8B4513 })
    );
    treeTrunk.position.set(x, 1, z);
    scene.add(treeTrunk);

    const treeTop = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshBasicMaterial({ color: 0x006400 })
    );
    treeTop.position.set(x, 3, z);
    scene.add(treeTop);
}

for (let i = -10; i <= 10; i += 5) {
    for (let j = -10; j <= 10; j += 5) {
        addTree(i, j);
    }
}

// Ajout du personnage
const character = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshBasicMaterial({ color: 0xFF0000 })
);
character.position.y = 1;
scene.add(character);

// Ajout de la lettre cachée
const letter = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xFFD700 }) // Couleur or pour rendre la lettre visible
);
letter.position.set(
    (Math.random() * 20) - 10, // Position X aléatoire
    0.5,                       // Légèrement au-dessus du sol
    (Math.random() * 20) - 10  // Position Z aléatoire
);
scene.add(letter);

// Contrôles du personnage
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            character.position.z -= 0.5;
            break;
        case 'ArrowDown':
            character.position.z += 0.5;
            break;
        case 'ArrowLeft':
            character.position.x -= 0.5;
            break;
        case 'ArrowRight':
            character.position.x += 0.5;
            break;
    }
    checkCollision();
});

// Fonction de détection de collision
function checkCollision() {
    const distance = character.position.distanceTo(letter.position);
    if (distance < 1) {
        displayMessage("Félicitations ! Vous avez trouvé la lettre !");
        scene.remove(letter); // Retire la lettre après l'avoir trouvée
    }
}

// Fonction pour afficher le message
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageDiv.style.color = '#FFD700';
    messageDiv.style.fontSize = '24px';
    messageDiv.style.fontFamily = 'Arial, sans-serif';
    messageDiv.style.borderRadius = '10px';
    messageDiv.innerText = message;
    document.body.appendChild(messageDiv);

    // Retirer le message après quelques secondes
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
