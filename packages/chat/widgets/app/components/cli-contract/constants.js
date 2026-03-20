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

let CONTRACT_CONSTANTS={CSS_PREFIX:"gsc-contract",ERROR_CODES:{CONTRACT_EXPIRED:"CONTRACT_EXPIRED",CONTRACT_CANCELLED:"CONTRACT_CANCELLED",DUPLICATE_BLOCK_UUID:"DUPLICATE_BLOCK_UUID",PARENT_UUID_NOT_FOUND:"PARENT_UUID_NOT_FOUND",PARENT_UUID_MISMATCH:"PARENT_UUID_MISMATCH",HEADER_PARSE_FAILED:"HEADER_PARSE_FAILED",CLI_NOT_FOUND:"CLI_NOT_FOUND"},EVENT_STATUS:{PENDING:"pending",PROCESSED:"processed",CANCELLED:"cancelled",EXPIRED:"expired",FAILED:"failed"},SSE_EVENT_TYPES:{TERMINAL_SEND_MESSAGE:"terminal_send_message",CONTRACT_CHANGE:"contract_change"},ERROR_MESSAGES:{[this.ERROR_CODES?.CONTRACT_EXPIRED||"CONTRACT_EXPIRED"]:"This CLI Contract has expired. Please renew it to continue.",[this.ERROR_CODES?.CONTRACT_CANCELLED||"CONTRACT_CANCELLED"]:"This CLI Contract has been cancelled.",[this.ERROR_CODES?.DUPLICATE_BLOCK_UUID||"DUPLICATE_BLOCK_UUID"]:"The Block-UUID in this code already exists in another file.",[this.ERROR_CODES?.PARENT_UUID_NOT_FOUND||"PARENT_UUID_NOT_FOUND"]:"The parent file for this update could not be found.",[this.ERROR_CODES?.PARENT_UUID_MISMATCH||"PARENT_UUID_MISMATCH"]:"Traceability broken: The parent file has been modified externally.",[this.ERROR_CODES?.HEADER_PARSE_FAILED||"HEADER_PARSE_FAILED"]:"The code block is missing a valid traceability header.",[this.ERROR_CODES?.CLI_NOT_FOUND||"CLI_NOT_FOUND"]:"The gsc CLI tool was not found. Please ensure it is installed and in your PATH."},UI_TEXT:{STATUS_NO_CONTRACT:"No CLI Contract",STATUS_ACTIVE:"CLI Contract",STATUS_CANCELLED:"Contract Cancelled",STATUS_EXPIRING:"Contract Expiring",STATUS_EXPIRED:"Contract Expired",STATUS_DONE:"Contract Complete",TIME_LEFT:"left",MODAL_TITLE_UPDATE:"Update File",MODAL_TITLE_NEW:"Create New File",LABEL_TARGET_FILE:"Target File:",LABEL_RELATIVE_PATH:"Relative Path:",HINT_RELATIVE_PATH:"Path relative to handshake workdir",BUTTON_CONFIRM:"Confirm",BUTTON_CANCEL:"Cancel",LOADING_VALIDATING:"Validating handshake and checking UUID uniqueness...",LOADING_RESOLVING:"Validating handshake and resolving path...",ERROR_VALIDATION_FAILED:"Validation Failed:",ERROR_SYSTEM:"System Error:"},CONFIG:{WARNING_THRESHOLD_MINUTES:5,MODAL_WIDTH_UPDATE:"1100px",MODAL_WIDTH_NEW:"600px",DIFF_MAX_HEIGHT:"500px",POLL_INTERVAL_MS:3e4,EVENTS_POLL_INTERVAL_MS:1500},STORAGE_KEYS:{AUTHCODE:"gsc_authcode",STAGED_AUTHCODE:"gsc_staged_authcode"}};module.exports={CONTRACT_CONSTANTS:CONTRACT_CONSTANTS};
