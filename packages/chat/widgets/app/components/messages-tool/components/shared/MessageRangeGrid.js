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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class MessageRangeGrid{constructor(s,e={}){this.container=s,this.options={messages:[],columnsPerRow:30,from:2,to:null,onRangeChange:()=>{},...e},this.h=DomUtils.h,this.gridContainer=null,this.messageSquares=[],this.countContainer=null}render(){if(!this.container)throw new Error("MessageRangeGrid: No container provided");this.container.innerHTML="",this.gridContainer=this.h.createDiv({className:"gs-message-range-grid-container"});var t=this.options.messages.length,s=Math.ceil(t/this.options.columnsPerRow);for(let e=0;e<s;e++){var i=this.h.createDiv({className:"gs-message-range-grid-row"});for(let s=0;s<this.options.columnsPerRow;s++){var n=e*this.options.columnsPerRow+s;n<t?(n=this.createMessageSquare(n),i.appendChild(n),this.messageSquares.push(n)):(n=this.h.createDiv({className:"gs-message-range-square-empty"}),i.appendChild(n))}this.gridContainer.appendChild(i)}this.countContainer=this.h.createDiv({className:"gs-message-range-count-container"}),this.container.appendChild(this.gridContainer),this.container.appendChild(this.countContainer),this.updateVisualSelection()}createMessageSquare(s){var e=this.options.messages[s];let t=s+1;s="human-public"===e.visibility,s=this.h.createDiv({className:s?"gs-message-range-square gs-message-range-square-circle":"gs-message-range-square",dataset:{position:t.toString(),role:e.role||"unknown",visibility:e.visibility||"public"},title:`Message #${t} (${e.role||"unknown"}) - `+(e.visibility||"public"),onclick:()=>this.handleSquareClick(t)});return"system"===e.role&&(s.classList.add("gs-message-range-square-disabled"),s.style.cursor="not-allowed",s.onclick=null),s}handleSquareClick(t){if(1!==t){let s=this.options.from||2,e=this.options.to||this.options.messages.length;t<s||!(t>e)&&t-s<e-t?s=t:e=t,this.updateRange(s,e)}}updateRange(s,e){this.options.from=s,this.options.to=e,this.updateVisualSelection(),this.options.onRangeChange({from:s,to:e})}updateVisualSelection(){let t=this.options.from||2,i=this.options.to||this.options.messages.length;this.messageSquares.forEach(s=>{var e=parseInt(s.dataset.position);s.classList.remove("gs-message-range-square-selected"),e>=t&&e<=i&&s.classList.add("gs-message-range-square-selected")}),this.updateHumanPublicCount()}updateHumanPublicCount(){if(this.countContainer){var t=this.options.from||2,i=this.options.to||this.options.messages.length;let e=0;for(let s=t-1;s<i;s++)this.options.messages[s]&&"human-public"===this.options.messages[s].visibility&&e++;this.countContainer.innerHTML="",0<e&&(t=this.h.createDiv({className:"gs-message-range-count-text",text:`Note: This range includes ${e} message(s) with 'human-public' visibility that are not visible to the LLM.`}),this.countContainer.appendChild(t))}}setRange(s,e){this.updateRange(s,e)}getRange(){return{from:this.options.from||2,to:this.options.to||this.options.messages.length}}cleanup(){this.container&&(this.container.innerHTML=""),this.messageSquares=[],this.gridContainer=null,this.countContainer=null}}module.exports={MessageRangeGrid:MessageRangeGrid};
