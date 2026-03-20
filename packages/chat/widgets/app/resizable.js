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

function createResizableSplitView(i,s,t="gs-chat-split-view-ratio"){if(!i||!s)throw new Error("Both left and right divs must be provided");function r(e){try{localStorage.setItem(t,e.toString())}catch(e){console.warn("Failed to save split view ratio to localStorage:",e)}}var e=(()=>{try{var e=localStorage.getItem(t);return e?parseFloat(e):50}catch(e){return console.warn("Failed to load split view ratio from localStorage:",e),50}})();let l=document.createElement("div"),n=(l.style.cssText=`
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    `,i.style.width=e+"%",s.style.width=100-e+"%",document.createElement("div")),a=(n.style.cssText=`
        width: 1px;
        height: calc(100vh + 10px);
        background: #aaa;
        position: absolute;
        left: ${e}%;
        cursor: col-resize;
        user-select: none;
    `,n.addEventListener("mouseover",()=>{n.style.background="#999"}),n.addEventListener("mouseout",()=>{n.style.background="#aaa"}),!1),d,c;return n.addEventListener("mousedown",e=>{a=!0,d=e.clientX,c=i.offsetWidth;let t=document.createElement("div");function o(e){var t;a&&(e=e.clientX-d,(e=c+e)<.1*(t=l.offsetWidth)||.9*t<e||(t=100-(e=e/t*100),i.style.width=e+"%",s.style.width=t+"%",n.style.left=e+"%",r(e)))}t.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: col-resize;
            z-index: 9999;
        `,document.body.appendChild(t),document.addEventListener("mousemove",o),document.addEventListener("mouseup",function e(){a=!1,document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e),document.body.removeChild(t)})}),i.parentNode.insertBefore(l,i),l.appendChild(i),l.appendChild(n),l.appendChild(s),{resetToDefault:()=>{i.style.width="50%",s.style.width="50%",n.style.left="50%",r(50)},getCurrentRatio:()=>parseFloat(i.offsetWidth/l.offsetWidth*100),setRatio:e=>{if(e<10||90<e)throw new Error("Ratio must be between 10 and 90");i.style.width=e+"%",s.style.width=100-e+"%",n.style.left=e+"%",r(e)}}}module.exports={createResizableSplitView:createResizableSplitView};
