import { joinToString } from '@std/collections';
import { readInput } from '../../helpers/readInput.ts';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('src/2024/04/example.txt')));
    console.log('1: ' + runPartOne(readInput('src/2024/04/input.txt')));
    console.log(
        'Example 2: ' + runPartTwo(readInput('src/2024/04/example.txt'))
    );
    console.log('2: ' + runPartTwo(readInput('src/2024/04/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n').map((line) => line.trim().split(''));

    const columns = getColumns(lines).map((col) =>
        joinToString(col, (a) => a, { separator: '' })
    );

    const rows = getRows(lines).map((row) =>
        joinToString(row, (a) => a, { separator: '' })
    );

    const combinedLines: string[] = [
        columns,
        rows,
        getDiagonals(lines).map((diag) =>
            joinToString(diag, (a) => a, { separator: '' })
        ),
        getDiagonals(rotateGrid(lines)).map((diag) =>
            joinToString(diag, (a) => a, { separator: '' })
        ),
    ].flat();
    const matchesRight = combinedLines.map((stringy) =>
        stringy.matchAll(new RegExp('XMAS', 'g'))
    );
    const matchesLeft = combinedLines.map((stringy) =>
        stringy.matchAll(new RegExp('SAMX', 'g'))
    );
    const sumMatches = matchesLeft
        .concat(matchesRight)
        .reduce((sum, matches) => sum + matches.toArray().length, 0);
    return sumMatches;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    for (let n = 1; n < lines.length - 1; n++) {
        for (let m = 1; m < lines[n].length - 1; m++) {
            const currChar = lines[n][m];
            if (currChar === 'A') {
                const topLeft = lines[n - 1][m - 1];
                const topRight = lines[n - 1][m + 1];
                const lowerLeft = lines[n + 1][m - 1];
                const lowerRight = lines[n + 1][m + 1];
                const ms = ['M', 'S'];

                if (
                    ms.includes(topLeft) &&
                    ms.includes(topRight) &&
                    ms.includes(lowerLeft) &&
                    ms.includes(lowerRight) &&
                    topLeft !== lowerRight &&
                    topRight !== lowerLeft
                )
                    result++;
            }
        }
    }

    return result;
};

const rotateGrid = <T>(grid: T[][]) => {
    return grid[0].map((_val, index) =>
        grid.map((row) => row[index]).reverse()
    );
};

const getDiagonals = <T>(grid: T[][]) => {
    const n = grid.length;
    const m = grid[0].length;

    const diags: T[][] = [];

    // m = 10, n = 10
    for (let i = 0; i < m + n - 1; i++) {
        // i: 3
        const diag: T[] = [];
        const dn = i < n ? 0 : i - n + 1;
        const dm = i < m ? 0 : i - m + 1;

        for (let j = i - dm; j >= dn; j--) {
            diag.push(grid[j][i - j]);
        }
        diags.push(diag);
    }
    return diags;
};

const getRows = <T>(grid: T[][]) => {
    return grid;
};

const getColumns = <T>(grid: T[][]) => {
    const columnsGrid: T[][] = [];
    for (let m = 0; m < grid[0].length; m++) {
        columnsGrid.push(getColumn(grid, m));
    }
    return columnsGrid;
};

const getColumn = <T>(grid: T[][], index: number) => {
    const column: T[] = [];
    for (let n = 0; n < grid.length; n++) {
        column.push(grid[n][index]);
    }
    return column;
};
