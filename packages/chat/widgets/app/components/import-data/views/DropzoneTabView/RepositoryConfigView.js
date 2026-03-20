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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,formatVisibilityDuration=require("../../utils/formatUtils").formatVisibilityDuration;class RepositoryConfigView{constructor(e,t,i){this.containerElement=e,this.context=i,this.config={owner:"GSC-DropZone",namePrefix:"",nameSuffix:this._generateRandomSuffix(),visibilityDuration:1440,branch:"main",...t},this.validation={isValid:!0,message:""},this.changeCallback=null,this.elements={}}render(){this.containerElement.innerHTML="";var e=DomUtils.h.createDiv(),t=(e.className="import-data-repo-config",DomUtils.h.createH3({style:{textAlign:"center",marginBottom:"10px"}})),t=(t.textContent="Repository Configuration",e.appendChild(t),DomUtils.h.createP({style:{fontSize:"14px",textAlign:"center"}})),t=(t.className="import-data-repo-config-subtitle",t.textContent="Turn your files into a git repository",e.appendChild(t),DomUtils.h.createDiv()),i=(t.className="import-data-form-group",DomUtils.h.createLabel());i.textContent="Name Prefix (Optional)",t.appendChild(i);let n=DomUtils.h.createInput({type:"text",value:this.config.namePrefix||"",placeholder:"e.g., my-project"});n.className="import-data-form-input",t.appendChild(n);var i=DomUtils.h.createDiv(),a=(i.className="import-data-repo-name-preview",i.style.cssText=`
            margin-top: 10px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            color: #333;
        `,DomUtils.h.createSpan());a.textContent="GSC-Dropzone / ",i.appendChild(a);let s=DomUtils.h.createSpan();s.className="import-data-preview-prefix";var a=this.config.namePrefix||"my-project",a=(s.textContent=a,i.appendChild(s),DomUtils.h.createSpan()),a=(a.textContent="-",i.appendChild(a),DomUtils.h.createSpan()),a=(a.className="import-data-preview-suffix",a.textContent=this.config.nameSuffix,a.style.cssText="color: #007bff; font-weight: bold;",i.appendChild(a),t.appendChild(i),DomUtils.h.createDiv());a.className="import-data-form-hint",a.textContent="This will be your GitSense Chat dropzone repository with a random suffix added. Leave empty to use the default name prefix.",t.appendChild(a),n.addEventListener("input",()=>{var e=n.value.trim();s.textContent=e||"my-project",this._handleConfigChange({namePrefix:e})}),e.appendChild(t),void 0!==this.config.visibilityDuration&&0<=this.config.visibilityDuration&&((i=DomUtils.h.createDiv()).className="import-data-visibility-note",(a=DomUtils.h.createP()).style.margin="0",a.innerHTML=`
                <strong>Note:</strong> Your repository will be visible in the Repositories tree for 
                <strong>${formatVisibilityDuration(this.config.visibilityDuration)}</strong> 
                after import. After this period, it will be automatically hidden to keep the repository tree organized.
                Please contact your GitSense Chat administrator to update the time limit.
            `,i.appendChild(a),e.appendChild(i)),this.elements={container:e,nameInput:n,previewPrefix:s},this.containerElement.appendChild(e)}updateConfig(e){this.config={...this.config,...e},void 0!==e.namePrefix&&this.elements.nameInput&&(this.elements.nameInput.value=e.namePrefix||"",this.elements.previewPrefix.textContent=e.namePrefix||"my-project"),void 0!==e.nameSuffix&&this.elements.previewSuffix&&(this.elements.previewSuffix.textContent=e.nameSuffix)}getConfig(){return{...this.config}}show(){this.elements.container&&(this.elements.container.style.display="block")}hide(){this.elements.container&&(this.elements.container.style.display="none")}validate(){var e;return null!=this.config.namePrefix?(e=this._validateRepositoryName(this.config.namePrefix),this.validation=e,this._updateValidationUI(e),e):(this.validation={isValid:!0,message:""},this.validation)}onChange(e){this.changeCallback=e}cleanup(){this.containerElement&&(this.containerElement.innerHTML=""),this.elements={},this.changeCallback=null}_handleConfigChange(e){this.config={...this.config,...e},this.validate(),this.changeCallback&&this.changeCallback(this.config,this.validation)}_validateRepositoryName(e){return e&&""!==e.trim()?255<e.length?{isValid:!1,message:"Repository name is too long (maximum 255 characters)"}:/^[a-zA-Z0-9._-]+$/.test(e)?e.startsWith(".")||e.startsWith("-")||e.startsWith("_")||e.endsWith(".")||e.endsWith("-")||e.endsWith("_")?{isValid:!1,message:"Repository name cannot start or end with a period, hyphen, or underscore"}:e.includes("..")||e.includes("--")||e.includes("__")||e.includes("._")||e.includes("-.")||e.includes("._")||e.includes("-.")||e.includes("_.")||e.includes("._")?{isValid:!1,message:"Repository name cannot contain consecutive special characters"}:{isValid:!0,message:""}:{isValid:!1,message:"Repository name can only contain letters, numbers, hyphens (-), underscores (_), and periods (.)"}:{isValid:!0,message:""}}_updateValidationUI(e){var t;this.elements.container&&((t=this.elements.container.querySelector(".repo-name-validation-message"))&&t.remove(),e.isValid?this.elements.nameInput&&(this.elements.nameInput.style.borderColor=""):((t=DomUtils.h.createDiv()).className="repo-name-validation-message",t.style.cssText=`
                color: #dc3545;
                font-size: 12px;
                margin-top: 5px;
            `,t.textContent=e.message,(e=this.elements.container.querySelector(".import-data-form-hint"))&&e.parentNode.insertBefore(t,e.nextSibling),this.elements.nameInput&&(this.elements.nameInput.style.borderColor="#dc3545")))}_generateRandomSuffix(){var t="0123456789abcdefghijklmnopqrstuvwxyz";let i="";for(let e=0;e<8;e++)i+=t.charAt(Math.floor(Math.random()*t.length));return i}}module.exports=RepositoryConfigView;
