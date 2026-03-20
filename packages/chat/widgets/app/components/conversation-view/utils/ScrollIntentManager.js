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

let ScrollIntentState={AUTO_SCROLLING:"AUTO_SCROLLING",USER_INTERRUPTED:"USER_INTERRUPTED"};class ScrollIntentManager{constructor(t={}){this.scrollThreshold=t.scrollThreshold||200,this.debounceTime=t.debounceTime||100,this.minScrollDistance=t.minScrollDistance||3,this.onStateChange=t.onStateChange||(()=>{}),this.state=ScrollIntentState.AUTO_SCROLLING,this.lastScrollTop=0,this.lastScrollTime=0,this.scrollVelocity=0,this.scrollTimer=null,this.observers=new Map,this.handleScroll=this.handleScroll.bind(this),this.debouncedHandleScroll=this.debouncedHandleScroll.bind(this)}trackElement(l){if(!l)return console.error("ScrollIntentManager: No element provided for tracking"),()=>{};let o=l===document.documentElement?window:l;o.addEventListener("scroll",this.debouncedHandleScroll);var t=document.createElement("div"),e=(t.className="scroll-bottom-sentinel",t.style.height="1px",t.style.width="100%",t.style.position="absolute",t.style.bottom="0",t.style.left="0",t.style.pointerEvents="none",""!==l.style.position&&"static"!==l.style.position||(l.style.position="relative"),l.appendChild(t),new IntersectionObserver(t=>{t[0].isIntersecting&&this.state===ScrollIntentState.USER_INTERRUPTED&&this.transitionToState(ScrollIntentState.AUTO_SCROLLING)},{root:l===document.documentElement?null:l,rootMargin:`0px 0px ${this.scrollThreshold}px 0px`,threshold:0}));return e.observe(t),this.observers.set(l,{observer:e,sentinel:t}),()=>{var t,e;o.removeEventListener("scroll",this.debouncedHandleScroll),this.observers.has(l)&&({observer:t,sentinel:e}=this.observers.get(l),t.disconnect(),e.parentNode&&e.parentNode.removeChild(e),this.observers.delete(l))}}debouncedHandleScroll(t){var e=(t.target.scrollingElement||t.target).scrollTop;e<this.lastScrollTop&&Math.abs(e-this.lastScrollTop)>=this.minScrollDistance&&this.state===ScrollIntentState.AUTO_SCROLLING&&this.transitionToState(ScrollIntentState.USER_INTERRUPTED),this.scrollTimer&&clearTimeout(this.scrollTimer),this.scrollTimer=setTimeout(()=>{this.handleScroll(t)},this.debounceTime),this.lastScrollTop=e}handleScroll(t){var t=t.target.scrollingElement||t.target,e=t.scrollTop,l=Date.now(),o=l-this.lastScrollTime;0<o&&(this.scrollVelocity=(e-this.lastScrollTop)/o),this.lastScrollTop,Math.abs(e-this.lastScrollTop);this.isNearBottom(t)&&this.state===ScrollIntentState.USER_INTERRUPTED&&this.transitionToState(ScrollIntentState.AUTO_SCROLLING),this.lastScrollTop=e,this.lastScrollTime=l}isNearBottom(t){return t.scrollHeight-(t.scrollTop+t.clientHeight)<=this.scrollThreshold}transitionToState(t){var e;this.state!==t&&(e=this.state,this.state=t,this.onStateChange(t,e))}getState(){return this.state}shouldAutoScroll(){return this.state===ScrollIntentState.AUTO_SCROLLING}forceAutoScrolling(){this.transitionToState(ScrollIntentState.AUTO_SCROLLING)}forceUserInterrupted(){this.transitionToState(ScrollIntentState.USER_INTERRUPTED)}}module.exports={ScrollIntentManager:ScrollIntentManager,ScrollIntentState:ScrollIntentState};
