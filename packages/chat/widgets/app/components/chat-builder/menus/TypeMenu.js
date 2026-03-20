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

let DropDownMenu=require("../Dependencies").DropDownMenu;function TypeMenu(e={}){let{showLabel:r=!1,onChange:c}=e,d=null;this.render=function(e){!function t(l,n){let e=["New message","New chat"];let o=[];e.forEach(e=>{o.push({value:e,selected:e===n})});d=new DropDownMenu(o,r?"<strong>Type:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginBottom:"5px",width:200,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||(t(l,n),c&&c(n))}});let i=d.create();i.style.display="inline-block";i.style.verticalAlign="middle";l.innerHTML="";l.appendChild(i)}(e)},this.getSelected=function(){return d.getSelected()}}module.exports=TypeMenu;
