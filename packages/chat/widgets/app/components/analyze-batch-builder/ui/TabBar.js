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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class TabBar{constructor(t,e={}){this.container=t,this.tabs=e.tabs||[],this.activeTabId=e.activeTabId||(this.tabs[0]?this.tabs[0].id:null),this.onTabChange=e.onTabChange,this.activeColor=e.activeColor||"#F57C00",this.elements={nav:null,tabButtons:{}},this.render()}render(){this.elements.nav=DomUtils.h.createDiv({cls:"abb-tab-bar",style:{display:"flex",borderBottom:"1px solid #d8dee4",marginBottom:"20px",gap:"10px",overflowX:"auto"}}),this.tabs.forEach(t=>{this._renderTab(t)}),this.container.appendChild(this.elements.nav)}_renderTab(t){var e=t.id===this.activeTabId,a=!1!==t.visible,e=DomUtils.h.createDiv({cls:"abb-tab-item "+(e?"active":""),style:{padding:"10px 15px",cursor:"pointer",borderBottom:e?"2px solid "+this.activeColor:"2px solid transparent",fontWeight:e?"600":"400",color:e?"#24292f":"#57606a",display:a?"flex":"none",alignItems:"center",gap:"8px",transition:"all 0.2s ease",whiteSpace:"nowrap",userSelect:"none"},onclick:()=>this._handleTabClick(t.id)}),a=DomUtils.h.createSpan({text:t.icon||"",cls:"abb-tab-icon",style:{fontSize:"1.1em"}}),a=(e.appendChild(a),DomUtils.h.createSpan({text:t.label,cls:"abb-tab-label"})),a=(e.appendChild(a),DomUtils.h.createSpan({text:t.status?`(${t.status})`:"",cls:"abb-tab-status",style:{fontSize:"0.9em",opacity:"0.8",marginLeft:"2px"}}));e.appendChild(a),this.elements.tabButtons[t.id]=e,this.elements.nav.appendChild(e)}_handleTabClick(t){var e;this.activeTabId!==t&&((e=this.elements.tabButtons[this.activeTabId])&&(e.style.borderBottom="2px solid transparent",e.style.fontWeight="400",e.style.color="#57606a",e.classList.remove("active")),(e=this.elements.tabButtons[t])&&(e.style.borderBottom="2px solid "+this.activeColor,e.style.fontWeight="600",e.style.color="#24292f",e.classList.add("active")),this.activeTabId=t,this.onTabChange)&&this.onTabChange(t)}setActiveTab(t){var e;this.activeTabId!==t&&((e=this.elements.tabButtons[this.activeTabId])&&(e.style.borderBottom="2px solid transparent",e.style.fontWeight="400",e.style.color="#57606a",e.classList.remove("active")),(e=this.elements.tabButtons[t])&&(e.style.borderBottom="2px solid "+this.activeColor,e.style.fontWeight="600",e.style.color="#24292f",e.classList.add("active")),this.activeTabId=t)}updateTab(t,e){var a,t=this.elements.tabButtons[t];t&&(void 0!==e.icon&&(a=t.querySelector(".abb-tab-icon"))&&(a.innerHTML=e.icon),void 0!==e.status&&(a=t.querySelector(".abb-tab-status"))&&(a.textContent=e.status?`(${e.status})`:""),void 0!==e.label)&&(a=t.querySelector(".abb-tab-label"))&&(a.textContent=e.label)}setTabVisible(t,e){t=this.elements.tabButtons[t];t&&(t.style.display=e?"flex":"none")}cleanup(){this.elements.nav&&this.elements.nav.parentElement&&this.elements.nav.remove(),this.elements={nav:null,tabButtons:{}}}}module.exports=TabBar;
