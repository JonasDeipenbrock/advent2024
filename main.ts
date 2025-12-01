import { parseArgs } from '@std/cli/parse-args';
import { createDay } from './src/lib/cli-tools/createDay.ts';
import { runDay } from './src/lib/cli-tools/runDay.ts';

if (import.meta.main) {
    const args = parseArgs(Deno.args, {
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
    if (args['help']) {
        console.log(
            'Welcome to Jonas AoC create and run script or short ACARS!'
        );
        console.log('-----------');
        console.log(
            'Run the command with --create or -c to create a new folder for the current or chosen day.'
        );
        console.log('-----------');
        console.log(
            'Run the command with --day or -d to set the target day. If no day is given this defaults to the current day.'
        );
        console.log('-----------');
        console.log(
            'Run the command with --year or -y to set the target year. Defaults to the current year'
        );
    } else if (args['create']) {
        createDay(args['day'], args['year']);
    } else if (args['run']) {
        runDay(args['day'], args['year']);
    } else {
    }
    // runCurrentDay();
}
