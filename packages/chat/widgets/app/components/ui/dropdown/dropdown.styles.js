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

let dropdownStyles=`
.gsc-dropdown-container {
  display: inline-block; /* Or block, depending on desired layout */
  position: relative;
  font-family: sans-serif; /* Example font */
  user-select: none; /* Prevent text selection within the component */
}

.gsc-dropdown-label {
  font-weight: bold;
  margin-right: 5px;
  /* Add other label styles */
}

.gsc-dropdown-display {
  display: inline-flex; /* Use flex to align text and caret */
  align-items: center;
  padding: 2px 5px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  /* Allow width to be determined by content */
  width: auto;
  box-sizing: border-box; /* Include padding and border in element's total width */
  outline: none; /* Remove default focus outline */
}

.gsc-dropdown-display:focus {
  border-color: #007bff; /* Example focus style */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Example focus shadow */
}

.gsc-dropdown-selected-text {
  flex-grow: 1; /* Allow text to take available space */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow if text is too long */
  text-overflow: ellipsis; /* Add ellipsis for truncated text */
  font-size: .9em;
  position: relative;
  top: 1px;
}

.gsc-dropdown-caret {
  display: flex; /* Use flex for centering SVG */
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  transition: transform 0.2s ease-in-out;
  /* Add size for default caret if not using SVG */
  width: 1em;
  height: 1em;
  font-size: .45em;
  position: relative;
  top: 1px;
  flex-shrink: 0; /* Prevent caret from shrinking */,
}

/* Style for the SVG inside the caret container */
.gsc-dropdown-caret svg {
    display: block; /* Ensure SVG behaves like a block element for sizing */
    width: 100%; /* Make SVG fill its container */
    height: 100%; /* Make SVG fill its container */
}


.gsc-dropdown-options-list {
  position: absolute;
  top: 100%; /* Position below the display element */
  left: 0;
  /* right: 0; /* Make list width match display width - uncomment if needed */
  min-width: 100%; /* Ensure list is at least as wide as the display */
  z-index: 1000; /* Ensure it appears above other content */
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  max-height: 250px; /* Example: limit height and add scrolling */
  overflow-y: scroll;
  box-sizing: border-box; /* Include padding and border in element's total width */
  z-index: 100000;
}

/* Hide the list by default */
.gsc-dropdown-options-list[aria-hidden="true"] {
    display: none;
}

/* Style for the scrollable menu header */
.gsc-dropdown-scrollable-header {
    font-size: .8em;
    text-align: center;
    padding: 0px 0px 5px 0px;
    color: #555; /* Slightly muted color */
    border-bottom: 1px solid #eee; /* Separator line */
    margin-bottom: 5px; /* Space below the header */
    /* Ensure it's not selectable or interactive */
    user-select: none;
    pointer-events: none;
}

/* Style for divider elements */
.gsc-dropdown-divider {
    margin: 5px 0 8px 0;
    border-bottom: 1px solid #ccc;
    color: #999;
    user-select: none;
    pointer-events: none;
}

.gsc-dropdown-option {
  padding: 4px 8px; /* Removed left padding */
  cursor: pointer;
  outline: none; /* Remove default focus outline */
  font-size: 13px;
  white-space: nowrap;
}

.gsc-dropdown-option:hover,
.gsc-dropdown-option:focus { /* Add focus style for keyboard navigation */
  background-color: #f0f0f0; /* Example hover/focus style */
}

/* Style for the currently selected option in the list (optional) */
.gsc-dropdown-option[aria-selected="true"] {
    background-color: #e9e9e9; /* Example style for selected item in list */
    font-weight: bold; /* Optional: bold the selected item in list */
}


/* Rotate the caret when the dropdown is open */
.gsc-dropdown-container.is-open .gsc-dropdown-caret {
  transform: rotate(180deg);
}
`;module.exports=dropdownStyles;
