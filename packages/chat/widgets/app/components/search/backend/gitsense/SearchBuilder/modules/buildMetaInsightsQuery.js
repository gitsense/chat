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

let format=require("sql-formatter").format,castJsonExtract=require("../../utils/sqlCastingUtils").castJsonExtract,resolveDescendantChatIds=require("./scopeResolvers/resolveDescendantChatIds").resolveDescendantChatIds,resolveConnectedChatIds=require("./scopeResolvers/resolveConnectedChatIds").resolveConnectedChatIds,routeFilters=require("./buildStandardSearchQuery/filterRouter").routeFilters,applyTableFilters=require("./buildStandardSearchQuery/tableMatcherUtils").applyTableFilters,FIELD_TABLE_MAP=require("../constants").FIELD_TABLE_MAP,DEBUG="TRUE"===process.env.GSC_DEBUG?.toUpperCase();async function buildMetaInsightsQuery(t,e,s=null){let{analyzerId:a,insightFields:l,repoFullNames:r,chatIds:n,scope:i,pagination:o}=e;if(!a)throw new Error("Analyzer ID is mandatory for the meta-insights profile.");if(!l||0===l.length)throw new Error("At least one insight field is mandatory for the meta-insights profile.");if(1<l.length)throw new Error("Querying multiple insight fields simultaneously is not yet supported.");var{field:u,type:c}=l[0];let d=null,h=("current-chat"===i&&null!==s?d=[s]:"current-chat-and-branches"===i&&null!==s?d=await resolveDescendantChatIds(t,s):"connected-chats"===i&&null!==s&&(d=await resolveConnectedChatIds(t,s)),null),g=(null!==n&&0<n.length?h=null!==d?d.filter(e=>n.includes(e)):n:null!==d&&(h=d),null),m=null;s=r&&0<r.length||null!==h&&0<h.length;s&&(m="cte_filter_chat_ids",g=t("chats").select("chats.id as chat_id").where("chats.deleted",0),r&&0<r.length&&(g=g.join("groups","chats.group_id","groups.id").whereIn("groups.name",r)),null!==h)&&0<h.length&&(g=g.whereIn("chats.id",h));let _=t("messages").select("messages.meta").where("messages.deleted",0).where(t.raw("messages.type = ?",[a]));s&&(_=_.join(m,"messages.chat_id",m+".chat_id"));let f;u="$.extracted_metadata."+u;if("array"===c)f=t.select(t.raw("j.value as insight_value"),t.raw("COUNT(*) as value_count")).from(_.as("m")).crossJoin(t.raw("json_each(m.meta, ?) as j",[u])).groupBy("j.value");else{let e;e="string"===c?"TEXT":"number"===c?"REAL":"boolean"===c?"INTEGER":"datetime"===c?"REAL":"TEXT";c=castJsonExtract(t,"cte_filtered_messages","meta",u,e,"insight_value");f=t(_.as("cte_filtered_messages")).select(c,t.raw("COUNT(*) as value_count")).groupBy("insight_value")}u=t(f.as("cte_metadata_counts")).select("insight_value","value_count"),u.orderBy([{column:"value_count",order:"desc"},{column:"insight_value",order:"asc"}]),c=o?.limit,t=o?.offset;null!==c&&0<c&&u.limit(c),null!==t&&0<=t&&u.offset(t),DEBUG&&(console.log("META INSIGHTS SQL QUERY:"),console.log(format(u.toString(),{language:"sqlite"})));let p=u;return{finalQuery:p=s?u.with(m,g):p,matchCTEs:{},searchCriteria:e,isMetaInsights:!0,valueField:"insight_value",countField:"value_count"}}module.exports={buildMetaInsightsQuery:buildMetaInsightsQuery};
