import { parseArgs } from '@std/cli/parse-args';

export const parseAocArgs = (args: string[]) => {
    return parseArgs(args, {
        alias: {
            help: ['h'],
            create: ['c'],
            run: ['r'],
            day: ['d'],
            year: ['y'],
        },
        string: ['day', 'year'],
        unknown: (arg) => {
            console.log(`Found an illegal option, ignoring option "${arg}"!`);
            return false;
        },
    });
};

export type ParseArgs = ReturnType<typeof parseAocArgs>;
