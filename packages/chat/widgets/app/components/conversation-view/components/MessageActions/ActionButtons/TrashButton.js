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

let{svg,ConfirmationBox,NotificationManager}=require("../../../Dependencies"),MessageService=require("../../../services/MessageService"),MODEL_CONSTANTS=require("../../../constants/MessageConstants").MODEL_CONSTANTS,MessageUtils=require("../utils/MessageUtils");function render(e,s,r){var i=svg.trash({style:{cursor:"pointer",marginLeft:"8px"}});e.appendChild(i),i.onclick=()=>showDeleteConfirmation(s,r.widget)}function isOnlyMessage(e){return!1}function showDeleteConfirmation(s,r){(new ConfirmationBox).show({title:"Delete Message",message:"Are you sure you want to delete this message?"},async()=>{var e=await MessageService.deleteChatMessage(r,s.id);e.success?window.location.reload():NotificationManager.error(e.error)})}module.exports={render:render};
