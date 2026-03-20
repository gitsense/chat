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

let CSS_CLASSES=require("./constants").CSS_CLASSES,styles=`
/* Menu Button Container - Defines the outer border and overall appearance */
.${CSS_CLASSES.CONTAINER} {
    display: inline-flex;
    align-items: stretch;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border: 1px solid #ccc;
}

/* Main Button - Takes most of the width with contrasting border-right */
.${CSS_CLASSES.MAIN_BUTTON} {
    flex: 1;
    color: #333;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    border: none;
    background-color: #f8f9fa;
    border-right: 1px solid #ccc;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

/* Dropdown Button - Fixed width for the arrow */
.${CSS_CLASSES.DROPDOWN_BUTTON} {
    min-width: 40px;
    padding: 8px 12px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    border: none;
    background-color: #f8f9fa;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

/* Hover States */
.${CSS_CLASSES.MAIN_BUTTON}:hover:not(:disabled),
.${CSS_CLASSES.DROPDOWN_BUTTON}:hover:not(:disabled) {
    background-color: #e9ecef;
}

/* Active/Focus States */
.${CSS_CLASSES.MAIN_BUTTON}:active:not(:disabled),
.${CSS_CLASSES.DROPDOWN_BUTTON}:active:not(:disabled) {
    background-color: #dee2e6;
}

.${CSS_CLASSES.MAIN_BUTTON}:focus,
.${CSS_CLASSES.DROPDOWN_BUTTON}:focus {
    outline: 2px solid #007bff;
    outline-offset: -2px;
}

/* Disabled State */
.${CSS_CLASSES.CONTAINER}.${CSS_CLASSES.DISABLED} {
    opacity: 0.6;
    pointer-events: none;
}

/* Variant: Primary */
.${CSS_CLASSES.CONTAINER}.primary {
    border-color: #0056b3;
}

.${CSS_CLASSES.CONTAINER}.primary .${CSS_CLASSES.MAIN_BUTTON},
.${CSS_CLASSES.CONTAINER}.primary .${CSS_CLASSES.DROPDOWN_BUTTON} {
    background-color: #007bff;
    color: white;
}

.${CSS_CLASSES.CONTAINER}.primary .${CSS_CLASSES.MAIN_BUTTON} {
    border-right-color: white;
}

.${CSS_CLASSES.CONTAINER}.primary .${CSS_CLASSES.MAIN_BUTTON}:hover:not(:disabled),
.${CSS_CLASSES.CONTAINER}.primary .${CSS_CLASSES.DROPDOWN_BUTTON}:hover:not(:disabled) {
    background-color: #0056b3;
}

/* Variant: Secondary */
.${CSS_CLASSES.CONTAINER}.secondary {
    border-color: #ccc;
}

.${CSS_CLASSES.CONTAINER}.secondary .${CSS_CLASSES.MAIN_BUTTON},
.${CSS_CLASSES.CONTAINER}.secondary .${CSS_CLASSES.DROPDOWN_BUTTON} {
    background-color: #f8f9fa;
    color: #333;
}

.${CSS_CLASSES.CONTAINER}.secondary .${CSS_CLASSES.MAIN_BUTTON} {
    border-right-color: #ccc;
}

.${CSS_CLASSES.CONTAINER}.secondary .${CSS_CLASSES.MAIN_BUTTON}:hover:not(:disabled),
.${CSS_CLASSES.CONTAINER}.secondary .${CSS_CLASSES.DROPDOWN_BUTTON}:hover:not(:disabled) {
    background-color: #e9ecef;
}

/* Variant: Danger */
.${CSS_CLASSES.CONTAINER}.danger {
    border-color: #932432;
}

.${CSS_CLASSES.CONTAINER}.danger .${CSS_CLASSES.MAIN_BUTTON},
.${CSS_CLASSES.CONTAINER}.danger .${CSS_CLASSES.DROPDOWN_BUTTON} {
    background-color: #dc3545;
    color: white;
}

.${CSS_CLASSES.CONTAINER}.danger .${CSS_CLASSES.MAIN_BUTTON} {
    border-right-color: white;
}

.${CSS_CLASSES.CONTAINER}.danger .${CSS_CLASSES.MAIN_BUTTON}:hover:not(:disabled),
.${CSS_CLASSES.CONTAINER}.danger .${CSS_CLASSES.DROPDOWN_BUTTON}:hover:not(:disabled) {
    background-color: #bd2130;
}

/* Size: Small */
.${CSS_CLASSES.CONTAINER}.small .${CSS_CLASSES.MAIN_BUTTON} {
    padding: 5px 12px;
    font-size: 13px;
}

.${CSS_CLASSES.CONTAINER}.small .${CSS_CLASSES.DROPDOWN_BUTTON} {
    padding: 5px 8px;
}

/* Size: Large */
.${CSS_CLASSES.CONTAINER}.large .${CSS_CLASSES.MAIN_BUTTON},
.${CSS_CLASSES.CONTAINER}.large .${CSS_CLASSES.DROPDOWN_BUTTON} {
    padding: 12px 20px;
    font-size: 16px;
}

/* Icon adjustments for dropdown button */
.${CSS_CLASSES.DROPDOWN_BUTTON} svg {

}
`;module.exports={styles:styles};
