(()=>{"use strict";!function(){const t=document.getElementById("content");console.log(document.getElementById("content")),t.appendChild(function(){const t=document.createElement("main");return t.setAttribute("id","main"),t}());const e=document.getElementById("main");e.textContent="",e.appendChild(function(){const t=document.createElement("div"),e=document.createElement("form"),n=document.createElement("label");n.textContent="Title: ",e.appendChild(n);const d=document.createElement("input");d.setAttribute("type","text"),d.setAttribute("name","title"),d.setAttribute("id","title"),e.appendChild(d);const i=document.createElement("br");e.appendChild(i);const o=document.createElement("label");o.textContent="Date: ",e.appendChild(o);const c=document.createElement("input");c.setAttribute("type","date"),c.setAttribute("name","date"),c.setAttribute("id","date"),e.appendChild(c);const r=document.createElement("br");e.appendChild(r);const l=document.createElement("label");l.textContent="Priority: ",e.appendChild(l);const a=document.createElement("input");a.setAttribute("type","radio"),a.setAttribute("name","priority"),a.setAttribute("id","priority"),a.setAttribute("value","Urgent"),e.appendChild(a);const u=document.createElement("label");u.textContent="Urgent",e.appendChild(u);const m=document.createElement("input");m.setAttribute("type","radio"),m.setAttribute("name","priority"),m.setAttribute("id","priority"),m.setAttribute("value","Small"),e.appendChild(m);const p=document.createElement("label");p.textContent="Small",e.appendChild(p);const s=document.createElement("br");e.appendChild(s);const b=document.createElement("br");e.appendChild(b);const C=document.createElement("label");C.textContent="Description:",e.appendChild(C);const E=document.createElement("br");e.appendChild(E);const A=document.createElement("textarea");A.setAttribute("name","description"),A.setAttribute("id","description"),A.setAttribute("cols","30"),A.setAttribute("rows","10"),e.appendChild(A);const h=document.createElement("br");e.appendChild(h);const y=document.createElement("br");e.appendChild(y);const x=document.createElement("label");x.textContent="To Dos: ",e.appendChild(x);const D=document.createElement("input");D.setAttribute("type","text"),D.setAttribute("id","toDoInput"),e.appendChild(D);const g=document.createElement("button");g.setAttribute("type","button"),g.setAttribute("id","addBtn"),g.textContent="+",e.appendChild(g);const v=document.createElement("button");v.setAttribute("type","submit"),v.setAttribute("id","submitBtn"),v.textContent="Submit",e.appendChild(v),t.appendChild(e);const B=document.createElement("ul");B.setAttribute("id","toDoList"),t.appendChild(B);const f=document.createElement("div");return f.setAttribute("id","toDoDivs"),f.setAttribute("class","toDoDivs"),t.appendChild(f),t}())}()})();