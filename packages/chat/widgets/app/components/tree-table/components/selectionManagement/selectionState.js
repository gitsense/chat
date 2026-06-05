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

let{optionsMap,DEFAULT_SELECTION_OPTIONS}=require("./selectionConfig"),STORAGE_KEY="gsc-selection-management-options";function saveSelectionOptions(e){localStorage.setItem(STORAGE_KEY,JSON.stringify(e))}function loadSelectionOptions(){var e=localStorage.getItem(STORAGE_KEY);if(e)try{var t=JSON.parse(e);if(t.selectedType&&t.selectedOption)return t}catch(e){console.error("Error parsing selection options from localStorage:",e)}return{...DEFAULT_SELECTION_OPTIONS}}function clearSelectionOptions(){localStorage.removeItem(STORAGE_KEY)}function validateAndCorrectOptions(e){var t,{selectedType:n,selectedOption:o}=e;return optionsMap[n]?(t=optionsMap[n].map(e=>e.value)).includes(o)||(t=t[0],console.warn(`Invalid selectedOption "${o}" for selectedType "${n}". Correcting to "${t}".`),e.selectedOption=t):(console.warn(`Invalid selectedType "${n}" detected. Resetting to default.`),o=DEFAULT_SELECTION_OPTIONS.selectedType,e.selectedType=o,e.selectedOption=optionsMap[o][0].value),e}function extendStateWithSelectionOptions(t){var e=validateAndCorrectOptions(loadSelectionOptions());return t.selectionOptions=e,t.setRecursiveSelection(e.recursiveSelection),t.setFileSelectionEnabled(e.fileSelectionEnabled),t.setDirectorySelectionEnabled(e.directorySelectionEnabled),t.updateSelectionOptions=e=>{e=validateAndCorrectOptions({...t.selectionOptions,...e});t.selectionOptions=e,t.setRecursiveSelection(e.recursiveSelection),t.setFileSelectionEnabled(e.fileSelectionEnabled),t.setDirectorySelectionEnabled(e.directorySelectionEnabled),saveSelectionOptions(t.selectionOptions)},t.clearSelectionOptions=()=>{t.selectionOptions={...DEFAULT_SELECTION_OPTIONS},t.setRecursiveSelection(DEFAULT_SELECTION_OPTIONS.recursiveSelection),t.setFileSelectionEnabled(DEFAULT_SELECTION_OPTIONS.fileSelectionEnabled),t.setDirectorySelectionEnabled(DEFAULT_SELECTION_OPTIONS.directorySelectionEnabled),clearSelectionOptions()},t}module.exports={extendStateWithSelectionOptions:extendStateWithSelectionOptions};
