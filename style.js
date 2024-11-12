const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const img_links = ["./img/USU_1.jpg", "./img/USU_2.jpg", "./img/USU_3.jpg", "./img/USU_4.jpg", "./img/USU_5.jpg", "./img/USU_6.jpg", "./img/USU_7.jpg", "./img/USU_8.jpg", "./img/USU_9.jpg", "./img/USU_10.jpg", "./img/USU_11.jpg", "./img/USU_12.jpg", "./img/USU_13.jpg"]
const brickTexture = textureLoader.load(img_links[Math.floor(Math.random() * img_links.length)])

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({map: brickTexture});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 2;

const pointLight = new THREE.PointLight(0xfffff, 1, 100)
pointLight.position.set(10, 10, 10);
scene.add(pointLight)
const raycaster = new THREE.Raycaster();

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)



function animate(){
    requestAnimationFrame(animate);
    cube.rotation.z += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera)
}
animate()

let moveSpeed = 0.1
let rotationSpeed = 0.02
let keys = {}

window.addEventListener("keydown",(event) => {
    keys[event.key] = true;
})
window.addEventListener("keyup",(event) => {
    keys[event.key] = false;
})


const reycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener("click",(event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)

    if(intersects.length > 0){
        const object = intersects[0].object;
        object.material.color.set(Math.random() * 0xffffff);
    }
})


let isDragging = false;
let previousMousePosition = {x:0, y:0};
window.addEventListener("mousedown", () => {isDragging = true;})
window.addEventListener("mouseup", () => {isDragging = false;})
window.addEventListener("mousemove", (event) => {
    if (isDragging){
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y,
        };
    
    
        cube.rotation.y += -deltaMove.x * 0.005;
        cube.rotation.x += deltaMove.y * 0.005;
    
        previousMousePosition = {x: event.clientX, y: event.clientY}
    }
})

function updateCameraMovement(){
    if(keys['ArrowUp'] || keys['w']) camera.position.z -= moveSpeed;
    if(keys['ArrowDown'] || keys['s']) camera.position.z += moveSpeed;
    if(keys['ArrowLeft'] || keys['a']) camera.position.y -= moveSpeed;
    if(keys['ArrowRight'] || keys['d']) camera.position.y += moveSpeed;
}

function update(){
    updateCameraMovement();
    requestAnimationFrame(update);
}
update();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})