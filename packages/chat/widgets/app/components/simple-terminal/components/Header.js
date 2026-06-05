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

let{CSS_CLASSES,STORAGE_KEYS}=require("../constants");class Header{constructor(e,t={}){var{h:e,SVGUtils:s}=e;this.h=e,this.SVGUtils=s,this.config={onStop:t.onStop||(()=>{}),title:t.title||"Bridge Terminal",...t},this.elements={},this.events={},this.isHintDismissed="true"===localStorage.getItem(STORAGE_KEYS.HINT_DISMISSED)}setEvent(e,t){this.events[e]=t}render(e){this._createLayout(),e.appendChild(this.elements.container),this._attachEvents()}setStreaming(e){this.elements.stopBtn&&(this.elements.stopBtn.disabled=!e,this.elements.stopBtn.textContent=e?"Stop":"Stopped")}_createLayout(){this.elements.container=this.h.createDiv({cls:CSS_CLASSES.HEADER}),this.elements.headerLeft=this.h.createDiv({cls:CSS_CLASSES.HEADER_LEFT});var e,t=[this.h.createSpan({text:this.config.title})];this.isHintDismissed||(e=this.h.createSpan({cls:CSS_CLASSES.ESC_HINT,html:"Type 'exit' to close or press ESC &nbsp;"}),this.elements.dismissLink=this.h.createLink({cls:CSS_CLASSES.DISMISS_LINK,text:"Okay, got it!",href:"#"}),e=this.h.createSpan({append:[e,this.elements.dismissLink]}),t.push(e)),this.elements.title=this.h.createDiv({cls:CSS_CLASSES.TITLE,append:t}),this.elements.headerActions=this.h.createDiv({cls:CSS_CLASSES.HEADER_ACTIONS}),this.elements.copyCmdLink=this.h.createLink({cls:CSS_CLASSES.COPY_LINK,text:"Copy Command",href:"#"}),this.elements.copyOutLink=this.h.createLink({cls:CSS_CLASSES.COPY_LINK,text:"Copy Output",href:"#"}),this.elements.headerActions.appendChild(this.elements.copyCmdLink),this.elements.headerActions.appendChild(this.elements.copyOutLink),this.elements.headerLeft.appendChild(this.elements.title),this.elements.headerLeft.appendChild(this.elements.headerActions),this.elements.stopBtn=this.h.createButton({cls:CSS_CLASSES.STOP_BUTTON,text:"Stop",disabled:!0}),this.elements.container.appendChild(this.elements.headerLeft),this.elements.container.appendChild(this.elements.stopBtn)}_attachEvents(){this.elements.stopBtn.addEventListener("click",()=>{this.config.onStop()}),this.elements.copyCmdLink.addEventListener("click",e=>{e.preventDefault(),this.events.onCopyCommand&&this.events.onCopyCommand()}),this.elements.copyOutLink.addEventListener("click",e=>{e.preventDefault(),this.events.onCopyOutput&&this.events.onCopyOutput()}),this.elements.dismissLink&&this.elements.dismissLink.addEventListener("click",e=>{e.preventDefault(),localStorage.setItem(STORAGE_KEYS.HINT_DISMISSED,"true"),this.elements.dismissLink.parentNode&&this.elements.dismissLink.parentNode.remove()})}}module.exports={Header:Header};
