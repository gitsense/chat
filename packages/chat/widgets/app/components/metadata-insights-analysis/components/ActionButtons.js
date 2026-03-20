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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils"),METADATA_INSIGHT_RESULT_CONSTANTS=require("../constants").METADATA_INSIGHT_RESULT_CONSTANTS,ConfirmationBox=require("../../ui/confirmation-box").ConfirmationBox;class ActionButtons{constructor(t,e={}){if(!t)throw new Error("ActionButtons: Container is required");this.container=t,this.config={mode:METADATA_INSIGHT_RESULT_CONSTANTS.VIEW_MODES.SIMPLE,callbacks:{},messageVisibility:"public",options:{showIcons:!0,showCreateContext:!0,showDownload:!0,buttonSize:"medium",...e.options},...e},this.buttonsElement=null,this.buttons={},this.confirmationBox=new ConfirmationBox,this._initialize()}_initialize(){this._render()}_render(){this.buttonsElement=DomUtils.h.createDiv({cls:METADATA_INSIGHT_RESULT_CONSTANTS.CSS_CLASSES.ACTION_BUTTONS,style:{display:"flex",gap:"10px"}}),this.config.mode===METADATA_INSIGHT_RESULT_CONSTANTS.VIEW_MODES.SIMPLE?this._createSimpleViewButtons():this._createAdvancedViewButtons(),this.container.appendChild(this.buttonsElement)}_createSimpleViewButtons(){this.buttons.createContext=this._createButton({text:"Load Analyzed Files",style:{backgroundColor:"#28a745",color:"white"}}),this.config.options.showDownload&&(this.buttons.download=this._createButton({text:"Download Results",style:{backgroundColor:"#28a745",color:"white"}})),this.buttons.updateMessage=this._createButton({text:"Save Changes",style:{backgroundColor:"#28a745",color:"white"}}),this.buttons.resetFilters=this._createButton({text:"Reset All",style:{backgroundColor:"#6c757d",color:"white"}}),this.buttons.createContext.onclick=()=>this._handleAction("onCreateContext"),this.config.options.showDownload&&this.buttons.download&&(this.buttons.download.onclick=()=>this._handleAction("onDownload")),this.buttons.updateMessage.onclick=()=>this._handleAction(METADATA_INSIGHT_RESULT_CONSTANTS.ACTIONS.UPDATE_MESSAGE),this.buttons.resetFilters.onclick=()=>this._handleAction(METADATA_INSIGHT_RESULT_CONSTANTS.ACTIONS.RESET_FILTERS)}_handleToggleVisibility(){var t="human-public"===this.config.messageVisibility;let e;e=t?`
                <div>
                    <p>This will make the message visible to the LLM again. You'll be able to chat with the LLM about this data, but it will increase token consumption.</p>
                    <p>Do you want to proceed?</p>
                </div>
            `:`
                <div>
                    <p>This will make the message invisible to the LLM. You won't be able to chat with the LLM about this data.</p>
                    <p>Do you want to proceed?</p>
                </div>
            `,this.confirmationBox.show({title:t?"Make Message Visible":"Make Message Invisible",htmlMessage:e,confirmButtonText:t?"Make Visible":"Make Invisible",cancelButtonText:"Cancel",confirmButtonLoadingText:t?"Making Visible...":"Making Invisible..."},()=>{this.config.callbacks.onToggleVisibility&&this.config.callbacks.onToggleVisibility()})}_createAdvancedViewButtons(){this.buttons.applyFilter=this._createButton({text:"Apply Filter",style:{backgroundColor:"#28a745",color:"white"},onclick:()=>this._handleAction(METADATA_INSIGHT_RESULT_CONSTANTS.ACTIONS.APPLY_FILTER)}),this.buttons.openContextBuilder=this._createButton({text:"Review & Add to Context",style:{backgroundColor:"#17a2b8",color:"white"},onclick:()=>this._handleAction(METADATA_INSIGHT_RESULT_CONSTANTS.ACTIONS.OPEN_CONTEXT_BUILDER)}),this.buttons.closeModal=this._createButton({text:"Close",style:{backgroundColor:"#6c757d",color:"white"},onclick:()=>this._handleAction(METADATA_INSIGHT_RESULT_CONSTANTS.ACTIONS.CLOSE_MODAL)})}_createButton(t){var e=DomUtils.h.createDiv({cls:"d-flex align-items-center"}),i=DomUtils.h.createButton({cls:"btn btn-outline",text:t.text||"",onclick:t.onclick||(()=>{}),style:{border:"1px solid #eee"}});return t.icon&&(t=t.icon({style:{width:"16px",height:"16px",marginRight:"6px"}}),i.appendChild(t)),e.appendChild(i),this.buttonsElement.appendChild(e),i}_handleAction(t){this.config.callbacks[t]&&this.config.callbacks[t]()}setMode(t){this.config.mode!==t&&(this.config.mode=t,this._rerender())}_rerender(){this.buttonsElement&&this.buttonsElement.parentElement&&this.buttonsElement.remove(),this.buttons={},this._render()}setButtonEnabled(t,e){this.buttons[t]&&(this.buttons[t].disabled=!e,e?(this.buttons[t].style.color="",this.buttons[t].style.pointerEvents="",this.buttons[t].classList.remove("disabled")):(this.buttons[t].style.color="#aaa",this.buttons[t].style.pointerEvents="none",this.buttons[t].classList.add("disabled")))}setButtonVisible(t,e){this.buttons[t]&&this.buttons[t].parentElement&&(this.buttons[t].parentElement.style.display=e?"flex":"none")}setMessageVisibility(t){this.config.messageVisibility=t,this.buttons.toggleVisibility&&(this.buttons.toggleVisibility.textContent=(t="human-public"===t)?"Make Visible":"Make Invisible",this.buttons.toggleVisibility.style.backgroundColor=t?"#17a2b8":"#6c757d")}getMode(){return this.config.mode}cleanup(){this.buttonsElement&&this.buttonsElement.parentElement&&this.buttonsElement.remove(),this.confirmationBox&&this.confirmationBox.destroy(),this.buttonsElement=null,this.buttons={},this.confirmationBox=null}}module.exports=ActionButtons;
