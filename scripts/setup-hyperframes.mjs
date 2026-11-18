import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const version=JSON.parse(fs.readFileSync(path.join(root,'node_modules/hyperframes/package.json'))).version;
const names=['hyperframes','hyperframes-cli','media-use'];
const installed=[];
const treeHash=(dir)=>{const parts=[];const walk=(base)=>{for(const entry of fs.readdirSync(base,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const file=path.join(base,entry.name);if(entry.isDirectory())walk(file);else parts.push(Buffer.from(path.relative(dir,file)),fs.readFileSync(file));}};walk(dir);return crypto.createHash('sha256').update(Buffer.concat(parts)).digest('hex');};
for(const name of names){
 const src=path.join(root,'node_modules/hyperframes/dist/skills',name),dest=path.join(root,'.agents/skills',name);
 if(!fs.existsSync(dest))fs.cpSync(src,dest,{recursive:true});
 // Les skills déjà suivis par Git sont préservés lors d'une restauration.
 if(!fs.existsSync(path.join(dest,'SKILL.md')))throw new Error(`Skill incomplet : ${name}`);
 const installedSha256=treeHash(dest),bundledSha256=treeHash(src);
 installed.push({name,source:`hyperframes@${version}/dist/skills/${name}`,installedSha256,bundledSha256,matchesBundled:installedSha256===bundledSha256});
 if(installedSha256!==bundledSha256)console.warn(`${name} diffère du paquet : version locale préservée.`);
}
const assets=[['node_modules/gsap/dist/gsap.min.js','gsap.min.js'],['node_modules/gsap/README.md','gsap-README.md'],['public/productions/pronos-17-nov/fonts/BarlowCondensed-ExtraBold.ttf','BarlowCondensed-ExtraBold.ttf'],['public/productions/pronos-17-nov/fonts/Barlow-OFL.txt','Barlow-OFL.txt']];
const hashes={};
for(const [source,target] of assets){
 const src=path.join(root,source),dest=path.join(root,'examples/hyperframes-smoke/assets',target);fs.mkdirSync(path.dirname(dest),{recursive:true});
 if(!fs.existsSync(dest))fs.copyFileSync(src,dest);
 hashes[target]=crypto.createHash('sha256').update(fs.readFileSync(dest)).digest('hex');
}
const record={version,source:'https://github.com/heygen-com/hyperframes',skills:installed,assets:hashes};
fs.writeFileSync(path.join(root,'references/hyperframes-installation.json'),JSON.stringify(record,null,2)+'\n');
console.log(`Hyperframes ${version} : ${names.length} skills officiels disponibles pour Codex, actifs locaux prêts.`);
