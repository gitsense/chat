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

let{SVGUtils,DomUtils}=require("@gitsense/gsc-utils"),{CSS_CLASSES,VARIANTS,SIZES}=require("./constants"),styles=require("./button.styles").styles;class Button{constructor(t,e={}){this.parentElement=t,this.config={variant:VARIANTS.PRIMARY,size:SIZES.MEDIUM,disabled:!1,...e},this.elements={},this.isDestroyed=!1,DomUtils.h.injectStyles(styles,"gsc-ui-button-styles")}_createIcon(t,e){var s=document.createElement("span");return s.className=e,"string"==typeof t?SVGUtils[t]?s.appendChild(SVGUtils[t]({})):s.innerHTML=t:t instanceof HTMLElement&&s.appendChild(t),s}render(){var t,e;this.isDestroyed||((t=document.createElement("button")).className=`${CSS_CLASSES.BUTTON} ${this.config.variant} ${this.config.size} `+(this.config.className||""),this.config.disabled&&(t.classList.add(CSS_CLASSES.DISABLED),t.disabled=!0),this.config.style&&Object.assign(t.style,this.config.style),this.config.leftIcon&&(e=this._createIcon(this.config.leftIcon,CSS_CLASSES.ICON_LEFT),t.appendChild(e)),this.config.text&&t.appendChild(document.createTextNode(this.config.text)),this.config.rightIcon&&(e=this._createIcon(this.config.rightIcon,CSS_CLASSES.ICON_RIGHT),t.appendChild(e)),this.config.onClick&&t.addEventListener("click",this.config.onClick),this.elements.button=t,this.parentElement.appendChild(t))}setDisabled(t){this.elements.button&&(this.config.disabled=t,this.elements.button.disabled=t,this.elements.button.classList.toggle(CSS_CLASSES.DISABLED,t))}setLoading(t){this.elements.button&&this.elements.button.classList.toggle(CSS_CLASSES.LOADING,t)}setText(t){var e;this.elements.button&&(this.elements.button.innerHTML="",this.config.text=t,this.config.leftIcon&&(e=this._createIcon(this.config.leftIcon,CSS_CLASSES.ICON_LEFT),this.elements.button.appendChild(e)),t&&this.elements.button.appendChild(document.createTextNode(t)),this.config.rightIcon)&&(e=this._createIcon(this.config.rightIcon,CSS_CLASSES.ICON_RIGHT),this.elements.button.appendChild(e))}destroy(){this.elements.button&&this.elements.button.parentNode===this.parentElement&&(this.config.onClick&&this.elements.button.removeEventListener("click",this.config.onClick),this.parentElement.removeChild(this.elements.button)),this.elements={},this.isDestroyed=!0}}module.exports={Button:Button};
