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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper;class SelectField{constructor(e,t={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",options:[],className:"",onChange:null,...t},this.h=DomUtils.h,this.selectElement=null,this.fieldContainer=null,this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText);this.selectElement=this.h.createSelect({className:this.options.className||"gs-select-field",style:{width:"100%",padding:"8px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#fff"}}),this.options.options.forEach(e=>{e=this.h.createOption({value:e.value,text:e.text,selected:e.selected||!1,disabled:e.disabled||!1});this.selectElement.appendChild(e)}),this.options.onChange&&this.selectElement.addEventListener("change",e=>{this.options.onChange(e.target.value)}),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(this.selectElement),this.container.appendChild(this.fieldContainer)}getValue(){return this.selectElement?this.selectElement.value:""}setValue(e){this.selectElement&&(this.selectElement.value=e)}focus(){this.selectElement&&this.selectElement.focus()}getSelectedOption(){var e;return this.selectElement&&0<=(e=this.selectElement.selectedIndex)?{value:this.selectElement.options[e].value,text:this.selectElement.options[e].text,disabled:this.selectElement.options[e].disabled}:null}destroy(){this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.selectElement=null,this.fieldContainer=null}}module.exports={SelectField:SelectField};
