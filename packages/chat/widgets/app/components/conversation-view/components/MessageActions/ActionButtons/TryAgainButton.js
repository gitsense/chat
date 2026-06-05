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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,MessageService=require("../../../services/MessageService"),h=DomUtils.h;function render(e,n,i){var s=svg.sync({style:{cursor:"pointer"}});let a=createTryAgainMenu(n,i);n=h.createDiv({append:[s,a],style:{display:"inline-block",marginLeft:"10px"}});e.appendChild(n),s.addEventListener("click",()=>a.open())}function createTryAgainMenu(i,{widget:s,chat:a,mainModel:e}){var n=[{value:"",selected:!0},{value:"Try again"}];1<MessageService.getUniqueModels((2===i.level?a.messages[0]:i).kids).length&&a.main_model!==e&&n.push({value:"Delete response"});let t=new DropDownMenu(n,"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"250px",zIndex:1e6,textAlign:"left"},callback:async(e,n)=>{"Try again"===n?(await MessageService.resetChatMessage(s,i.id),window.location.reload()):"Delete response"===n&&(await MessageService.deleteChatMessage(s,i.id),handleDeleteResponse(i,a))}});e=h.createDiv({append:[t.create()],style:{display:"inline-block"}});return e.open=()=>t.open(),e}function handleDeleteResponse(e,n){var i,s;2<e.level?window.location.reload():({search:e,pathname:i}=window.location,e=new URLSearchParams(e),n.inSideBySide?((s=e.get("models").split(","))["left"===n.inSideBySide?0:1]=n.main_model,e.set("models",s.join(","))):e.delete("model"),window.location.assign((""===i?"/":i)+"?"+e.toString()))}module.exports={render:render};
