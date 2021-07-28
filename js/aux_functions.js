//AUX FUNCTIONS

//REMOVE ELEMENT FROM ARRAY
function removefromArray(array, element) {
    for (let i = array.length-1; i >= 0; i--) {
        if (array[i][0] ==  element[0] && array[i][1] == element[1]) {
            array.splice(i, 1);
        }
    }
}

//METRIC FUNCTION
function metric(topology, ln, a, b) {
    if (topology == 'plane' && ln == 'Allow diagonals') {
        return Math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2);
    }
    else if (topology == 'plane' && ln == 'No diagonals') {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
    }
    else if (topology == 'cylinder' && ln == 'Allow diagonals') {
        return Math.sqrt(Math.min(Math.abs(a[0] - b[0]), Math.abs((rows - a[0] - b[0]) % rows))**2 + Math.abs(a[1] - b[1])**2)
    }
    else if (topology == 'cylinder' && ln == 'No diagonals') {
        return Math.min(Math.abs(a[0] - b[0]), Math.abs((rows - a[0] - b[0]) % rows)) + Math.abs(a[1] - b[1])
    }
    else if (topology == 'torus' && ln == 'Allow diagonals') {
        return Math.min(Math.sqrt((a[0]  - b[0])**2 + (a[1]  - b[1])**2), 
                        Math.sqrt(((rows - a[0] - b[0]) % rows)**2  + (a[1]  - b[1])**2),
                        Math.sqrt((a[0]  - b[0])**2 + ((cols - a[1]   - b[1]) % cols)**2),
                        Math.sqrt(((rows - a[0] - b[0]) % rows)**2  + ((cols - a[1] - b[1]) % cols)**2))
    }
    else if (topology == 'torus' && ln == 'No diagonals') {
        return Math.min(Math.abs(a[0]  - b[0]) + Math.abs(a[1]  - b[1]), 
                        Math.abs((rows - a[0]  - b[0]) % rows)  + Math.abs(a[1]  - b[1]),
                        Math.abs(a[0]  - b[0]) + Math.abs((cols - a[1] - b[1])   % cols),
                        Math.abs((rows - a[0]  - b[0]) % rows   + Math.abs((cols - a[1] - b[1]) % cols)))
    }
}

//FUNCTIONS FOR THE GRID SPOTS
function getSpot(mousepos){
    let theI = Math.floor(mousepos.x/(w/rows))
    let theJ = Math.floor(mousepos.y/(h/cols))
    return {i: theI,
            j: theJ}
}

function getNeighbors(spot) {
    let neighbors = spot.neighbors
    let result = [];
    for (i = 0; i < neighbors.length; i++) {
        result.push(grid[neighbors[i][0]][neighbors[i][1]])
    }
    return result;
}