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

let CLI_BRIDGE_CONSTANTS=require("../../constants").CLI_BRIDGE_CONSTANTS;class TerminalCore{constructor(e=null){this.contractManager=e,this.history=[],this.currentTheme=this._loadTheme()}_loadTheme(){try{var e=localStorage.getItem(CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.SETTINGS);if(e){var t=JSON.parse(e);if(t.terminal&&t.terminal.theme)return t.terminal.theme}}catch(e){console.warn("Failed to load theme from localStorage:",e)}return"default"}saveTheme(t){this.currentTheme=t;try{let e={version:1,terminal:{theme:"default"}};var r=localStorage.getItem(CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.SETTINGS);if(r)try{e=JSON.parse(r)}catch(e){console.warn("Failed to parse existing settings, resetting to default.")}e.terminal||(e.terminal={}),e.terminal.theme=t,localStorage.setItem(CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.SETTINGS,JSON.stringify(e))}catch(e){console.warn("Failed to save theme to localStorage:",e)}}addToHistory(e){this.history.push(e)}getHistory(){return this.history}setTheme(e){this.currentTheme=e}getTheme(){return this.currentTheme}clearHistory(){this.history=[]}}module.exports={TerminalCore:TerminalCore};
