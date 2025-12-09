const DAY_PATH = './src/2025/05';

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
    let freshAmount = 0;
    const [rawRanges, rawIds] = input.split('\r\n\r\n');
    const ranges = rawRanges
        .split('\n')
        .map((a) =>
            a
                .trim()
                .split('-')
                .map((x) => Number(x))
        )
        .sort((a, b) => (a[0] < b[0] ? -1 : 1));
    //possible optimization: check if ranges overlap

    const ids = rawIds
        .split('\n')
        .map((a) => a.trim())
        .map((x) => Number(x));

    const isFresh = (id: number, ranges: number[][]) => {
        for (const range of ranges) {
            if (range[0] > id) return false;
            if (range[1] < id) continue;
            return true;
        }
    };

    for (const id of ids) {
        const fresh = isFresh(id, ranges);
        if (fresh) {
            freshAmount++;
        }
    }

    return freshAmount;
};

const runPartTwo = (input: string) => {
    let freshLength = 0;
    const [rawRanges, _rawIds] = input.split('\r\n\r\n');
    const sortedRanges = rawRanges
        .split('\n')
        .map((a) =>
            a
                .trim()
                .split('-')
                .map((x) => Number(x))
        )
        .sort((a, b) => (a[0] < b[0] ? -1 : 1));

    // const ranges = sortedRanges.splice(0, 1);
    let temp_range = sortedRanges[0];
    for (const nextRange of sortedRanges) {
        //next range is subset so ignore
        if (nextRange[1] <= temp_range[1]) {
            continue;
        }
        //next range is after last range so add length and move to next
        else if (nextRange[0] > temp_range[1]) {
            freshLength += 1 + temp_range[1] - temp_range[0];
            temp_range = nextRange;
            //next range is part, so extend last range
        } else if (nextRange[0] <= temp_range[1]) {
            temp_range = [temp_range[0], nextRange[1]];
        }
    }
    //add last range on top
    freshLength += 1 + temp_range[1] - temp_range[0];
    //308693638312832
    //318971097874863
    //407819114403791

    return freshLength;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};
