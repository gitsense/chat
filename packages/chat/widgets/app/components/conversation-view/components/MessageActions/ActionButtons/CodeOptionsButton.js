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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,MessageModal=require("../../modals/EditMessageModal").MessageModal,h=DomUtils.h;function render(e,n,l){var o=svg.code({});let s=createCodeMenu(n,l);n=h.createDiv({append:[o,s],style:{display:"inline-block",marginLeft:"10px",cursor:"pointer"}});e.appendChild(n),o.addEventListener("click",()=>s.open())}function createCodeMenu(l,{widget:o,chat:s,mainModel:t,settings:d}){let e=new DropDownMenu([{value:"",selected:!0},{value:"Show full code"}],"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"200px",zIndex:1e6,textAlign:"left"},callback:(e,n)=>{"Show full code"===n&&new MessageModal(o,l,"show-full-code",()=>{},{chat:s,mainModel:t,models:d.models,fakeLLMs:d.fakeLLMs}).render()}});var n=h.createDiv({append:[e.create()],style:{display:"inline-block"}});return n.open=()=>e.open(),n}module.exports={render:render};
