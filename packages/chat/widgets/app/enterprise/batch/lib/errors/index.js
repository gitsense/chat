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

class BatchError extends Error{constructor(r,t={}){super(r),this.name="BatchError",this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,BatchError)}}class ProviderError extends Error{constructor(r,t="Unknown",o=null,a={}){super(r),this.name="ProviderError",this.providerName=t,this.statusCode=o,this.details=a,Error.captureStackTrace&&Error.captureStackTrace(this,ProviderError)}}class InvalidInputError extends Error{constructor(r,t={}){super(r),this.name="InvalidInputError",this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,InvalidInputError)}}class AnalyzerNotFoundError extends Error{constructor(r,t=`Analyzer with ID '${r}' not found.`,o={}){super(t),this.name="AnalyzerNotFoundError",this.analyzerId=r,this.details=o,Error.captureStackTrace&&Error.captureStackTrace(this,AnalyzerNotFoundError)}}module.exports={BatchError:BatchError,ProviderError:ProviderError,InvalidInputError:InvalidInputError,AnalyzerNotFoundError:AnalyzerNotFoundError};
