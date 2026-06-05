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

let TEXT={REFERENCE_FILES:"2. Reference Files",HELP_TITLE:"About Reference Files",HELP_TEXT:`Reference files provide context for all analyses but won't be analyzed themselves.

• Conditional: Some analyzers require reference files to function properly.
• Context: Reference files are included in every analysis batch.
• Examples: README files, documentation, architectural diagrams.
• Impact: Reference files consume tokens and reduce available space for main files.`,SELECTION_BLURB:"<h4 style='margin-top:0;margin-bottom:7px;font-size:1.15em'>Conditional</h4>These files will be included in every batch analysis but won't be analyzed themselves. Common examples include README files, documentation, or architectural diagrams.",SELECT_FILES:"Select Reference Files",NO_FILES:"No Reference Required",NO_FILES_SELECTED:"Confirm or select one or more reference files.",FILES_SELECTED:"Reference files selected",CHANGE_SELECTION:"Change Selection",CLEAR_SELECTION:"Clear Selection",SAVE_SELECTION:"Save"},CSS_CLASSES={SECTION:"abb-section",SECTION_CONTENT:"abb-section-content",FILES_COUNT:"abb-reference-files-count",FILES_NAMES:"abb-reference-files-names",SELECT_FILES_LINK:"abb-select-reference-files-link",CLEAR_FILES_LINK:"abb-clear-reference-files-link",SAVE_FILES_LINK:"abb-save-reference-files-link",TOKEN_INFO:"abb-reference-files-token-info"},DEFAULT_CONFIG={maxFilesDisplayed:5};module.exports={TEXT:TEXT,CSS_CLASSES:CSS_CLASSES,DEFAULT_CONFIG:DEFAULT_CONFIG};
