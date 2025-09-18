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

let DomUtils=require("../../utils/DomUtils"),h=DomUtils.h,svg=DomUtils.svg;class SelectedContext{constructor(e,t,i=[]){this.parentElem=e,this.context=t,this.items=i,this.container=null,this.summaryTextElem=null,this.reviewLinkElem=null,this._render()}_render(){this.container?(i=(this.container&&""!==this.container.innerText?this.container.getBoundingClientRect():-1).height,-1!==i&&(this.container.style.minHeight=i+"px"),this.container.innerHTML=""):(this.container=h.createDiv({id:"selected-files-display-container",style:{display:"flex",flexDirection:"column",gap:"5px",marginTop:"10px"}}),this.parentElem.appendChild(this.container)),this.container.appendChild(h.createH2({append:[h.createText("Data")],style:{color:"#555",marginTop:"5px"}}));var e,t,i=0===this.items.length;let n='No items selected. Select one or more files from the "Repositories" tree (right sidebar).';i||(e=(t=this.items.map(e=>e.name)).slice(0,5).join(", "),t=5<t.length?"...":"",n=e+t),this.summaryHeader=h.createH3({text:this.items.length+" File"+(1===this.items.length?"":"s"),style:{margin:0}}),this.summaryTextElem=h.createParagraph({text:n,style:{margin:"7px 0px 5px 0px"}}),this.container.appendChild(this.summaryHeader),this.container.appendChild(this.summaryTextElem),this.reviewLinkElem=h.createLink({id:"review-selected-metadata-insights-items",text:i?"No selected items to review":"Review selected items",href:"#",style:{pointerEvents:i?"none":null,color:i?"gray":null}}),this.container.appendChild(this.reviewLinkElem),this.reviewLinkElem.addEventListener("click",this._handleReviewItemsClick.bind(this))}_handleReviewItemsClick(e){e.preventDefault();e=this.items.map(e=>e.id);this.context.showContextBuilder(e,"file content","imported","review")}update(e){this.items=e,this._render()}cleanup(){this.reviewLinkElem&&this.reviewLinkElem.removeEventListener("click",this._handleReviewItemsClick),this.container&&this.container.parentElement&&this.container.remove(),console.log("Cleaned up SelectedContext.")}}module.exports=SelectedContext;
