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

function generateMarkdownReport(e,o,t,a,n,r=null){let i=`<!-- INLINE_AGENT: Intent Driven Workflow -->

`;return i=i+`# Turn ${t} - ${a.charAt(0).toUpperCase()+a.slice(1)} Report

`+`## Intent

\`\`\`md
${e}
\`\`\`

`,"discovery"===a?i+=generateDiscoverySection(o,n,r):"change"===a&&(i+=generateChangeSection(o,n)),i}function generateDiscoverySection(e,o,t=null){var a=e?.discovery?.candidates||[],n=e?.discovery?.discovery_log,e=e?.discovery?.coverage||"N/A";let r="";return o&&0<o.length&&(r+=`## Working Directory Map

`,o.forEach(e=>{r+=`- Working Directory ${e.ID}: ${e.Name}
`}),r+=`
---

`),t&&(r+=`## Discovery Mode

${"experts"===t?"Experts Mode (brain-powered search)":"Generic Mode (traditional search)"}

---

`),r=(r+=`## Candidates (${a.length} files found)

`)+`| # | File Path | Score | Key Keywords |
`+`|---|-----------|-------|--------------|
`,a.forEach((e,o)=>{var t=e.metadata?.keywords?.slice(0,3).join(", ")||"N/A";r+=`| ${o+1} | \`${e.file_path}\` | ${(100*e.score).toFixed(0)}% | ${t} |
`}),r=r+`
---

`+`## Candidate Details

`,a.forEach((e,o)=>{r+=`### ${o+1}. ${e.file_path} (Score: ${(100*e.score).toFixed(0)}%)
`,e.metadata?.purpose&&(r+=`**Purpose:** ${e.metadata.purpose}

`),e.reasoning&&(r+=`**Reasoning:** ${e.reasoning}

`),e.metadata?.keywords&&(r+=`**Keywords:** ${e.metadata.keywords.map(e=>`\`${e}\``).join(", ")}

`),e.metadata?.parent_keywords&&(r+=`**Parent Keywords:** ${e.metadata.parent_keywords.map(e=>`\`${e}\``).join(", ")}

`),e.code_validation&&(r+=`**Code Validation:** ${e.code_validation.implementation_details||"Confirmed"}

`,e.code_validation.confirmed_patterns)&&0<e.code_validation.confirmed_patterns.length&&(r+=`**Confirmed Patterns:**
`,e.code_validation.confirmed_patterns.forEach(e=>{r+=`- ${e}
`}),r+=`
`),r+=`---

`}),n&&(r+=`## Discovery Log

`,n.intent_keywords&&(r+=`### Intent Keywords
${n.intent_keywords.map(e=>`\`${e}\``).join(", ")}

`),n.pivot_checks&&(r+=`### Pivot Checks
${n.pivot_checks.map((e,o)=>o+1+". "+e).join("\n")}

`),n.methodology&&(r+=`### Methodology
${n.methodology}

`),void 0!==n.total_candidates_found)&&(r=(r=(r+=`### Statistics
`)+`- **Total Candidates Found:** ${n.total_candidates_found}
`)+`- **Top Candidates Returned:** ${n.top_candidates_returned}
`,void 0!==n.candidates_filtered_out&&(r+=`- **Candidates Filtered Out:** ${n.candidates_filtered_out}
`),r+=`
`),r+=`## Coverage
${e}
`}function generateChangeSection(e,o){var e=e?.change,t=e?.files_modified?.files||[];let a="";return o&&0<o.length&&(a+=`## Working Directory Map

`,o.forEach(e=>{a+=`- Working Directory ${e.ID}: ${e.Name}
`}),a+=`
---

`),e&&(a=(a+=`## Change Summary

`)+`- **Files Modified:** ${e.files_modified.total_count}
`,0<t.length&&(a+=`- **Modified Files:**
`,t.forEach(e=>{a+=`  - \`${e.path}\`
`}),a+=`
`),e.notes&&(a+=`- **Notes:** ${e.notes}

`),a+=`---

`),a+=`## Modified Files (${t.length} files)

`,t.forEach((e,o)=>{a+=`### ${o+1}. ${e.path}
`,e.status&&(a+=`**Status:** ${e.status}

`),e.scope&&(a+=`**Scope:** ${e.scope}

`),e.reason&&(a+=`**Reason:** ${e.reason}

`),a+=`---

`}),a}module.exports={generateMarkdownReport:generateMarkdownReport};
