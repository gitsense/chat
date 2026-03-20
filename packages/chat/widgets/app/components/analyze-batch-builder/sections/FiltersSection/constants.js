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

let TEXT={FILTERS:"4. File Filters",HELP_TITLE:"About Filters",HELP_TEXT:`Filters help you narrow down the files to analyze. Multiple filters work together - only files that match ALL selected criteria will be included.

• Analyzed Status: "Previously analyzed" shows files that have been analyzed before, "Never analyzed" shows files that haven't.
• Time Filters: Based on the actual commit/analysis time, not calendar weeks.
• Languages: Selecting multiple languages will show files from ANY of the selected languages.`,SAVE_SETTINGS:"Save Settings",RESET:"Reset",SHOW_HELP:"Show help",HIDE_HELP:"Hide help",ANALYZED_STATUS:"Analyzed Status",LAST_COMMIT:"Last Commit",LAST_ANALYZED:"Last Analyzed",LANGUAGES:"Languages",CHANGE_FILTER_SETTINGS:"Change Settings",CLEAR_FILTER_SETTINGS:"Clear Settings"},CSS_CLASSES={SECTION:"abb-section",SECTION_CONTENT:"abb-section-content",HELP_CONTAINER:"abb-help-container",FILTER_GROUP:"abb-filter-group",FILTER_ITEM:"abb-filter-item",LANGUAGE_CHECKBOXES:"abb-language-checkboxes"},FILTER_OPTIONS={ANALYZED_STATUS:[{value:"any",text:"Any"},{value:"analyzed",text:"Previously analyzed"},{value:"not-analyzed",text:"Never analyzed"}],TIME_FILTERS:[{value:"any",text:"Any time"},{value:"12h",text:"Last 12 hours"},{value:"24h",text:"Last 24 hours"},{value:"2d",text:"Last 2 days"},{value:"3d",text:"Last 3 days"},{value:"5d",text:"Last 5 days"},{value:"1w",text:"Last week"},{value:"2w",text:"Last 2 weeks"},{value:"1m",text:"Last month"},{value:"3m",text:"Last 3 months"},{value:"6m",text:"Last 6 months"},{value:"1y",text:"Last year"}],LAST_ANALYZED:[{value:"any",text:"Any time"},{value:"12h",text:"Last 12 hours"},{value:"24h",text:"Last 24 hours"},{value:"2d",text:"Last 2 days"},{value:"3d",text:"Last 3 days"},{value:"5d",text:"Last 5 days"},{value:"1w",text:"Last week"},{value:"2w",text:"Last 2 weeks"},{value:"1m",text:"Last month"},{value:"3m",text:"Last 3 months"},{value:"6m",text:"Last 6 months"},{value:"1y",text:"Last year"},{value:"never",text:"Never analyzed"}]},DEFAULT_FILTER_CONFIG={analyzedStatus:"any",lastCommitted:"any",lastAnalyzed:"any",selectedLanguages:[],minFileSize:1,maxFileSize:1e6,isEditing:!0};module.exports={TEXT:TEXT,CSS_CLASSES:CSS_CLASSES,FILTER_OPTIONS:FILTER_OPTIONS,DEFAULT_FILTER_CONFIG:DEFAULT_FILTER_CONFIG};
