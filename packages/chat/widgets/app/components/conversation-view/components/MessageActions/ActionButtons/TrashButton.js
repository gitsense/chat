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

let{svg,ConfirmationBox,NotificationManager}=require("../../../Dependencies"),MessageService=require("../../../services/MessageService"),MODEL_CONSTANTS=require("../../../constants/MessageConstants").MODEL_CONSTANTS,MessageUtils=require("../utils/MessageUtils");function render(e,s,r){var i=svg.trash({style:{cursor:"pointer",marginLeft:"8px"}});e.appendChild(i),i.onclick=()=>showDeleteConfirmation(s,r.widget)}function isOnlyMessage(e){return!1}function showDeleteConfirmation(s,r){(new ConfirmationBox).show({title:"Delete Message",message:"Are you sure you want to delete this message?"},async()=>{var e=await MessageService.deleteChatMessage(r,s.id);e.success?window.location.reload():NotificationManager.error(e.error)})}module.exports={render:render};
