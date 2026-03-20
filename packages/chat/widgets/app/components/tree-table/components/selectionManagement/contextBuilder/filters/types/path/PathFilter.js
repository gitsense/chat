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

class PathFilter{constructor({container:e,onFilterChange:t}){this.container=e,this.onFilterChange=t,this.uiElements={},this.debounceTimer=null,this.debounceDelay=300,this.renderInitialStructure(),this.addEventListeners()}renderInitialStructure(){this.container.innerHTML=`
            <div class="path-filter-content">
                <h4>Path Filter</h4>
                <textarea class="path-filter-textarea" placeholder="Enter path patterns (case insensitive, one per line). Wildcards (*) are implicit. Use quotes for exact matches." rows="3"></textarea>
            </div>
        `,this.uiElements.textarea=this.container.querySelector(".path-filter-textarea")}addEventListeners(){this.uiElements.textarea&&this.uiElements.textarea.addEventListener("input",this.handleInput.bind(this))}handleInput(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.onFilterChange(this.getState())},this.debounceDelay)}render(e,t){this.applyState(t)}update(e,t){this.applyState(t)}getState(){return{patterns:this.uiElements.textarea?this.uiElements.textarea.value.split("\n").map(e=>e.trim()).filter(e=>""!==e):[]}}applyState(e){this.uiElements.textarea&&e&&e.patterns?this.uiElements.textarea.value=e.patterns.join("\n"):this.uiElements.textarea&&(this.uiElements.textarea.value="")}reset(){this.uiElements.textarea&&(this.uiElements.textarea.value="",this.uiElements.textarea.dispatchEvent(new Event("input")))}setDisabled(e){this.uiElements.textarea&&(this.uiElements.textarea.disabled=e)}}module.exports={PathFilter:PathFilter};
