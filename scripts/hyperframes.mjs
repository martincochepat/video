import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const version=JSON.parse(fs.readFileSync(path.join(root,'package.json'))).devDependencies.hyperframes;
const configDir=path.join(root,'.cache/hyperframes');fs.mkdirSync(configDir,{recursive:true});
const launcher=path.join(root,'.agents/skills/hyperframes/scripts/plugin-cli.mjs');
if(!fs.existsSync(launcher))throw new Error('Exécuter node scripts/setup-hyperframes.mjs après npm ci.');
const result=spawnSync(process.execPath,[launcher,'--cli-version',version,...process.argv.slice(2)],{
 cwd:process.cwd(),stdio:'inherit',env:{...process.env,XDG_CACHE_HOME:path.join(root,'.cache'),HYPERFRAMES_CONFIG_DIR:configDir,HYPERFRAMES_CACHE_DIR:path.join(root,'.cache/hyperframes-cache'),HYPERFRAMES_BROWSER_PATH:'/usr/bin/chromium',HYPERFRAMES_NO_TELEMETRY:'1',HYPERFRAMES_SKIP_SKILLS:'1',PRODUCER_FORCE_SCREENSHOT:process.env.PRODUCER_FORCE_SCREENSHOT??'true',npm_config_cache:process.env.npm_config_cache??'/workspace/.npm-cache'}
});
if(result.error)throw result.error;
process.exitCode=result.status??1;
