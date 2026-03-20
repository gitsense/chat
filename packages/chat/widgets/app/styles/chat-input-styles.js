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

let styles={icon:"gs-chat-input-icon",text:"gs-chat-input-text",resizeIcon:"gs-chat-input-resize-icon",newChatOption:"gs-chat-input-new-chat-option",splitChatOption:"gs-chat-input-split-chat-option",resizeOption:"gs-chat-input-resize-option",sendOnEnterOption:"gs-chat-input-send-on-enter-option",cancelOption:"gs-chat-input-cancel-option",header:"gs-chat-input-header",modelsBody:"gs-chat-input-models-body",errorsBody:"gs-chat-input-errors-body",optionsBody:"gs-chat-input-options-body",chatInput:"gs-chat-input-chat-input",enterButton:"gs-chat-input-enter-button",mainBody:"gs-chat-input-main-body",container:"gs-chat-input-container",message:"gs-chat-input-message",model:"gs-chat-input-model",modelLabel:"gs-chat-input-model-label",modelCheckbox:"gs-chat-input-model-checkbox",svgIcon:"gs-chat-input-svg-icon",northStarIcon:"gs-chat-input-north-star-icon",linkIcon:"gs-chat-input-link-icon",xIcon:"gs-chat-input-x-icon"},cssContent=`
    /* General styles */
    .${styles.icon} {
        vertical-align: middle;
    }
    
    .${styles.text} {
        margin-left: 6px;
        vertical-align: middle;
        font-size: 14px;
    }
    
    .${styles.resizeIcon} {
        margin-right: 5px;
        vertical-align: middle;
        font-size: 16px;
        position: relative;
        top: -2px;
        padding: 0px 2px;
        cursor: ns-resize;
    }
    
    /* Component-specific styles */
    .${styles.newChatOption} {
        display: inline-block;
        cursor: pointer;
        margin-right: 15px;
    }
    
    .${styles.splitChatOption} {
        display: inline-block;
        cursor: pointer;
        margin-right: 15px;
    }
    
    .${styles.resizeOption} {
        display: inline-block;
    }
    
    .${styles.sendOnEnterOption} {
        display: inline-block;
        cursor: pointer;
        margin-right: 15px;
    }
    
    .${styles.cancelOption} {
        display: none;
        cursor: pointer;
        margin-right: 15px;
        text-align: left;
    }
    
    .${styles.header} {
        display: none;
        border-top: 1px solid #ccc;
        margin-top: 10px;
        padding-top: 15px;
    }
    
    .${styles.modelsBody} {
        display: none;
        text-align: left;
        white-space: normal;
        border: 1px dashed #aaa;
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 5px;
        padding: 15px;
        padding-bottom: 5px;
    }
    
    .${styles.errorsBody} {
        display: none;
        text-align: center;
        margin-top: 10px;
        padding: 5px;
        background-color: #FFCDD2;
    }
    
    .${styles.optionsBody} {
        display: inline-block;
        background-color: white;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-bottom: 0px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        white-space: nowrap;
        font-size: 14px;
    }
    
    .${styles.chatInput} {
        width: 100%;
        min-height: 100px;
        padding: 20px 40px 20px 20px;
        border: none;
        border-radius: 20px;
        outline: none;
    }
    
    .${styles.enterButton} {
        position: absolute;
        border: 1px solid #666;
        border-radius: 50%;
        background-color: white;
        padding: 5px;
        cursor: pointer;
        top: 56px;
        right: 10px;
    }
    
    .${styles.mainBody} {
        border: 1px solid #666;
        border-radius: 20px;
    }
    
    .${styles.container} {
        /* Container styles */
    }
    
    .${styles.message} {
        padding: 5px 10px;
        background-color: white;
    }

    .${styles.model} {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        width: 23%;
        overflow: hidden'
    }
    
    .${styles.modelCheckbox} {
        margin-right: 5px;
        vertical-align: middle;
    }

    .${styles.modelLabel} {
        vertical-align: middle;
        cursor: pointer
    }
    
    /* SVG-specific styles */
    .${styles.svgIcon} {
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 1.5;
        vertical-align: middle;
    }
    
    .${styles.northStarIcon} {
        fill: #f1c40f;
        stroke: #f39c12;
    }
    
    .${styles.linkIcon} {
        fill: #3498db;
        stroke: #2980b9;
    }
    
    .${styles.xIcon} {
        fill: #e74c3c;
        stroke: #c0392b;
    }
`;function initializeStylesheet(){if(document.getElementById("gs-chat-input-styles"))return!1;try{var t=document.createElement("style");return t.id="gs-chat-input-styles",t.textContent=cssContent,document.head.appendChild(t),!0}catch(t){return console.error("Failed to initialize chat input styles:",t),!1}}module.exports={styles:styles,cssContent:cssContent,initializeStylesheet:initializeStylesheet};
