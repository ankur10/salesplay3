import React, {useState,useEffect} from 'react';
import {ChevronDown} from 'lucide-react';
export const themes=[
 {id:'precision',name:'Precision',description:'White, navy, and focused blue',header:'#122b49'},
 {id:'advisory',name:'Advisory',description:'Navy, white, and precise blue',header:'#051c2c'},
 {id:'mineral',name:'Mineral',description:'Cool gray and intelligence blue',header:'#172b3a'}
];
export default function ThemePicker(){
 const [theme,setTheme]=useState(document.documentElement.dataset.theme||'advisory');
 const [announcement,setAnnouncement]=useState('');
 function apply(value,persist=true){
  const choice=themes.find(t=>t.id===value)||themes[1];
  document.documentElement.dataset.theme=choice.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',choice.header);
  setTheme(choice.id);
  if(persist){try{localStorage.setItem('salesplay-colour-theme',choice.id)}catch{}}
  setAnnouncement(choice.name+' theme selected. '+choice.description+'.');
 }
 useEffect(()=>{const sync=e=>{if(e.key==='salesplay-colour-theme'||e.key===null)apply(e.newValue,false)};addEventListener('storage',sync);return()=>removeEventListener('storage',sync)},[]);
 return <><label className="theme-control" title="Colour theme"><span className="theme-swatch" aria-hidden="true"/><select aria-label="Colour theme" value={theme} onChange={e=>apply(e.target.value)}>{themes.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}</select><ChevronDown size={13} aria-hidden="true"/></label><span className="theme-announcement" role="status" aria-live="polite">{announcement}</span></>;
}
