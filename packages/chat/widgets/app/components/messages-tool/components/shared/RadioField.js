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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class RadioField{constructor(e,i={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",options:[],className:"",onChange:null,...i},this.h=DomUtils.h,this.radioElements=[],this.fieldContainer=null,this.radioName="radio-"+Math.random().toString(36).substr(2,9),this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText);let l=this.h.createDiv({className:this.options.className||"gs-radio-field-options",style:{display:"flex",flexDirection:"column",gap:"10px"}});this.options.options.forEach((e,i)=>{var t=this.h.createLabel({className:"gs-radio-field-option",style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",border:"1px solid #ddd",borderRadius:"4px",cursor:e.disabled?"not-allowed":"pointer",opacity:e.disabled?"0.6":"1",fontWeight:"normal"}}),o=this.h.createInput({type:"radio",name:this.radioName,value:e.value,attrs:{checked:e.checked||null},disabled:e.disabled||!1,onchange:()=>{this.options.onChange&&this.options.onChange(e.value)}}),a=this.h.createSpan({text:e.text,style:{lineHeight:"1.4",color:e.disabled?"#999":"inherit"}});t.appendChild(o),t.appendChild(a),l.appendChild(t),this.radioElements.push({radio:o,option:e})}),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(l),this.container.appendChild(this.fieldContainer)}getValue(){var e=this.radioElements.find(e=>e.radio.checked);return e?e.option.value:""}setValue(i){this.radioElements.forEach(e=>{e.radio.checked=e.option.value===i})}getSelectedOption(){var e=this.radioElements.find(e=>e.radio.checked);return e?{value:e.option.value,text:e.option.text,disabled:e.option.disabled}:null}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.radioElements=[],this.fieldContainer=null}}module.exports={RadioField:RadioField};
