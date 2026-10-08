import {useState} from 'react';
export const briefStorageKey='salesplay-briefs-3m-v1';
export function validBrief(b) {
  return b && typeof b.id==='string' && typeof b.name==='string' && b.name.trim().length>0 && typeof b.prompt==='string' && typeof b.signals==='string' &&
    ['any','all'].includes(b.mode) && Array.isArray(b.terms) && b.terms.length>0 && b.terms.every(t=>typeof t==='string'&&t.trim()) &&
    Array.isArray(b.exclude) && b.exclude.every(t=>typeof t==='string') && typeof b.updatedAt==='string';
}
export function useSavedBriefs(persist=true) {
  const [error,setError]=useState('');
  const [briefs,setBriefs]=useState(()=>{
    if(!persist)return [];
    try {const stored=JSON.parse(localStorage.getItem(briefStorageKey)||'[]');return Array.isArray(stored)?stored.filter(validBrief):[];}
    catch{return [];}
  });
  function save(brief) {
    const item={...brief,id:brief.id||crypto.randomUUID(),name:brief.name.trim(),updatedAt:new Date().toISOString()};
    if(!validBrief(item)){setError('Add a name and at least one search term before saving.');return null;}
    // Read the latest list before a write so another tab's newly saved briefs are retained.
    let existing=briefs;
    if(persist)try {const latest=JSON.parse(localStorage.getItem(briefStorageKey)||'[]');if(Array.isArray(latest))existing=latest.filter(validBrief);}
    catch {setError('Prompts could not be read from this browser. Your draft is still here; try saving again.');return null;}
    const next=[item,...existing.filter(b=>b.id!==item.id)];
    if(persist)try {localStorage.setItem(briefStorageKey,JSON.stringify(next));}
    catch {setError('This browser could not save your prompt. Your draft is still here; free storage or enable browser storage and try again.');return null;}
    setBriefs(next);setError('');return item;
  }
  return {briefs,save,error};
}
