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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../../Dependencies").svg,DropDownMenu=require("../../../Dependencies").DropDownMenu,MessageService=require("../../../services/MessageService"),h=DomUtils.h;function render(e,n,i){var s=svg.sync({style:{cursor:"pointer"}});let a=createTryAgainMenu(n,i);n=h.createDiv({append:[s,a],style:{display:"inline-block",marginLeft:"10px"}});e.appendChild(n),s.addEventListener("click",()=>a.open())}function createTryAgainMenu(i,{widget:s,chat:a,mainModel:e}){var n=[{value:"",selected:!0},{value:"Try again"}];1<MessageService.getUniqueModels((2===i.level?a.messages[0]:i).kids).length&&a.main_model!==e&&n.push({value:"Delete response"});let t=new DropDownMenu(n,"",{dropDownClass:"",dropDownStyle:{fontSize:"14px"},menuStyle:{left:"-15px",marginTop:"10px",width:"250px",zIndex:1e6,textAlign:"left"},callback:async(e,n)=>{"Try again"===n?(await MessageService.resetChatMessage(s,i.id),window.location.reload()):"Delete response"===n&&(await MessageService.deleteChatMessage(s,i.id),handleDeleteResponse(i,a))}});e=h.createDiv({append:[t.create()],style:{display:"inline-block"}});return e.open=()=>t.open(),e}function handleDeleteResponse(e,n){var i,s;2<e.level?window.location.reload():({search:e,pathname:i}=window.location,e=new URLSearchParams(e),n.inSideBySide?((s=e.get("models").split(","))["left"===n.inSideBySide?0:1]=n.main_model,e.set("models",s.join(","))):e.delete("model"),window.location.assign((""===i?"/":i)+"?"+e.toString()))}module.exports={render:render};
