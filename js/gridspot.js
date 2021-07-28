function gridSpot(i, j, camefrom, topology, ln) {
    this.i        = i;
    this.j        = j;
    this.f        = 0;
    this.g        = 0;
    this.h        = 0;
    this.wall     = false;
    this.weight   = 0;
    this.camefrom = camefrom;
    this.ln       = ln;
    this.draw = function(m, n) {
        
        let fillStyle;
        if ((start[0] == m && start[1] == n) || (end[0] == m && end[1] == n)) {
            // fillStyle = fill(color(62, 14, 69));
            // fillStyle = fill(color(7, 237, 237))
            fillStyle = fill(color(252, 140, 3));
            fillStyle;
            rect(this.i * w / rows, this.j * h / cols, 
                w / rows, h / cols)
            fillStyle = undefined;
        }
        else if (this.wall) {
            fillStyle = fill(0)
            fillStyle;
            rect(this.i * w / rows, this.j * h / cols, 
                w / rows, h / cols)
            fillStyle = undefined;
        }
        // else if (this.weight > 0) {
        //     fillStyle = fill(color(84, 129, 255))
        //     fillStyle;
        //     rect(this.i * w / rows, this.j * h / cols, 
        //         w / rows, h / cols)
        //     fillStyle = undefined;
        // }
        else{
            var inChecking = false;
            var inChecked  = false;
            var inPath     = false;
            for (i = 0; i < checking.length; i ++) {
                if (m == checking[i][0] && n == checking[i][1]) {
                    inChecking = true;
                    fillStyle = fill(color(47, 250, 64, 255 - 2 * metric(topology, ln, [i, j], [end[0], end[1]])));
                    fillStyle;
                    rect(this.i * w / rows, this.j * h / cols, 
                        w / rows, h / cols)
                    fillStyle = undefined;
                    break;
                }
            }
            for (i = 0; i < checked.length; i ++) {
                if (m == checked[i][0] && n == checked[i][1]) {
                    inChecked  = true;
                    fillStyle = fill(color(250, 156, 67, 255 - 2*(Math.abs(this.i - end[0]) + Math.abs(this.j - end[1]))));
                    fillStyle;
                    rect(this.i * w / rows, this.j * h / cols, 
                        w / rows, h / cols)
                    fillStyle = undefined;
                    break;
                }
            }
            for (i = 0; i < path.length; i ++) {
                if (m == path[i][0] && n == path[i][1]) {
                    inPath  = true;
                    if (this.weight > 0) {
                        fillstyle = fill(color(168,135,129));
                    }
                    else {
                        fillStyle = fill(color(252, 140, 3));
                    }
                    fillStyle;
                    rect(this.i * w / rows, this.j * h / cols, 
                        w / rows, h / cols)
                    fillStyle = undefined;
                    break;
                }
            
            }
            if (this.weight > 0 && !inPath ) {
                fillStyle = fill(color(84, 129, 255))
                fillStyle;
                rect(this.i * w / rows, this.j * h / cols, 
                    w / rows, h / cols)
                fillStyle = undefined;
            }
        }
    }
    this.topology     = topology;
    this.addNeighbors = function (topology, ln, i, j) {
        if (topology == 'plane') {
            this.neighbors = [];
            if (i != 0) {
                this.neighbors.push([i - 1, j])
            }
            if (i != rows - 1) {
                this.neighbors.push([i + 1, j])
            }
            if (j != 0) {
                this.neighbors.push([i, j - 1])
            }
            if (j != cols - 1) {
                this.neighbors.push([i, j + 1])
            }
            if (ln == 'Allow diagonals') {
                if (i != 0 && j != 0) {
                    this.neighbors.push([i - 1, j - 1]);
                }
                if (i != 0 && j != cols - 1) {
                    this.neighbors.push([i - 1, j + 1]);
                }
                if (i != rows - 1 && j != 0) {
                    this.neighbors.push([i + 1, j - 1]);
                }
                if (i != rows - 1 && j != cols - 1) {
                    this.neighbors.push([i + 1, j + 1]);
                }
            }
        }
        else if (topology == 'cylinder') {
            this.neighbors = [];
            if (i != 0) {
                this.neighbors.push([i - 1, j])
            }
            if (i == 0) {
                this.neighbors.push([rows - 1, j])
            }
            this.neighbors.push([(i + 1) % rows, j])
            if (j != 0) {
                this.neighbors.push([i, j - 1])
            }
            if (j != cols - 1) {
                this.neighbors.push([i, j + 1])
            }
            if (ln == 'Allow diagonals') {
                if (j != 0) {
                    if (i != 0) {
                        this.neighbors.push([i - 1, j - 1]);
                    }
                    else {
                        this.neighbors.push([rows - 1, j - 1]);
                    }
                    this.neighbors.push([(i + 1) % rows, j - 1]);                    
                }
                if (j != cols - 1) {
                    this.neighbors.push([(i + 1) % rows, j + 1]);   
                    if (i != 0) {
                        this.neighbors.push([i - 1, j + 1]);
                    }
                    else {
                        this.neighbors.push([rows - 1, j + 1]);
                    }                 
                }
            }
        }
        else if (topology == 'torus') {
            this.neighbors = [];
            if (i != 0) {
                this.neighbors.push([i - 1, j])
            }
            if (i == 0) {
                this.neighbors.push([rows - 1, j])
            }
            this.neighbors.push([(i + 1) % rows, j])
            if (j != 0) {
                this.neighbors.push([i, j - 1])
            }
            if (j == 0) {
                this.neighbors.push([i, cols - 1])
            }
            this.neighbors.push([i, (j + 1) % cols])
            if (ln == 'Allow diagonals') {
                if (j != 0) {
                    if (i != 0) {
                        this.neighbors.push([i - 1, j - 1]);
                    }
                    else {
                        this.neighbors.push([rows - 1, j - 1]);
                    }
                    this.neighbors.push([(i + 1) % rows, j - 1]);                    
                }
                if (j == 0) {
                    if (i != 0) {
                        this.neighbors.push([i - 1, cols - 1]);
                    }
                    else {
                        this.neighbors.push([rows - 1, cols - 1]);
                    }
                    this.neighbors.push([(i + 1) % rows, cols - 1]);                    
                }
                if (j != cols - 1) {
                    this.neighbors.push([(i + 1) % rows, j + 1]);   
                    if (i != 0) {
                        this.neighbors.push([i - 1, j + 1]);
                    }
                    else {
                        this.neighbors.push([rows - 1, j + 1]);
                    }                 
                }
                if (j == cols - 1) {
                    this.neighbors.push([(i + 1) % rows, 0]);   
                    if (i != 0) {
                        this.neighbors.push([i - 1, 0]);
                    }
                    else {
                        this.neighbors.push([rows - 1, 0]);
                    }                 
                }
            }
        }
    }
}