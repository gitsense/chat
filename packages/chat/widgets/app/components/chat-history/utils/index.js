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

let{getSettings,saveSettings,updateDisplaySettings,updatePaginationSettings,DEFAULT_SETTINGS}=require("./settingsManager"),{formatDateByMode,formatAbsoluteDate,formatShortRelativeDate,isDateInRange,formatTimeRange,getMostRecentDate,compareChatsByDate}=require("./dateFormatter"),{isStorageAvailable,getSavedChats,getChatById,saveChat,deleteChat,clearAllChats,getChatCount,updatePinnedStatus,updateLastViewed,getChatsSortedByLastViewed,getPinnedChats,getArchivedChats,updateArchivedStatus,archiveChat,unarchiveChat,searchChats,getStorageInfo}=require("./storageManager"),{pruneChatData,getChatUrl,buildBreadcrumbPath,formatBreadcrumbString,calculateTreeLevel,processChatsForDisplay,sortChats,filterChats,paginateChats,getChatStatistics}=require("./chatDataProcessor"),{exportHistory,importHistory,generateExportFilename,createFileInput,triggerFileSelection,getExportImportStats}=require("./exportImportManager");module.exports={getSettings:getSettings,saveSettings:saveSettings,updateDisplaySettings:updateDisplaySettings,updatePaginationSettings:updatePaginationSettings,DEFAULT_SETTINGS:DEFAULT_SETTINGS,formatDateByMode:formatDateByMode,formatAbsoluteDate:formatAbsoluteDate,formatShortRelativeDate:formatShortRelativeDate,isDateInRange:isDateInRange,formatTimeRange:formatTimeRange,getMostRecentDate:getMostRecentDate,compareChatsByDate:compareChatsByDate,isStorageAvailable:isStorageAvailable,getSavedChats:getSavedChats,getChatById:getChatById,saveChat:saveChat,deleteChat:deleteChat,clearAllChats:clearAllChats,getChatCount:getChatCount,updatePinnedStatus:updatePinnedStatus,updateLastViewed:updateLastViewed,getChatsSortedByLastViewed:getChatsSortedByLastViewed,getPinnedChats:getPinnedChats,getArchivedChats:getArchivedChats,updateArchivedStatus:updateArchivedStatus,archiveChat:archiveChat,unarchiveChat:unarchiveChat,searchChats:searchChats,getStorageInfo:getStorageInfo,pruneChatData:pruneChatData,getChatUrl:getChatUrl,buildBreadcrumbPath:buildBreadcrumbPath,formatBreadcrumbString:formatBreadcrumbString,calculateTreeLevel:calculateTreeLevel,processChatsForDisplay:processChatsForDisplay,sortChats:sortChats,filterChats:filterChats,paginateChats:paginateChats,getChatStatistics:getChatStatistics,exportHistory:exportHistory,importHistory:importHistory,generateExportFilename:generateExportFilename,createFileInput:createFileInput,triggerFileSelection:triggerFileSelection,getExportImportStats:getExportImportStats};
