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

let ConfirmationBox=require("../../ui/confirmation-box").ConfirmationBox,deleteChat=require("../../../chat").deleteChat;class DeleteChatModal{constructor(t,e,o){this.widget=t,this.chat=e,this.onChatDelete=o,this.confirmationBox=new ConfirmationBox}render(){var t="Delete Chat: "+this.chat.name;this.confirmationBox.show({title:t,message:"Are you sure you want to delete this chat? This action performs a soft delete and can be undone by an administrator.",confirmButtonText:"Yes, Delete",cancelButtonText:"Cancel",confirmButtonLoadingText:"Deleting..."},async()=>{var t=await deleteChat(this.widget,this.chat);t.success?this.onChatDelete(!0):this.onChatDelete(!1,t.error)})}}module.exports=DeleteChatModal;
