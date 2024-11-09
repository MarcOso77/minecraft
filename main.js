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
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
