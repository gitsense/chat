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

let FIELD_TABLE_MAP=require("../../constants").FIELD_TABLE_MAP;function routeFilters(e){var l,t,i,n,o,s,r,a,c,f={role:"messages.role",name:"chats.name","git-path":"chats.meta.git_path",lang:"chats.meta.language","msg-type":"messages.type","chat-type":"chats.type"},p={messages:{filters:{},nullFilters:{},notNullFilters:{}},chats:{filters:{},nullFilters:{},notNullFilters:{}},code_blocks:{filters:{},nullFilters:{},notNullFilters:{}}};for(l in e.filters)"chat-id"===l?console.debug(`Filter field "${l}" is handled by scope logic. Skipping routing.`):(t=f[l]||l,(i=FIELD_TABLE_MAP[t])?"table"===i.source&&i.table?p[i.table]?p[i.table].filters[t]=e.filters[l]:console.warn(`Filter field "${l}" maps to unknown table "${i.table}". Skipping.`):console.warn(`Filter field "${l}" is not a direct table field or has no specified table. Skipping routing for table-specific matchers.`):console.warn(`Unknown filter field "${l}". Skipping.`));for(n of Object.keys(e.nullFilters))"chat-id"===n?console.debug(`Null filter field "${n}" is handled by scope logic. Skipping routing.`):(o=f[n]||n,(s=FIELD_TABLE_MAP[o])?"table"===s.source&&s.table?p[s.table]?p[s.table].nullFilters[n]=!0:console.warn(`Null filter field "${o}" maps to unknown table "${s.table}". Skipping.`):console.warn(`Null filter field "${n}" is not a direct table field or has no specified table. Skipping routing for table-specific matchers.`):console.warn(`Unknown null filter field "${n}". Skipping.`));for(r of Object.keys(e.notNullFilters))"chat-id"===r?console.debug(`Not null filter field "${r}" is handled by scope logic. Skipping routing.`):(a=f[r]||r,(c=FIELD_TABLE_MAP[a])?"table"===c.source&&c.table?p[c.table]?p[c.table].notNullFilters[r]=!0:console.warn(`Not null filter field "${a}" maps to unknown table "${c.table}". Skipping.`):console.warn(`Not null filter field "${r}" is not a direct table field or has no specified table. Skipping routing for table-specific matchers.`):console.warn(`Unknown not null filter field "${r}". Skipping.`));return p}module.exports={routeFilters:routeFilters};
