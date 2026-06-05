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

let{DomUtils,LanguageNameUtils}=require("@gitsense/gsc-utils"),METADATA_INSIGHT_RESULT_CONSTANTS=require("../constants").METADATA_INSIGHT_RESULT_CONSTANTS;class LanguageFilter{constructor(e,t={}){if(!e)throw new Error("LanguageFilter: Container is required");if(this.container=e,this.config={languages:[],stateManager:null,onFilterChange:()=>{},...t},!this.config.stateManager)throw new Error("LanguageFilter: stateManager is required in config");this.filterElement=null,this.languageCheckboxes=new Map,this._initialize()}_initialize(){this._render()}_render(){this.filterElement=DomUtils.h.createDiv({cls:"language-filter-container",style:{marginBottom:"10px"}});let a=this.config.stateManager.getPreviewLanguages();this.config.languages.forEach(e=>{var t=a.includes(e.label),e=this._createLanguageItem(e,t);this.filterElement.appendChild(e)}),this.container.appendChild(this.filterElement)}_createLanguageItem(e,t){var a=DomUtils.h.createDiv({style:{display:"inline-block",marginRight:"15px",marginBottom:"5px",minWidth:"150px"}});let i=DomUtils.h.createInput({type:"checkbox",checked:t,style:{verticalAlign:"middle",marginRight:"5px",accentColor:METADATA_INSIGHT_RESULT_CONSTANTS.CSS_CLASSES.PRIMARY_COLOR||"#007bff"},onchange:()=>this._handleFilterChange()});this.languageCheckboxes.set(e.label,i);t=DomUtils.h.createLabel({text:`${LanguageNameUtils.normalizeLanguageName(e.label)} (${e.count})`,style:{fontSize:".9em",fontWeight:"normal",color:"#495057",cursor:"pointer"},onclick:()=>{i.checked=!i.checked,this._handleFilterChange()}});return a.appendChild(i),a.appendChild(t),a}_handleFilterChange(){var e=this.getSelectedLanguages();this.config.stateManager.updatePreviewLanguages(e),this.config.onFilterChange(e)}updateLanguages(e){this.config.languages=e,this._rerender()}selectAll(){this.languageCheckboxes.forEach(e=>{e.checked=!0}),this._handleFilterChange()}deselectAll(){this.languageCheckboxes.forEach(e=>{e.checked=!1}),this._handleFilterChange()}updateFromState(){var e;this.config.stateManager&&(e=this.config.stateManager.getPreviewLanguages(),this.setSelectedLanguages(e))}_rerender(){this.filterElement&&this.filterElement.parentElement&&this.filterElement.remove(),this.languageCheckboxes.clear(),this._render()}getSelectedLanguages(){let a=[];return this.languageCheckboxes.forEach((e,t)=>{e.checked&&a.push(t)}),a}setSelectedLanguages(a){this.languageCheckboxes.forEach((e,t)=>{e.checked=a.includes(t)})}cleanup(){this.filterElement&&this.filterElement.parentElement&&this.filterElement.remove(),this.filterElement=null,this.languageCheckboxes.clear()}}module.exports=LanguageFilter;
