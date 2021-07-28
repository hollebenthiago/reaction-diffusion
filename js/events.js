//ADD WALLS EVENT/FUNCTION
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

function addWalls(event) {
    var rect = document.getElementById('defaultCanvas0').getBoundingClientRect();
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

    let toWall = getSpot(mousepos)
    if (drawGrid && (mouseDown || touching)) {
        grid[toWall.i][toWall.j].wall = true;
    }
    else if (eraseGrid && (mouseDown || touching)) {
        grid[toWall.i][toWall.j].wall = false;
    }
    else if (dwaterGrid && (mouseDown || touching)) {
        grid[toWall.i][toWall.j].weight = 4;
    }
    else if (ewaterGrid && (mouseDown || touching)) {
        grid[toWall.i][toWall.j].weight = 0;
    }
}

function setStartEnd(event) {
    var rect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    clickpos = {x: (event.clientX - rect.left) / (rect.right - rect.left) * w,
                y: (event.clientY - rect.top) / (rect.bottom - rect.top) * h
            };
    let oneEnd = getSpot(clickpos)
    if (changeStart) {
        start = [oneEnd.i, oneEnd.j]
    }
    else if (changeEnd) {
        end = [oneEnd.i, oneEnd.j]
    }
}

function changeTopology() {
    topology = topSel.value();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].addNeighbors(topology, ln, i, j);
        }
    }
}

function changeLn() {
    ln = lnSel.value();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].addNeighbors(topology, ln, i, j);
        }
    }
}