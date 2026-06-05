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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class TextareaField{constructor(e,t={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",value:"",placeholder:"",className:"",onChange:null,rows:4,...t},this.h=DomUtils.h,this.textareaElement=null,this.fieldContainer=null,this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText);this.textareaElement=this.h.createTextarea({className:this.options.className||"gs-textarea-field",value:this.options.value,placeholder:this.options.placeholder,rows:this.options.rows,style:{width:"100%",padding:"10px",border:"1px solid #ddd",borderRadius:"4px",resize:"vertical",fontFamily:"monospace",fontSize:"13px",lineHeight:"1.4"}}),this.options.onChange&&this.textareaElement.addEventListener("input",e=>{this.options.onChange(e.target.value)}),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(this.textareaElement),this.container.appendChild(this.fieldContainer)}getValue(){return this.textareaElement?this.textareaElement.value:""}setValue(e){this.textareaElement&&(this.textareaElement.value=e)}focus(){this.textareaElement&&this.textareaElement.focus()}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.textareaElement=null,this.fieldContainer=null}}module.exports={TextareaField:TextareaField};
