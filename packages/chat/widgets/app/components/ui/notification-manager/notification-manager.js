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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let Toast=require("./toast").Toast,notificationManagerStyles=require("./notification-manager.styles"),GSC_NOTIFICATION_CONSTANTS=require("./constants").GSC_NOTIFICATION_CONSTANTS,stylesInjected=!1,instance=null;class NotificationManager{constructor(){return instance||(this.container=null,this.activeToasts=[],this.init(),instance=this),instance}init(){this._injectStyles(),this._renderContainer()}_injectStyles(){var t;stylesInjected||((t=document.createElement("style")).textContent=notificationManagerStyles,document.head.appendChild(t),stylesInjected=!0)}_renderContainer(){this.container=document.createElement("div"),this.container.classList.add(GSC_NOTIFICATION_CONSTANTS.MANAGER_CONTAINER_CLASS),document.body.appendChild(this.container)}_addToast(t,e,i=GSC_NOTIFICATION_CONSTANTS.DEFAULT_DURATION){t=new Toast(this.container,t,e,i,this._onToastDismissed.bind(this));this.activeToasts.push(t),t.show(),this._repositionToasts()}_onToastDismissed(e){this.activeToasts=this.activeToasts.filter(t=>t!==e),this._repositionToasts()}_repositionToasts(){let e=GSC_NOTIFICATION_CONSTANTS.TOAST_MARGIN;for(let t=this.activeToasts.length-1;0<=t;t--){var i=this.activeToasts[t];i.setOffset(e),e+=i.getHeight()+GSC_NOTIFICATION_CONSTANTS.TOAST_MARGIN}}static success(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_SUCCESS,t,e)}static error(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_ERROR,t,e)}static info(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_INFO,t,e)}static warning(t,e){(new NotificationManager)._addToast(GSC_NOTIFICATION_CONSTANTS.TYPE_WARNING,t,e)}destroy(){this.activeToasts.forEach(t=>t.destroy()),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),instance=null,stylesInjected=!1}}module.exports={NotificationManager:NotificationManager};
