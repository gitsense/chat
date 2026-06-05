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

let Toast=require("./toast").Toast,notificationManagerStyles=require("./notification-manager.styles"),GSC_NOTIFICATION_CONSTANTS=require("./constants").GSC_NOTIFICATION_CONSTANTS,stylesInjected=!1,instance=null;class NotificationManager{constructor(){return instance||(this.container=null,this.activeToasts=[],this.init(),instance=this),instance}init(){this._injectStyles(),this._renderContainer()}_injectStyles(){var t;stylesInjected||((t=document.createElement("style")).textContent=notificationManagerStyles,document.head.appendChild(t),stylesInjected=!0)}_renderContainer(){this.container=document.createElement("div"),this.container.classList.add(GSC_NOTIFICATION_CONSTANTS.MANAGER_CONTAINER_CLASS),document.body.appendChild(this.container)}_addToast(t,e,i=GSC_NOTIFICATION_CONSTANTS.DEFAULT_DURATION){t=new Toast(this.container,t,e,i,this._onToastDismissed.bind(this));this.activeToasts.push(t),t.show(),this._repositionToasts()}_onToastDismissed(e){this.activeToasts=this.activeToasts.filter(t=>t!==e),this._repositionToasts()}_repositionToasts(){let e=GSC_NOTIFICATION_CONSTANTS.TOAST_MARGIN;for(let t=this.activeToasts.length-1;0<=t;t--){var i=this.activeToasts[t];i.setOffset(e),e+=i.getHeight()+GSC_NOTIFICATION_CONSTANTS.TOAST_MARGIN}}static success(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_SUCCESS,t,e)}static error(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_ERROR,t,e)}static info(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_INFO,t,e)}static warning(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_WARNING,t,e)}destroy(){this.activeToasts.forEach(t=>t.destroy()),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),instance=null,stylesInjected=!1}}module.exports={NotificationManager:NotificationManager};
