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

let h=require("../../../../../../devboard/utils/html"),s=require("../../../../../../devboard/utils/string"),svg=require("../../../../../../devboard/utils/svg"),DropDownMenu=require("../../../../../../devboard/components/drop-down-menu"),ConfirmationBox=require("../ui/confirmation-box").ConfirmationBox,TooltipMenu=require("../ui/tooltip-menu").TooltipMenu,ChatsBrowser=require("../chats-browser").ChatsBrowser,ChatHistory=require("../chat-history").ChatHistory,chatApi=require("../../chat"),{deleteAnalyzer,deleteChatMessage,getAnalyzers,getAnalyzerDetail,getAnalyzeChatMenuOptions,getChatTemplateMessages,getChatTitleSuggestion,getChatMetadataByChatIds,getGitBlobChatMessagesByChatIds,getChatOverviewMessagesByChatIds,newChat,newChatTree,updateChats,resetChatMessage,updateChatMessage,updateChatName,newChatMessage,set:setChat}=chatApi;module.exports={chatApi:chatApi,h:h,s:s,svg:svg,ChatsBrowser:ChatsBrowser,DropDownMenu:DropDownMenu,TooltipMenu:TooltipMenu,ConfirmationBox:ConfirmationBox,ChatHistory:ChatHistory,deleteAnalyzer:deleteAnalyzer,getAnalyzeChatMenuOptions:getAnalyzeChatMenuOptions,getAnalyzers:getAnalyzers,getAnalyzerDetail:getAnalyzerDetail,getChatTemplateMessages:getChatTemplateMessages,getChatTitleSuggestion:getChatTitleSuggestion,getGitBlobChatMessagesByChatIds:getGitBlobChatMessagesByChatIds,getChatOverviewMessagesByChatIds:getChatOverviewMessagesByChatIds,getChatMetadataByChatIds:getChatMetadataByChatIds,newChat:newChat,newChatTree:newChatTree,resetChatMessage:resetChatMessage,newChatMessage:newChatMessage,setChat:setChat,updateChats:updateChats,updateChatName:updateChatName,updateChatMessage:updateChatMessage};
