/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let h=require("../../../../../../devboard/utils/html"),s=require("../../../../../../devboard/utils/string"),svg=require("../../../../../../devboard/utils/svg"),DropDownMenu=require("../../../../../../devboard/components/drop-down-menu"),ConfirmationBox=require("../ui/confirmation-box").ConfirmationBox,TooltipMenu=require("../ui/tooltip-menu").TooltipMenu,ChatsBrowser=require("../chats-browser").ChatsBrowser,ChatHistory=require("../chat-history").ChatHistory,chatApi=require("../../chat"),{deleteAnalyzer,deleteChatMessage,getAnalyzers,getAnalyzerDetail,getAnalyzeChatMenuOptions,getChatTemplateMessages,getChatTitleSuggestion,getChatMetadataByChatIds,getGitBlobChatMessagesByChatIds,getChatOverviewMessagesByChatIds,newChat,newChatTree,updateChats,resetChatMessage,updateChatMessage,updateChatName,newChatMessage,set:setChat}=chatApi;module.exports={chatApi:chatApi,h:h,s:s,svg:svg,ChatsBrowser:ChatsBrowser,DropDownMenu:DropDownMenu,TooltipMenu:TooltipMenu,ConfirmationBox:ConfirmationBox,ChatHistory:ChatHistory,deleteAnalyzer:deleteAnalyzer,getAnalyzeChatMenuOptions:getAnalyzeChatMenuOptions,getAnalyzers:getAnalyzers,getAnalyzerDetail:getAnalyzerDetail,getChatTemplateMessages:getChatTemplateMessages,getChatTitleSuggestion:getChatTitleSuggestion,getGitBlobChatMessagesByChatIds:getGitBlobChatMessagesByChatIds,getChatOverviewMessagesByChatIds:getChatOverviewMessagesByChatIds,getChatMetadataByChatIds:getChatMetadataByChatIds,newChat:newChat,newChatTree:newChatTree,resetChatMessage:resetChatMessage,newChatMessage:newChatMessage,setChat:setChat,updateChats:updateChats,updateChatName:updateChatName,updateChatMessage:updateChatMessage};
