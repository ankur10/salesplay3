export const importKey='salesplay-imported-contacts-v1';
export function parseContactCSV(text){
 const lines=[];let row=[],cell='',quoted=false;const first=text.replace(/^\uFEFF/,'').split(/\r?\n/)[0];const delimiter=first.includes('\t')?'\t':first.includes(';')&&!first.includes(',')?';':',';
 text=text.replace(/^\uFEFF/,'');
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++}else if(!cell||quoted)quoted=!quoted;else cell+=c}else if(c===delimiter&&!quoted){row.push(cell.trim());cell=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))lines.push(row);row=[];cell=''}else cell+=c}
 if(quoted)throw Error('A quoted field is incomplete. Close the quotation mark and try again.');
 row.push(cell.trim());if(row.some(Boolean))lines.push(row);
 if(lines.length<2)throw Error('Include a header row and at least one contact.');
 if(lines.length>501)throw Error('Import up to 500 contacts at a time.');
 return {headers:lines[0],rows:lines.slice(1)};
}
export const contactFields=[['name','Full name',/^(full\s?name|name|contact\s?name)$/i],['title','Job title',/^(job\s?title|title|role)$/i],['company','Company',/^(company|company\s?name|account|organization)$/i],['email','Email',/^(email|email\s?address)$/i],['location','Location',/^(location|city|country)$/i],['keywords','Opportunity keywords',/^(keywords|opportunity\s?keywords|interests|notes)$/i]];
export function inferMapping(headers){return Object.fromEntries(contactFields.map(([key,,pattern])=>[key,String(headers.findIndex(h=>pattern.test(h.trim())))]))}
export function reviewContactRows(rows,mapping,existing){
 const seen=new Set(existing.flatMap(p=>[p.email?'email:'+p.email.toLowerCase():null,'name:'+p.name.toLowerCase()]).filter(Boolean));
 const valid=[],issues=[];
 rows.forEach((row,index)=>{const read=key=>(row[Number(mapping[key])]||'').trim();const name=read('name'),email=read('email'),company=read('company')||'3M Company';
 let issue=!name?'Full name is missing':email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?'Email address is invalid':!/^3m(?: company| co\.?| corporation)?$/i.test(company)?'Company is not 3M; import from that account workspace':null;
 const keys=['name:'+name.toLowerCase(),...(email?['email:'+email.toLowerCase()]:[])];
 if(!issue&&keys.some(k=>seen.has(k)))issue='Already in this directory or duplicated in this file';
 if(issue){issues.push({row:index+2,name:name||'Unnamed contact',reason:issue});return}
 keys.forEach(k=>seen.add(k));valid.push({row:index+2,name,email,company:'3M Company',title:read('title')||'Role not provided',location:read('location')||'Location not provided',keywords:read('keywords'),initials:name.split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase(),opportunities:0,imported:true});
 });return {valid,issues};
}
export function loadImportedContacts(storage){try{const rows=JSON.parse(storage.getItem(importKey)||'[]');return Array.isArray(rows)?rows.filter(p=>p&&p.imported===true&&typeof p.id==='string'&&p.id.startsWith('imported-')&&['name','title','location','initials','company'].every(k=>typeof p[k]==='string')&&p.company==='3M Company'):[]}catch{return []}}
