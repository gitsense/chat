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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let{h,svg}=require("../../Dependencies"),CopyButton=require("./ActionButtons/CopyButton"),EditButton=require("./ActionButtons/EditButton"),ForkButton=require("./ActionButtons/ForkButton"),NoteButton=require("./ActionButtons/NoteButton"),CodeOptionsButton=require("./ActionButtons/CodeOptionsButton"),InsightsButton=require("./ActionButtons/InsightsButton"),TryAgainButton=require("./ActionButtons/TryAgainButton"),TrashButton=require("./ActionButtons/TrashButton"),MessageUtils=require("./utils/MessageUtils");function renderMessageActions(e,t,n,o,r){var{leftOptions:s,rightOptions:i}=createContainers(e),{foldAndUnfoldLink:r,expanded:n}=(n.showCopy&&CopyButton.render(s,t,o),n.showEdit&&EditButton.render(s,r),n.showFork&&ForkButton.render(s,r),n.showNote&&NoteButton.render(s,t,o),n.showCodeOptions&&CodeOptionsButton.render(s,t,o),n.showTryAgain&&!n.isNotesModel&&TryAgainButton.render(s,t,o),n.showTrash&&TrashButton.render(s,t,o),renderFoldUnfoldButton(i,t,o));return renderMessageNumber(i,o.messageBodies.length),setupHoverBehavior(e),{leftOptions:s,rightOptions:i,foldAndUnfoldLink:r,expanded:n}}function createContainers(e){var t=h.createDiv({style:{display:"inline-block",width:"calc(100% - 200px)"}}),n=h.createDiv({style:{display:"inline-block",width:"200px",textAlign:"right"}});return e.appendChild(t),e.appendChild(n),{leftOptions:t,rightOptions:n}}function renderFoldUnfoldButton(e,t,n){let o=MessageUtils.getMsgStateId(t.id);var r=n.messageStateManager.getState(o);let s=h.createLink({append:[r?svg.foldUp():h.createTextNode("Unfold")],style:{fontSize:"14px",fontWeight:500,cursor:"pointer",color:"black"}});return e.appendChild(s),null!==t.message&&(applyContentBodyState(n.contentBody,r),s.onclick=()=>{var e=!n.messageStateManager.getState(o);s.innerHTML=e?svg.foldUp().outerHTML:"Unfold",applyContentBodyState(n.contentBody,e),n.messageStateManager.setState(o,e)}),{foldAndUnfoldLink:s,expanded:r}}function applyContentBodyState(e,t){t?(e.style.maxHeight=null,e.style.overflow=null,e.style.border=null,e.style.borderRadius=null,e.style.padding=null):(e.style.maxHeight="400px",e.style.overflow="hidden",e.style.border="1px dashed black",e.style.borderRadius="10px",e.style.padding="10px")}function renderMessageNumber(e,t){t=h.createSpan({html:"#"+t,style:{fontSize:"13px",marginLeft:"10px",color:"gray"}});e.appendChild(t)}function setupHoverBehavior(e){e.parentNode.onmouseover=()=>{e.parentNode.isLastMessage||(e.style.opacity=1)},e.parentNode.onmouseout=()=>{e.parentNode.isLastMessage||(e.style.opacity=0)}}module.exports={renderMessageActions:renderMessageActions};
