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

let DropDownMenu=require("../Dependencies").DropDownMenu;function TemperatureMenu(e={}){let{showLabel:l=!1}=e,i=[{label:"Most precise (0.0)",value:0,isDefault:!0},{label:"Focused (0.2)",value:.2},{label:"Balanced (0.5)",value:.5},{label:"Explorative (0.8)",value:.8},{label:"Most Creative (1.0)",value:1}],o=null;this.render=function(e){!function t(n,a){let r=[];i.forEach(e=>{let{label:l,isDefault:t}=e,n=a?l===a:t;r.push({value:l,selected:n})});o=new DropDownMenu(r,l?"<strong>Temperature:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginTop:"10px",width:200,textAlign:"left",zIndex:1e6},callback:(e,l)=>{l.toString().match(/^----/)||t(n,l)}});let e=o.create();e.style.display="inline-block";e.style.verticalAlign="middle";n.innerHTML="";n.appendChild(e)}(e)},this.getSelected=function(){var e=o.getSelected().split("(")[1].split(")")[0];if(null!=e)return parseFloat(e)}}module.exports=TemperatureMenu;
