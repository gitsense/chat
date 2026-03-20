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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils"),createEnhancedBreadcrumbSystem=require("./truncate_breadcrumbs.js").createEnhancedBreadcrumbSystem,RenameChatModal=require("./components/chat-builder/modals/RenameChatModal"),NotificationManager=require("./components/ui/notification-manager").NotificationManager,h=DomUtils.h;function Breadcrumbs(d,e={}){let{lastClickable:c=!1,reverse:i=!1,inSideBySide:s,models:u,widget:m}=e,p=null;function t(){let r=d?[{text:"Home",type:"home"}]:[];var{uuid:e,name:t,lineage:a=[]}=d||{},{}=window.location;a.forEach(e=>{var{type:e,name:t,uuid:a}=e,t={text:t,type:e,uuid:a};i?r.unshift(t):r.push(t)}),e&&(a={text:t,uuid:e},i?r.unshift(a):r.push(a));let n=0;r.forEach(e=>{n+=e.text.length});t=s?80:150,e=createEnhancedBreadcrumbSystem();(r.length?e.truncateBreadcrumbs(r,t):[]).forEach((t,a)=>{let{text:n,truncatedText:i,type:o,uuid:l}=t;var t=a===r.length-1,a=t&&!c?600:null;if(!t||c){let e=h.createLink({text:i||n,href:(e=>{var{pathname:t,search:a}=window.location,a=new URLSearchParams(a);if(s){var n=a.get("chats").split(","),i=a.get("models").split(","),r="left"===s?0:1;if(n[r]===l||""===n[r]){if(a.delete("chats"),a.delete("models"),"home"===o)return"/";a.set("chat",l)}else n[r]="home"===o?"":l,i[r]="",a.set("chats",n.join(",")),a.set("models",i.join(","))}else{if("home"===o)return"/";e||a.delete("model"),a.set("chat",l)}return(""===t?"/":t)+"?"+a.toString()})(t),style:{cursor:"pointer",fontWeight:a}});return(p.appendChild(e),t)?void 0:void p.appendChild(h.createSpan({html:"/",style:{marginLeft:"5px",marginRight:"5px"}}))}let e=h.createSpan({text:i||n,style:{fontWeight:a}});p.appendChild(e),t&&n.match(/ - \d+\/\d+\/\d+$/)&&(a=h.createLink({append:[SVGUtils.pencil({style:{height:"13px",width:"13px",position:"relative",top:"-2px"}})],href:"#",style:{fontWeight:"normal",marginLeft:"3px"}}),p.appendChild(h.createSup({append:[a]})),a.onclick=e=>{e.preventDefault(),new RenameChatModal(m,d,u,(e,t,a)=>{e?window.location.reload():NotificationManager.error(a)}).render()})})}this.render=function(e){p=e,t()},this.update=function(e){d=e,p.innerHTML="",t()}}module.exports={Breadcrumbs:Breadcrumbs};
