
// GLOBAL VARIABLES
const rows      = 70;
const cols      = 30;
let w           = window.innerWidth - 50;
let h           = 2 * window.innerHeight/3;
let start       = [0, 0];
let end         = [rows-1, cols-1];
let diagWeight  = 1;
let lineWeight  = 1;
let drawGrid    = false;
let eraseGrid   = false;
let dwaterGrid  = false;
let ewaterGrid  = false;
let changeStart = false;
let changeEnd   = false;
let mouseDown   = false;
let touching    = false;
let buttons     = [];
let checking    = [];
let checked     = [];
let path        = [];
let topology    = 'plane';
let ln          = 'No diagonals';
let mousepos;
let clickpos;
let algorithm;

//START GRID
var grid = new Array(rows);

for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
}