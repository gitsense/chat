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

DEVBOARD={};let sleep=require("../lib/utils.js").sleep,{configs,widgets}=require("./widgets.js"),h=require("./utils/html.js"),Header=require("./components/header.js"),Page=require("./components/page.js"),Card=require("./components/card.js"),apiVersion="v0";function DevBoard(l,c){let w=new URLSearchParams(window.location.search).get("help");this.render=async function(e){let d=(()=>{let d=[],e=l.blocks;return e.forEach(e=>{var a,t,r=e.widget,i=widgets[r],o=configs[r];i?({package:a,name:t}=o,i.config=o,i.fullName=r,i.package=a,i.name=t,o=((e,a)=>{var{package:t,name:r}=a;return a.dataURL=`/api/${apiVersion}/widgets/${t}/${r}/data`,a.staticURL=`/api/${apiVersion}/widgets/${t}/${r}/static/{file}`,a.streamURL=`/api/${apiVersion}/widgets/${t}/${r}/stream`,(t=new Card(e,a,!!w&&"show"===w).create()).widgets=widgets,t.params=e.params,t.board=l,t})(e,i),d.push(o)):console.log(`ERROR: No widget named ${fullName} found.`)}),d})();DEVBOARD.cards=d;var{header:a,menuBoards:t,quickLinks:r}=c,i=new Page(d,{backgroundColor:"white"}).create(),a=h.createDiv({id:"devboard-header",cls:"tblr-container-xxl",style:{display:a.show?null:"none",backgroundColor:"white",paddingTop:20,paddingBottom:0}});e.appendChild(a),new Header(l,t,r).render(a),e.appendChild(i.body);let o=l.initWidget;if(d.forEach(async e=>{var{widget:a,body:t}=e,{fullName:a,loaded:r}=a;o?o&&a!==o?(t.style._display=t.style.display,t.style.display="none"):await e.widget.loaded(e):r?await r(e):console.warn(`WARNING: Widget ${a} does not have a loaded function and/or was not exported. Unable to process widget.`)}),o){let a=null;for(let e=0;e<d.length;e++){var s=d[e],n=s.widget.fullName;if(!o||n===o){a=s;break}}o&&(async(r,e)=>{for(var a=(new Date).getTime()+1e4;(new Date).getTime()<a&&(!e.data||!e.data.result);)await sleep(25);var t=e.data,i=(t||{}).result,o=(i||{}).err;t&&i?o?console.error(o):(d.forEach(e=>{var{body:e,widget:a}=e;a.fullName!==r&&(e.style.display=e.style._display)}),await sleep(25),d.forEach(async e=>{var a,t=e.widget;t.fullName!==r&&({loaded:t,fullName:a}=t,t?await t(e):console.warn(`WARNING: Widget ${a} does not have a loaded function and/or was not exported. Unable to process widget.`))})):console.error("Timed out while waiting for init widget data")})(o,a)}}}module.exports=DevBoard;
