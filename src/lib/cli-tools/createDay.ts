import {
    getCurrentDayInMonth,
    getCurrentYear,
} from '../../helpers/dateUtils.ts';
import { getFullPath } from '../../helpers/getFullPath.ts';
import { join, normalize } from '@std/path';
import { promptSelect } from '@std/cli/unstable-prompt-select';

const DAY_PATH_TEMPLATE = 'day_path_placeholder';

export const createDay = async (day?: string, year?: string) => {
    if (!day) {
        day = getCurrentDayInMonth();
    }
    if (!year) {
        year = getCurrentYear();
    }
    const path = getFullPath(day, year);

    //create input file
    const normalizedPath = normalize(path);
    await Deno.mkdir(join(normalizedPath), { recursive: true });
    //download input

    //TODO request auth token if none present

    //create example file

    //download example

    //create index.ts
    const selectedTemplate = promptSelect(
        'Please select a template',
        ['basic'],
        { clear: true }
    );
    const templateBasePath = normalize('./src/lib/cli-tools/templates/');
    const decoder = new TextDecoder();
    const templateFile = await Deno.readFile(
        `${templateBasePath}${selectedTemplate}.ts`
    );
    let templateFileContent = decoder.decode(templateFile);
    templateFileContent = templateFileContent.replace(DAY_PATH_TEMPLATE, path);
    // await Deno.copyFile(
    //     `${templateBasePath}${selectedTemplate}.ts`,
    //     normalizedPath
    // );
    await Deno.writeTextFile(
        normalize(`${normalizedPath}/index.ts`),
        templateFileContent
    );
};
