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

let ConfirmationBox=require("../../ui/confirmation-box").ConfirmationBox,deleteChat=require("../../../chat").deleteChat;class DeleteChatModal{constructor(t,e,o){this.widget=t,this.chat=e,this.onChatDelete=o,this.confirmationBox=new ConfirmationBox}render(){var t="Delete Chat: "+this.chat.name;this.confirmationBox.show({title:t,message:"Are you sure you want to delete this chat? This action performs a soft delete and can be undone by an administrator.",confirmButtonText:"Yes, Delete",cancelButtonText:"Cancel",confirmButtonLoadingText:"Deleting..."},async()=>{var t=await deleteChat(this.widget,this.chat);t.success?this.onChatDelete(!0):this.onChatDelete(!1,t.error)})}}module.exports=DeleteChatModal;
