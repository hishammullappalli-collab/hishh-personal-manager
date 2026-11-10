const KEY="hishh-manager-v1";
const defaults={tasks:[],projects:[
{name:"HISHH CREATIVE STUDIO",status:"Planning"},
{name:"HISHH CLOUD",status:"Planning"},
{name:"HISHH EDITZ",status:"Planning"},
{name:"HISHH PRODUCTS",status:"Planning"},
{name:"CUTOPIA VISUAL MEDIA",status:"Planning"}
],money:[],social:[],goals:[]};
let data=load();
function load(){try{return {...structuredClone(defaults),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));renderAll()}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function money(n){return "₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2})}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function empty(msg){return `<div class="empty-state">${msg}</div>`}
function renderTasks(){
 const done=data.tasks.filter(x=>x.done).length,total=data.tasks.length,pct=total?Math.round(done/total*100):0;
 document.getElementById("taskProgressText").textContent=`${done} of ${total} complete`;
 document.getElementById("taskPercent").textContent=pct+"%";
 document.getElementById("taskProgressBar").style.width=pct+"%";
 document.getElementById("taskList").innerHTML=data.tasks.length?data.tasks.map((t,i)=>`<div class="list-row ${t.done?"done":""}"><input class="check-input" type="checkbox" data-task="${i}" ${t.done?"checked":""}><div class="row-main"><b>${esc(t.title)}</b><small>Today · ${esc(t.priority)} priority</small></div><span class="priority ${t.priority.toLowerCase()}">${esc(t.priority)}</span><button class="delete-btn" data-delete-task="${i}" aria-label="Delete task">×</button></div>`).join(""):empty("No tasks yet. Add one small, useful action.");
 document.getElementById("overviewTasks").innerHTML=data.tasks.slice(0,4).length?data.tasks.slice(0,4).map(t=>`<div class="preview-row"><span class="check"></span><span>${esc(t.title)}</span></div>`).join(""):empty("No tasks yet. Add your first task.");
 document.getElementById("statTasks").textContent=`${done}/${total}`;
}
function renderProjects(){
 document.getElementById("projectList").innerHTML=data.projects.length?data.projects.map((p,i)=>`<div class="project-card"><b>${esc(p.name)}</b><select data-project="${i}">${["Planning","In progress","On hold","Completed"].map(s=>`<option ${p.status===s?"selected":""}>${s}</option>`).join("")}</select><button class="delete-btn" data-delete-project="${i}" aria-label="Delete project">Remove ×</button></div>`).join(""):empty("No projects added yet.");
 document.getElementById("statProjects").textContent=data.projects.filter(p=>p.status!=="Completed").length;
}
function renderMoney(){
 const inc=data.money.filter(x=>x.type==="income").reduce((a,x)=>a+x.amount,0),exp=data.money.filter(x=>x.type==="expense").reduce((a,x)=>a+x.amount,0);
 document.getElementById("financeIncome").textContent=money(inc);document.getElementById("financeExpense").textContent=money(exp);document.getElementById("financeBalance").textContent=money(inc-exp);document.getElementById("statNet").textContent=money(inc-exp);
 document.getElementById("moneyList").innerHTML=data.money.length?[...data.money].reverse().map((m,rev)=>{const i=data.money.length-1-rev;return `<div class="list-row"><div class="row-main"><b>${esc(m.title)}</b><small>${esc(m.type)} · ${esc(m.date)}</small></div><span class="amount ${m.type}">${m.type==="income"?"+":"−"}${money(m.amount)}</span><button class="delete-btn" data-delete-money="${i}" aria-label="Delete record">×</button></div>`}).join(""):empty("No transactions recorded yet.");
}
function renderSocial(){document.getElementById("socialList").innerHTML=data.social.length?[...data.social].reverse().map((s,r)=>{const i=data.social.length-1-r;return `<div class="list-row"><div class="row-main"><b>${esc(s.title)}</b><small>${esc(s.type)} · Idea</small></div><span class="pill">${esc(s.type)}</span><button class="delete-btn" data-delete-social="${i}">×</button></div>`}).join(""):empty("Save your next Reel, carousel or post idea here.");}
function renderGoals(){
 document.getElementById("goalList").innerHTML=data.goals.length?data.goals.map((g,i)=>`<div class="goal-card"><div class="goal-card-top"><b>${esc(g.title)}</b><button class="delete-btn" data-delete-goal="${i}">×</button></div><small>${g.date?`Target: ${esc(g.date)}`:"No target date"} · ${g.done?"Completed":"In progress"}</small><div style="margin-top:9px"><label class="small muted"><input type="checkbox" data-goal="${i}" ${g.done?"checked":""}> Mark as completed</label></div></div>`).join(""):empty("Add a goal that matters to your future.");
 document.getElementById("statGoals").textContent=data.goals.filter(g=>!g.done).length;
}
function renderAll(){renderTasks();renderProjects();renderMoney();renderSocial();renderGoals()}
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));document.getElementById("pageLabel").textContent=name.replace("-"," ").toUpperCase();document.querySelector(".sidebar").classList.remove("open");window.scrollTo(0,0)}
document.getElementById("nav").addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b)showPage(b.dataset.page)});
document.addEventListener("click",e=>{
 const go=e.target.closest("[data-go]");if(go)showPage(go.dataset.go);
 const del=e.target.closest("[data-delete-task]");if(del){data.tasks.splice(+del.dataset.deleteTask,1);save();toast("Task removed")}
 const dp=e.target.closest("[data-delete-project]");if(dp){data.projects.splice(+dp.dataset.deleteProject,1);save();toast("Project removed")}
 const dm=e.target.closest("[data-delete-money]");if(dm){data.money.splice(+dm.dataset.deleteMoney,1);save();toast("Record removed")}
 const ds=e.target.closest("[data-delete-social]");if(ds){data.social.splice(+ds.dataset.deleteSocial,1);save();toast("Idea removed")}
 const dg=e.target.closest("[data-delete-goal]");if(dg){data.goals.splice(+dg.dataset.deleteGoal,1);save();toast("Goal removed")}
});
document.addEventListener("change",e=>{
 if(e.target.matches("[data-task]")){data.tasks[+e.target.dataset.task].done=e.target.checked;save()}
 if(e.target.matches("[data-project]")){data.projects[+e.target.dataset.project].status=e.target.value;save();toast("Project updated")}
 if(e.target.matches("[data-goal]")){data.goals[+e.target.dataset.goal].done=e.target.checked;save()}
});
document.getElementById("taskForm").addEventListener("submit",e=>{e.preventDefault();data.tasks.push({title:document.getElementById("taskInput").value.trim(),priority:document.getElementById("taskPriority").value,done:false});e.target.reset();save();toast("Task added")});
document.getElementById("projectForm").addEventListener("submit",e=>{e.preventDefault();data.projects.push({name:document.getElementById("projectInput").value.trim(),status:document.getElementById("projectStatus").value});e.target.reset();save();toast("Project added")});
document.getElementById("moneyForm").addEventListener("submit",e=>{e.preventDefault();data.money.push({title:document.getElementById("moneyTitle").value.trim(),amount:Number(document.getElementById("moneyAmount").value),type:document.getElementById("moneyType").value,date:new Date().toLocaleDateString("en-IN")});e.target.reset();save();toast("Transaction recorded")});
document.getElementById("socialForm").addEventListener("submit",e=>{e.preventDefault();data.social.push({title:document.getElementById("socialTitle").value.trim(),type:document.getElementById("socialType").value});e.target.reset();save();toast("Content idea saved")});
document.getElementById("goalForm").addEventListener("submit",e=>{e.preventDefault();data.goals.push({title:document.getElementById("goalTitle").value.trim(),date:document.getElementById("goalDate").value,done:false});e.target.reset();save();toast("Goal added")});
document.getElementById("newBrief").addEventListener("click",()=>{const candidates=["Choose one high-impact task and complete it before starting another.","Move one business project forward with a small, measurable action.","Spend 20 focused minutes improving a creative skill or portfolio piece.","Follow up politely with one potential client and keep learning.","Review your spending and record every transaction accurately."];const pick=candidates[new Date().getDate()%candidates.length];document.getElementById("briefText").textContent=pick;toast("Today's focus refreshed")});
document.getElementById("menuBtn").addEventListener("click",()=>document.querySelector(".sidebar").classList.toggle("open"));
document.getElementById("todayDate").textContent=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
renderAll();

let deferredPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;const b=document.getElementById("installBtn");b.hidden=false;b.addEventListener("click",async()=>{deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;b.hidden=true},{once:true})});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
