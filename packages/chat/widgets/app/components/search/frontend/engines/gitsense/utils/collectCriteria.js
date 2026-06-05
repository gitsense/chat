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

function collectCriteria(s,e){var a=require("../config/searchTargetOptions");let c={query:"",scope:"all-chats",options:{caseSensitive:!1,regex:!1},engine:e.engineName,aiEnabled:!0,aiAssistant:"",searchTargetProfile:"",targets:[],filters:{}},r=null,t=e=>{e.forEach(e=>{if(Array.isArray(e))t(e);else{let t=e;var a=(e=>{var{name:a,type:e}=e,r=s.querySelector(`[name="${a}"]`);if(r)switch(e){case"textarea":case"input":case"select":case"textarea":return r.__dropdownInstance?r.__dropdownInstance.getValue():r.value;case"checkbox":return r.checked;case"radio-group":var t=s.querySelector(`input[name="${a}"]:checked`);return t?t.value:void 0;case"multi-select":return Array.from(r.selectedOptions).map(e=>e.value);default:return}})(t);if(void 0!==a)switch(t.name){case"queryInput":c.query=a;break;case"scopeSelect":c.scope=a;break;case"engineSelect":c.engine=a;break;case"aiEnabledCheckbox":c.aiEnabled=a;break;case"aiAssistantSelect":c.aiAssistant=a;break;case"targetSelect":c.targets=[a];break;case"searchTargetProfileSelect":r=a,c.searchTargetProfile=a}"input"!==t.type&&"textarea"!==t.type||!Array.isArray(t.controls)||t.controls.forEach(e=>{var a=s.querySelector(`[name="${t.name}"]`).closest(`.search-tool-${t.type}-container`);if(a){a=a.querySelector(`[data-control-type="${e.type}"]`);if(a){var r=a.dataset.state;switch(e.type){case"caseSensitive":c.options.caseSensitive="enabled"===r;break;case"regex":c.options.regex="enabled"===r}}}})}})};return e.layout&&Array.isArray(e.layout)&&e.layout.forEach(e=>{"row"===e.type&&Array.isArray(e.elements)&&t(e.elements)}),e.sections&&Array.isArray(e.sections)&&e.sections.forEach(e=>{e.layout&&Array.isArray(e.layout)&&e.layout.forEach(e=>{"row"===e.type&&Array.isArray(e.elements)&&t(e.elements)})}),c.aiEnabled||null===r||(e=a.find(e=>e.value===r))&&(c.targets=e.criteria.targets,Object.assign(c.filters,e.criteria.filters)),c}module.exports={collectCriteria:collectCriteria};
