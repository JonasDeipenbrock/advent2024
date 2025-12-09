const DAY_PATH = './src/2025/04';

export const runProblem = () => {
    console.log(
        'Example 1: ' + runPartOne(readInput(`${DAY_PATH}/example.txt`))
    );
    console.log('1: ' + runPartOne(readInput(`${DAY_PATH}/input.txt`)));
    console.log(
        'Example 2: ' + runPartTwo(readInput(`${DAY_PATH}/example.txt`))
    );
    console.log('2: ' + runPartTwo(readInput(`${DAY_PATH}/input.txt`)));
};

const runPartOne = (input: string) => {
    const paper = '@';
    const neighbours = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    const grid = input.split('\n').map((a) => a.trim().split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    let result = 0;

    for (const [x, row] of grid.entries()) {
        for (const [y, roll] of row.entries()) {
            if (roll !== paper) {
                continue;
            }
            let paperNeighbours = 0;
            for (const [ax, ay] of neighbours) {
                const dx = x + ax;
                const dy = y + ay;
                if (
                    0 <= dx &&
                    dx < rows &&
                    0 <= dy &&
                    dy < cols &&
                    grid[dx][dy] === paper
                ) {
                    paperNeighbours++;
                }
            }
            if (paperNeighbours < 4) {
                result++;
            }
        }
    }

    return result;
};

const runPartTwo = (input: string) => {
    const paper = '@';
    const neighbours = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    const grid = input.split('\n').map((a) => a.trim().split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    let result = 0;

    let removedInIteration = 0;
    let iterationGrid = grid;
    const nextIterationGrid = iterationGrid;
    do {
        removedInIteration = 0;
        for (const [x, row] of iterationGrid.entries()) {
            for (const [y, roll] of row.entries()) {
                if (roll !== paper) {
                    continue;
                }
                let paperNeighbours = 0;
                for (const [ax, ay] of neighbours) {
                    const dx = x + ax;
                    const dy = y + ay;
                    if (
                        0 <= dx &&
                        dx < rows &&
                        0 <= dy &&
                        dy < cols &&
                        iterationGrid[dx][dy] === paper
                    ) {
                        paperNeighbours++;
                    }
                }
                if (paperNeighbours < 4) {
                    removedInIteration++;
                    nextIterationGrid[x][y] = '.';
                }
            }
        }
        result += removedInIteration;
        iterationGrid = nextIterationGrid;
    } while (removedInIteration > 0);

    return result;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};
