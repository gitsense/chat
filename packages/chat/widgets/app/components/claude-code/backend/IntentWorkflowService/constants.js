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

let ERROR_CODES={AUTH_INVALID:"AUTH_INVALID",CONTRACT_NOT_FOUND:"CONTRACT_NOT_FOUND",CONTRACT_NOT_ACTIVE:"CONTRACT_NOT_ACTIVE",CONTRACT_NO_WORKDIRS:"CONTRACT_NO_WORKDIRS",INVALID_TURN_SEQUENCE:"INVALID_TURN_SEQUENCE",INVALID_STATE:"INVALID_STATE",MESSAGE_NOT_FOUND:"MESSAGE_NOT_FOUND",SESSION_NOT_FOUND:"SESSION_NOT_FOUND",LOG_FILE_NOT_FOUND:"LOG_FILE_NOT_FOUND",NO_CANDIDATES_FOUND:"NO_CANDIDATES_FOUND",FILE_NOT_IN_CANDIDATES:"FILE_NOT_IN_CANDIDATES",CLI_START_FAILED:"CLI_START_FAILED",CLI_PARSE_FAILED:"CLI_PARSE_FAILED",STREAM_TIMEOUT:"STREAM_TIMEOUT",RETRY_FAILED:"RETRY_FAILED",DELETE_FAILED:"DELETE_FAILED",DELETE_ONLY_TURN:"DELETE_ONLY_TURN",MISSING_BRAIN:"MISSING_BRAIN",STOP_FAILED:"STOP_FAILED",CONTEXT_VALIDATION_FAILED:"CONTEXT_VALIDATION_FAILED",UNKNOWN_ERROR:"UNKNOWN_ERROR"},VALID_TURN_STATUSES={COMPLETE:"complete",SKIPPED:"skipped",COMPLETED:"completed",STOPPED:"stopped",ERROR:"error"},SESSION_STATUS={INITIALIZING:"initializing",RUNNING:"running",DISCOVERY:"discovery",CHANGE:"change",STOPPED:"stopped",COMPLETE:"complete",COMPLETED:"completed",ERROR:"error",CHANGE_POST_PROCESSING:"change_post_processing",CHANGE_COMPLETE:"change_complete",DISCOVERY_COMPLETE:"discovery_complete"},TURN_TYPES={DISCOVERY:"discovery",CHANGE:"change"};function isValidTurnStatus(S){return[VALID_TURN_STATUSES.COMPLETE,VALID_TURN_STATUSES.SKIPPED,VALID_TURN_STATUSES.COMPLETED,VALID_TURN_STATUSES.STOPPED,VALID_TURN_STATUSES.ERROR].includes(S)}function getValidTurnStatuses(){return[VALID_TURN_STATUSES.COMPLETE,VALID_TURN_STATUSES.SKIPPED,VALID_TURN_STATUSES.COMPLETED,VALID_TURN_STATUSES.STOPPED,VALID_TURN_STATUSES.ERROR]}function isRunningStatus(S){return[SESSION_STATUS.INITIALIZING,SESSION_STATUS.RUNNING,SESSION_STATUS.DISCOVERY,SESSION_STATUS.CHANGE].includes(S)}function isCompletionStatus(S){return[SESSION_STATUS.COMPLETE,SESSION_STATUS.COMPLETED,SESSION_STATUS.STOPPED,SESSION_STATUS.ERROR,SESSION_STATUS.CHANGE_COMPLETE,SESSION_STATUS.DISCOVERY_COMPLETE].includes(S)}module.exports={ERROR_CODES:ERROR_CODES,VALID_TURN_STATUSES:VALID_TURN_STATUSES,SESSION_STATUS:SESSION_STATUS,TURN_TYPES:TURN_TYPES,isValidTurnStatus:isValidTurnStatus,getValidTurnStatuses:getValidTurnStatuses,isRunningStatus:isRunningStatus,isCompletionStatus:isCompletionStatus};
