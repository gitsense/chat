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

let DropDownMenu=require("../../Dependencies").DropDownMenu;function AnalyzeMenu(l,e,o){let i=e.onChange,r=null;function u(n){let t=[];l.menuOptions.forEach(e=>{t.push({value:e,selected:n===e})}),r=new DropDownMenu(t,"",{dropDownClass:"d-inline",menuStyle:{marginBottom:"5px",width:l.menuWidth,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||(u(n),i&&i(n))}}),o.innerHTML="";var e=r.create();o.appendChild(e)}this.getSelected=()=>r.getSelected(),this.reset=()=>{r=null,u()},this.render=e=>{u(e)}}module.exports=AnalyzeMenu;
