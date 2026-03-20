/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * This software is permitted for internal use and modification.
 * Copying for profit or redistribution is strictly not permitted.
 *
 * The Fair License, which formalizes these terms, will be adopted as the official license in the future.
 * Once finalized, the unminified source code will be freely available for internal use for non-
 * commercial purposes.
 *
 * This software may not be used to develop or enhance any product or service that competes
 * directly or indirectly with GitSense Chat without explicit permission.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

function createOverviewInsightsHandlers({onLoadClick:e}){return{onLoadClick:e,getWarningMessage:e=>"Not all chats have both overview types available",formatSelectionInfo:e=>{var t,n;return 0===e.length?"No repository chats selected":(n=1===(t=e.length)?"token":"tokens",`${e.length} ${1===e.length?"chat":"chats"} selected (${t.toLocaleString()} ${n})`)}}}function createOverviewInsights({onOverviewTypeChange:n,onChatWithOverviewClick:e,onLoadOverviewClick:t}){var a=document.createElement("div"),l=(a.className="overview-insights-row",a.setAttribute("role","region"),a.setAttribute("aria-label","Overview Insights"),document.createElement("div")),i=(l.className="overview-insights-left-column",document.createElement("div")),o=(i.className="overview-insights-right-column",document.createElement("div")),s=(o.className="overview-type-container",document.createElement("label")),d=(s.textContent="Overview:",s.htmlFor="overview-type-select",s.className="overview-label",document.createElement("select")),c=(d.id="overview-type-select",d.className="overview-type-select",document.createElement("option")),r=(c.value="tiny",c.textContent="Tiny",c.selected=!0,document.createElement("option")),v=(r.value="short",r.textContent="Short",r.selected=!0,document.createElement("option"));v.value="long",v.textContent="Long",d.appendChild(c),d.appendChild(r),d.appendChild(v),d.addEventListener("change",e=>{var t="long"===e.target.value,e="short"===e.target.value;n?.(t?"long":e?"short":"tiny")}),o.appendChild(s),o.appendChild(d);let h=document.createElement("div"),m=(h.className="selection-info",h.textContent="No repository chats selected",document.createElement("div"));m.className="warning-container",m.style.display="none";c=document.createElement("span"),c.className="warning-icon",c.textContent="⚠️",c.setAttribute("aria-hidden","true"),r=document.createElement("span");r.className="warning-text",r.textContent="Not all chats have both overview types available",m.appendChild(c),m.appendChild(document.createTextNode(" ")),m.appendChild(r),l.appendChild(o),l.appendChild(h),l.appendChild(m);let p=document.createElement("button"),u=(p.className="action-button chat-button",p.textContent="Chat",p.setAttribute("aria-label","Chat with overview of selected chats"),p.addEventListener("click",e),p.disabled=!0,document.createElement("button"));return u.className="action-button load-button",u.textContent="Load",u.setAttribute("aria-label","Load overview of selected chats"),u.addEventListener("click",t),u.disabled=!0,i.appendChild(p),i.appendChild(u),a.appendChild(l),a.appendChild(i),{element:a,update:function(e){var t,n,a=0<e.length;p.disabled=!a,u.disabled=!a,a?(a=1===e.length?"chat":"chats",n=1===(t=e.length)?"token":"tokens",h.textContent=`${e.length} ${a} selected (${t.toLocaleString()} ${n})`,p.classList.remove("button-disabled"),u.classList.remove("button-disabled"),m.style.display="flex"):(h.textContent="No repository chats selected",p.classList.add("button-disabled"),u.classList.add("button-disabled"),m.style.display="none")}}}module.exports={createOverviewInsights:createOverviewInsights,createOverviewInsightsHandlers:createOverviewInsightsHandlers};
