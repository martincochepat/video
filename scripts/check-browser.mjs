import {execFileSync} from 'node:child_process';
console.log(execFileSync('/usr/bin/chromium', ['--version'], {encoding: 'utf8'}).trim());
