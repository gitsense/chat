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

class UserSettingsUtils{static getDefaultSettings(){return{skimOptions:{leadingLines:5,trailingLines:5},displayOptions:{maxContentHeight:300,renderMarkdown:!1,format:"markdown"}}}static getSetting(t,s=null){try{var i=this.getAllSettings();return void 0!==i[t]?i[t]:s}catch(t){return console.error("Error getting setting:",t),s}}static setSetting(t,s){try{var i=this.getAllSettings();i[t]=s,localStorage.setItem("gsc-messages-tool-settings",JSON.stringify(i))}catch(t){console.error("Error setting setting:",t)}}static getAllSettings(){try{var t,s=localStorage.getItem("gsc-messages-tool-settings");return s?(t=JSON.parse(s),{...this.getDefaultSettings(),...t}):this.getDefaultSettings()}catch(t){return console.error("Error getting all settings:",t),this.getDefaultSettings()}}static getMergedSettings(t={}){var s=this.getDefaultSettings(),i=this.getAllSettings();return{skimOptions:{...s.skimOptions,...i.skimOptions,...t.skimOptions},displayOptions:{...s.displayOptions,...i.displayOptions,...t.displayOptions}}}static getSkimOptions(){return this.getSetting("skimOptions",this.getDefaultSettings().skimOptions)}static setSkimOptions(t){this.setSetting("skimOptions",t)}static getDisplayOptions(){return this.getSetting("displayOptions",this.getDefaultSettings().displayOptions)}static setDisplayOptions(t){this.setSetting("displayOptions",t)}static getMaxContentHeight(){return this.getDisplayOptions().maxContentHeight}static setMaxContentHeight(t){var s=this.getDisplayOptions();s.maxContentHeight=t,this.setDisplayOptions(s)}static getRenderMarkdown(){return this.getDisplayOptions().renderMarkdown}static setRenderMarkdown(t){var s=this.getDisplayOptions();s.renderMarkdown=t,this.setDisplayOptions(s)}static getFormat(){return this.getDisplayOptions().format||"markdown"}static setFormat(t){var s=this.getDisplayOptions();s.format=t,this.setDisplayOptions(s)}}module.exports={UserSettingsUtils:UserSettingsUtils};
