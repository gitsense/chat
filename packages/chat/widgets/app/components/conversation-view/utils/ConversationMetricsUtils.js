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

let ConversationMetricsUtils={analyzeConversation:function(e){if(!e)throw new Error("Messages body element is required");var o=e.querySelectorAll(".gs-chat-user-message"),l=e.querySelectorAll(".gs-chat-assistant-message"),s=e.querySelectorAll("pre");let t=0,n=0;s.forEach(e=>{e=e.textContent.split("\n").length;t+=e,30<e&&n++});e=e.textContent.length;return{messageCount:o.length+l.length,userMessageCount:o.length,assistantMessageCount:l.length,codeBlockCount:s.length,totalCodeLines:t,largeCodeBlocks:n,contentSize:e,averageCodeBlockSize:s.length?t/s.length:0}},getFoldingRecommendations:function(e){var o,l,s;if(e)return o=10<e.messageCount,s=3<e.largeCodeBlocks,{shouldFoldMessages:o,shouldFoldCodeBlocks:(l=5<e.codeBlockCount)||s,foldAllMessages:o&&20<e.messageCount,foldAllCodeBlocks:l||s,foldLargeCodeBlocksOnly:!l&&s};throw new Error("Metrics object is required")},applyAutomaticFolding:function(e,o){var l,s;if(e&&o)return l=this.analyzeConversation(e),s={foldedMessages:!1,foldedCodeBlocks:!1},(l=this.getFoldingRecommendations(l)).foldAllMessages&&(o.foldAllMessages(),s.foldedMessages=!0),l.foldAllCodeBlocks?(o.foldAllCode(),s.foldedCodeBlocks=!0):l.foldLargeCodeBlocksOnly&&(e.querySelectorAll("pre").forEach(e=>{30<e.textContent.split("\n").length&&e.id&&o.messageStateManager.setState(e.id,!1)}),o.codeFoldingService&&o.codeFoldingService.refreshCodeFolding&&o.codeFoldingService.refreshCodeFolding(),s.foldedCodeBlocks=!0),s;throw new Error("Messages body and navigation service are required")}};module.exports=ConversationMetricsUtils;
