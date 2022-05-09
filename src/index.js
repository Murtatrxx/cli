#!/usr/bin/env node

import { init } from './commands/init.js';
const regex = /(?<=--|-)\w+/gm;
const rawArgs = process.argv.slice(2);
const flags = rawArgs.join(' ').match(regex);

const args = rawArgs
	.join(' ')
	.trim()
	.split(/ +/)
	.filter((e) => !/(--|-)\w+/gm.test(e));

const cmdName = args[0];
const commands = new Map([['init', init]]);

const found = commands.get(cmdName);

if (found) {
	await found({ args, flags });
} else console.log('Unknown Command');
