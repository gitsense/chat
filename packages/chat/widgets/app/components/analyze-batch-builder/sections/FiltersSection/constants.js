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

let TEXT={FILTERS:"4. File Filters",HELP_TITLE:"About Filters",HELP_TEXT:`Filters help you narrow down the files to analyze. Multiple filters work together - only files that match ALL selected criteria will be included.

• Analyzed Status: "Previously analyzed" shows files that have been analyzed before, "Never analyzed" shows files that haven't.
• Time Filters: Based on the actual commit/analysis time, not calendar weeks.
• Languages: Selecting multiple languages will show files from ANY of the selected languages.
• Glob Patterns: Use glob patterns to include or exclude specific files. One pattern per line.
• Match Scope: Automatically include related files based on directory structure.`,SAVE_SETTINGS:"Save Settings",RESET:"Reset",SHOW_HELP:"Show help",HIDE_HELP:"Hide help",ANALYZED_STATUS:"Analyzed Status",LAST_COMMIT:"Last Commit",LAST_ANALYZED:"Last Analyzed",LANGUAGES:"Languages",CHANGE_FILTER_SETTINGS:"Change Settings",CLEAR_FILTER_SETTINGS:"Clear Settings",GLOB_PATTERNS:"Glob Patterns",GLOB_PATTERNS_HELP:"Use glob patterns to include or exclude specific files. One pattern per line.",INCLUDE_PATTERNS:"Include Patterns",EXCLUDE_PATTERNS:"Exclude Patterns",MATCH_SCOPE:"Match Scope",MATCH_SCOPE_DESCRIPTION:"Automatically include related files based on directory structure.",MATCH_SCOPE_EXAMPLE:"Example: If a file in src/utils/ matches your filters, selecting 'Family' will also include all other files in src/utils/."},CSS_CLASSES={SECTION:"abb-section",SECTION_CONTENT:"abb-section-content",HELP_CONTAINER:"abb-help-container",FILTER_GROUP:"abb-filter-group",FILTER_ITEM:"abb-filter-item",LANGUAGE_CHECKBOXES:"abb-language-checkboxes",GLOB_PATTERNS_SECTION:"abb-glob-patterns-section",GLOB_PATTERNS_GRID:"abb-glob-patterns-grid",MATCH_SCOPE_ROW:"abb-match-scope-row"},FILTER_OPTIONS={ANALYZED_STATUS:[{value:"any",text:"Any"},{value:"analyzed",text:"Previously analyzed"},{value:"not-analyzed",text:"Never analyzed"}],TIME_FILTERS:[{value:"any",text:"Any time"},{value:"1min",text:"Less than 1 minute ago"},{value:"2min",text:"Less than 2 minutes ago"},{value:"3min",text:"Less than 3 minutes ago"},{value:"4min",text:"Less than 4 minutes ago"},{value:"5min",text:"Less than 5 minutes ago"},{value:"10min",text:"Less than 10 minutes ago"},{value:"15min",text:"Less than 15 minutes ago"},{value:"30min",text:"Less than 30 minutes ago"},{value:"1h",text:"Less than 1 hour ago"},{value:"2h",text:"Less than 2 hours ago"},{value:"6h",text:"Less than 6 hours ago"},{value:"12h",text:"Less than 12 hours ago"},{value:"24h",text:"Less than 24 hours ago"},{value:"2d",text:"Less than 2 days ago"},{value:"3d",text:"Less than 3 days ago"},{value:"7d",text:"Less than 7 days ago"},{value:"14d",text:"Less than 14 days ago"},{value:"1m",text:"Less than 1 month ago"},{value:"3m",text:"Less than 3 months ago"},{value:"6m",text:"Less than 6 months ago"},{value:"1y",text:"Less than 1 year ago"}],LAST_ANALYZED:[{value:"any",text:"Any time"},{value:"1min",text:"More than 1 minute ago"},{value:"2min",text:"More than 2 minutes ago"},{value:"3min",text:"More than 3 minutes ago"},{value:"4min",text:"More than 4 minutes ago"},{value:"5min",text:"More than 5 minutes ago"},{value:"10min",text:"More than 10 minutes ago"},{value:"15min",text:"More than 15 minutes ago"},{value:"30min",text:"More than 30 minutes ago"},{value:"1h",text:"More than 1 hour ago"},{value:"2h",text:"More than 2 hours ago"},{value:"6h",text:"More than 6 hours ago"},{value:"12h",text:"More than 12 hours ago"},{value:"24h",text:"More than 24 hours ago"},{value:"2d",text:"More than 2 days ago"},{value:"3d",text:"More than 3 days ago"},{value:"7d",text:"More than 7 days ago"},{value:"14d",text:"More than 14 days ago"},{value:"1m",text:"More than 1 month ago"},{value:"3m",text:"More than 3 months ago"},{value:"6m",text:"More than 6 months ago"},{value:"1y",text:"More than 1 year ago"}],MATCH_SCOPE:[{value:"none",text:"Individual files only"},{value:"family",text:"Family (Siblings)"},{value:"extended",text:"Extended Family (Cousins)"}]},DEFAULT_FILTER_CONFIG={analyzedStatus:"any",lastCommitted:"any",lastAnalyzed:"any",selectedLanguages:[],minFileSize:1,maxFileSize:1e6,includePatterns:[],excludePatterns:[],matchScope:"none",isEditing:!0};module.exports={TEXT:TEXT,CSS_CLASSES:CSS_CLASSES,FILTER_OPTIONS:FILTER_OPTIONS,DEFAULT_FILTER_CONFIG:DEFAULT_FILTER_CONFIG};
