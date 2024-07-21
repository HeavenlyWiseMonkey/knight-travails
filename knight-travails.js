function knightMoves(start, end) {
    let prev = solve(start, createAdjacencyList());
    let path = reconstructPath(start, end, prev);

    console.log(`You made it in ${path.length-1} moves!  Here's your path:`);
    for (let i=0; i<path.length; i++) {
        console.log(path[i]);
    }
    return path;
}
function createAdjacencyList() {
    const adjacencyList = [];
    for (let i=0; i<8; i++) {
        adjacencyList[i] = [];
        for (let j=0; j<8; j++) {
            adjacencyList[i][j] = [];
            // top left
            if ((j+2)<=7 && (i-1)>=0) {
                adjacencyList[i][j].push([i-1,j+2]);
            }
            if ((j+1)<=7 && (i-2)>=0) {
                adjacencyList[i][j].push([i-2,j+1]);
            }
            // bottom left
            if ((j-2)>=0 && (i-1)>=0) {
                adjacencyList[i][j].push([i-1,j-2]);
            }
            if ((j-1)>=0 && (i-2)>=0) {
                adjacencyList[i][j].push([i-2,j-1]);
            }
            // top right
            if ((j+2)<=7 && (i+1)<=7) {
                adjacencyList[i][j].push([i+1,j+2]);
            }
            if ((j+1)<=7 && (i+2)<=7) {
                adjacencyList[i][j].push([i+2,j+1]);
            }
            // bottom right
            if ((j-2)>=0 && (i+1)<=7) {
                adjacencyList[i][j].push([i+1,j-2]);
            }
            if ((j-1)>=0 && (i+2)<=7) {
                adjacencyList[i][j].push([i+2,j-1]);
            }
        }
    }
    return adjacencyList;
}

function solve(start, adjacencyList) {
    const queue = [];
    queue.push(start);

    const visited = [];
    const prev = [];

    for (let i=0; i<8; i++) {
        visited[i] = [false, false, false, false, false, false, false, false];
        prev[i] = [null, null, null, null, null, null, null, null];
    }
    visited[start[0]][start[1]] = true;
    let cur;
    let neighbors;
    let check;
    while (queue.length) {
        cur = queue.shift();
        neighbors = adjacencyList[cur[0]][cur[1]];
        for (let i=0; i<neighbors.length; i++) {
            check = visited[neighbors[i][0]][neighbors[i][1]];
            if (check===false) {
                queue.push(neighbors[i]);
                visited[neighbors[i][0]][neighbors[i][1]] = true;
                prev[neighbors[i][0]][neighbors[i][1]] = cur;
            }
        }
    }
    return prev;
}

function reconstructPath(start, end, prev) {
    let path = [];
    while (end!==null) {
        path.push(end);
        end = prev[end[0]][end[1]];
    }
    path = path.reverse();

    return path;
}

knightMoves([3,3],[4,3]);