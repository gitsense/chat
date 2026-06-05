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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class SelectField{constructor(e,t={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",options:[],className:"",onChange:null,...t},this.h=DomUtils.h,this.selectElement=null,this.fieldContainer=null,this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText);this.selectElement=this.h.createSelect({className:this.options.className||"gs-select-field",style:{width:"100%",padding:"8px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#fff"}}),this.options.options.forEach(e=>{e=this.h.createOption({value:e.value,text:e.text,selected:e.selected||!1,disabled:e.disabled||!1});this.selectElement.appendChild(e)}),this.options.onChange&&this.selectElement.addEventListener("change",e=>{this.options.onChange(e.target.value)}),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(this.selectElement),this.container.appendChild(this.fieldContainer)}getValue(){return this.selectElement?this.selectElement.value:""}setValue(e){this.selectElement&&(this.selectElement.value=e)}focus(){this.selectElement&&this.selectElement.focus()}getSelectedOption(){var e;return this.selectElement&&0<=(e=this.selectElement.selectedIndex)?{value:this.selectElement.options[e].value,text:this.selectElement.options[e].text,disabled:this.selectElement.options[e].disabled}:null}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.selectElement=null,this.fieldContainer=null}}module.exports={SelectField:SelectField};
