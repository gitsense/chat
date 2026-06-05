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

let DropDownMenu=require("../../Dependencies").DropDownMenu;function AnalyzeMenu(l,e,o){let i=e.onChange,r=null;function u(n){let t=[];l.menuOptions.forEach(e=>{t.push({value:e,selected:n===e})}),r=new DropDownMenu(t,"",{dropDownClass:"d-inline",menuStyle:{marginBottom:"5px",width:l.menuWidth,textAlign:"left",zIndex:1e6},callback:(e,n)=>{n.toString().match(/^----/)||(u(n),i&&i(n))}}),o.innerHTML="";var e=r.create();o.appendChild(e)}this.getSelected=()=>r.getSelected(),this.reset=()=>{r=null,u()},this.render=e=>{u(e)}}module.exports=AnalyzeMenu;
