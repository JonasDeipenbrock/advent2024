import { readInput } from '../../helpers/readInput.ts';
import { assertEquals } from 'jsr:@std/assert';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('src/2024/05/example.txt')));
    console.log('1: ' + runPartOne(readInput('src/2024/05/input.txt')));
    console.log(
        'Example 2: ' + runPartTwo(readInput('src/2024/05/example.txt'))
    );
    console.log('2: ' + runPartTwo(readInput('src/2024/05/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n').map((a) => a.trim());
    const emptyIndex = lines.findIndex((value) => value === '');
    const rules = lines.slice(0, emptyIndex);
    const rulesMap = new Map<string, string[]>();
    rules.forEach((rule) => {
        const pages = rule.split('|');
        const updatedRules = rulesMap.get(pages[0]) || [];
        updatedRules.push(pages[1]);
        rulesMap.set(pages[0], updatedRules);
    });
    const updates = lines.slice(emptyIndex + 1);
    let result = 0;

    for (let index = 0; index < updates.length; index++) {
        const pages = updates[index].split(',');
        let correct = true;
        pages.forEach((page, pageIndex) => {
            //check if page is correct
            //find all rules including the page in the left side
            const pageRules = rulesMap.get(page);
            if (!pageRules) {
                return;
            }
            pageRules.forEach((pageRule) => {
                const ruleIndex = pages.findIndex((pg) => pg === pageRule);
                if (ruleIndex === -1) return;
                //check if all pages on the right side come after the page index
                if (ruleIndex < pageIndex) {
                    correct = false;
                    return;
                }
            });
        });
        if (correct) {
            const middle = Math.floor(pages.length / 2);
            result += parseInt(pages[middle]);
        }
    }
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n').map((a) => a.trim());
    const emptyIndex = lines.findIndex((value) => value === '');
    const rules = lines.slice(0, emptyIndex);
    const rulesMap = new Map<string, string[]>();
    rules.forEach((rule) => {
        const pages = rule.split('|');
        const updatedRules = rulesMap.get(pages[0]) || [];
        updatedRules.push(pages[1]);
        rulesMap.set(pages[0], updatedRules);
    });

    const updates = lines.slice(emptyIndex + 1);
    let result = 0;

    for (let index = 0; index < updates.length; index++) {
        //sort line
        const originalPages = updates[index].split(',');
        const sortedPages = [...originalPages].sort((a, b) =>
            rulesMap.get(a)?.includes(b) ? -1 : 1
        );
        try {
            //compare if same as unsorted
            assertEquals(sortedPages, originalPages);
        } catch (_error) {
            //if different take median of sorted
            result += parseInt(sortedPages[Math.floor(sortedPages.length / 2)]);
        }
    }
    return result;
};
