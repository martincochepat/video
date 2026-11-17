import {Easing, interpolate} from 'remotion';
export const smooth = (time:number, start:number, end:number, from:number, to:number) => interpolate(time,[start,end],[from,to],{easing:Easing.bezier(.65,0,.35,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const rankingState = (t:number) => {
  const noeX=t<5.3?smooth(t,4.85,5.3,155,570):t<5.9?570:t<6.4?smooth(t,5.9,6.4,570,155):t<6.5?smooth(t,6.4,6.5,155,147):smooth(t,6.5,6.6,147,155);
  const noeY=smooth(t,5.3,5.9,1140,790);
  return [
    {id:'sacha',name:'Sacha',points:12,x:155,y:smooth(t,5.3,5.9,790,965),rank:t<5.9?1:2},
    {id:'mila',name:'Mila',points:10,x:155,y:smooth(t,5.3,5.9,965,1140),rank:t<5.9?2:3},
    {id:'noe',name:'Noé',points:Math.min(13,Math.floor(smooth(t,3.9,4.7,8,13)+.00001)),x:noeX,y:noeY,rank:t<6.4?3:1},
  ];
};
