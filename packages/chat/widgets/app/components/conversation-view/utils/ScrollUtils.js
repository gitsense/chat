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

let{ScrollIntentManager,ScrollIntentState}=require("./ScrollIntentManager");function scrollToBottom(e,t,o=0,n="smooth",l=!1){var r=e||window;if(e&&!(e instanceof HTMLElement)&&e!==window)return console.error("scrollToBottom: scrollableElement must be an HTMLElement or Window"),!1;if(t&&!(t instanceof HTMLElement))return console.error("scrollToBottom: contentElement must be an HTMLElement"),!1;"number"!=typeof o&&(console.warn("scrollToBottom: offset should be a number, using 0"),o=0),"smooth"!==n&&"auto"!==n&&(console.warn("scrollToBottom: behavior should be 'smooth' or 'auto', using 'smooth'"),n="smooth");var s=r._scrollIntentManager;if(s&&!l&&!s.shouldAutoScroll())return!1;let i;if(e instanceof HTMLElement){if(!t)return console.error("scrollToBottom: contentElement is required when scrollableElement is an HTMLElement"),!1;i=t.scrollHeight+o}else i=(document.documentElement.scrollHeight||document.body.scrollHeight)+o;return r===window||"smooth"===n?r.scrollTo({top:i,behavior:n}):r.scrollTop=i,!0}function setupEnhancedScrollDetection(e=window,t={}){let{scrollThreshold:o=200,debounceTime:n=100,onScrollStateChange:l,onScrollUp:r,onScrollToBottom:s}=t;t=new ScrollIntentManager({scrollThreshold:o,debounceTime:n,onStateChange:(e,t)=>{l&&l(e,t),e===ScrollIntentState.USER_INTERRUPTED&&r&&r(),e===ScrollIntentState.AUTO_SCROLLING&&t===ScrollIntentState.USER_INTERRUPTED&&s&&s()}}),e=e===window?document.documentElement:e,e=(e._scrollIntentManager=t).trackElement(e);return{intentManager:t,cleanup:e}}function isElementInViewport(e,t=0){return!!e&&(e=e.getBoundingClientRect()).top>=0-t&&e.left>=0-t&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)+t&&e.right<=(window.innerWidth||document.documentElement.clientWidth)+t}function scrollToElement(e,t=0,o="smooth",n=!1){if(!e)return console.warn("ScrollUtils.scrollToElement: No element provided."),!1;var l=window._scrollIntentManager;if(l){l.getState();l=l.shouldAutoScroll();if(!n&&!l)return!1}n=e.getBoundingClientRect(),l=window.pageYOffset||document.documentElement.scrollTop,e=n.top+l+t;return window.scrollTo({top:e,behavior:o}),!0}function createNewMessagesIndicator(e,t){let o=document.createElement("div");function n(){o.style.transform="translateY(10px)",o.style.opacity="0",setTimeout(()=>{o.style.display="none"},200)}return o.className="gs-new-messages-indicator",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","New messages available. Click to view."),Object.assign(o.style,{position:"fixed",bottom:"20px",right:"20px",backgroundColor:"#2b7de9",color:"white",padding:"8px 16px",borderRadius:"20px",boxShadow:"0 2px 10px rgba(0,0,0,0.2)",cursor:"pointer",display:"none",zIndex:"1000",fontSize:"14px",fontWeight:"bold",transition:"transform 0.2s ease, opacity 0.2s ease",alignItems:"center",justifyContent:"center"}),o.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
            <path d="M12 19V5M5 12l7 7 7-7"/>
        </svg>
        <span>New messages</span>
    `,o.addEventListener("click",()=>{t&&t(),n()}),o.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t&&t(),n())}),e.appendChild(o),o.style.transform="translateY(10px)",o.style.opacity="0",{element:o,show:function(){o.style.display="flex",setTimeout(()=>{o.style.transform="translateY(0)",o.style.opacity="1"},10)},hide:n}}function trackScrollPosition(e){if(!e)return()=>!1;let o=e===document.documentElement?document:e,n=o.scrollTop,l=o.scrollHeight;return()=>{var e=o.scrollTop,t=o.scrollHeight-l;return{heightChanged:0<t,scrollChanged:5<Math.abs(e-n),heightDifference:t}}}module.exports={scrollToBottom:scrollToBottom,setupEnhancedScrollDetection:setupEnhancedScrollDetection,isElementInViewport:isElementInViewport,scrollToElement:scrollToElement,createNewMessagesIndicator:createNewMessagesIndicator,trackScrollPosition:trackScrollPosition};
