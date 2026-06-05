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

let DEFAULT_MIN_HEIGHT=50,DEFAULT_MAX_HEIGHT=2e3,DEFAULT_DRAG_DIRECTION="up",validateInputs=(e,t,n)=>{if(!(e instanceof HTMLTextAreaElement))throw new Error("Textarea parameter must be an HTMLTextAreaElement");if(!(t instanceof HTMLElement))throw new Error("dragHandle parameter must be an HTMLElement");if(n){var{minHeight:e=DEFAULT_MIN_HEIGHT,maxHeight:t=DEFAULT_MAX_HEIGHT,dragDirection:n=DEFAULT_DRAG_DIRECTION}=n;if("number"!=typeof e||e<=0)throw new Error("minHeight must be a positive number");if("number"!=typeof t||t<=e)throw new Error("maxHeight must be a number greater than minHeight");if("up"!==n&&"down"!==n)throw new Error('dragDirection must be either "up" or "down"')}},createResizableTextArea=(n,e,t={},r={})=>{validateInputs(n,e,t);let{minHeight:o=DEFAULT_MIN_HEIGHT,maxHeight:i=DEFAULT_MAX_HEIGHT,dragDirection:s=DEFAULT_DRAG_DIRECTION}=t,a=0,m=0,u=!1,E=(n.style.resize="none",n.style.minHeight=o+"px",n.style.maxHeight=i+"px",n.style.transition="height 0.1s ease-out",e=>{u=!0,a=e.clientY,m=n.offsetHeight,document.body.style.cursor="row-resize",n.style.transition="none",document.body.style.userSelect="none"}),d=t=>{if(u){t=t.clientY-a;let e;e="up"===s?m-t:m+t,e=Math.min(Math.max(e,o),i),n.style.height=e+"px"}},l=()=>{u&&(u=!1,document.body.style.cursor="",n.style.transition="height 0.1s ease-out",document.body.style.userSelect="",r.onMouseUp)&&r.onMouseUp()};return e.addEventListener("mousedown",E),document.addEventListener("mousemove",d),document.addEventListener("mouseup",l),document.addEventListener("mouseleave",l),()=>{e.removeEventListener("mousedown",E),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",l),document.removeEventListener("mouseleave",l)}};module.exports={createResizableTextArea:createResizableTextArea};
