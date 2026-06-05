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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,MessageService=require("../../../services/MessageService"),MODEL_CONSTANTS=require("../../../constants/MessageConstants").MODEL_CONSTANTS,h=DomUtils.h;function render(e,n,t){var r=svg.note({style:{cursor:"pointer"}});let o=createNoteMenu(n,t);n=h.createDiv({append:[r,o],style:{display:"inline-block",marginLeft:"12px"}});e.appendChild(n),r.addEventListener("click",()=>o.open())}function createNoteMenu(r,{widget:o,chat:i,mainModel:a}){let e=new DropDownMenu([{value:"",selected:!0},{value:"New note above"},{value:"New note below"}],"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"200px",zIndex:1e6,textAlign:"left"},callback:async(e,n)=>{var n=n.match(/above/i)?"before":"after",t=MODEL_CONSTANTS.GITSENSE_NOTES;await MessageService.newChatMessage(o,i.id,"before"==n?r.parent_id:r.id,a,r.role,"Click the pencil icon below to make this note your own",{temperature:null==r.temperature?0:r.temperature,realModel:t===a?void 0:t,stream:!0,refMsgId:r.id,insert:n});window.location.reload()}});var n=h.createDiv({append:[e.create()],style:{display:"inline-block"}});return n.open=()=>e.open(),n}module.exports={render:render};
