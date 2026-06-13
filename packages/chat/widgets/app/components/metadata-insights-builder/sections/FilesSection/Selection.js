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

let{DomUtils,ContextUtils}=require("@gitsense/gsc-utils"),{CSS_CLASSES,TEXT,DEFAULT_CONFIG}=require("./constants"),{createSectionHeader,createButton,formatFileNames}=require("../../utils/helpers"),RepositoriesBrowser=require("../../../repositories-browser").RepositoriesBrowser;class Selection{constructor(e,t,s,i){this.container=e,this.state={items:t||[]},this.callbacks=s,this.context=i,this.selectionElement=null,this.countElement=null,this.namesElement=null,this.selectFilesButton=null,this.useContextFilesButton=null,this._boundHandlers={selectFilesClick:this._handleSelectFilesClick.bind(this),useContextClick:this._handleUseContextClick.bind(this)},this.render()}render(){this.selectionElement=DomUtils.h.createDiv({style:{marginTop:"15px"}}),this.countElement=DomUtils.h.createH3({text:`${this.state.items.length} ${1===this.state.items.length?"File":"Files"} Selected`,style:{margin:"0 0 10px 0"}}),this.selectionElement.appendChild(this.countElement),this.namesElement=DomUtils.h.createParagraph({text:this._getFileDisplayText(),style:{margin:"15px 0px",minHeight:"1.2em"}}),this.selectionElement.appendChild(this.namesElement);var e=DomUtils.h.createDiv({style:{display:"flex",gap:"10px",alignItems:"center",marginTop:"12px",flexWrap:"wrap"}});this._renderActionButtons(e),this.selectionElement.appendChild(e),this.container.appendChild(this.selectionElement)}_renderActionButtons(e){e.innerHTML="",0<this.state.items.length||ContextUtils.getContextFiles(this.context.chat),this.selectFilesButton=createButton(TEXT.SELECT_FILES_TO_REVIEW,this._boundHandlers.selectFilesClick,{variant:"primary"}),e.appendChild(this.selectFilesButton)}update(e){this.state.items=e||[],this._updateUI()}cleanup(){this.selectFilesButton&&this.selectFilesButton.removeEventListener("click",this._boundHandlers.selectFilesClick),this.useContextFilesButton&&this.useContextFilesButton.removeEventListener("click",this._boundHandlers.useContextClick),this.selectionElement&&this.selectionElement.parentElement&&this.selectionElement.remove(),this.selectionElement=null,this.countElement=null,this.namesElement=null,this.selectFilesButton=null,this.useContextFilesButton=null}_getFileDisplayText(){return 0===this.state.items.length?TEXT.NO_FILES_SELECTED:formatFileNames(this.state.items,DEFAULT_CONFIG.maxFilesDisplayed)}_updateUI(){this.countElement&&(this.countElement.textContent=`${this.state.items.length} ${1===this.state.items.length?"file":"files"} selected`),this.namesElement&&(this.namesElement.textContent=this._getFileDisplayText());var e=this.selectionElement.querySelector("div");e&&this._renderActionButtons(e)}_handleSelectFilesClick(){this.repositoriesBrowser=new RepositoriesBrowser(this.context,{actionButtonText:"Confirm Selections",homeTitle:"Select Files to Review",homeDescription:"Use the repository browser on the left to navigate and select files.",onActionClick:e=>{this.state.items=e,this._updateUI(),this.repositoriesBrowser.destroy(),this.callbacks.onFilesSelected&&this.callbacks.onFilesSelected(this.state.items)}}),this.repositoriesBrowser.show()}_handleUseContextClick(){var e=ContextUtils.getContextFiles(this.context.chat);e.length&&(e=e.map(e=>({id:e["chat id"],name:e.name})),this.state.items=e,this._updateUI(),this.callbacks.onFilesSelected)&&this.callbacks.onFilesSelected(this.state.items)}}module.exports=Selection;
