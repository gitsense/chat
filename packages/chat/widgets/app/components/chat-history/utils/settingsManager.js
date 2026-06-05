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

let SETTINGS_KEY="gsc-chat-history-settings",SETTINGS_VERSION="1.0.0",DEFAULT_SETTINGS={display:{chatNameDisplay:"nameAndPath",timeDisplay:"viewed"},pagination:{itemsPerPage:10},filter:{rootOnly:!1},version:SETTINGS_VERSION};function getSettings(){try{var t,e=localStorage.getItem(SETTINGS_KEY);return e?(t=JSON.parse(e),{display:{...DEFAULT_SETTINGS.display,...t.display||{}},pagination:{...DEFAULT_SETTINGS.pagination,...t.pagination||{}},filter:{...DEFAULT_SETTINGS.filter,...t.filter||{}},version:t.version||DEFAULT_SETTINGS.version}):{...DEFAULT_SETTINGS}}catch(t){return console.error("Error loading settings:",t),{...DEFAULT_SETTINGS}}}function saveSettings(t){try{var e={...DEFAULT_SETTINGS,...t,version:SETTINGS_VERSION};return localStorage.setItem(SETTINGS_KEY,JSON.stringify(e)),!0}catch(t){return console.error("Error saving settings:",t),!1}}function updateDisplaySettings(t){var e=getSettings();return e.display={...e.display,...t},saveSettings(e)}function updatePaginationSettings(t){var e=getSettings();return e.pagination={...e.pagination,...t},saveSettings(e)}function updateFilterSettings(t){var e=getSettings();return e.filter={...e.filter,...t},saveSettings(e)}module.exports={getSettings:getSettings,saveSettings:saveSettings,updateDisplaySettings:updateDisplaySettings,updatePaginationSettings:updatePaginationSettings,updateFilterSettings:updateFilterSettings,DEFAULT_SETTINGS:DEFAULT_SETTINGS};
