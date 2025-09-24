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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let DropDownMenu=require("../../../../devboard/components/drop-down-menu.js"),svg=require("../../../../devboard/utils/svg.js"),h=require("../../../../devboard/utils/html.js"),d=require("../../../../devboard/utils/date.js"),n=require("../../../../devboard/utils/number.js"),arrayToTree=require("./components/tree-table/utils/treeUtils.js").arrayToTree,formatAge=require("./components/tree-table/utils/dateUtils.js").formatAge,TreeTable=require("./components/tree-table/TreeTable.js"),CHAT_STORAGE_ID="gs-chat-history";function History(e={},t={}){let o=e.inSideBySide;var{}=t;let a;function s(){return localStorage.getItem(CHAT_STORAGE_ID)?JSON.parse(localStorage.getItem(CHAT_STORAGE_ID)):[]}this.save=function(l){{let t={...l},e=localStorage.getItem(CHAT_STORAGE_ID)?JSON.parse(localStorage.getItem(CHAT_STORAGE_ID)):[],r=[],a={},s=0;e.forEach(e=>{var{}=e;a[e.uuid]=!0,t.uuid===e.uuid?s=e.views:r.push(e)}),t.views=s+1,t.last_viewed=Date.now(),r.unshift(t);var i=t.lineage||[];for(let t=0;t<i.length;t++){let e=i[t];a[e.uuid]||(delete e.messages,delete e.descendants,delete e.lineage,r.push(e))}delete t.messages,delete t.descendants,delete t.lineage,localStorage.setItem(CHAT_STORAGE_ID,JSON.stringify(r))}},this.get=s,this.rm=function(r){{var a=r;let e=localStorage.getItem(CHAT_STORAGE_ID)?JSON.parse(localStorage.getItem(CHAT_STORAGE_ID)):[],t=[];return e.forEach(e=>{e.uuid!==a&&t.push(e)}),localStorage.setItem(CHAT_STORAGE_ID,JSON.stringify(t)),t}},this.render=function(e){var t,r;a=e,e=e,0!==(t=(()=>{var e=s();let t=[];return e.forEach(e=>{t.push(e)}),t})()).length&&(t.find(e=>0===e.parent_id)?(t=arrayToTree(t),r={name:e=>{var t,r,a=e.uuid,{pathname:s,search:l}=window.location,l=new URLSearchParams(l),i=(o?(t=l.get("chats").split(","),r=l.get("models").split(","),t[i="left"===o?0:1]=a,r[i]="",l.set("chats",t.join(",")),l.set("models",r.join(","))):(l.set("chat",a),l.delete("model")),h.createLink({text:e.name,href:(""===s?"/":s)+"?"+l.toString(),style:{color:"black"}}));return i},createdAt:e=>formatAge(e.created_at)},TreeTable(t,e,{decorator:r,rowsPerPage:10,columns:[{key:"name",label:"Name",visible:!0,width:"100%"},{key:"chats",label:"Chats",visible:!1},{key:"created_at",label:"Created",visible:!0,width:"100px"},{key:"latest_child",label:"Latest",visible:!0,width:"100px"},{key:"actions",visible:!0,width:"36px"}]})):localStorage.removeItem(CHAT_STORAGE_ID))}}module.exports={History:History};
