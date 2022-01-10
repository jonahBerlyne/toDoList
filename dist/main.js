(()=>{"use strict";!function(){document.getElementById("content").appendChild(function(){const t=document.createElement("main");return t.setAttribute("id","main"),t}());const t=document.getElementById("main");t.textContent="",t.appendChild(function(){const t=document.createElement("div"),e=document.createElement("form"),n=document.createElement("label");n.textContent="Title: ",e.appendChild(n);const i=document.createElement("input");i.setAttribute("type","text"),i.setAttribute("name","title"),i.setAttribute("id","title"),e.appendChild(i);const d=document.createElement("br");e.appendChild(d);const o=document.createElement("label");o.textContent="Date: ",e.appendChild(o);const c=document.createElement("input");c.setAttribute("type","date"),c.setAttribute("name","date"),c.setAttribute("id","date"),e.appendChild(c);const l=document.createElement("br");e.appendChild(l);const r=document.createElement("label");r.textContent="Priority: ",e.appendChild(r);const u=document.createElement("input");u.setAttribute("type","radio"),u.setAttribute("name","priority"),u.setAttribute("id","priority"),u.setAttribute("value","Urgent"),e.appendChild(u);const a=document.createElement("label");a.textContent="Urgent",e.appendChild(a);const m=document.createElement("input");m.setAttribute("type","radio"),m.setAttribute("name","priority"),m.setAttribute("id","priority"),m.setAttribute("value","Small"),e.appendChild(m);const p=document.createElement("label");p.textContent="Small",e.appendChild(p);const s=document.createElement("br");e.appendChild(s);const b=document.createElement("br");e.appendChild(b);const C=document.createElement("label");C.textContent="Description:",e.appendChild(C);const h=document.createElement("br");e.appendChild(h);const E=document.createElement("textarea");E.setAttribute("name","description"),E.setAttribute("id","description"),E.setAttribute("cols","30"),E.setAttribute("rows","10"),e.appendChild(E);const v=document.createElement("br");e.appendChild(v);const A=document.createElement("br");e.appendChild(A);const y=document.createElement("label");y.textContent="To Dos: ",e.appendChild(y);const f=document.createElement("input");f.setAttribute("type","text"),f.setAttribute("id","toDoInput"),e.appendChild(f);const x=document.createElement("button");x.setAttribute("type","button"),x.setAttribute("id","addBtn"),x.textContent="+",e.appendChild(x);const D=document.createElement("button");D.setAttribute("type","submit"),D.setAttribute("id","submitBtn"),D.textContent="Submit",e.appendChild(D),t.appendChild(e);const S=document.createElement("ul");S.setAttribute("id","toDoList"),t.appendChild(S);const g=document.createElement("div");return g.setAttribute("id","toDoDivs"),g.setAttribute("class","toDoDivs"),t.appendChild(g),t}()),function(){const t=document.querySelector("#toDoInput"),e=document.querySelector("#toDoList");document.querySelector("#addBtn").addEventListener("click",(function(){""!=t.value&&(i.includes(t.value)?alert("You can't add duplicate items."):(i.push(t.value),""!==e.innerHTML&&(e.innerHTML=""),d(e),t.value="",console.log(i)))}));let n,i=[];function d(t){const e=i.map((t=>`<li>${t}</li>`)).join(" ");t.innerHTML+=e}let o=!1;const c=document.querySelector("#title"),l=document.querySelector("#date"),r=document.querySelector("#description");document.querySelector("#submitBtn").addEventListener("click",(function(t){if(t.preventDefault(),function(){const t=document.querySelectorAll('input[name="priority"]');for(const e of t)if(e.checked){n=e.value;break}}(),0===c.value.length||0===r.value.length||""==l.value||null==n||0===i.length)return void alert("All inputs need to be filled in.");let u=((t,i,c,l)=>{const r=document.querySelector("#divs");return function(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=e.length;for(let i=0;i<15;i++)t+=e.charAt(Math.floor(Math.random()*n))}(),{addDiv:function(){const e=document.createElement("div");e.classList.add("toDoDiv");let l=document.createElement("div");l.textContent=`Title: ${t}`;let u=document.createElement("div");u.textContent=`Date: ${i}`;let a=document.createElement("div");a.textContent=`Priority: ${n}`;let m=document.createElement("div");m.textContent=`${c}`,e.appendChild(l),e.appendChild(u),e.appendChild(a),e.appendChild(m),d(e),r.appendChild(e),o=!0},cleanUp:function(){t="",i="",c="",n=void 0,e.innerHTML="",o=!1}}})(c.value,l.value,r.value);u.addDiv(),o&&u.cleanUp()}))}()}()})();