import React,{useState} from 'react';
import {Search,Plus,ArrowRight,FileText} from 'lucide-react';
import {matchesBrief} from './OpportunityBrief';
export default function BriefLibrary({persist=true,briefs,records,onOpen,onEdit,onCreate,onExplore}) {
 const [query,setQuery]=useState('');
 const visible=briefs.filter(b=>(b.name+' '+b.prompt+' '+b.signals).toLowerCase().includes(query.trim().toLowerCase()));
 return <section className="brief-library">
  <div className="cx-page-heading"><div><h1>My Prompts</h1><p>Save what you’re looking for. Find opportunities that match.</p></div><button className="cx-button cx-primary" onClick={onCreate}><Plus size={16}/>Create prompt</button></div>
  <div className="brief-library-tools"><label className="cx-search"><Search size={17}/><input aria-label="Search saved prompts" placeholder="Find a prompt…" value={query} onChange={e=>setQuery(e.target.value)}/></label><span>{briefs.length} saved · 3M Company</span><button className="cx-link" onClick={onExplore}>Explore opportunities</button></div>
  {visible.length?<div className="brief-library-list">{visible.map(b=>{
   const count=records.filter(o=>!o.imported&&matchesBrief(o,b)).length;
   return <article key={b.id}><div className="brief-library-copy"><h2><button onClick={()=>onOpen(b)}>{b.name}</button></h2><p>{b.prompt||b.signals}</p><small>{b.terms.length} {b.terms.length===1?'search term':'search terms'} · Match {b.mode} · {b.exclude.length} exclusions</small></div><div className="brief-library-actions"><strong>{count} {count===1?'opportunity':'opportunities'}</strong><button className="cx-button cx-primary" onClick={()=>onOpen(b)}>View opportunities<ArrowRight size={15}/></button><button className="cx-link" onClick={()=>onEdit(b)}>Edit prompt</button></div></article>;
  })}</div>:<div className="cx-empty"><FileText size={26}/><h2>{query?'No matching prompts':'Keep a good search close'}</h2><p>{query?'Try another name or keyword.':'Save a prompt for each product, business priority, or type of opportunity you want to pursue.'}</p><button className="cx-button" onClick={query?()=>setQuery(''):onCreate}>{query?'Clear search':'Create your first prompt'}</button></div>}
  <p className="brief-disclosure">{persist?'Saved in this browser for 3M.':'Saved for this gallery session only; reload clears these prompts.'} Counts reflect captured opportunities and your criteria, not live monitoring or AI-generated recommendations.</p>
 </section>;
}
