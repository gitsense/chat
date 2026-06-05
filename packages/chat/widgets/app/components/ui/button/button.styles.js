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

let{CSS_CLASSES,VARIANTS,SIZES}=require("./constants"),styles=`
.${CSS_CLASSES.BUTTON} {
    /* Base Styles */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: inherit;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    text-decoration: none;
    user-select: none;
}

/* --- SIZES --- */
.${CSS_CLASSES.BUTTON}.${SIZES.SMALL} {
    padding: 4px 8px;
    font-size: 0.8em;
    height: 24px;
}
.${CSS_CLASSES.BUTTON}.${SIZES.MEDIUM} {
    padding: 8px 16px;
    font-size: 0.9em;
    height: 32px;
}
.${CSS_CLASSES.BUTTON}.${SIZES.LARGE} {
    padding: 10px 20px;
    font-size: 1em;
    height: 40px;
}

/* --- VARIANTS --- */

/* Primary (Blue/Default) */
.${CSS_CLASSES.BUTTON}.${VARIANTS.PRIMARY} {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.PRIMARY}:hover:not(.${CSS_CLASSES.DISABLED}) {
    background-color: #0056b3;
    border-color: #0056b3;
}

/* Secondary (Gray/Outline) */
.${CSS_CLASSES.BUTTON}.${VARIANTS.SECONDARY} {
    background-color: white;
    color: #333;
    border-color: #ccc;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.SECONDARY}:hover:not(.${CSS_CLASSES.DISABLED}) {
    background-color: #f4f4f4;
    border-color: #bbb;
}

/* Tertiary (Minimal/Text-only) */
.${CSS_CLASSES.BUTTON}.${VARIANTS.TERTIARY} {
    background-color: transparent;
    color: #007bff;
    border-color: transparent;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.TERTIARY}:hover:not(.${CSS_CLASSES.DISABLED}) {
    background-color: #f0f8ff;
}

/* Danger (Red) */
.${CSS_CLASSES.BUTTON}.${VARIANTS.DANGER} {
    background-color: #dc3545;
    color: white;
    border-color: #dc3545;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.DANGER}:hover:not(.${CSS_CLASSES.DISABLED}) {
    background-color: #c82333;
    border-color: #bd2130;
}

/* Link (Text link appearance) */
.${CSS_CLASSES.BUTTON}.${VARIANTS.LINK} {
    background-color: transparent;
    color: #007bff;
    border-color: transparent;
    padding: 0;
    height: auto;
    line-height: 1.5;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.LINK}:hover:not(.${CSS_CLASSES.DISABLED}) {
    text-decoration: underline;
}

/* Icon (Square button for icons) */
.${CSS_CLASSES.BUTTON}.${VARIANTS.ICON} {
    background-color: transparent;
    color: #333;
    border: none;
    padding: 0;
    width: 24px;
    height: 24px;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.ICON}:hover:not(.${CSS_CLASSES.DISABLED}) {
    background-color: #f4f4f4;
    border-radius: 2px;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.ICON}.${SIZES.SMALL} {
    width: 20px;
    height: 20px;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.ICON}.${SIZES.LARGE} {
    width: 32px;
    height: 32px;
}


/* --- ICONS & CONTENT --- */
.${CSS_CLASSES.BUTTON} svg {
    fill: currentColor;
    flex-shrink: 0;
}
.${CSS_CLASSES.ICON_LEFT} {
    margin-right: 6px;
}
.${CSS_CLASSES.ICON_RIGHT} {
    margin-left: 6px;
}
.${CSS_CLASSES.BUTTON}.${VARIANTS.ICON} .${CSS_CLASSES.ICON_LEFT},
.${CSS_CLASSES.BUTTON}.${VARIANTS.ICON} .${CSS_CLASSES.ICON_RIGHT} {
    margin: 0;
}

/* --- DISABLED STATE --- */
.${CSS_CLASSES.DISABLED} {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

/* --- LOADING STATE (Placeholder for spinner) --- */
.${CSS_CLASSES.LOADING} {
    cursor: wait;
    pointer-events: none;
}
`;module.exports={styles:styles};
