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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,svg=require("../../Dependencies").svg,CopyButton=require("./ActionButtons/CopyButton"),EditButton=require("./ActionButtons/EditButton"),ForkButton=require("./ActionButtons/ForkButton"),NoteButton=require("./ActionButtons/NoteButton"),CodeOptionsButton=require("./ActionButtons/CodeOptionsButton"),InsightsButton=require("./ActionButtons/InsightsButton"),TryAgainButton=require("./ActionButtons/TryAgainButton"),TrashButton=require("./ActionButtons/TrashButton"),VisibilityButton=require("./ActionButtons/VisibilityButton"),MessageUtils=require("./utils/MessageUtils"),h=DomUtils.h;function renderMessageActions(t,e,n,o,s,i){var{leftOptions:r,rightOptions:d}=createContainers(t),{foldAndUnfoldLink:s,expanded:i}=(n.showCopy&&CopyButton.render(r,e,o),n.showEdit&&EditButton.render(r,s),n.showFork&&ForkButton.render(r,s),n.showNote&&NoteButton.render(r,e,o),n.showCodeOptions&&CodeOptionsButton.render(r,e,o),n.showVisibility&&VisibilityButton.render(r,e,o,i),n.showTryAgain&&!n.isNotesModel&&TryAgainButton.render(r,e,o),n.showTrash&&TrashButton.render(r,e,o),renderFoldUnfoldButton(d,e,o));return renderMessageNumber(d,o.messageBodies.length),setupHoverBehavior(t),{leftOptions:r,rightOptions:d,foldAndUnfoldLink:s,expanded:i}}function createContainers(t){var e=h.createDiv({style:{display:"inline-block",width:"calc(100% - 200px)"}}),n=h.createDiv({style:{display:"inline-block",width:"200px",textAlign:"right"}});return t.appendChild(e),t.appendChild(n),{leftOptions:e,rightOptions:n}}function renderFoldUnfoldButton(t,e,n){let o=MessageUtils.getMsgStateId(e.id);var s=n.messageStateManager.getState(o);let i=h.createLink({append:[s?svg.foldUp():h.createTextNode("Unfold")],style:{fontSize:"14px",fontWeight:500,cursor:"pointer",color:"black"}});return t.appendChild(i),null!==e.message&&(applyContentBodyState(n.contentBody,s),i.onclick=()=>{var t=!n.messageStateManager.getState(o);i.innerHTML=t?svg.foldUp().outerHTML:"Unfold",applyContentBodyState(n.contentBody,t),n.messageStateManager.setState(o,t)}),{foldAndUnfoldLink:i,expanded:s}}function applyContentBodyState(t,e){e?(t.style.maxHeight=null,t.style.overflow=null,t.style.border=null,t.style.borderRadius=null,t.style.padding=null):(t.style.maxHeight="400px",t.style.overflow="hidden",t.style.border="1px dashed black",t.style.borderRadius="10px",t.style.padding="10px")}function renderMessageNumber(t,e){e=h.createSpan({html:"#"+e,style:{fontSize:"13px",marginLeft:"10px",color:"gray"}});t.appendChild(e)}function setupHoverBehavior(t){t.parentNode.onmouseover=()=>{t.parentNode.isLastMessage||(t.style.opacity=1)},t.parentNode.onmouseout=()=>{t.parentNode.isLastMessage||(t.style.opacity=0)}}module.exports={renderMessageActions:renderMessageActions};
