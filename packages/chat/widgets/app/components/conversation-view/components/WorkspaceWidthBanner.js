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

class WorkspaceWidthBanner{constructor(e={}){this.mainBodyId=e.mainBodyId||"main-body",this.widthThreshold=e.widthThreshold||900,this.localStorageKey=e.localStorageKey||"gsc-width-banner-dismissed",this.bannerText=e.bannerText||null,this.onDismiss=e.onDismiss||null,this.onShow=e.onShow||null,this.bannerElement=null,this.dismissLinkElement=null}checkAndShow(){var e;this.isDismissed()||null!==(e=this.getCurrentWidth())&&e<this.widthThreshold&&this.show()}show(){this.remove();var e=document.getElementById(this.mainBodyId);e?(this.bannerElement=this._createBannerElement(),e.insertBefore(this.bannerElement,e.firstChild),this.onShow&&"function"==typeof this.onShow&&this.onShow()):console.warn(`WorkspaceWidthBanner: Element with id '${this.mainBodyId}' not found`)}dismiss(){try{localStorage.setItem(this.localStorageKey,"true")}catch(e){console.warn("WorkspaceWidthBanner: Unable to save to localStorage",e)}this.remove(),this.onDismiss&&"function"==typeof this.onDismiss&&this.onDismiss()}remove(){this.bannerElement&&this.bannerElement.parentNode&&this.bannerElement.parentNode.removeChild(this.bannerElement),this.bannerElement=null,this.dismissLinkElement=null}isVisible(){return null!==this.bannerElement&&document.body.contains(this.bannerElement)}resetDismissal(){try{localStorage.removeItem(this.localStorageKey)}catch(e){console.warn("WorkspaceWidthBanner: Unable to access localStorage",e)}}getCurrentWidth(){var e=document.getElementById(this.mainBodyId);return e?(e=window.getComputedStyle(e),parseFloat(e.width)):null}isDismissed(){try{return"true"===localStorage.getItem(this.localStorageKey)}catch(e){return console.warn("WorkspaceWidthBanner: Unable to access localStorage",e),!1}}_createBannerElement(){var e=document.createElement("div"),t=(Object.assign(e.style,{backgroundColor:"#fff3cd",border:"1px solid #ffecb5",color:"#856404",padding:"16px",borderRadius:"4px",marginTop:"30px",marginBottom:"20px",position:"relative",fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:"14px",lineHeight:"1.5",width:"calc(100% - 40px)",display:"inline-block"}),this.dismissLinkElement=document.createElement("a"),this.dismissLinkElement.href="#",this.dismissLinkElement.textContent="Dismiss",this.dismissLinkElement.style.cssText=`
           top: '12px';
           right: '16px';
           color: #856404;
           text-decoration: underline;
           cursor: pointer;
           font-size: 13px;
           font-weight: 500;
           float: right;
        `,this.dismissLinkElement.addEventListener("click",e=>{e.preventDefault(),this.dismiss()}),document.createElement("div")),t=(t.style.textAlign="left",this.bannerText?t.innerHTML=this.bannerText:t.innerHTML=this._getDefaultBannerContent(),e.appendChild(this.dismissLinkElement),e.appendChild(t),document.createElement("div"));return t.style.textAlign="center",t.appendChild(e),t}_getDefaultBannerContent(){return`
        <div style="font-weight: bold; font-size: 1.2em; margin-bottom: 8px;"> Optimize Conversation Width</div>
        <div style="margin-bottom: 8px;">
            GitSense Chat is a high-productivity power tool designed for complex interaction with AI. We strongly recommend a conversation width of 1024px if possible. This width strikes a balance between comfortable text readability and displaying complex information like source code, tables, and charts.
        </div>
        <div>
            You can adjust your conversation width by clicking the "Options" menu in the top right corner.
        </div>
        `}}module.exports=WorkspaceWidthBanner;
