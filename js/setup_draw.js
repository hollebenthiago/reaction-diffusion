var grid;
var next;

var dA = 1;
var dB = 0.5;
var f = 0.055;
var k = 0.062;
var dt = 1;



//SETUP FUNCTION
function setup() {
    createCanvas(200, 200);
    pixelDensity(1);

    grid = [];
    next = [];
    for (var x = 0; x < width; x++) {
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y < height; y++) {
            grid[x][y] = {a: 1, b: 0};
            next[x][y] = {a: 1, b: 0};
        }
    }

    for (var i = 40; i < 50; i++) {
        for (var j = 140; j < 150; j++) {
            grid[i][j].b = 1;
        }
    }

    for (var i = 140; i < 150; i++) {
        for (var j = 40; j < 50; j++) {
            grid[i][j].b = 1;
        }
    }

    // for (var i = t * 20; i < t * 20 + 5; i++) {
    //     for (var j = t * 20; j < t * 20 + 5; j++) {
    //         grid[i][j].b = 1;
    //     }
    // }
    // for (var t = 1; t < 9; t++) {
    //     for (var i = t * 20; i < t * 20 + 5; i++) {
    //         for (var j = t * 20; j < t * 20 + 5; j++) {
    //             grid[i][j].b = 1;
    //         }
    //     }
    // }
}

//LOOP
function draw() {
    // background(51);

    for (var x = 1; x < width - 1; x++) {
        for (var y = 1; y < height - 1; y++) {
            var a = grid[x][y].a
            var b = grid[x][y].b
            next[x][y].a = a + (dA * laplace(x, y, "a") -  a * b * b + f * (1 - a)) * dt;
            next[x][y].b = b + (dB * laplace(x, y, "b") +  a * b * b - b * (k + f)) * dt;
            
            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);
        }
    }

    

    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pix = (x + y * width) * 4;
            var a = next[x][y].a;
            var b = next[x][y].b;
            var c = a - b;
            var c = constrain(a - b, 0, 1);
            var r = constrain(3 * c * 255, 0, 255);
            var g = constrain(1 * c * 255, 0, 255);
            var b = constrain(2 * c * 255, 0, 255);
            pixels[pix + 0] = r;
            pixels[pix + 1] = g;
            pixels[pix + 2] = b;
            pixels[pix + 3] = 255;
        }
    }
    for (var x = 0; x < width; x++) {
        next[x][height -1].a = 1;
        next[x][0].a = 1;
    }

    for (var y = 0; x < height; y++) {
        next[width - 1][y].b = 0
        next[0][y].b = 0
    }
    updatePixels();

    swap();
}

function swap() {
    var temp = grid;
    grid = next;
    next = temp;
    
}

function laplace(x, y, z) {
    var sum = 0;

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
// function windowResized() {
//     w = windowWidth - 50
//     h = 2 * windowHeight/3
//     resizeCanvas(w, h);
//     let btns = document.getElementsByTagName('button')
//     // for (let i = 0; i < buttons.length; i++) {
//     //     btns[i].style.width = String((windowHeight - 50)/15).concat('px');
//     //     btns[i].style.fontSize = String((windowHeight - 50)/90).concat('px');        
//     // }
//     // for (let i = 0; i < selects.length; i++) {
//     //     document.getElementsByTagName('select')[i].style.width = String((windowHeight - 50)).concat('px');
//     // }
// }