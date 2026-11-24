'use strict';
const services = [
 ['Mecánica general','Reparación de averías y revisión de elementos mecánicos del vehículo.','<path d="M14 5a8 8 0 0 0-8 10L3 18a2 2 0 0 0 3 3l6-6a8 8 0 0 0 9-10l-5 5-4-4 2-1Z"/>'],
 ['Diagnosis de averías','Identificación de fallos y testigos para orientar la reparación.','<rect x="3" y="3" width="18" height="14" rx="2"/><path d="M6 10h3l2-4 3 8 2-4h2M8 21h8m-4-4v4"/>'],
 ['Electricidad','Consulta de problemas eléctricos, batería, arranque y sistemas relacionados.','<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>'],
 ['Mantenimiento','Revisiones periódicas, aceite, filtros y cuidado preventivo.','<path d="M4 8h10l3 3v8H4zM8 8V4h7v4m2 3 4-4M7 14h7"/><path d="M21 12v3"/>'],
 ['Neumáticos','Consulta sobre el estado, desgaste y sustitución de tus neumáticos.','<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="1.5"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>'],
 ['Revisión multimarca','Cuéntanos qué vehículo tienes y qué necesitas revisar.','<path d="m4 11 2-6h12l2 6m-17 0h18v8H3zm2 8v2m14-2v2M6 15h2m8 0h2"/>']
];
const grid=document.querySelector('#service-grid');
const serviceSelect=document.querySelector('#booking-service');
const initialOption=document.createElement('option');initialOption.value='';initialOption.textContent='Selecciona un servicio';initialOption.disabled=true;initialOption.selected=true;serviceSelect.append(initialOption);
services.forEach(([name,description,icon],i)=>{
 const article=document.createElement('article');article.className='service';
 article.innerHTML=`<div class="service-top"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg><span>0${i+1}</span></div><h3>${name}</h3><p>${description}</p><button class="link-btn" data-book data-service="${name}">Consultar servicio <span aria-hidden="true">↗</span></button>`;grid.append(article);
 const option=document.createElement('option');option.value=name;option.textContent=name;serviceSelect.append(option);
});
const other=document.createElement('option');other.value='Otra consulta';other.textContent='Otra consulta / No lo sé';serviceSelect.append(other);
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const dialog=document.querySelector('#appointment'),info=document.querySelector('#info-dialog'),form=document.querySelector('#booking-form'),confirmation=document.querySelector('#confirmation'),summary=document.querySelector('#summary'),copyStatus=document.querySelector('#copy-status');let lastTrigger;
function showDialog(d){lastTrigger=document.activeElement;d.showModal();document.body.classList.add('modal-open');}
function resetView(){form.hidden=false;confirmation.hidden=true;copyStatus.textContent='';}
document.querySelectorAll('[data-book]').forEach(btn=>btn.addEventListener('click',()=>{form.reset();resetView();if(btn.dataset.service)serviceSelect.value=btn.dataset.service;showDialog(dialog);}));
document.querySelector('#demo-info').addEventListener('click',()=>showDialog(info));
[dialog,info].forEach(d=>{d.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>d.close()));d.addEventListener('click',e=>{if(e.target===d)d.close();});d.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(lastTrigger)lastTrigger.focus();});});
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const f=new FormData(form);summary.textContent=`Hola, me gustaría consultar una cita en Talleres La Paz 99.\n\nNombre: ${f.get('nombre')}\nVehículo: ${f.get('vehiculo')}\nServicio: ${f.get('servicio')}\nObservaciones: ${f.get('mensaje')||'Sin observaciones.'}\n\nGracias.`;form.hidden=true;confirmation.hidden=false;document.querySelector('#copy-request').focus();});
document.querySelector('#edit-request').addEventListener('click',()=>{resetView();form.querySelector('input').focus();});
document.querySelector('#copy-request').addEventListener('click',async()=>{try{if(!navigator.clipboard)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(summary.textContent);copyStatus.textContent='Solicitud copiada. No se ha enviado.';}catch{const area=document.createElement('textarea');area.value=summary.textContent;confirmation.append(area);area.select();let ok=false;try{ok=document.execCommand('copy');}catch{}if(ok){area.remove();copyStatus.textContent='Solicitud copiada. No se ha enviado.';}else{copyStatus.textContent='Selecciona y copia manualmente el texto.';}}});
if('IntersectionObserver' in window){const links=[...nav.querySelectorAll('a')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}});},{rootMargin:'-20% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
