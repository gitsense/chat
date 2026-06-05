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

let DropDownMenu=require("../Dependencies").DropDownMenu;function ModelMenu(i,e={}){let{fakeLLMs:r=0,showLabel:a=!1,useDefault:s=!0,includeGitSenseNotes:d=!0,defaultModel:t,onChange:u}=e,c=null;function p(t){var e="GitSense Notes",l=s?i.filter(e=>e.default)[0]:"";let n=t||(l?l.name:""),o="---",a=d?[{value:e,selected:t===e},{value:o}]:[];if(a.unshift({value:">>>Select"}),i.forEach(e=>{var{name:e,hasApiKey:t}=e;e.match(/^---/)?a.push({value:o}):a.push({value:e+(e.match(/Notes/)||t?"":" (No API key)"),selected:e===n})}),r){a.push({value:o});for(let e=1;e<=r;e++){var u="Fake LLM Simulator "+e;a.push({value:u,selected:t===u})}}return a}this.render=function(e){!function l(n,e){let t=p(e);c=new DropDownMenu(t,a?"<strong>Model</strong>: ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginTop:"10px",width:350,textAlign:"left",zIndex:1e6},callback:(e,t)=>{t.toString().match(/^----/)||(l(n,t),u&&u(t.replace(/ \(No API key\)/,"")))}});let o=c.create();o.style.display="inline-block";o.style.verticalAlign="middle";n.innerHTML="";n.appendChild(o)}(e,t)},this.getSelected=function(){return c.getSelected()}}module.exports=ModelMenu;
