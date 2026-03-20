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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class CheckboxField{constructor(e,t={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",checked:!1,className:"",onChange:null,...t},this.h=DomUtils.h,this.checkboxElement=null,this.fieldContainer=null,this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText),t=this.h.createDiv({className:"checkbox-container",style:{display:"flex",alignItems:"flex-start",gap:"3px",padding:"8px",border:"1px solid #ddd",borderRadius:"4px",cursor:"pointer"}}),i=(this.checkboxElement=this.h.createInput({type:"checkbox",className:this.options.className||"gs-checkbox-field",checked:this.options.checked,style:{marginTop:"2px"},onchange:()=>{this.options.onChange&&this.options.onChange(this.checkboxElement.checked)}}),this.h.createLabel({text:this.options.visibleText||this.options.label,style:{lineHeight:"1.4",cursor:"pointer",flex:"1",fontWeight:500},onclick:()=>{this.checkboxElement.checked=!this.checkboxElement.checked,this.options.onChange&&this.options.onChange(this.checkboxElement.checked)}}));t.appendChild(this.checkboxElement),t.appendChild(i),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(t),this.container.appendChild(this.fieldContainer)}getValue(){return!!this.checkboxElement&&this.checkboxElement.checked}setValue(e){this.checkboxElement&&(this.checkboxElement.checked=e)}focus(){this.checkboxElement&&this.checkboxElement.focus()}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.checkboxElement=null,this.fieldContainer=null}}module.exports={CheckboxField:CheckboxField};
