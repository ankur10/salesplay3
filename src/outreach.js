// Local starter templates. No model call or mail delivery occurs here.
export const preferenceKey = 'salesplay-outreach-preferences-v1';
export const draftKey = 'salesplay-outreach-drafts-v1';
export const defaultPreferences = {instructions:'',tone:'Conversational',signature:''};
export function readStored(key, fallback) {
  try { const value=JSON.parse(localStorage.getItem(key)); return value && typeof value==='object' && !Array.isArray(value) ? value : fallback; } catch { return fallback; }
}
export function createStarterKit(opportunity, person, objective, preferences) {
  const first=person.name.startsWith('[')?person.name:person.name.split(' ')[0];
  const greeting=preferences.tone==='Formal'?`Dear ${person.name},`:`Hi ${first},`;
  const close=preferences.signature.trim() || '[Your name]';
  const subject=`${opportunity.short}: a qualification question`;
  const opening=opportunity.script || `I’m reaching out from LANXESS to understand who at 3M evaluates materials for ${opportunity.short}. We are exploring whether ${opportunity.products.join(' or ')} could be relevant, but would first want to understand your requirements and qualification process.`;
  const ask=objective==='Validate material fit'?'Could you help confirm the relevant material requirements and whether an alternate source can be evaluated?':objective==='Request a screening conversation'?'If there is a relevant formulation and an open qualification path, would a 20-minute technical screening conversation be useful?':'Could you point me to the person responsible for formulation and material qualification?';
  return {
    email:{subject,body:`${greeting}\n\n${opening.replace(/ Which team owns[^?]+\?$/, '')}\n\n${ask}\n\nBest regards,\n${close}`},
    followup:{subject:`Following up: ${opportunity.short}`,body:`${greeting}\n\nFollowing up on my question about ${opportunity.short}. Before suggesting a material, I’d like to understand whether there is a relevant formulation and an open qualification path.\n\n${ask}\n\nBest regards,\n${close}`},
    talking:{subject:'',body:`OPEN THE CONVERSATION\n${opening}\n\nQUESTIONS TO ASK\n${(opportunity.questions||['Who owns formulation and material qualification?','What material requirements would need to be met?','Is there an open route to evaluate an alternate supplier?']).map(q=>`• ${q}`).join('\n\n')}\n\nNEXT STEP\n${ask}`}
  };
}
export function emailHref(address, draft) {
  return `mailto:${encodeURIComponent(address.trim())}?subject=${encodeURIComponent(draft.subject.replace(/[\r\n]+/g,' '))}&body=${encodeURIComponent(draft.body)}`;
}

export const templateKey = 'salesplay-outreach-templates-v1';
export const materialNames = {email:'Email',talking:'Talking points',followup:'Follow-up'};
export function renderTemplate(template, opportunity, person, signature='[Your name]') {
  const values={contact_name:person.name||'[Contact name]',first_name:person.name?.split(' ')[0]||'[First name]',company:'3M',opportunity:opportunity.short,products:opportunity.products.join(' / '),signature:signature||'[Your name]'};
  const fill=text=>text.replace(/\{\{\s*(\w+)\s*\}\}/g,(match,key)=>values[key]??match);
  return {subject:template.type==='talking'?'':fill(template.subject||''),body:fill(template.body||'')};
}
