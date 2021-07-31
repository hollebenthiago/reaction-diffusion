let w = 200;
let h = 200;

let grid;
let next;

let dA = 1;
let dB = 0.5;
let f = 0.055;
let k = 0.062;
let dt = 1;

let mouseDown = false;
let touching = false;
let mousepos;
let clickpos;

let slider;
let selector;
let SelectValue;
let ProgressBar;

//SETUP FUNCTION
function setup() {

    var cnvs = createCanvas(w, h);
    // cnvs.style.border = 'border: 1px solid black';
    cnvs.parent('canvasHere');
    var canvas = document.getElementById('defaultCanvas0');
    canvas.style.border = "1px solid black";
    pixelDensity(1);

    grid = [];
    next = [];
    for (let x = 0; x < width; x++) {
        grid[x] = [];
        next[x] = [];
        for (let y = 0; y < height; y++) {
            grid[x][y] = {a: 1, b: 0};
            next[x][y] = {a: 1, b: 0};
        }
    }


    document.getElementById('defaultCanvas0').addEventListener('mousedown', checkMouseTouch)
    document.addEventListener('mouseup', checkMouseTouch)
    document.getElementById('defaultCanvas0').addEventListener('touchstart', checkMouseTouch)
    document.getElementById('defaultCanvas0').addEventListener('touchend', checkMouseTouch)
    document.getElementById('defaultCanvas0').addEventListener('mousemove', addB)
    document.getElementById('defaultCanvas0').addEventListener('touchmove', addB)
    // document.getElementById('defaultCanvas0').addEventListener('click', setStartEnd)    
    // document.getElementById('defaultCanvas0').addEventListener('touchstart', setStartEnd)
}

//LOOP
function draw() {

    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            let a = grid[x][y].a
            let b = grid[x][y].b
            next[x][y].a = a + (dA * laplace(x, y, "a") -  a * b * b + f * (1 - a)) * dt;
            next[x][y].b = b + (dB * laplace(x, y, "b") +  a * b * b - b * (k + f)) * dt;
            
            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);
        }
    }

    

    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pix = (x + y * width) * 4;
            let a = next[x][y].a;
            let b = next[x][y].b;
            let c = constrain(a - b, 0, 1);
            let red = constrain(3 * c * 255, 0, 255);
            let green = constrain(1 * c * 255, 0, 255);
            let blue = constrain(2 * c * 255, 0, 255);
            pixels[pix + 0] = red;
            pixels[pix + 1] = green;
            pixels[pix + 2] = blue;
            pixels[pix + 3] = 255;
        }
    }
    for (let x = 0; x < width; x++) {
        next[x][height -1].a = 1;
        next[x][0].a = 1;
    }

    for (let y = 0; x < height; y++) {
        next[width - 1][y].b = 0
        next[0][y].b = 0
    }
    updatePixels();

    swap();
}

function swap() {
    let temp = grid;
    grid = next;
    next = temp;
    
}

function laplace(x, y, z) {
    let sum = 0;

    sum += grid[x][y][z] * - 1;

    sum += grid[x - 1][y][z] * 0.2;
    
    sum += grid[x + 1][y][z] * 0.2;
    
    sum += grid[x][y - 1][z] * 0.2;
    
    sum += grid[x][y + 1][z] * 0.2;

    sum += grid[x - 1][y - 1][z] * 0.05;
    
    sum += grid[x - 1][y + 1][z] * 0.05;
    
    sum += grid[x + 1][y - 1][z] * 0.05;
    
    sum += grid[x + 1][y + 1][z] * 0.05;
    return sum
}


function checkMouseTouch(event) {
    //maybe i only need 2 ifs, cause its either mouse or touch
    if (event.type == 'mousedown') {
        mouseDown = true;
    }
    else if (event.type == 'mouseup') {
        mouseDown = false;
    }
    else if (event.type == 'touchstart') {
        touching = true;
    }
    else if (event.type == 'touchend') {
        touching = false;
    }
}

function addB(event) {
    let rect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    if (event.type == 'mousemove') {
        mousepos = {x: (event.clientX - rect.left) / (rect.right - rect.left) * w,
                    y: (event.clientY - rect.top) / (rect.bottom - rect.top) * h
        }
    }
    else if (event.type == 'touchmove') {
        mousepos = {x: (event.touches[0].clientX - rect.left) / (rect.right - rect.left) * w,
                    y: (event.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * h
        }
    }

    // let oneEnd = getSpot(mousepos);

    if (touching || mouseDown) {
        grid[floor(mousepos['x'])][floor(mousepos['y'])].b = 1
    }
}

function getSpot(mousepos){
    let theI = Math.floor(mousepos.x/(w))
    let theJ = Math.floor(mousepos.y/(h))
    return {i: theI,
            j: theJ}
}

slider = document.getElementById("slider");
selector = document.getElementById("slider");
SelectValue = document.getElementById("SelectValue");
ProgressBar = document.getElementById("ProgressBar");

SelectValueValue.innerHTML = slider.value;

slider.oninput = function(){
    SelectValueValue.innerHTML = this.value;
    selector.style.left = this.value + "%";
    ProgressBar.style.width = this.value + "%";
}