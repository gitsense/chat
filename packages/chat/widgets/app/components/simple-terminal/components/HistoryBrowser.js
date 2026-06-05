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

let CSS_CLASSES=require("../constants").CSS_CLASSES;class HistoryBrowser{constructor(e,t={}){e=e.h;this.h=e,this.config={onSelect:t.onSelect||(()=>{}),...t},this.elements={},this.history=[]}render(e){this._createLayout(),e.appendChild(this.elements.container)}setHistory(e){this.history=e||[],this._renderList()}setActiveId(t){this.elements.list.querySelectorAll("."+CSS_CLASSES.HISTORY_ITEM).forEach(e=>{parseInt(e.dataset.id)===t?e.classList.add(CSS_CLASSES.HISTORY_ITEM_ACTIVE):e.classList.remove(CSS_CLASSES.HISTORY_ITEM_ACTIVE)})}_createLayout(){this.elements.container=this.h.createDiv({cls:CSS_CLASSES.HISTORY_PANE}),this.elements.header=this.h.createDiv({cls:CSS_CLASSES.HISTORY_HEADER,text:"History"}),this.elements.list=this.h.createUl({cls:CSS_CLASSES.HISTORY_LIST}),this.elements.container.appendChild(this.elements.header),this.elements.container.appendChild(this.elements.list)}_renderList(){this.elements.list.innerHTML="",[...this.history].reverse().forEach(e=>{var t=this.h.createLi({cls:CSS_CLASSES.HISTORY_ITEM,dataset:{id:e.id}}),s=this.h.createSpan({cls:CSS_CLASSES.HISTORY_TIMESTAMP,text:this._formatTime(e.timestamp)}),i=this.h.createSpan({text:e.command});t.appendChild(s),t.appendChild(i),t.addEventListener("click",()=>{this.config.onSelect(e)}),this.elements.list.appendChild(t)})}_formatTime(e){return e?new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}}module.exports={HistoryBrowser:HistoryBrowser};
