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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,MessageModal=require("../../modals/EditMessageModal").MessageModal,h=DomUtils.h;function render(e,n,l){var o=svg.code({});let s=createCodeMenu(n,l);n=h.createDiv({append:[o,s],style:{display:"inline-block",marginLeft:"10px",cursor:"pointer"}});e.appendChild(n),o.addEventListener("click",()=>s.open())}function createCodeMenu(l,{widget:o,chat:s,mainModel:t,settings:d}){let e=new DropDownMenu([{value:"",selected:!0},{value:"Show full code"}],"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"200px",zIndex:1e6,textAlign:"left"},callback:(e,n)=>{"Show full code"===n&&new MessageModal(o,l,"show-full-code",()=>{},{chat:s,mainModel:t,models:d.models,fakeLLMs:d.fakeLLMs}).render()}});var n=h.createDiv({append:[e.create()],style:{display:"inline-block"}});return n.open=()=>e.open(),n}module.exports={render:render};
