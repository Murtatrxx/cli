#!/usr/bin/env node

import { init } from './commands/init.js';
import { help } from './commands/help.js';
import { version } from './commands/version.js';

const regex = /(?<=--|-)\w+/gm;
const rawArgs = process.argv.slice(2);
const flags = rawArgs.join(' ').match(regex);

const args = rawArgs
	.join(' ')
	.trim()
	.split(/ +/)
	.filter((e) => !/(--|-)\w+/gm.test(e));

const cmdName = args[0];

const commands = new Map([
	['help', help],
	['', help],
	['init', init],
        ['version', version],
        ['-v', version]
]);

const found = commands.get(cmdName);

if (found) {
	await found({ args, flags });
} else console.log('Unknown Command');
