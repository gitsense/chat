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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,MessageService=require("../../../services/MessageService"),MODEL_CONSTANTS=require("../../../constants/MessageConstants").MODEL_CONSTANTS,h=DomUtils.h;function render(e,n,t){var r=svg.note({style:{cursor:"pointer"}});let o=createNoteMenu(n,t);n=h.createDiv({append:[r,o],style:{display:"inline-block",marginLeft:"12px"}});e.appendChild(n),r.addEventListener("click",()=>o.open())}function createNoteMenu(r,{widget:o,chat:i,mainModel:a}){let e=new DropDownMenu([{value:"",selected:!0},{value:"New note above"},{value:"New note below"}],"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"200px",zIndex:1e6,textAlign:"left"},callback:async(e,n)=>{var n=n.match(/above/i)?"before":"after",t=MODEL_CONSTANTS.GITSENSE_NOTES;await MessageService.newChatMessage(o,i.id,"before"==n?r.parent_id:r.id,a,r.role,"Click the pencil icon below to make this note your own",{temperature:null==r.temperature?0:r.temperature,realModel:t===a?void 0:t,stream:!0,refMsgId:r.id,insert:n});window.location.reload()}});var n=h.createDiv({append:[e.create()],style:{display:"inline-block"}});return n.open=()=>e.open(),n}module.exports={render:render};
