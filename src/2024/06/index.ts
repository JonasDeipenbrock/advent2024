import { readInput } from '../../helpers/readInput.ts';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('src/2024/06/example.txt')));
    console.log('1: ' + runPartOne(readInput('src/2024/06/input.txt')));
    // console.log(
    //     'Example 2: ' + runPartTwo(readInput('src/2024/06/example.txt'))
    // );
    // console.log('2: ' + runPartTwo(readInput('src/2024/06/input.txt')));
};

const ROTATION_MATRIX_90 = [
    [0, 1],
    [-1, 0],
];
const visitedPos = new Map<number, number>();

const runPartOne = (input: string) => {
    const lines = input.split('\n').map((line) => line.trim());
    const grid = lines.map((row) => row.split('')).flat();

    let direction = [-1, 0];

    const gridX = lines.length;
    const gridY = lines[0].length;
    // const startIndex = grid.findIndex((pos) => pos === '^');
    // let curPos = startIndex;
    // visitedPos.set(curPos, 1);
    // while (true) {
    //     const curY = curPos % gridX;
    //     // const curX = Math.floor(curPos / gridY);

    //     let nextPos = curPos + direction[0] * gridX + direction[1] * 1;
    //     let nextSymbol = grid[nextPos];
    //     while (nextSymbol === '#') {
    //         direction = matrixMult(ROTATION_MATRIX_90, direction);
    //         nextPos = curPos + direction[0] * gridX + direction[1] * 1;
    //         nextSymbol = grid[nextPos];
    //     }
    //     //if y = 0 && direction is left => break
    //     if (curY === 0 && direction[1] === -1) {
    //         break;
    //     }
    //     //if y = gridY && direction is right => break
    //     if (curY === gridY - 1 && direction[1] === 1) {
    //         break;
    //     }
    //     if (nextPos < 0 || nextPos > gridX * gridY) {
    //         break;
    //     }
    //     curPos = nextPos;
    //     visitedPos.set(curPos, (visitedPos.get(curPos) ?? 0) + 1);
    // }
    const visitedTiles = gameLoop(grid, gridX, gridY);
    const savedBasePath = new Map(visitedPos);
    let foundLoops = 0;

    savedBasePath.forEach((_, pos) => {
        const gridCopy = [...grid];
        gridCopy[pos] = '#';

        // before taking a step in a direction check if that produces a loop (maximum loop size is boardsize double squared)
        const visitedTilesLoop = gameLoop(gridCopy, gridX, gridY);
        if (visitedTilesLoop === -1) {
            foundLoops++;
        }

        // loop check => if direction and position are known previously then its a loop
    });

    console.log(`Found amount of loops: ${foundLoops}`);

    return visitedTiles;
};

const gameLoop = (grid: string[], gridX: number, gridY: number) => {
    visitedPos.clear();
    let direction = [-1, 0];
    const startIndex = grid.findIndex((pos) => pos === '^');
    let curPos = startIndex;
    visitedPos.set(curPos, 1);
    while (true) {
        const curY = curPos % gridX;
        // const curX = Math.floor(curPos / gridY);

        let nextPos = curPos + direction[0] * gridX + direction[1] * 1;
        let nextSymbol = grid[nextPos];
        while (nextSymbol === '#') {
            direction = matrixMult(ROTATION_MATRIX_90, direction);
            nextPos = curPos + direction[0] * gridX + direction[1] * 1;
            nextSymbol = grid[nextPos];
        }
        //if y = 0 && direction is left => break
        if (curY === 0 && direction[1] === -1) {
            return visitedPos.size;
        }
        //if y = gridY && direction is right => break
        if (curY === gridY - 1 && direction[1] === 1) {
            return visitedPos.size;
        }
        if (nextPos < 0 || nextPos > gridX * gridY) {
            return visitedPos.size;
        }
        curPos = nextPos;
        let visitedTimes = visitedPos.get(curPos) ?? 0;
        visitedTimes++;
        if (visitedTimes >= 4) {
            // in a loop
            return -1;
        }
        visitedPos.set(curPos, visitedTimes);
    }
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    lines.forEach((line) => {});

    return result;
};

const matrixMult = (a: number[][], b: number[]) => {
    /*

        1
        2
    1 2
    3 4
    */
    return [a[0][0] * b[0] + a[0][1] * b[1], a[1][0] * b[0] + a[1][1] * b[1]];
};
