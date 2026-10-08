import React, {useState} from 'react';
import {ArrowRight, Plus, X} from 'lucide-react';
import './opportunity-brief.css';

const split = value => [...new Set(value.split(/[,\n;]/).map(x=>x.trim()).filter(Boolean))];
const stop = new Set('about above after again also among before being below between could does during each find finding from have into look looking more most opportunities opportunity other should show some than that their them there these they this through want what when where which with would your interested please help identify company signals signal parameters path tied next conversation'.split(' '));
export const opportunityText = o => [o.title,o.goal,o.bu,...o.products,...(o.people||[]).map(p=>p.name+' '+p.title)].join(' ').toLowerCase();
export function matchesBrief(o,brief) {
  if(!brief)return true;
  const text=opportunityText(o), test=term=>text.includes(term.toLowerCase());
  return !brief.exclude.some(test) && (brief.mode==='all'?brief.terms.every(test):brief.terms.some(test));
}
export function termsFromPrompt(prompt) {
  return [...new Set((prompt.toLowerCase().match(/[a-z0-9®-]+/g)||[]).filter(w=>w.length>3&&!stop.has(w)))].slice(0,12);
}
export default function OpportunityBrief({initial,records,onApply,onSave,saveError}) {
  const [savedId,setSavedId]=useState(initial?.id),[name,setName]=useState(initial?.name||''),[saveMessage,setSaveMessage]=useState('');
  const [prompt,setPrompt]=useState(initial?.prompt||'');
  const [signals,setSignals]=useState(initial?.signals||'');
  const [exclusions,setExclusions]=useState(initial?.exclude.join('\n')||'');
  const [terms,setTerms]=useState(initial?.terms||[]);
  const [mode,setMode]=useState(initial?.mode||'any');
  const [review,setReview]=useState(!!initial),[newTerm,setNewTerm]=useState('');
  const brief={id:savedId,name,prompt,signals,terms,exclude:split(exclusions),mode};
  function save(){const item=onSave?.(brief);if(item){setSavedId(item.id);setSaveMessage('Saved to My Prompts.');}}
  const count=records.filter(o=>!o.imported&&matchesBrief(o,brief)).length;
  function prepare(){setTerms([...new Set([...termsFromPrompt(prompt),...split(signals)])]);setReview(true);}
  function addTerm(){setSaveMessage('');setTerms(old=>[...new Set([...old,...split(newTerm)])]);setNewTerm('');}
  return <section className="opportunity-brief" aria-label="Build your opportunity prompt" onChange={()=>setSaveMessage('')}>
    <div className="brief-heading"><div><h2>{review?'Review your prompt':'What would you like to uncover?'}</h2><p>{review?'Fine-tune the terms, then find opportunities or save this search.':'Describe the opportunity you have in mind.'}</p></div></div>
    {!review&&<>
    <label className="brief-label" htmlFor="opportunity-prompt">Describe your ideal opportunity</label>
    <textarea id="opportunity-prompt" value={prompt} maxLength={4000} onChange={e=>{setPrompt(e.target.value);setReview(false)}} placeholder="For example, look for opportunities to introduce our flame retardants where 3M is expanding production or evaluating alternate suppliers." rows={3}/>
    <details className="brief-extra"><summary>Add signals or exclusions <span>Optional</span></summary><div className="brief-fields">
      <label>Signals or parameters to include<textarea rows={2} value={signals} maxLength={2000} onChange={e=>{setSignals(e.target.value);setReview(false)}} placeholder={'New Ulm\nMaterial qualification'}/><small>Add your own phrases, one per line or separated by commas.</small></label>
      <label>What should we leave out? <span>(optional)</span><textarea rows={2} value={exclusions} maxLength={2000} onChange={e=>setExclusions(e.target.value)} placeholder={'Roofing\nPigments'}/><small>Exclude opportunities containing these phrases.</small></label>
    </div>
    </details></>}
    {!review?<div className="brief-footer"><p>3M Company</p><button className="cx-button cx-primary" disabled={!prompt.trim()&&!signals.trim()} onClick={prepare}>Review search criteria<ArrowRight size={16}/></button></div>:
    <section className="brief-review" aria-label="Review search criteria">
      <div className="brief-review-heading"><button className="cx-link" onClick={()=>setReview(false)}>Edit prompt</button><label>Match <select aria-label="Prompt match logic" value={mode} onChange={e=>setMode(e.target.value)}><option value="any">Any search term</option><option value="all">All search terms</option></select></label></div>
      <p className="brief-review-prompt">{prompt||signals}</p>
      <label className="brief-name">Prompt name <input maxLength={80} value={name} onChange={e=>{setName(e.target.value);setSaveMessage('')}} placeholder="For example, Flame retardants at 3M"/></label>
      <div className="brief-terms">{terms.map(term=><button key={term} aria-label={'Remove search term '+term} onClick={()=>{setSaveMessage('');setTerms(old=>old.filter(x=>x!==term));}}>{term}<X size={14}/></button>)}</div>
      <form className="brief-add" onSubmit={e=>{e.preventDefault();addTerm()}}><input aria-label="Add search terms" value={newTerm} onChange={e=>setNewTerm(e.target.value)} placeholder="Add a term or phrase…"/><button className="cx-button" disabled={!newTerm.trim()}><Plus size={16}/>Add</button></form>
      <div className="brief-footer"><p role="status">{terms.length?<><strong>{count} captured {count===1?'opportunity':'opportunities'}</strong> {count===1?'matches':'match'} these criteria.{!count&&' Try fewer terms or change to “Any”.'}</>:'Add at least one search term to continue.'}</p><div className="brief-save-actions">{onSave&&<button className="cx-button" disabled={!terms.length||!name.trim()} onClick={save}>{savedId?'Save changes':'Save prompt'}</button>}<button className="cx-button cx-primary" disabled={!terms.length} onClick={()=>onApply(brief)}>Find opportunities<ArrowRight size={16}/></button></div></div>
    {saveError?<p role="alert" className="hy-error">{saveError}</p>:saveMessage&&<p role="status" className="brief-save-message">{saveMessage}</p>}
    </section>}
    <p className="brief-disclosure">Preview: matches words and phrases in captured opportunities. Your prompt is not sent to AI; new signals are search criteria, not verified events.</p>
  </section>;
}
