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

let CompactSessionUtils=require("../utils/CompactSessionUtils").CompactSessionUtils;class CompactMessagePoller{constructor(s={}){this.pollInterval=s.pollInterval||5e3,this.maxPolls=s.maxPolls||360,this.onMessageFound=s.onMessageFound||(()=>{}),this.onSessionExpired=s.onSessionExpired||(()=>{}),this.onStatusUpdate=s.onStatusUpdate||(()=>{}),this.onPollCountUpdate=s.onPollCountUpdate||(()=>{}),this.pollingInterval=null,this.sessionId=null,this.pollCount=0,this.lastPollTime=null,this.isPolling=!1}startPolling(s){return this.isPolling?(console.warn("Polling is already active"),!1):s?(this.sessionId=s,this.pollCount=0,this.lastPollTime=null,this.isPolling=!0,this.pollingInterval=setInterval(()=>{this.performPoll()},this.pollInterval),this.performPoll(),!0):(console.error("Session ID is required for polling"),!1)}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.isPolling=!1}performPoll(){if(this.isPolling&&this.sessionId)if(this.pollCount++,this.lastPollTime=new Date,this.pollCount>this.maxPolls)this.handleSessionExpired();else if(CompactSessionUtils.isSessionActive(this.sessionId)){var s=localStorage.getItem("compact-"+this.sessionId);if(s)try{var i,t,e=JSON.parse(s);if(e.sessionId===this.sessionId)return i=e.content||e,t=e.metadata||{},void this.handleMessageFound(i,t)}catch(s){console.error("Error parsing compacted message data:",s)}this.updateStatus()}else this.handleSessionExpired()}handleMessageFound(s,i){this.stopPolling(),this.onMessageFound(this.sessionId,s,i)}clearCompactedMessage(){this.sessionId&&localStorage.removeItem("compact-"+this.sessionId)}handleSessionExpired(){this.stopPolling(),this.sessionId&&CompactSessionUtils.removeSession(this.sessionId),this.onSessionExpired(this.sessionId)}updateStatus(){var s,i=CompactSessionUtils.getAllSessions().find(s=>s.id===this.sessionId);let t="";i&&i.expiration&&(s=Date.now(),i=i.expiration-s,s=Math.floor(i/6e4),t=0<s?`Session expires in: ${s} minutes`:"Session expires soon");i={lastPollTime:this.lastPollTime,nextPollIn:this.pollInterval/1e3,pollCount:this.pollCount,expiresText:t};this.onStatusUpdate(this.sessionId,i),this.onPollCountUpdate(this.sessionId,this.pollCount)}getStatus(){if(!this.isPolling)return null;var s,i=CompactSessionUtils.getAllSessions().find(s=>s.id===this.sessionId);let t="";return i&&i.expiration&&(s=Date.now(),i=i.expiration-s,s=Math.floor(i/6e4),t=0<s?`Session expires in: ${s} minutes`:"Session expires soon"),{isPolling:this.isPolling,sessionId:this.sessionId,pollCount:this.pollCount,lastPollTime:this.lastPollTime,nextPollIn:this.pollInterval/1e3,expiresText:t}}isActive(){return this.isPolling}getSessionId(){return this.sessionId}getPollCount(){return this.pollCount}reset(){this.stopPolling(),this.sessionId=null,this.pollCount=0,this.lastPollTime=null}}module.exports={CompactMessagePoller:CompactMessagePoller};
