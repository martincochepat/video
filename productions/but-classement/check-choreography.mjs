import assert from 'node:assert/strict';
import {rankingState} from '../../src/productions/goal-choreography.ts';
for(let frame=0;frame<480;frame++){
 const rows=rankingState(frame/60);
 for(let a=0;a<rows.length;a++)for(let b=a+1;b<rows.length;b++){
  const xOverlap=Math.min(rows[a].x+410,rows[b].x+410)-Math.max(rows[a].x,rows[b].x);
  const yOverlap=Math.min(rows[a].y+145,rows[b].y+145)-Math.max(rows[a].y,rows[b].y);
  assert.ok(xOverlap<=0||yOverlap<=0,`Lignes qui se traversent à l’image ${frame}`);
 }
}
const end=rankingState(7.5).sort((a,b)=>a.y-b.y);
assert.deepEqual(end.map(r=>[r.name,r.points,r.rank]),[['Noé',13,1],['Sacha',12,2],['Mila',10,3]]);
console.log('480 positions contrôlées : aucune intersection des lignes ; ordre et points finaux vérifiés.');
