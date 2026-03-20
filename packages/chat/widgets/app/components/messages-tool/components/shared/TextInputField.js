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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class TextInputField{constructor(e,t={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",value:"",placeholder:"",className:"",onChange:null,...t},this.h=DomUtils.h,this.inputElement=null,this.fieldContainer=null,this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText);this.inputElement=this.h.createInput({type:"text",className:this.options.className||"gs-text-input-field",value:this.options.value,placeholder:this.options.placeholder,style:{width:"100%",padding:"8px",border:"1px solid #ddd",borderRadius:"4px"}}),this.options.onChange&&this.inputElement.addEventListener("input",e=>{this.options.onChange(e.target.value)}),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(this.inputElement),this.container.appendChild(this.fieldContainer)}getValue(){return this.inputElement?this.inputElement.value:""}setValue(e){this.inputElement&&(this.inputElement.value=e)}focus(){this.inputElement&&this.inputElement.focus()}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.inputElement=null,this.fieldContainer=null}}module.exports={TextInputField:TextInputField};
