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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class RangeFilter{constructor(e,t={}){this.container=e,this.options={totalMessages:0,onRangeChange:()=>{},...t},this.range={from:null,to:null},this.h=DomUtils.h}render(){this.container.innerHTML="";var e=this.h.createDiv({className:"gs-range-filter-container"}),t=this.h.createSpan({className:"gs-range-filter-label",text:"From:",style:{}});let n=this.h.createInput({type:"number",className:"gs-range-filter-from",min:1,max:this.options.totalMessages,placeholder:"1",onchange:()=>{this.handleRangeChange()},onkeydown:e=>{"Enter"===e.key&&this.handleRangeChange()}});var a=this.h.createSpan({text:"To:",className:"gs-range-filter-label",style:{marginLeft:"15px"}});let r=this.options.totalMessages.toString(),s=this.h.createInput({type:"number",className:"gs-range-filter-to",min:1,max:this.options.totalMessages,placeholder:r,onchange:()=>{this.handleRangeChange()},onkeydown:e=>{"Enter"===e.key&&this.handleRangeChange()}});n.addEventListener("focus",function(e){n.placeholder=""}),n.addEventListener("focusout",function(e){n.placeholder="1"}),s.addEventListener("focus",function(e){s.placeholder=""}),s.addEventListener("focusout",function(e){s.placeholder=r});var l=this.h.createButton({className:"gs-range-filter-clear",text:"Clear",onclick:()=>{this.clearRange()}});e.appendChild(t),e.appendChild(n),e.appendChild(a),e.appendChild(s),e.appendChild(l),this.container.appendChild(e)}handleRangeChange(){var e,t=this.container.querySelector(".gs-range-filter-from"),n=this.container.querySelector(".gs-range-filter-to"),a=t.value?parseInt(t.value,10):null,r=n.value?parseInt(n.value,10):null;null!==a&&null!==r&&r<a?(e=a,t.value=r,n.value=e,this.range.from=r,this.range.to=e):(this.range.from=a,this.range.to=r),this.options.onRangeChange(this.range)}clearRange(){var e=this.container.querySelector(".gs-range-filter-from"),t=this.container.querySelector(".gs-range-filter-to");e.value="",t.value="",this.range.from=null,this.range.to=null,this.options.onRangeChange(this.range)}setRange(e){this.range=e;var t=this.container.querySelector(".gs-range-filter-from"),n=this.container.querySelector(".gs-range-filter-to");t&&n&&(t.value=null!==e.from?e.from.toString():"",n.value=null!==e.to?e.to.toString():"")}setTotalMessages(e){this.options.totalMessages=e;var t=this.container.querySelector(".gs-range-filter-from"),n=this.container.querySelector(".gs-range-filter-to");t&&n&&(t.max=e,n.max=e,n.placeholder=e.toString())}cleanup(){this.container.innerHTML=""}}module.exports={RangeFilter:RangeFilter};
