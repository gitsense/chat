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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils");function createModelIcon(e){let t;return t="human-public"===e?SVGUtils.eyeClosed({style:{position:"relative",height:"18px",width:"18px"}}):e.match(/Notes/)?SVGUtils.note({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/deepseek/)?SVGUtils.deepSeek({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/gemini/)?SVGUtils.gemini({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/gpt/)?SVGUtils.openAI({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/llama/)?SVGUtils.meta({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/claude/)?SVGUtils.claude({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/qwen/)?SVGUtils.qwen({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/glm/)?SVGUtils.zai({style:{position:"relative",height:"18px",width:"18px"}}):e.toLowerCase().match(/mistral/)?SVGUtils.mistral({style:{position:"relative",height:"18px",width:"18px"}}):SVGUtils.aiModel({style:{position:"relative",left:"1px",height:"18px",width:"18px"}})}function createModelAvatar(e,{isHistory:t=!1}){return DomUtils.h.createDiv({cls:"gs-chat-assistant-message-content-avatar",append:[createModelIcon(e)],style:{marginTop:"40px",display:t?"none":null}})}module.exports={createModelAvatar:createModelAvatar,createModelIcon:createModelIcon};
