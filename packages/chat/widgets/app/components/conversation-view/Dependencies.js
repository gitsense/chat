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

let MarkDownIt=require("markdown-it"),hljs=require("highlight.js"),svg=require("../../../../../../devboard/utils/svg.js"),d=require("../../../../../../devboard/utils/date.js"),s=require("../../../../../../devboard/utils/string.js"),n=require("../../../../../../devboard/utils/number.js"),formatSelectedItemsInfo=require("../tree-table/utils/formatterUtils").formatSelectedItemsInfo,arrayToTree=require("../tree-table/utils/treeUtils").arrayToTree,DropDownMenu=require("../../../../../../devboard/components/drop-down-menu"),ConfirmationBox=require("../ui/confirmation-box").ConfirmationBox,NotificationManager=require("../ui/notification-manager").NotificationManager,PromptBox=require("../ui/prompt-box").PromptBox,Table=require("../ui/table").Table,SearchInput=require("../ui/search-input").SearchInput,Pagination=require("../ui/pagination").Pagination,{ChatInput,CLAUDE_CODE_MODES}=require("../chat-input"),ChatHistory=require("../chat-history").ChatHistory,MessageHistory=require("../message-history").MessageHistory,createContentLoader=require("../tree-table/components/selectionManagement/contextBuilder/ContentLoader").createContentLoader,chatApi=require("../../chat"),{cancelBatchJob,createAnalyzeBatchJob,deleteChatMessage,get:getChat,getAnalyzeBatchDetails,getAnalyzeChatMessagesForBatchGroup,getAnalyzers,getAnalyzerDetail,getAnalyzerSchema,getScheduledBatchProviders,getUniqueModels,newChat,newChatMessage,resetBatchGroup,resetChatMessage,saveAnalyzer,search,set:setChat,updateBatchGroupAnalyzeChatUuid,updateAnalyzer,updateChats,updateChatAnalysisMessages,updateChatMessage}=chatApi,promptTemplates=require("../../prompt-templates.js"),{COMPARE,EVALUATE,EVALUATE_MODEL,VALIDATE}=promptTemplates,QuickChatButtons=require("../chat-builder/QuickChatButtons"),parseSlashSearchCommand=require("../search/frontend/utils/slashCommandParser").parseSlashCommand,{MessagesTool,CompactMessageValidator,CompactChatMessagesDecorator}=require("../messages-tool");module.exports={MarkDownIt:MarkDownIt,hljs:hljs,svg:svg,d:d,s:s,n:n,formatSelectedItemsInfo:formatSelectedItemsInfo,DropDownMenu:DropDownMenu,ConfirmationBox:ConfirmationBox,ChatHistory:ChatHistory,ChatInput:ChatInput,MessageHistory:MessageHistory,NotificationManager:NotificationManager,QuickChatButtons:QuickChatButtons,Table:Table,SearchInput:SearchInput,Pagination:Pagination,PromptBox:PromptBox,chatApi:chatApi,cancelBatchJob:cancelBatchJob,createAnalyzeBatchJob:createAnalyzeBatchJob,deleteChatMessage:deleteChatMessage,getChat:getChat,getAnalyzeBatchDetails:getAnalyzeBatchDetails,getAnalyzeChatMessagesForBatchGroup:getAnalyzeChatMessagesForBatchGroup,getAnalyzers:getAnalyzers,getAnalyzerDetail:getAnalyzerDetail,getAnalyzerSchema:getAnalyzerSchema,getScheduledBatchProviders:getScheduledBatchProviders,getUniqueModels:getUniqueModels,newChat:newChat,resetBatchGroup:resetBatchGroup,resetChatMessage:resetChatMessage,newChatMessage:newChatMessage,saveAnalyzer:saveAnalyzer,search:search,setChat:setChat,updateBatchGroupAnalyzeChatUuid:updateBatchGroupAnalyzeChatUuid,updateAnalyzer:updateAnalyzer,updateChatAnalysisMessages:updateChatAnalysisMessages,updateChatMessage:updateChatMessage,updateChats:updateChats,promptTemplates:promptTemplates,COMPARE:COMPARE,EVALUATE:EVALUATE,EVALUATE_MODEL:EVALUATE_MODEL,VALIDATE:VALIDATE,parseSlashSearchCommand:parseSlashSearchCommand,arrayToTree:arrayToTree,MessagesTool:MessagesTool,CompactMessageValidator:CompactMessageValidator,CompactChatMessagesDecorator:CompactChatMessagesDecorator,createContentLoader:createContentLoader,CLAUDE_CODE_MODES:CLAUDE_CODE_MODES};
