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

let crypto=require("crypto");class CompactMessageValidator{static generateHash(t){t=t.filter(t=>"public"===t.visibility).map(t=>t.id+"|"+t.updated_at).sort().join("||");return crypto.createHash("sha256").update(t).digest("hex")}static validateHash(t,e){return this.generateHash(t)===e}static filterPublicMessages(t){return t.filter(t=>"public"===t.visibility)}}module.exports={CompactMessageValidator:CompactMessageValidator};
