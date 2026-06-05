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

let CLI_BRIDGE_CONSTANTS=require("../../constants").CLI_BRIDGE_CONSTANTS;class TerminalCore{constructor(e=null){this.contractManager=e,this.history=[],this.currentTheme=this._loadTheme()}_loadTheme(){try{var e=localStorage.getItem(CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.SETTINGS);if(e){var t=JSON.parse(e);if(t.terminal&&t.terminal.theme)return t.terminal.theme}}catch(e){console.warn("Failed to load theme from localStorage:",e)}return"default"}saveTheme(t){this.currentTheme=t;try{let e={version:1,terminal:{theme:"default"}};var r=localStorage.getItem(CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.SETTINGS);if(r)try{e=JSON.parse(r)}catch(e){console.warn("Failed to parse existing settings, resetting to default.")}e.terminal||(e.terminal={}),e.terminal.theme=t,localStorage.setItem(CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.SETTINGS,JSON.stringify(e))}catch(e){console.warn("Failed to save theme to localStorage:",e)}}addToHistory(e){this.history.push(e)}getHistory(){return this.history}setTheme(e){this.currentTheme=e}getTheme(){return this.currentTheme}clearHistory(){this.history=[]}}module.exports={TerminalCore:TerminalCore};
