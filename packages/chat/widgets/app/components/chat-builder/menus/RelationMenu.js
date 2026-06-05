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

let DropDownMenu=require("../Dependencies").DropDownMenu;function RelationMenu(r={}){let{showLabel:d=!1}=r,a=null;this.render=function(e){!function t(l,n="Child"){let e=r.types||["No relation","Child","Sibling"];let i=[];e.forEach(e=>{i.push({value:e,selected:e===n})});a=new DropDownMenu(i,d?"<strong>Relation:</strong> ":"",{dropDownClass:"d-inline",dropDownStyle:{},menuStyle:{marginTop:"10px",width:150,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||t(l,n)}});let o=a.create();o.style.display="inline-block";o.style.verticalAlign="middle";l.innerHTML="";l.appendChild(o)}(e)},this.getSelected=function(){return a.getSelected()}}module.exports=RelationMenu;
