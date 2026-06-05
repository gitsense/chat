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

let{DomUtils,SVGUtils,DateUtils}=require("@gitsense/gsc-utils"),h=DomUtils.h,INTENT_WORKFLOW=require("../../constants").INTENT_WORKFLOW,ConfirmationBox=require("../../../ui/confirmation-box").ConfirmationBox;class IntentNewTurnSection{constructor(e,t={}){if(this.parentElement=e,this.options=t,this.h=h,!t.currentTurnType)throw new Error("[IntentNewTurnSection] currentTurnType is required");if(!t.originalIntent)throw new Error("[IntentNewTurnSection] originalIntent is required");if(!t.onStartTurn||"function"!=typeof t.onStartTurn)throw new Error("[IntentNewTurnSection] onStartTurn callback is required");if(!t.message||!t.message.id)throw new Error("[IntentNewTurnSection] message with id is required for auto-save");if(!t.contractManager)throw new Error("[IntentNewTurnSection] contractManager is required for validation");this.currentTurnType=t.currentTurnType,this.originalIntent=t.originalIntent;e=INTENT_WORKFLOW.TURN_PREFERENCES[this.currentTurnType];this.selectedTurnType=e?e.select:"discovery",this.selectedModel=t.defaultModel||"claude code - haiku",this.message=t.message,this.contractManager=t.contractManager,this.availableModels=t.availableModels||[{value:"claude code - haiku",label:"Haiku"},{value:"claude code - sonnet",label:"Sonnet"},{value:"claude code - opus",label:"Opus"}],this.intentTextarea=null,this.modelSelect=null,this.startButton=null,this.tipMessage=null,this.radioOptions={},this.lastSavedTimeElement=null,this.intentBlurbElement=null,this.lastSavedValue="",this.autoSaveTimer=null,this.autoSaveDelay=500,this.lightBulb=SVGUtils.lightBulb({style:{marginRight:"5px"}}).outerHTML,this.confirmationBox=new ConfirmationBox,this._injectStyles()}render(){this.parentElement.innerHTML="",this._renderTurnTypeSelection(),this._renderTipMessage(),this._renderIntentInput(),this._renderModelSelectorRow(),this._updateUIState(),this._loadDraft(),this._updateButtonState()}_renderBlurb(){}_renderTurnTypeSelection(){var e=this.h.createDiv({cls:"gsc-intent-workflow-form-group"});this.h.createLabel({cls:"gsc-intent-workflow-form-label",text:"Select Turn Type"});let o=this.h.createDiv({cls:"gsc-intent-workflow-radio-group"});(INTENT_WORKFLOW.TURN_PREFERENCES[this.currentTurnType]||{turns:["discovery","change"],select:"discovery"}).turns.map(e=>{var t;return"string"==typeof e?{value:e,label:(t={discovery:{label:"Discovery Turn",description:"Search for files related to your intent."},change:{label:"Change Turn",description:"Apply code changes to validated files."}})[e].label,description:t[e].description,comingSoon:!1}:{value:e.type,label:e.label,description:e.description,comingSoon:e.comingSoon||!1}}).forEach(e=>{var t=this.h.createDiv({cls:"gsc-intent-workflow-radio-option",dataset:{turnType:e.value,comingSoon:e.comingSoon},onclick:()=>{e.comingSoon||this._handleTurnTypeChange(e.value)}}),n=this.h.createDiv({cls:"gsc-intent-workflow-radio-header",append:[this.h.createDiv({cls:"gsc-intent-workflow-radio-label",html:`<strong>${e.label}</strong>`}),this.h.createInput({type:"radio",name:"turnType",value:e.value,checked:e.value===this.selectedTurnType,style:{display:"none"}})]}),i=(e.comingSoon&&(i=this.h.createSpan({cls:"gsc-intent-workflow-coming-soon-badge",text:"Coming Soon"}),n.appendChild(i)),this.h.createDiv({cls:"gsc-intent-workflow-radio-label",html:`<span>${e.description}</span>`}));t.appendChild(n),t.appendChild(i),o.appendChild(t),this.radioOptions[e.value]=t}),e.appendChild(o),this.parentElement.appendChild(e)}_renderTipMessage(){}_renderIntentInput(){var e=this.h.createDiv({cls:"gsc-intent-workflow-form-group"}),t=this.h.createDiv({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}),n=this.h.createLabel({cls:"gsc-intent-workflow-form-label",text:"discovery"===this.selectedTurnType?"Intent":"Instructions",style:{marginBottom:0}}),n=(this.lastSavedTimeElement=this.h.createSpan({cls:"gsc-intent-workflow-last-saved-time",text:"",style:{fontSize:"12px",color:"#586069",fontStyle:"italic"}}),t.appendChild(n),t.appendChild(this.lastSavedTimeElement),e.appendChild(t),this._renderIntentBlurb()),t=(this.intentBlurbElement=n,e.appendChild(n),this.h.createDiv({cls:"gsc-intent-workflow-textarea-container"}));this.intentTextarea=this.h.createTextarea({placeholder:"discovery"===this.selectedTurnType?"Add specific details, alternative keywords, or narrow the scope to find more relevant files.":"Specify the change you want to apply. Be concise - the AI already has context from the discovery turn.",value:""}),this.intentTextarea.addEventListener("input",()=>{this._scheduleAutoSave(),this._updateButtonState()}),t.appendChild(this.intentTextarea),e.appendChild(t),this.parentElement.appendChild(e)}_renderIntentBlurb(){var e=this.h.createDiv({cls:"gsc-intent-workflow-intent-blurb",style:{marginBottom:"12px"}});let t="";return"discovery"===this.selectedTurnType?t="Refine your search intent by adding specific details, alternative keywords, or narrowing the scope to find more relevant files.":"change"===this.selectedTurnType&&(t="Your previous discovery intent and results are available to the AI. You can provide a concise change instruction based on what was discovered. For example, if discovery found the file to modify, you can simply specify the change you want."),e.appendChild(this.h.createP({text:t,style:{margin:0,fontSize:"13px",color:"#586069",lineHeight:"1.5"}})),e}_renderModelSelectorRow(){var e=this.h.createDiv({cls:"gsc-intent-workflow-form-group"}),t=this.h.createDiv({cls:"gsc-intent-workflow-model-selector-row",append:[this._renderModelSelector(),this._renderStartButton()]});e.appendChild(t),this.parentElement.appendChild(e)}_renderModelSelector(){return this.h.createDiv({cls:"gsc-intent-workflow-model-selector-container",append:[this.h.createSpan({cls:"gsc-intent-workflow-model-label",text:"Model:"}),this._createModelSelect()]})}_createModelSelect(){return this.modelSelect=this.h.createSelect({onchange:e=>{this.selectedModel=e.target.value}}),this.availableModels.forEach(e=>{e=this.h.createOption({value:e.value,text:e.label,selected:e.value===this.selectedModel});this.modelSelect.appendChild(e)}),this.modelSelect}_renderStartButton(){var e=this.h.createDiv({cls:"gsc-intent-workflow-start-button-container"});return this.startButton=this.h.createButton({cls:"btn btn-primary",text:this._getButtonText(),onclick:()=>this._handleStartTurn()}),e.appendChild(this.startButton),e}_handleTurnTypeChange(e){this._saveDraft(),this.selectedTurnType=e,this._updateUIState(),this._loadDraft(),this._updateButtonState()}_handleStartTurn(){var e=this.intentTextarea.value.trim(),t=this.selectedModel;if(e){try{this._validateContract()}catch(e){return void this.confirmationBox.show({title:"Validation Error",message:e.message,confirmButtonText:"OK",showCancelButton:!1},null,null)}this._deleteDraft(),this.options.onStartTurn&&this.options.onStartTurn(this.selectedTurnType,e,t)}else this.confirmationBox.show({title:"Validation Error",message:"Please provide an intent or additional instructions.",confirmButtonText:"OK",showCancelButton:!1},null,null)}_updateUIState(){var e,t;Object.keys(this.radioOptions).forEach(e=>{var t=this.radioOptions[e],n=t.querySelector('input[type="radio"]');e===this.selectedTurnType?(t.classList.add("selected"),n.checked=!0):(t.classList.remove("selected"),n.checked=!1)}),this.tipMessage&&("change"===this.selectedTurnType?(this.tipMessage.style.display="block",this.tipMessage.innerHTML=this.lightBulb+"Select specific files in the table above to focus your change scope. If no files are selected, all validated files will be changed."):this.tipMessage.style.display="none"),this.startButton&&(this.startButton.textContent=this._getButtonText()),this._updateDisabledStates(),this.intentTextarea&&(this.intentTextarea.placeholder="discovery"===this.selectedTurnType?"Add specific details, alternative keywords, or narrow the scope to find more relevant files.":"Specify the change you want to apply. Be concise - the AI already has context from the discovery turn."),this.intentBlurbElement&&(e="discovery"===this.selectedTurnType?"Refine your search intent by adding specific details, alternative keywords, or narrowing the scope to find more relevant files.":"Your previous discovery intent and results are available to the AI. You can provide a concise change instruction based on what was discovered. For example, if discovery found the file to modify, you can simply specify the change you want.",t=this.intentBlurbElement.querySelector("p"))&&(t.textContent=e)}_updateDisabledStates(){let o=(INTENT_WORKFLOW.TURN_PREFERENCES[this.currentTurnType]||{turns:["discovery","change"],select:"discovery"}).turns.map(e=>"string"==typeof e?{value:e,comingSoon:!1}:{value:e.type,comingSoon:e.comingSoon||!1});Object.keys(this.radioOptions).forEach(t=>{var e=this.radioOptions[t],n=e.querySelector('input[type="radio"]'),i=o.find(e=>e.value===t);!!i&&i.comingSoon?(e.classList.add("disabled"),e.classList.remove("selected"),n.disabled=!0,n.checked=!1,this.selectedTurnType===t&&(i=o.find(e=>!e.comingSoon))&&(this.selectedTurnType=i.value,(i=this.radioOptions[i.value])&&(i.classList.add("selected"),i=i.querySelector('input[type="radio"]'))&&(i.checked=!0),this._updateTurnTypeDependentUI())):(e.classList.remove("disabled"),n.disabled=!1)})}_updateTurnTypeDependentUI(){var e,t;this.startButton&&(this.startButton.textContent=this._getButtonText()),this.intentTextarea&&(this.intentTextarea.placeholder="discovery"===this.selectedTurnType?"Add specific details, alternative keywords, or narrow the scope to find more relevant files.":"Specify the change you want to apply. Be concise - the AI already has context from the discovery turn."),this.intentBlurbElement&&(e="discovery"===this.selectedTurnType?"Refine your search intent by adding specific details, alternative keywords, or narrowing the scope to find more relevant files.":"Your previous discovery intent and results are available to the AI. You can provide a concise change instruction based on what was discovered. For example, if discovery found the file to modify, you can simply specify the change you want.",t=this.intentBlurbElement.querySelector("p"))&&(t.textContent=e)}_updateButtonState(){this.startButton&&this.intentTextarea&&(0<this.intentTextarea.value.trim().length?(this.startButton.classList.remove("disabled"),this.startButton.disabled=!1):(this.startButton.classList.add("disabled"),this.startButton.disabled=!0))}_getButtonText(){return{discovery:"Start Discovery Turn",change:"Start Change Turn"}[this.selectedTurnType]||"Start Turn"}_scheduleAutoSave(){this.autoSaveTimer&&clearTimeout(this.autoSaveTimer),this.autoSaveTimer=setTimeout(()=>{this._saveDraft()},this.autoSaveDelay)}_saveDraft(){var e,t=this.intentTextarea.value.trim();t!==this.lastSavedValue&&(e=`intent-draft-${this.message.id}-`+this.selectedTurnType,localStorage.setItem(e,t),this.lastSavedValue=t,this._updateLastSavedTime())}_loadDraft(){var e=`intent-draft-${this.message.id}-`+this.selectedTurnType,e=localStorage.getItem(e);e?(this.intentTextarea.value=e,this.lastSavedValue=e,this._updateLastSavedTime()):(this.intentTextarea.value="",this.lastSavedValue="",this.lastSavedTimeElement.textContent="")}_deleteDraft(){var e=`intent-draft-${this.message.id}-`+this.selectedTurnType;localStorage.removeItem(e),this.lastSavedValue="",this.lastSavedTimeElement.textContent=""}_updateLastSavedTime(){var e;this.lastSavedValue?(e=(new Date).toISOString(),e=DateUtils.formatAge(e),this.lastSavedTimeElement.textContent="Saved "+e):this.lastSavedTimeElement.textContent=""}_validateContract(){if(!this.contractManager.isActive())throw new Error("Contract validation failed. No active contract found.");if(!this.contractManager.isOwner())throw new Error("Contract validation failed. You are not the owner of this contract.");var e=this.contractManager.getAuthcode();if(!e)throw new Error("Contract validation failed. No authorization code found.");if("xxxx"===e)throw new Error("Invalid authorization code. The code is masked for security.");return!0}_injectStyles(){h.injectStyles(`
            .gsc-intent-workflow-new-turn-blurb {
                margin-bottom: 20px;
                font-size: 14px;
                color: #586069;
                line-height: 1.6;
            }

            .gsc-intent-workflow-form-group {
                margin-bottom: 20px;
            }

            .gsc-intent-workflow-form-label {
                display: block;
                font-weight: 600;
                margin-bottom: 8px;
                font-size: 14px;
                color: #24292e;
            }

            .gsc-intent-workflow-radio-group {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            .gsc-intent-workflow-radio-option {
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding: 15px;
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .gsc-intent-workflow-radio-option:hover:not(.disabled) {
                background: #f6f8fa;
                border-color: #d1d5da;
            }

            .gsc-intent-workflow-radio-option.selected {
                background: #f0f7ff;
                border-color: #0366d6;
            }

            .gsc-intent-workflow-radio-option.disabled {
                opacity: 0.7;
                cursor: not-allowed;
                background: #f6f8fa;
            }

            .gsc-intent-workflow-radio-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
            }

            .gsc-intent-workflow-radio-option input[type="radio"] {
                margin: 0;
                flex-shrink: 0;
            }

            .gsc-intent-workflow-radio-label {
                flex: 1;
            }

            .gsc-intent-workflow-radio-label strong {
                display: block;
                margin-bottom: 4px;
                color: #24292e;
                font-size: 14px;
            }

            .gsc-intent-workflow-radio-label span {
                font-size: 13px;
                color: #586069;
                line-height: 1.4;
            }

            .gsc-intent-workflow-coming-soon-badge {
                display: inline-block;
                position: relative;
                top: -5px;
                padding: 2px 8px;
                background: #f6f8fa;
                border: 1px solid #d1d5da;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
                color: #000000;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .gsc-intent-workflow-textarea-container {
                width: 100%;
            }

            .gsc-intent-workflow-textarea-container textarea {
                width: 100%;
                min-height: 120px;
                padding: 12px;
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                resize: vertical;
                box-sizing: border-box;
                transition: border-color 0.2s ease;
            }

            .gsc-intent-workflow-textarea-container textarea:focus {
                outline: none;
                border-color: #0366d6;
                box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
            }

            .gsc-intent-workflow-intent-blurb {
                margin-bottom: 12px;
            }

            .gsc-intent-workflow-intent-blurb p {
                margin: 0;
                font-size: 13px;
                color: #586069;
                line-height: 1.5;
            }

            .gsc-intent-workflow-model-selector-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                gap: 15px;
            }

            .gsc-intent-workflow-model-selector-container {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .gsc-intent-workflow-model-label {
                font-weight: 600;
                font-size: 14px;
                color: #24292e;
            }

            .gsc-intent-workflow-model-selector-container select {
                width: auto;
                min-width: 150px;
                padding: 5px 8px;
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                font-size: 14px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background: white;
                cursor: pointer;
                transition: border-color 0.2s ease;
            }

            .gsc-intent-workflow-model-selector-container select:focus {
                outline: none;
                border-color: #0366d6;
                box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
            }

            .gsc-intent-workflow-start-button-container {
                flex-shrink: 0;
            }

            .gsc-intent-workflow-start-button {
                padding: 9px 20px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                white-space: nowrap;
            }

            .gsc-intent-workflow-start-button:hover {
                background: #0256c7;
            }

            .gsc-intent-workflow-start-button:disabled {
                background: #6a737d;
                cursor: not-allowed;
            }

            .gsc-intent-workflow-tip-message {
                margin-bottom: 20px;
                padding: 10px 12px;
                background: white;
                border-left: 3px solid #ccc;
                font-size: 13px;
                color: #5d4037;
                line-height: 1.5;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .gsc-intent-workflow-radio-group {
                    grid-template-columns: 1fr;
                }

                .gsc-intent-workflow-model-selector-row {
                    flex-direction: column;
                    align-items: stretch;
                }

                .gsc-intent-workflow-model-selector-container {
                    width: 100%;
                }

                .gsc-intent-workflow-start-button-container {
                    width: 100%;
                }

                .gsc-intent-workflow-start-button {
                    width: 100%;
                }
            }
        `,"gsc-intent-workflow-new-turn-section-styles")}cleanup(){this.autoSaveTimer&&(clearTimeout(this.autoSaveTimer),this.autoSaveTimer=null),this.confirmationBox&&this.confirmationBox.destroy()}}module.exports={IntentNewTurnSection:IntentNewTurnSection};
