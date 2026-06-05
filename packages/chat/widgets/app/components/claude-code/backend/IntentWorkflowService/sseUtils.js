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

let ERROR_CODES=require("./constants").ERROR_CODES;function sendEvent(e,r,n){e.writableEnded||(e.write(`data: ${JSON.stringify({type:r,event:n})}

`),"function"==typeof e.flush&&e.flush())}function sendError(e,r){e.writableEnded||(sendEvent(e,"error","string"==typeof r?{code:ERROR_CODES.UNKNOWN_ERROR,message:r,severity:"error",retryable:!1}:r),e.end())}module.exports={sendEvent:sendEvent,sendError:sendError};
