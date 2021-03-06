let w = 400;
let h = 400;

let rows = 200;
let cols = 200;

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
    for (let x = 0; x < cols; x++) {
        grid[x] = [];
        next[x] = [];
        for (let y = 0; y < rows; y++) {
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
    k = parseFloat(sliderkill.value);
    f = parseFloat(sliderfeed.value);
    loadPixels();
    for (let x = 1; x < cols - 1; x++) {
        for (let y = 1; y < rows - 1; y++) {
            let a = grid[x][y].a
            let b = grid[x][y].b
            next[x][y].a = a + (dA * laplace(x, y, "a") -  a * b * b + f * (1 - a)) * dt;
            next[x][y].b = b + (dB * laplace(x, y, "b") +  a * b * b - b * (k + f)) * dt;
            
            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);

            let p1 = ((x * floor(width/cols)) + (y * floor(height/rows)) * width) * 4;
            let p2 = ((x * floor(width/cols)) + (y * floor(height/rows) + 1) * width) * 4;
            let p3 = ((x * floor(width/cols) + 1) + (y * floor(height/rows) + 1) * width) * 4;
            let p4 = ((x * floor(width/cols) + 1) + (y * floor(height/rows)) * width) * 4;
            
            let c = constrain(next[x][y].a - next[x][y].b, 0, 1); // b
            let red = constrain(1.5 * c * 255, 0, 255);
            let green = constrain(2.1 * c * 255, 0, 255);
            let blue = constrain(3 * c * 255, 0, 255);
            pixels[p1 + 0] = red;
            pixels[p1 + 1] = green;
            pixels[p1 + 2] = blue;
            pixels[p1 + 3] = 130 + 125 * c; // 200 + c
            pixels[p2 + 0] = red;
            pixels[p2 + 1] = green;
            pixels[p2 + 2] = blue;
            pixels[p2 + 3] = 130 + 125 * c; // 200 + c
            pixels[p3 + 0] = red;
            pixels[p3 + 1] = green;
            pixels[p3 + 2] = blue;
            pixels[p3 + 3] = 130 + 125 * c; // 200 + c
            pixels[p4 + 0] = red;
            pixels[p4 + 1] = green;
            pixels[p4 + 2] = blue;
            pixels[p4 + 3] = 130 + 125 * c; // 200 + c
        }
    }

    
    // loadPixels();
    // for (let x = 0; x < width; x++) {
    //     for (let y = 0; y < height; y++) {
    //         let pix = (x + y * width) * 4;
    //         let a = next[floor(x * (cols/width))][floor(y * (rows/height))].a;
    //         let b = next[floor(x * (cols/width))][floor(y * (rows/height))].b;
    //         let c = constrain(a - b, 0, 1); // b
    //         let red = constrain(1.5 * c * 255, 0, 255);
    //         let green = constrain(2.1 * c * 255, 0, 255);
    //         let blue = constrain(3 * c * 255, 0, 255);
    //         pixels[pix + 0] = red;
    //         pixels[pix + 1] = green;
    //         pixels[pix + 2] = blue;
    //         pixels[pix + 3] = 130 + 125 * c; // 200 + c
    //     }
    // }
    for (let x = 0; x < cols; x++) {
        next[x][rows -1].a = 1;
        next[x][0].a = 1;
    }

    for (let y = 0; y < rows; y++) {
        next[cols - 1][y].b = 0
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
        let u = floor(mousepos['x'] * (cols/width));
        let v = floor(mousepos['y'] * (rows/height));
        grid[u][v].b = 1
        if (u != 0) {
            grid[u - 1][v].b = 0.4
        }
        if (u != cols - 1) {
            grid[u + 1][v].b = 0.4
        }
        if (v != 0) {
            grid[u][v - 1].b = 0.4
        }
        if (v != rows - 1) {
            grid[u][v + 1].b = 0.4
        } 
        if (u != 0 && v != 0) {
            grid[u - 1][v - 1].b = 0.2
        }
        if (u != 0 && v != rows - 1) {
            grid[u - 1][v + 1].b = 0.2
        }
        if (u != cols - 1 && v != 0) {
            grid[u + 1][v - 1].b = 0.2
        }
        if (u != cols - 1 && v != rows - 1) {
            grid[u + 1][v + 1].b = 0.2
        }
    }
}

function getSpot(mousepos){
    let theI = Math.floor(mousepos.x/(w))
    let theJ = Math.floor(mousepos.y/(h))
    return {i: theI,
            j: theJ}
}

// slider = document.getElementById("sliderfeed");
// selector = document.getElementById("selector");
// SelectValue = document.getElementById("SelectValue");
// ProgressBar = document.getElementById("ProgressBar");

// SelectValue.innerHTML = slider.value;

// slider.oninput = function(){
//     SelectValue.innerHTML = this.value;
//     selector.style.left = this.value + "%";
//     ProgressBar.style.width = this.value + "%";
// }