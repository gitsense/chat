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

let breadcrumbStyles=require("./breadcrumb.styles"),GSC_BREADCRUMB_CONSTANTS=require("./constants").GSC_BREADCRUMB_CONSTANTS,stylesInjected=!1;class Breadcrumb{constructor(e,t={}){if(!e)throw new Error("Breadcrumb component requires a parent DOM element.");if(!Array.isArray(t.items)||0===t.items.length)throw new Error("Breadcrumb component requires a non-empty array of item definitions.");this.parentElement=e,this.config={separator:GSC_BREADCRUMB_CONSTANTS.DEFAULT_SEPARATOR,...t},this.elements={container:null,list:null}}render(){this._injectStyles(),this._renderStructure()}_injectStyles(){var e;stylesInjected||((e=document.createElement("style")).textContent=breadcrumbStyles,document.head.appendChild(e),stylesInjected=!0)}_renderStructure(){this.elements.container=document.createElement("nav"),this.elements.container.classList.add(GSC_BREADCRUMB_CONSTANTS.BREADCRUMB_CONTAINER_CLASS),this.elements.container.setAttribute("aria-label","Breadcrumb"),this.config.style&&Object.assign(this.elements.container.style,this.config.style),this.config.className&&this.config.className.split(" ").forEach(e=>{e&&this.elements.container.classList.add(e)}),this.elements.list=document.createElement("ol"),this.elements.list.classList.add(GSC_BREADCRUMB_CONSTANTS.BREADCRUMB_LIST_CLASS),this.config.items.forEach((e,t)=>{var n,s=document.createElement("li");s.classList.add(GSC_BREADCRUMB_CONSTANTS.BREADCRUMB_ITEM_CLASS),"string"==typeof e.label?((n=document.createElement("span")).textContent=e.label,e.active&&(n.style.fontWeight="bold",s.classList.add(GSC_BREADCRUMB_CONSTANTS.BREADCRUMB_ITEM_ACTIVE_CLASS)),s.appendChild(n)):e.label instanceof HTMLElement?(s.innerHTML="",s.appendChild(e.label),e.active&&s.classList.add(GSC_BREADCRUMB_CONSTANTS.BREADCRUMB_ITEM_ACTIVE_CLASS)):(console.error(`Breadcrumb item with id '${e.id}' has an invalid label type. Expected string or HTMLElement.`),s.textContent="Invalid Item"),this.elements.list.appendChild(s),t<this.config.items.length-1&&((n=document.createElement("li")).classList.add(GSC_BREADCRUMB_CONSTANTS.BREADCRUMB_SEPARATOR_CLASS),"string"==typeof this.config.separator?n.textContent=this.config.separator:this.config.separator instanceof HTMLElement?n.appendChild(this.config.separator):(console.warn("Invalid separator type provided, using default."),n.textContent=GSC_BREADCRUMB_CONSTANTS.DEFAULT_SEPARATOR),this.elements.list.appendChild(n))}),this.elements.container.appendChild(this.elements.list),this.parentElement.appendChild(this.elements.container)}cleanup(){this.elements.container&&this.elements.container.parentNode&&this.elements.container.parentNode.removeChild(this.elements.container),this.elements={}}}module.exports={Breadcrumb:Breadcrumb};
