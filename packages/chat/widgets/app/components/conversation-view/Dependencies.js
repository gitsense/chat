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

let MarkDownIt=require("markdown-it"),hljs=require("highlight.js"),h=require("../../../../../../devboard/utils/html.js"),svg=require("../../../../../../devboard/utils/svg.js"),d=require("../../../../../../devboard/utils/date.js"),s=require("../../../../../../devboard/utils/string.js"),n=require("../../../../../../devboard/utils/number.js"),formatSelectedItemsInfo=require("../tree-table/utils/formatterUtils").formatSelectedItemsInfo,arrayToTree=require("../tree-table/utils/treeUtils").arrayToTree,DropDownMenu=require("../../../../../../devboard/components/drop-down-menu"),ConfirmationBox=require("../ui/confirmation-box").ConfirmationBox,ChatInput=require("../chat-input/ChatInput"),chatApi=require("../../chat"),{deleteChatMessage,get:getChat,getUniqueModels,newChat,newChatMessage,resetChatMessage,set:setChat,updateChatAnalyzer,updateChats,updateChatAnalysisMessages,updateChatMessage}=chatApi,promptTemplates=require("../../prompt-templates.js"),{COMPARE,EVALUATE,EVALUATE_MODEL,VALIDATE}=promptTemplates,QuickChatButtons=require("../chat-builder/QuickChatButtons"),parseSlashSearchCommand=require("../search/frontend/utils/slashCommandParser").parseSlashCommand;function createMarkdownRenderer(a=hljs){return new MarkDownIt({html:!1,highlight:function(e,t){if(t&&a.getLanguage(t))try{return"<pre class='hljs' style='background-color:#fafafa;border:1px solid #ddd;margin-top:5px;overflow:auto;max-height:500px;'><code>"+`<span class='gs-chat-lang'>${t}</span>

`+a.highlight(e,{language:t,ignoreIllegals:!0}).value+"</code></pre>"}catch(e){}return"<pre class='hljs' style='margin-top:5px;overflow:auto;max-height:800px;'><code>"+MarkDownIt.utils.escapeHtml(e)+"</code></pre>"}})}module.exports={MarkDownIt:MarkDownIt,hljs:hljs,h:h,svg:svg,d:d,s:s,n:n,formatSelectedItemsInfo:formatSelectedItemsInfo,DropDownMenu:DropDownMenu,ConfirmationBox:ConfirmationBox,ChatInput:ChatInput,QuickChatButtons:QuickChatButtons,chatApi:chatApi,deleteChatMessage:deleteChatMessage,getChat:getChat,getUniqueModels:getUniqueModels,newChat:newChat,resetChatMessage:resetChatMessage,newChatMessage:newChatMessage,setChat:setChat,updateChatAnalyzer:updateChatAnalyzer,updateChatAnalysisMessages:updateChatAnalysisMessages,updateChatMessage:updateChatMessage,updateChats:updateChats,promptTemplates:promptTemplates,COMPARE:COMPARE,EVALUATE:EVALUATE,EVALUATE_MODEL:EVALUATE_MODEL,VALIDATE:VALIDATE,createMarkdownRenderer:createMarkdownRenderer,parseSlashSearchCommand:parseSlashSearchCommand,arrayToTree:arrayToTree};
