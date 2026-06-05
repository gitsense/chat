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

let TEXT={BATCH_CONFIG:"5. Batch Configuration",BATCH_CONFIG_HELP_TITLE:"About Batch Configuration",BATCH_CONFIG_HELP_TEXT:`Batch configuration allows you to control how files are grouped for analysis.

• Max Files per Batch: Limits the number of files in each batch (recommended: 5 or fewer for easier error handling).
• Max Tokens per Batch: Sets the maximum token count for each batch (recommended: 25,000 or less for most models).
• Size per Batch: Sets the minimum and maximum total file size for each batch (helps balance batch sizes since token counts are estimates).
• Group by Language: Creates separate batches for each programming language for better analysis quality.
• Randomize Order: Randomizes the order of files and batches to prevent AI provider caching on retries.
• Group by Parent Directory: Groups files in the same folder into the same batch, keeping related files together and enabling future directory-level metadata analysis.

Requirements: You must select and filter files before configuring batch settings.`,BATCH_CONFIG_NO_FILES:"Select and filter files in the sections above to enable batch configuration.",SAVE_SETTINGS:"Save Settings",RESET:"Reset",BATCH_CONFIG_ZERO_MATCH:"Your filters matched 0 files. Adjust your filter settings to proceed.",CHANGE_BATCH_SETTINGS:"Change Batch Settings",RESET_BATCH_SETTINGS:"Reset Batch Settings",UNGROUPABLE_FILES_TITLE:"Ungroupable Files ({count})",UNGROUPABLE_FILES_MESSAGE:"The following files exceed the token limit and cannot be included in batches:",RANDOMIZE_ORDER:"Randomize batch order",GROUP_BY_PARENT:"Group by parent directory"},CSS_CLASSES={SECTION:"abb-section",SECTION_CONTENT:"abb-section-content",BATCH_CONFIG_GRID:"abb-batch-config-grid",UNGROUPABLE_SECTION:"abb-ungroupable-section",CONFIG_ITEM:"abb-config-item"},DEFAULT_BATCH_CONFIG={maxFilesPerBatch:5,maxTokensPerBatch:25e3,maxBatchSizeMB:5,groupByLanguage:!0,randomizeOrder:!1,groupByParent:!1,isEditing:!0},CONFIG_LIMITS={MAX_FILES_PER_BATCH:{min:1,max:10,step:1},MAX_TOKENS_PER_BATCH:{min:1e3,max:1e5,step:1e3},MAX_BATCH_SIZE_MB:{min:.1,max:100,step:.1}},VALIDATION_MESSAGES={MAX_FILES_PER_BATCH_REQUIRED:"Max files per batch is required and must be at least 1",MAX_FILES_PER_BATCH_MAX:"Max files per batch cannot exceed "+CONFIG_LIMITS.MAX_FILES_PER_BATCH.max,MAX_TOKENS_PER_BATCH_REQUIRED:"Max tokens per batch is required and must be at least 1000",MAX_TOKENS_PER_BATCH_MAX:"Max tokens per batch cannot exceed "+CONFIG_LIMITS.MAX_TOKENS_PER_BATCH.max,MAX_BATCH_SIZE_MB_REQUIRED:"Max batch size is required and must be at least 0.1 MB",MAX_BATCH_SIZE_MB_MAX:`Max batch size cannot exceed ${CONFIG_LIMITS.MAX_BATCH_SIZE_MB.max} MB`};module.exports={TEXT:TEXT,CSS_CLASSES:CSS_CLASSES,DEFAULT_BATCH_CONFIG:DEFAULT_BATCH_CONFIG,CONFIG_LIMITS:CONFIG_LIMITS,VALIDATION_MESSAGES:VALIDATION_MESSAGES};
