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

let DropDownMenu=require("../Dependencies").DropDownMenu;function TreeMenu(e={}){let{showLabel:i=!1,onChange:s,treeType:a="organize"}=e,d=null;this.render=function(e,n){!function t(o,n){let e=[];if("organize"===a.toLowerCase())e.push("Standard Workspace"),e.push("Code Workspace"),e.push("Code Project");else{if("task"!==a.toLowerCase())throw new Error(`Unrecognized tree type '${a}'`);e.push("Simple coding task"),e.push("Complex coding task")}let r=[];e.forEach(e=>{r.push({value:e,selected:e===n})});d=new DropDownMenu(r,i?"<strong>Relation:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginBottom:"5px",width:225,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||(t(o,n),s&&s(n))}});let l=d.create();l.style.display="inline-block";l.style.verticalAlign="middle";o.innerHTML="";o.appendChild(l)}(e,n)},this.getSelected=function(){return d.getSelected()}}module.exports=TreeMenu;
