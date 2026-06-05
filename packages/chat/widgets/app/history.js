/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let DateUtils=require("@gitsense/gsc-utils").DateUtils,DropDownMenu=require("../../../../devboard/components/drop-down-menu.js"),svg=require("../../../../devboard/utils/svg.js"),h=require("../../../../devboard/utils/html.js"),d=require("../../../../devboard/utils/date.js"),n=require("../../../../devboard/utils/number.js"),arrayToTree=require("./components/tree-table/utils/treeUtils.js").arrayToTree,TreeTable=require("./components/tree-table/TreeTable.js"),CHAT_STORAGE_ID="gs-chat-history";function History(e={},t={}){var{}=e;let{onRenameChat:r,onDeleteChat:l,onMoveChat:o,onShowLatestChat:s}=t;let i;function n(){return localStorage.getItem(CHAT_STORAGE_ID)?JSON.parse(localStorage.getItem(CHAT_STORAGE_ID)):[]}this.save=function(o){{let t={...o},e=localStorage.getItem(CHAT_STORAGE_ID)?JSON.parse(localStorage.getItem(CHAT_STORAGE_ID)):[],a=[],r={},l=0;e.forEach(e=>{var{}=e;r[e.uuid]=!0,t.uuid===e.uuid?l=e.views:a.push(e)}),t.views=l+1,t.last_viewed=Date.now(),a.unshift(t);var s=t.lineage||[];for(let t=0;t<s.length;t++){let e=s[t];r[e.uuid]||(delete e.messages,delete e.descendants,delete e.lineage,a.push(e))}delete t.messages,delete t.descendants,delete t.lineage,localStorage.setItem(CHAT_STORAGE_ID,JSON.stringify(a))}},this.get=n,this.rm=function(a){{var r=a;let e=localStorage.getItem(CHAT_STORAGE_ID)?JSON.parse(localStorage.getItem(CHAT_STORAGE_ID)):[],t=[];return e.forEach(e=>{e.uuid!==r.uuid&&t.push(e)}),localStorage.setItem(CHAT_STORAGE_ID,JSON.stringify(t)),t}},this.render=function(e){var t,a;i=e,e=e,0!==(t=(()=>{var e=n();let t=[];return e.forEach(e=>{t.push(e)}),t})()).length&&(t.find(e=>0===e.parent_id)?(t=arrayToTree(t),a={name:e=>{var t=e.uuid,{pathname:a,search:r}=window.location,r=new URLSearchParams(r),t=(r.set("chat",t),r.delete("model"),h.createLink({text:e.name,href:(""===a?"/":a)+"?"+r.toString(),style:{color:"black"}}));return t},createdAt:e=>DateUtils.formatAge(e.created_at)},TreeTable(t,e,{decorator:a,rowsPerPage:10,columns:[{key:"name",label:"Name",visible:!0,width:"100%"},{key:"chats",label:"Chats",visible:!1},{key:"created_at",label:"Created",visible:!0,width:"100px"},{key:"latest_child",label:"Latest",visible:!0,width:"100px"},{key:"actions_menu",visible:!0,width:"36px"}],onDeleteChat:l,onRenameChat:r,onMoveChat:o,onShowLatestChat:s,styleType:"main",reloadStyle:!0,showHeader:!0,tableBodyCellStyle:{padding:"13px",borderBottom:"1px solid #dadada"}})):localStorage.removeItem(CHAT_STORAGE_ID))}}module.exports={History:History};
