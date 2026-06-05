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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class RadioField{constructor(e,i={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",options:[],className:"",onChange:null,...i},this.h=DomUtils.h,this.radioElements=[],this.fieldContainer=null,this.radioName="radio-"+Math.random().toString(36).substr(2,9),this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText);let l=this.h.createDiv({className:this.options.className||"gs-radio-field-options",style:{display:"flex",flexDirection:"column",gap:"10px"}});this.options.options.forEach((e,i)=>{var t=this.h.createLabel({className:"gs-radio-field-option",style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",border:"1px solid #ddd",borderRadius:"4px",cursor:e.disabled?"not-allowed":"pointer",opacity:e.disabled?"0.6":"1",fontWeight:"normal"}}),o=this.h.createInput({type:"radio",name:this.radioName,value:e.value,attrs:{checked:e.checked||null},disabled:e.disabled||!1,onchange:()=>{this.options.onChange&&this.options.onChange(e.value)}}),a=this.h.createSpan({text:e.text,style:{lineHeight:"1.4",color:e.disabled?"#999":"inherit"}});t.appendChild(o),t.appendChild(a),l.appendChild(t),this.radioElements.push({radio:o,option:e})}),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(l),this.container.appendChild(this.fieldContainer)}getValue(){var e=this.radioElements.find(e=>e.radio.checked);return e?e.option.value:""}setValue(i){this.radioElements.forEach(e=>{e.radio.checked=e.option.value===i})}getSelectedOption(){var e=this.radioElements.find(e=>e.radio.checked);return e?{value:e.option.value,text:e.option.text,disabled:e.option.disabled}:null}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.radioElements=[],this.fieldContainer=null}}module.exports={RadioField:RadioField};
