import {useState,useRef,useEffect} from 'react';
import {paths} from './routing.js';
const emptyMessages=[];
export const conversationKey='salesplay-conversations-v1';
export function readConversations(storage){
 try{const saved=JSON.parse(storage.getItem(conversationKey)||'[]');return Array.isArray(saved)?saved.filter(c=>c&&typeof c.id==='string'&&typeof c.title==='string'&&Number.isFinite(c.updatedAt)&&typeof c.scopeLabel==='string'&&typeof c.scopeQuery==='string'&&Array.isArray(c.messages)&&c.messages.length&&c.messages.every(m=>m&&['user','assistant'].includes(m.role)&&typeof m.text==='string')).sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,50):[]}catch{return []}
}
export function conversationUrl(conversation){const params=new URLSearchParams(conversation.scopeQuery);params.set('chat',conversation.id);return paths.ai+'?'+params.toString()}
export function useConversations(route,go){
 const [sessions,setSessions]=useState(()=>{try{return readConversations(localStorage)}catch{return []}}),[pending,setPending]=useState([]),[storageError,setStorageError]=useState(false);
 const timers=useRef(new Set()),sending=useRef(new Set());
 const active=sessions.find(c=>c.id===route.params.get('chat'));
 useEffect(()=>{try{localStorage.setItem(conversationKey,JSON.stringify(sessions));setStorageError(false)}catch{setStorageError(true)}},[sessions]);
 useEffect(()=>()=>{timers.current.forEach(clearTimeout)},[]);
 function send(text,scopeLabel){
  const id=active?.id||crypto.randomUUID();if(sending.current.has(id))return false;
  const params=new URLSearchParams();for(const key of ['opportunity','contact','document'])if(route.params.has(key)){params.set(key,route.params.get(key));break}
  const session=active||{id,title:text,scopeLabel,scopeQuery:params.toString(),messages:[]};
  const next={...session,updatedAt:Date.now(),messages:[...session.messages,{role:'user',text}]};
  setSessions(items=>[next,...items.filter(c=>c.id!==id)].slice(0,50));sending.current.add(id);setPending(items=>[...items,id]);
  if(!active)go(conversationUrl(next),{replace:true});
  const timer=setTimeout(()=>{setSessions(items=>items.map(c=>c.id===id?{...c,updatedAt:Date.now(),messages:[...c.messages,{role:'assistant',text}]}:c).sort((a,b)=>b.updatedAt-a.updatedAt));sending.current.delete(id);setPending(items=>items.filter(value=>value!==id));timers.current.delete(timer)},650);timers.current.add(timer);return true;
 }
 return {sessions,active,messages:active?.messages||emptyMessages,busy:pending.includes(active?.id),send,storageError};
}
