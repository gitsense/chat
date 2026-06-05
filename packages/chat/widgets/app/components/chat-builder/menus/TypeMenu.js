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

let DropDownMenu=require("../Dependencies").DropDownMenu;function TypeMenu(e={}){let{showLabel:r=!1,onChange:c}=e,d=null;this.render=function(e){!function t(l,n){let e=["New message","New chat"];let o=[];e.forEach(e=>{o.push({value:e,selected:e===n})});d=new DropDownMenu(o,r?"<strong>Type:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginBottom:"5px",width:200,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||(t(l,n),c&&c(n))}});let i=d.create();i.style.display="inline-block";i.style.verticalAlign="middle";l.innerHTML="";l.appendChild(i)}(e)},this.getSelected=function(){return d.getSelected()}}module.exports=TypeMenu;
