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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let GSC_NOTIFICATION_CONSTANTS=require("./constants").GSC_NOTIFICATION_CONSTANTS;class Toast{constructor(e,t,s,i,n){this.parentContainer=e,this.type=t,this.message=s,this.duration=i,this.onDismiss=n,this.element=null,this.timer=null,this._render(),this._attachEventListeners()}_render(){this.element=document.createElement("div"),this.element.classList.add(GSC_NOTIFICATION_CONSTANTS.TOAST_CLASS,GSC_NOTIFICATION_CONSTANTS.TYPE_CLASSES[this.type]),this.element.style.opacity="0",this.element.style.transform="translateY(20px)";var e=GSC_NOTIFICATION_CONSTANTS.ICONS[this.type]||"";this.element.innerHTML=`
                    <div class="${GSC_NOTIFICATION_CONSTANTS.TOAST_ICON_CLASS}">${e}</div>
                    <div class="${GSC_NOTIFICATION_CONSTANTS.TOAST_MESSAGE_CLASS}">${this.message}</div>
                    <button class="${GSC_NOTIFICATION_CONSTANTS.TOAST_CLOSE_BTN_CLASS}">&times;</button>
                `,this.parentContainer.appendChild(this.element)}_attachEventListeners(){var e=this.element.querySelector("."+GSC_NOTIFICATION_CONSTANTS.TOAST_CLOSE_BTN_CLASS);e&&e.addEventListener("click",this.dismiss.bind(this)),this.element.addEventListener("mouseenter",this._pauseTimer.bind(this)),this.element.addEventListener("mouseleave",this._resumeTimer.bind(this))}show(){requestAnimationFrame(()=>{this.element.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",this.element.style.opacity="1",this.element.style.transform="translateY(0)"}),this._startTimer()}dismiss(){this._clearTimer(),this.element.style.transition="opacity 0.3s ease-in, transform 0.3s ease-in",this.element.style.opacity="0",this.element.style.transform="translateY(-20px)",this.element.addEventListener("transitionend",()=>{this.destroy(),this.onDismiss(this)},{once:!0})}_startTimer(){this._clearTimer(),this.timer=setTimeout(()=>this.dismiss(),this.duration)}_pauseTimer(){this.timer&&(clearTimeout(this.timer),this.timer=null)}_resumeTimer(){this.timer||this._startTimer()}setOffset(e){this.element.style.bottom=e+"px"}getHeight(){return this.element?this.element.offsetHeight:0}destroy(){this._clearTimer(),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}_clearTimer(){this.timer&&(clearTimeout(this.timer),this.timer=null)}}module.exports={Toast:Toast};
