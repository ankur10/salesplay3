import React,{useState,useEffect} from 'react';
import {Copy,ArrowUpRight,Plus,Bookmark,ArrowLeft} from 'lucide-react';
import {createStarterKit,readStored,preferenceKey,draftKey,defaultPreferences,emailHref,templateKey,materialNames,renderTemplate} from './outreach';
import './outreach.css';

const blankTemplate=type=>({name:'',type,subject:'',body:'',instructions:''});
export default function OutreachWorkspace({opportunity,initialContact='',notify}) {
  const people=opportunity.people||[];
  const [personName,setPersonName]=useState(initialContact||people[0]?.name||'');
  const [customName,setCustomName]=useState('');
  const person=people.find(p=>p.name===personName)||{name:customName.trim(),title:'Contact added by you'};
  const [preferences]=useState(()=>({...defaultPreferences,...readStored(preferenceKey,{})}));
  const [drafts,setDrafts]=useState(()=>readStored(draftKey,{}));
  const [templates,setTemplates]=useState(()=>readStored(templateKey,{}));
  const [format,setFormat]=useState('email');
  const [picker,setPicker]=useState(false),[preview,setPreview]=useState(null);
  const [editor,setEditor]=useState(null),[original,setOriginal]=useState('');
  const [storageError,setStorageError]=useState(false),[addressError,setAddressError]=useState('');
  const key=JSON.stringify([opportunity.id,person.name]);
  const record=drafts[key];
  const kit=record?.kit||createStarterKit(opportunity,{...person,name:person.name||'[Contact name]'},'Identify the right owner',preferences);
  const material=kit[format];
  const email=record?.address||'';
  useEffect(()=>{setPicker(false);setPreview(null);setAddressError('')},[key,format]);
  function store(storageKey,next){try{localStorage.setItem(storageKey,JSON.stringify(next));setStorageError(false);return true}catch{setStorageError(true);return false}}
  function patchRecord(patch){const next={...drafts,[key]:{...record,kit,...patch}};setDrafts(next);store(draftKey,next)}
  function update(field,value){patchRecord({kit:{...kit,[format]:{...material,[field]:value}},edited:true})}
  function canLeave(){return !editor||JSON.stringify(editor)===original||window.confirm('Discard your unsaved template changes?')}
  function changeTab(next){if(next!==format&&format==='templates'&&!canLeave())return;setFormat(next);if(next!=='templates')setEditor(null)}
  function editTemplate(value){if(!canLeave())return;setEditor({...value});setOriginal(JSON.stringify(value));setFormat('templates')}
  function saveTemplate(event){event.preventDefault();const value={...editor,id:editor.id||crypto.randomUUID(),name:editor.name.trim(),body:editor.body.trim()};if(!value.name||!value.body)return;const next={...templates,[value.id]:value};setTemplates(next);const saved=store(templateKey,next);setEditor(value);setOriginal(JSON.stringify(value));notify(saved?'Personal template saved.':'Template available for this visit only. Browser storage is unavailable.')}
  function useTemplate(){patchRecord({kit:{...kit,[format]:renderTemplate(preview,opportunity,person,preferences.signature)},edited:true});setPreview(null);setPicker(false);notify('Template applied to this draft. Other materials are unchanged.')}
  async function copy(){try{await navigator.clipboard.writeText((material.subject?`Subject: ${material.subject}\n\n`:'')+material.body);notify('Copied to clipboard.')}catch{notify('Clipboard unavailable. Select the draft text and copy it directly.')}}
  function openEmail(){if(email&&!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(email)){setAddressError('Enter one valid email address, or leave it blank to add in your email app.');return}setAddressError('');window.location.href=emailHref(email,material);notify('Email app requested. Nothing has been sent by SalesPlay.')}
  const filtered=Object.values(templates).filter(t=>t.type===format);
  const rendered=preview?renderTemplate(preview,opportunity,person,preferences.signature):null;
  return <section className="outreach-workspace outreach-simple" aria-labelledby="outreach-title">
    <header className="outreach-heading"><div><h2 id="outreach-title">Outreach</h2><p>Start with a draft. Make it sound like you.</p></div><span className="outreach-storage" role="status">{storageError?'Changes not saved — browser storage unavailable':format==='templates'?'Personal templates · Saved in this browser':record?'Draft saved in this browser':'Pre-filled from this opportunity'}</span></header>
    <div className="outreach-formats" role="tablist" aria-label="Outreach material">{[...Object.entries(materialNames),['templates','My Templates']].map(([id,label])=><button key={id} role="tab" id={'material-'+id} aria-selected={format===id} aria-controls="material-panel" tabIndex={format===id?0:-1} onClick={()=>changeTab(id)} onKeyDown={e=>{const values=['email','talking','followup','templates'];if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'email':e.key==='End'?'templates':values[(values.indexOf(format)+(e.key==='ArrowRight'?1:3))%4];changeTab(next);document.getElementById('material-'+next)?.focus()}}}>{id==='templates'&&<Bookmark size={15}/>} {label}</button>)}</div>
    <div id="material-panel" role="tabpanel" aria-labelledby={'material-'+format}>
    {format==='templates'?<div className="template-workspace">
      <header className="template-heading"><div><h3>Your words, ready to reuse.</h3><p>Create personal templates for emails, talking points, and follow-ups.</p></div><button className="button primary" onClick={()=>editTemplate(blankTemplate('email'))}><Plus size={16}/>Create template</button></header>
      {!editor?<>{Object.values(templates).length?<div className="template-list">{Object.values(templates).map(t=><button key={t.id} onClick={()=>editTemplate(t)}><span><strong>{t.name}</strong><small>{materialNames[t.type]}</small></span><span>Edit template<ArrowUpRight size={15}/></span></button>)}</div>:<div className="template-empty"><h4>Write it once. Make it personal every time.</h4><p>Use placeholders for names and opportunity details. Your templates are private to this browser.</p><button className="button" onClick={()=>editTemplate(blankTemplate('email'))}>Create your first template<Plus size={16}/></button></div>}</>:<form className="template-editor" onSubmit={saveTemplate}>
        <button type="button" className="text-button" onClick={()=>{if(canLeave())setEditor(null)}}><ArrowLeft size={15}/>All my templates</button>
        <div className="template-fields"><label>Template name<input required value={editor.name} onChange={e=>setEditor({...editor,name:e.target.value})} placeholder="e.g. Introduction to a qualification owner"/></label><label>Material type<select value={editor.type} onChange={e=>setEditor({...editor,type:e.target.value})}>{Object.entries(materialNames).map(([id,label])=><option value={id} key={id}>{label}</option>)}</select></label></div>
        {editor.type!=='talking'&&<label>Subject<input value={editor.subject} onChange={e=>setEditor({...editor,subject:e.target.value})} placeholder="A question about {{opportunity}}"/></label>}
        <label>Template content<textarea required rows={10} value={editor.body} onChange={e=>setEditor({...editor,body:e.target.value})} placeholder={'Hi {{first_name}},\n\nI’m reaching out about {{opportunity}} at {{company}}.\n\nWho would be the right person to speak with?\n\n{{signature}}'}/></label>
        <p className="template-hint">Reusable placeholders: <code>{'{{first_name}}'}</code> <code>{'{{contact_name}}'}</code> <code>{'{{company}}'}</code> <code>{'{{opportunity}}'}</code> <code>{'{{products}}'}</code> <code>{'{{signature}}'}</code>. Replace specific names and account details before reusing a saved draft.</p>
        <details className="template-instructions"><summary>Writing instructions (optional)</summary><label>Instructions<textarea rows={3} value={editor.instructions} onChange={e=>setEditor({...editor,instructions:e.target.value})} placeholder="Keep it under 120 words. Ask for an introduction before requesting a meeting."/></label><p>Saved as guidance for you. AI interpretation is not connected in this prototype.</p></details>
        <footer><button className="button primary" disabled={!editor.name.trim()||!editor.body.trim()} type="submit">Save template</button><button className="button" type="button" onClick={()=>{if(canLeave())setEditor(null)}}>Cancel</button><span>Only you · Stored in this browser</span></footer>
      </form>}
    </div>:<>
      <div className="outreach-compose-bar"><div className="outreach-recipient"><label>For<select aria-label="Recipient" value={personName} onChange={e=>setPersonName(e.target.value)}>{people.map(p=><option key={p.name}>{p.name}</option>)}<option value="">Add a contact</option></select></label>{!personName&&<label>Contact name<input value={customName} onChange={e=>setCustomName(e.target.value)} placeholder="Full name"/></label>}</div><div className="outreach-template-actions"><button className="button" aria-expanded={picker} onClick={()=>{setPicker(!picker);setPreview(null)}}>Use template</button><button className="text-button" onClick={()=>editTemplate({...blankTemplate(format),subject:material.subject,body:material.body})}><Bookmark size={15}/>Save as template</button></div></div>
      {picker&&<section className="template-picker" aria-label="Choose a template"><header><h3>{materialNames[format]} templates</h3><button className="text-button" onClick={()=>{setPicker(false);setPreview(null)}}>Close</button></header>{filtered.length?<><div className="template-options">{filtered.map(t=><button className={'button '+(preview?.id===t.id?'primary':'')} key={t.id} onClick={()=>setPreview(t)}>{t.name}</button>)}</div>{rendered&&<div className="template-preview"><h4>Preview for {person.name||'your contact'}</h4>{rendered.subject&&<strong>{rendered.subject}</strong>}<p className="template-preview-body">{rendered.body}</p>{preview.instructions&&<p><strong>Writing instructions:</strong> {preview.instructions}<br/>Apply these manually; AI interpretation is not connected.</p>}<footer><button className="button primary" onClick={useTemplate}>Replace this draft</button><span>Replaces only this {materialNames[format].toLowerCase()}, including your edits.</span></footer></div>}</>:<p>No {materialNames[format].toLowerCase()} templates yet. <button className="text-button" onClick={()=>editTemplate(blankTemplate(format))}>Create one</button></p>}</section>}
      <div className="outreach-document">
        {format!=='talking'&&<><label className="outreach-address">To<input type="email" value={email} onChange={e=>{patchRecord({address:e.target.value});setAddressError('')}} placeholder="Email address (optional)" aria-describedby="outreach-email-note"/></label><p id="outreach-email-note" className="outreach-field-note">No verified address captured. You can add one in your email app.</p><label className="outreach-subject">Subject<input value={material.subject} onChange={e=>update('subject',e.target.value)}/></label></>}
        <label className="outreach-body-label"><span className="sr-only">{format==='talking'?'Talking points content':'Message'}</span><textarea className="outreach-message" value={material.body} onChange={e=>update('body',e.target.value)} spellCheck rows={format==='talking'?18:12}/></label>
        {addressError&&<p role="alert" className="outreach-error">{addressError}</p>}
        <footer className="outreach-delivery"><button className="button" onClick={copy}><Copy size={16}/>Copy {format==='talking'?'talking points':'email'}</button>{format!=='talking'&&<button className="button primary" onClick={openEmail}>Open in email app<ArrowUpRight size={16}/></button>}<p>Review before sending. SalesPlay does not send or track emails.</p></footer>
      </div>
      <details className="outreach-sources"><summary>Sources and context</summary><p>{person.name?`${person.name} · ${person.title}. `:''}Responsibility for this opportunity is unconfirmed. {opportunity.evidence} evidence · Product fit must be validated.</p><p>Pre-filled content uses captured account material and local templates, not live AI generation.</p>{(opportunity.evidenceItems||[]).map(item=><a key={item.source} href={item.url} target="_blank" rel="noreferrer">{item.source}<ArrowUpRight size={13}/></a>)}{!opportunity.evidenceItems&&<p>Only the captured goal and mapped products are available.</p>}</details>
      {opportunity.responses&&format==='talking'&&<details className="outreach-sources"><summary>If the conversation changes</summary>{opportunity.responses.map(([trigger,response])=><div key={trigger}><strong>{trigger}</strong><p>{response}</p></div>)}</details>}
    </>}
    </div>
  </section>
}
