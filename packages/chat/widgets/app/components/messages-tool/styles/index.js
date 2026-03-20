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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,messagesToolStyles=require("./messages-tool.js"),quickFiltersStyles=require("./quick-filters.js"),previewPanelStyles=require("./components/preview-panel.js"),compactMessageModalStyles=require("./components/compact-message-modal.js"),exportModalStyles=require("./components/export-modal.js"),conversationAssistantModalStyles=require("./components/conversation-assistant-modal.js"),rangeFilterStyles=require("./components/range-filter.js"),messageRangeGridStyles=require("./components/message-range-grid.js"),deleteMessageModalStyles=require("./components/delete-message-modal.js"),replaceMessageModalStyles=require("./components/replace-message-modal.js"),newChatModalStyles=require("./components/new-chat-modal.js"),chatFormRowStyles=require("./components/chat-form-row.js"),chatActionsFooterStyles=require("./components/chat-actions-footer.js"),importModalStyles=require("./components/import-modal.js"),stylesInjected=!1;function injectStyles(){var e;stylesInjected||(e=messagesToolStyles+quickFiltersStyles+previewPanelStyles+compactMessageModalStyles+exportModalStyles+conversationAssistantModalStyles+rangeFilterStyles+messageRangeGridStyles+deleteMessageModalStyles+replaceMessageModalStyles+newChatModalStyles+chatFormRowStyles+chatActionsFooterStyles+importModalStyles,DomUtils.h.injectStyles(e,"gs-messages-tool-styles"),stylesInjected=!0)}module.exports={injectStyles:injectStyles};
