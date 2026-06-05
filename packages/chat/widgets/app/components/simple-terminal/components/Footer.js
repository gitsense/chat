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

let CSS_CLASSES=require("../constants").CSS_CLASSES,COMMON_LANGUAGES=["plaintext","javascript","typescript","python","java","c","cpp","csharp","go","rust","php","ruby","swift","kotlin","bash","sql","html","css","json","xml","markdown"];class Footer{constructor(e,t={}){e=e.h;this.h=e,this.config={onAdd:t.onAdd||(()=>{}),onClose:t.onClose||(()=>{}),...t},this.elements={},this.events={}}setEvent(e,t){this.events[e]=t}render(e){this._createLayout(),e.appendChild(this.elements.container),this._attachEvents()}getVisibility(){return this.elements.visibilitySelect.value}getFormat(){return this.elements.formatSelect.value}setFormat(e){this.elements.formatSelect&&(this.elements.formatSelect.value=e,this.elements.formatSelect.dispatchEvent(new Event("change")))}getLanguage(){return this.elements.languageSelect?this.elements.languageSelect.value:"plaintext"}setLanguage(e){this.elements.languageSelect&&(this.elements.languageSelect.value=e)}_createLayout(){this.elements.container=this.h.createDiv({cls:CSS_CLASSES.FOOTER}),this.elements.controls=this.h.createDiv({cls:CSS_CLASSES.CONTROLS}),this.elements.visibilitySelect=this.h.createSelect({cls:CSS_CLASSES.SELECT,append:[this.h.createOption({value:"public",text:"Visible to Humans & AI"}),this.h.createOption({value:"human-public",text:"Visible to Humans Only"})]}),this.elements.formatSelect=this.h.createSelect({cls:CSS_CLASSES.SELECT,append:[this.h.createOption({value:"formatted",text:"Formatted (Code Block)"}),this.h.createOption({value:"raw",text:"Raw"})]}),this.elements.languageSelect=this.h.createSelect({cls:CSS_CLASSES.SELECT,append:COMMON_LANGUAGES.map(e=>this.h.createOption({value:e,text:e.charAt(0).toUpperCase()+e.slice(1)}))}),this.elements.controls.appendChild(this.elements.visibilitySelect),this.elements.controls.appendChild(this.elements.formatSelect),this.elements.controls.appendChild(this.elements.languageSelect),this.elements.actions=this.h.createDiv({cls:CSS_CLASSES.ACTIONS}),this.elements.closeBtn=this.h.createButton({cls:CSS_CLASSES.BUTTON,text:"Close"}),this.elements.addBtn=this.h.createButton({cls:CSS_CLASSES.BUTTON+" "+CSS_CLASSES.BUTTON_PRIMARY,text:"Add"}),this.elements.actions.appendChild(this.elements.closeBtn),this.elements.actions.appendChild(this.elements.addBtn),this.elements.container.appendChild(this.elements.controls),this.elements.container.appendChild(this.elements.actions)}_attachEvents(){this.elements.closeBtn.addEventListener("click",()=>{this.config.onClose()}),this.elements.addBtn.addEventListener("click",()=>{this.config.onAdd()}),this.elements.formatSelect.addEventListener("change",e=>{"formatted"===e.target.value?this.elements.languageSelect.style.display="inline-block":this.elements.languageSelect.style.display="none"})}}module.exports={Footer:Footer};
