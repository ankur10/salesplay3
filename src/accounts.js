// Illustrative directory records. Only 3M has captured source content.
const names=['Alder','Asterfield','Bracken','Cedarpoint','Clearwell','Cobalt Ridge','Crestline','Dovetail','Eastbridge','Elmstone','Fairhaven','Fernbrook','Glenhaven','Greyrock','Harborstone','Highfield','Ironleaf','Juniper Vale','Kingswell','Larkspur','Northmere','Oakbridge','Pinecrest','Rivergate'];
const sectors=[['Materials','Materials'],['Industrial','Industrial manufacturing'],['Technologies','Technology'],['Packaging','Packaging'],['Energy','Energy']];
const regions=['Europe','North America','Asia Pacific'];
export const accountRecords=[{id:'3m',name:'3M Company',industry:'Industrial manufacturing',region:'North America',initials:'3M',sample:false},...names.flatMap((name,i)=>sectors.map(([suffix,industry],j)=>({id:`sample-${i+1}-${j+1}`,name:`${name} ${suffix}`,industry,region:regions[(i+j)%3],initials:name.split(' ').map(x=>x[0]).join('').slice(0,2)+(name.includes(' ')?'':suffix[0]),sample:true})))];
export const accountUrl=a=>a.id==='3m'?'/accounts/3m/opportunities':'/accounts/'+a.id;
export const portfolioViews=['home','accounts','recent','favourites','accountPreview'];
