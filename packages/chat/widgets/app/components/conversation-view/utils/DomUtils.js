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

let removeLineNumbers=require("@gitsense/gsc-utils").removeLineNumbers,{h,svg}=require("../Dependencies");function updateDOM(e,t){if(e&&t){try{if(h.updateDOM)return void h.updateDOM(e,t)}catch(e){}t.innerHTML=e.innerHTML}}function createClipboardButton(e,t){e=removeLineNumbers(e);let o=document.createElement("button");return o.className="gs-chat-copy-button",o.textContent="Copy",o.style.position="absolute",o.style.top=t+"px",o.style.right="10px",o.style.padding="3px 5px",o.style.border="1px solid black",o.style.backgroundColor="white",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontSize="13px",o.style.transition="background-color 0.2s ease",o.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),updateButtonState(o,"success")}catch(e){console.error("Copy failed:",e),updateButtonState(o,"error")}}),o}function updateButtonState(e,t){let o={success:{text:"Copied!",backgroundColor:""},error:{text:"Failed to copy",backgroundColor:"#FFB6C1"},default:{text:"Copy",backgroundColor:""}};t=o[t]||o.default;e.textContent=t.text,e.style.backgroundColor=t.backgroundColor,setTimeout(()=>{e.textContent=o.default.text,e.style.backgroundColor=o.default.backgroundColor},2e3)}function addClipboards(o=document){var e;return o instanceof Element||o===document?(document.getElementById("gs-chat-pre-copy-styles")||((e=document.createElement("style")).id="gs-chat-pre-copy-styles",e.textContent=`
                .gs-chat-pre-container {
                    position: relative;
                }
                .gs-chat-copy-button {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    padding: 3px 5px;
                    background-color: #fafafa;
                    border: 1px solid transparent;
                    border-radius: 5px;
                    cursor: pointer;
                    display: none;
                    z-index: 1000;
                    font-size: 13px;
                    transition: background-color 0.2s ease;
                }
                .gs-chat-copy-button:hover {
                    border: 1px solid #aaa;
                    background-color: white;
                }
                .gs-chat-pre-container:hover .gs-chat-copy-button {
                    display: block;
                }
            `,document.head.appendChild(e)),o.querySelectorAll("pre").forEach(function(t){var o=(o=t).parentElement.classList.contains("gs-chat-pre-container")?o.parentElement:((r=document.createElement("div")).className="gs-chat-pre-container",o.parentNode.insertBefore(r,o),r.appendChild(o),r);if(!o.querySelector(".gs-chat-copy-button")){var r=t.childNodes[0]?.firstChild;let e=t.textContent||t.innerText;t=(e=r&&"gs-chat-lang"===r.className?e.split("\n").splice(2).join("\n").replace(/\n+$/,""):e).includes("UUID"),t=createClipboardButton(e,t?30:10);o.appendChild(t)}}),{destroy(){var e=o.querySelectorAll(".gs-chat-copy-button"),t=o.querySelectorAll(".gs-chat-pre-container");e.forEach(e=>e.remove()),t.forEach(e=>{var t=e.querySelector("pre");t&&(e.parentNode.insertBefore(t,e),e.remove())})}}):(console.error("Invalid container element provided"),{destroy:()=>{}})}function createModelIcon(e){let t;return t=e.match(/Notes/)?svg.note({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/deepseek/)?svg.deepSeek({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/gemini/)?svg.gemini({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/gpt/)?svg.openAI({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/llama/)?svg.meta({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/claude/)?svg.claude({style:{position:"relative",height:"18px",width:"18px"}}):svg.aiModel({style:{position:"relative",left:"1px",height:"18px",width:"18px"}})}module.exports={updateDOM:updateDOM,createClipboardButton:createClipboardButton,updateButtonState:updateButtonState,addClipboards:addClipboards,createModelIcon:createModelIcon,h:h,svg:svg};
