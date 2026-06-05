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

class ContractValidator{static async validate(t,r,a){t=await t.executeInfo(r,a);return t.success?"xxxx"===t.authcode?{valid:!1,error:"Invalid authorization code."}:"active"!==t.status?{valid:!1,error:"Contract is not active."}:0===(r=t.workdirs||[]).length?{valid:!1,error:"No working directories found in contract."}:{valid:!0,workdirs:r}:{valid:!1,error:"Contract not found."}}}module.exports={ContractValidator:ContractValidator};
