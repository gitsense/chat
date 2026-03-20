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

let DropDownMenu=require("../Dependencies").DropDownMenu;function PromptMenu(n,e={}){let{showLabel:i=!1,includeNoPrompt:t=!0}=e,u=(t&&n.unshift({name:"No System Prompt"}),null);this.render=function(e){!function t(l,o){let r=[];n.forEach(e=>{let{name:n,default:t}=e,l=o?n===o:t;r.push({value:n,selected:l})});u=new DropDownMenu(r,i?"<strong>Prompt:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginTop:"10px",width:400,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||t(l,n)}});let e=u.create();e.style.display="inline-block";e.style.verticalAlign="middle";l.innerHTML="";l.appendChild(e)}(e)},this.getSelected=function(){return u.getSelected()}}module.exports=PromptMenu;
