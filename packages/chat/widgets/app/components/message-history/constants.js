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

let STORAGE_KEYS={MESSAGES:"gsc-message-history-messages",DRAFTS:"gsc-message-history-drafts",CONFIG:"gsc-message-history-config"},DEFAULT_CONFIG={SAVE_FREQUENCY:5e3,MAX_LATEST_MESSAGES:25,STORAGE_KEY:"gsc-message-history",TRUNCATE_LENGTH:100,AUTO_SAVE_DEBOUNCE:1e3},MESSAGE_STATUS={DRAFT:"draft",SENT:"sent",PINNED:"pinned"},CSS_CLASSES={MODAL:"gsc-message-history-modal",TABS_CONTAINER:"gsc-message-history-tabs",SEARCH_CONTAINER:"gsc-message-history-search",MESSAGES_CONTAINER:"gsc-message-history-messages",MESSAGE_CARD:"gsc-message-history-card",MESSAGE_STATUS:"gsc-message-history-status",MESSAGE_CONTENT:"gsc-message-history-content",MESSAGE_ACTIONS:"gsc-message-history-actions",EMPTY_STATE:"gsc-message-history-empty",CHAT_NAME_DELETED:"gsc-message-history-chat-name-deleted",DELETED_INDICATOR:"gsc-message-history-deleted-indicator"},TABS={DRAFTS:"drafts",PINNED:"pinned",LATEST:"latest",LARGEST:"largest",OLDEST:"oldest"},MESSAGE_ACTIONS={REPLACE:"replace",ADD:"add"},ERROR_MESSAGES={STORAGE_QUOTA_EXCEEDED:"Storage quota exceeded. Please delete some messages to free up space.",STORAGE_ACCESS_DENIED:"Storage access denied. Please check your browser settings.",CORRUPTED_DATA:"Corrupted data found in storage. History has been reset.",INVALID_CHAT_OBJECT:"Invalid chat object provided.",INVALID_CHAT_INPUT:"Invalid chat input element provided."},EVICTION_POLICY={MAX_SENT_MESSAGES:100,EVICTION_BATCH_SIZE:10},EVICTION_STRATEGY={LRU:"lru",FIFO:"fifo"};module.exports={STORAGE_KEYS:STORAGE_KEYS,DEFAULT_CONFIG:DEFAULT_CONFIG,MESSAGE_STATUS:MESSAGE_STATUS,CSS_CLASSES:CSS_CLASSES,TABS:TABS,MESSAGE_ACTIONS:MESSAGE_ACTIONS,ERROR_MESSAGES:ERROR_MESSAGES,EVICTION_POLICY:EVICTION_POLICY,EVICTION_STRATEGY:EVICTION_STRATEGY};
