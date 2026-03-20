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

let{optionsMap,DEFAULT_SELECTION_OPTIONS}=require("./selectionConfig"),STORAGE_KEY="gsc-selection-management-options";function saveSelectionOptions(e){localStorage.setItem(STORAGE_KEY,JSON.stringify(e))}function loadSelectionOptions(){var e=localStorage.getItem(STORAGE_KEY);if(e)try{var t=JSON.parse(e);if(t.selectedType&&t.selectedOption)return t}catch(e){console.error("Error parsing selection options from localStorage:",e)}return{...DEFAULT_SELECTION_OPTIONS}}function clearSelectionOptions(){localStorage.removeItem(STORAGE_KEY)}function validateAndCorrectOptions(e){var t,{selectedType:n,selectedOption:o}=e;return optionsMap[n]?(t=optionsMap[n].map(e=>e.value)).includes(o)||(t=t[0],console.warn(`Invalid selectedOption "${o}" for selectedType "${n}". Correcting to "${t}".`),e.selectedOption=t):(console.warn(`Invalid selectedType "${n}" detected. Resetting to default.`),o=DEFAULT_SELECTION_OPTIONS.selectedType,e.selectedType=o,e.selectedOption=optionsMap[o][0].value),e}function extendStateWithSelectionOptions(t){var e=validateAndCorrectOptions(loadSelectionOptions());return t.selectionOptions=e,t.setRecursiveSelection(e.recursiveSelection),t.setFileSelectionEnabled(e.fileSelectionEnabled),t.setDirectorySelectionEnabled(e.directorySelectionEnabled),t.updateSelectionOptions=e=>{e=validateAndCorrectOptions({...t.selectionOptions,...e});t.selectionOptions=e,t.setRecursiveSelection(e.recursiveSelection),t.setFileSelectionEnabled(e.fileSelectionEnabled),t.setDirectorySelectionEnabled(e.directorySelectionEnabled),saveSelectionOptions(t.selectionOptions)},t.clearSelectionOptions=()=>{t.selectionOptions={...DEFAULT_SELECTION_OPTIONS},t.setRecursiveSelection(DEFAULT_SELECTION_OPTIONS.recursiveSelection),t.setFileSelectionEnabled(DEFAULT_SELECTION_OPTIONS.fileSelectionEnabled),t.setDirectorySelectionEnabled(DEFAULT_SELECTION_OPTIONS.directorySelectionEnabled),clearSelectionOptions()},t}module.exports={extendStateWithSelectionOptions:extendStateWithSelectionOptions};
