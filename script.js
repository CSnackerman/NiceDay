var canvas = document.querySelector('canvas');
var ctx = canvas.getContext ('2d');

// width and height of canvas
const WIDTH = 500;
const HEIGHT = 500;

const DIRT_HEIGHT = 50;
const GRASS_SIZE = 50;

const UPDATE_INTERVAL = 500 //ms


// load sun
const sun = new Image();
sun.src = 'images/sun.png';
var sun_offset_x = 117;
var sun_offset_y = 117;
var sun_row = 0;
var sun_col = 0;
var sun_frame = 0;
const SUN_FRAMES = 3;


// load grass images
const grass1 = new Image();
grass1.src = 'images/grass1.png'

const grass2 = new Image();
grass2.src = 'images/grass2.png'

const grass3 = new Image();
grass3.src = 'images/grass3.png'

const grass4 = new Image();
grass4.src = 'images/grass4.png'

// test random grass selector
console.log ('A random grass', selectRandomGrass())


// rendering function
function main() {

    // clear
    ctx.fillStyle = 'skyblue';
    ctx.fillRect (0, 0, WIDTH, HEIGHT);

    // draw objects
    drawSun(ctx);
    drawDirt (ctx);
    plantGrass (ctx);

    
    
}

// get the ball rolling
main();

// updates the canvas every 1 sec
setInterval ( () => {

    requestAnimationFrame (main);

}, UPDATE_INTERVAL );

// ================================================================ //

// drawing functions

function drawDirt (ctx) {
    ctx.fillStyle = 'rgb(43, 20, 0)';
    ctx.fillRect (0, HEIGHT - DIRT_HEIGHT, WIDTH, DIRT_HEIGHT);
}


function plantGrass (ctx) {

    let numberOfGrasses = 10;

    for (let i = 0; i < numberOfGrasses; i++) {
        let grass = selectRandomGrass();
        let x = randomRange (-GRASS_SIZE / 2, WIDTH);
        let y = randomRange (HEIGHT - DIRT_HEIGHT - GRASS_SIZE, HEIGHT - GRASS_SIZE)
        ctx.drawImage (grass, x, y, GRASS_SIZE, GRASS_SIZE);
    }
    
}

function drawSun(ctx) {

    sun_row = Math.floor (sun_frame / SUN_FRAMES);
    sun_col = sun_frame % SUN_FRAMES;

    console.log ('frame', sun_frame)
    console.log (sun_row, sun_col);

    ctx.drawImage (
        sun, 
        sun_offset_x * sun_row,
        sun_offset_y * sun_col,
        sun_offset_x,
        sun_offset_y,
        100, 100,
        sun_offset_x,
        sun_offset_y
    )

    sun_frame = (sun_frame + 1) % 9;
}

// utility functions

function selectRandomGrass() {

    // select a random number between 0 and 3
    let selection = randomRange (0, 3);

    if (selection === 0) return grass1;
    if (selection === 1) return grass2;
    if (selection === 2) return grass3;
    if (selection === 3) return grass4;
}


function randomRange (min, max) {
    min = Math.ceil (min);
    max = Math.floor (max) + 1;
    return Math.floor (Math.random() * (max - min) + min);
}