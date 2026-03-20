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

let DropDownMenu=require("../Dependencies").DropDownMenu;function RelationMenu(r={}){let{showLabel:d=!1}=r,a=null;this.render=function(e){!function t(l,n="Child"){let e=r.types||["No relation","Child","Sibling"];let i=[];e.forEach(e=>{i.push({value:e,selected:e===n})});a=new DropDownMenu(i,d?"<strong>Relation:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginTop:"10px",width:150,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||t(l,n)}});let o=a.create();o.style.display="inline-block";o.style.verticalAlign="middle";l.innerHTML="";l.appendChild(o)}(e)},this.getSelected=function(){return a.getSelected()}}module.exports=RelationMenu;
