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

class LanguageFilterState{constructor(){this.selectedLanguages=new Set}toggleLanguage(e,t){t?this.selectedLanguages.add(e):this.selectedLanguages.delete(e)}isSelected(e){return this.selectedLanguages.has(e)}getSelectedLanguages(){return new Set(this.selectedLanguages)}setSelectedLanguages(e){e instanceof Set?this.selectedLanguages=new Set(e):console.error("setSelectedLanguages expects a Set.")}clearSelections(){this.selectedLanguages.clear()}}module.exports={LanguageFilterState:LanguageFilterState};
