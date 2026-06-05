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

let DropDownMenu=require("../Dependencies").DropDownMenu;function PromptMenu(n,e={}){let{showLabel:i=!1,includeNoPrompt:t=!0}=e,u=(t&&n.unshift({name:"No System Prompt"}),null);this.render=function(e){!function t(l,o){let r=[];n.forEach(e=>{let{name:n,default:t}=e,l=o?n===o:t;r.push({value:n,selected:l})});u=new DropDownMenu(r,i?"<strong>Prompt:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginTop:"10px",width:400,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||t(l,n)}});let e=u.create();e.style.display="inline-block";e.style.verticalAlign="middle";l.innerHTML="";l.appendChild(e)}(e)},this.getSelected=function(){return u.getSelected()}}module.exports=PromptMenu;
