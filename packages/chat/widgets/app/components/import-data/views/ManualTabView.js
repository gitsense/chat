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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,IMPORT_DATA_CONSTANTS=require("../constants").IMPORT_DATA_CONSTANTS;class ManualTabView{constructor(e,t){this.containerElement=e,this.context=t,this.showDetailedInstructions=!1}render(){this.containerElement.innerHTML="";var e=DomUtils.h.createDiv(),t=(e.className="import-data-manual-container",DomUtils.h.createP());t.className="import-data-manual-subtitle",t.textContent="For command-line power users who need to import complete directory structures without file count or size limitations.",e.appendChild(t),this._createQuickStartSection(e),this._createDetailedInstructionsSection(e),this.containerElement.appendChild(e)}_createQuickStartSection(e){var t=DomUtils.h.createDiv(),o=(t.className="import-data-quick-start",DomUtils.h.createH3()),o=(o.textContent="Quick Start",t.appendChild(o),DomUtils.h.createDiv()),i=(o.className="import-data-command-section",DomUtils.h.createH4()),i=(i.textContent="NPM Installation",o.appendChild(i),DomUtils.h.createPre()),i=(i.className="import-data-command-syntax",i.textContent="gscb import git <path to repo> <repo owner> <repo name> <branch>",o.appendChild(i),t.appendChild(o),DomUtils.h.createDiv()),o=(i.className="import-data-command-section",DomUtils.h.createH4()),o=(o.textContent="Docker Installation",i.appendChild(o),DomUtils.h.createPre()),o=(o.className="import-data-command-syntax",o.textContent="./gsc-docker bash\ngscb import git /app/host_repos/awesome acme awesome main",i.appendChild(o),t.appendChild(i),DomUtils.h.createDiv()),i=(o.className="import-data-learn-more",DomUtils.h.createA());i.href="#",i.textContent="Learn more about advanced options and troubleshooting",i.addEventListener("click",e=>{e.preventDefault(),this._toggleDetailedInstructions()}),o.appendChild(i),t.appendChild(o),e.appendChild(t)}_createDetailedInstructionsSection(e){var t=DomUtils.h.createDiv(),o=(t.className="import-data-detailed-instructions",t.style.display="none",DomUtils.h.createH3()),o=(o.textContent="Detailed Instructions",t.appendChild(o),DomUtils.h.createDiv()),i=(o.className="import-data-command-details",DomUtils.h.createH4()),i=(i.textContent="NPM Installation",o.appendChild(i),DomUtils.h.createP()),i=(i.textContent="If you installed GitSense Chat using NPM, use the `gscb import git` command directly from your terminal.",o.appendChild(i),DomUtils.h.createP()),i=(i.textContent="Syntax:",o.appendChild(i),DomUtils.h.createPre()),i=(i.className="import-data-command-syntax",i.textContent="gscb import git <path to repo> <repo owner> <repo name> <branch>",o.appendChild(i),DomUtils.h.createDiv()),i=(i.className="import-data-command-params",i.innerHTML=`
            <ul>
                <li><code>&lt;path to repo&gt;</code>: The local file system path to the Git repository (e.g., <code>/repos/acme/awesome</code>).</li>
                <li><code>&lt;repo owner&gt;</code>: The owner or organization of the Git repository as it will appear in GitSense Chat (e.g., <code>acme</code>).</li>
                <li><code>&lt;repo name&gt;</code>: The name of the Git repository (e.g., <code>chat</code>).</li>
                <li><code>&lt;branch&gt;</code>: The specific branch you want to import (e.g., <code>main</code>).</li>
            </ul>
        `,o.appendChild(i),DomUtils.h.createP()),i=(i.textContent="Example:",o.appendChild(i),DomUtils.h.createPre()),i=(i.className="import-data-command-example",i.textContent="gscb import git /repos/acme/awesome acme awesome main",o.appendChild(i),t.appendChild(o),DomUtils.h.createDiv()),o=(i.className="import-data-command-details",DomUtils.h.createH4()),o=(o.textContent="Docker Installation",i.appendChild(o),DomUtils.h.createP()),o=(o.textContent="If you are running GitSense Chat using Docker, you need to ensure your local Git repositories are accessible from within the Docker container. This is done by setting an environment variable and then executing the `gscb` command from an interactive bash session inside the container.",i.appendChild(o),DomUtils.h.createH5()),o=(o.textContent="Prerequisites for Docker Imports",i.appendChild(o),DomUtils.h.createP()),o=(o.innerHTML=`
            <strong><code>GSC_REPOS_DIR</code> Environment Variable:</strong> Before starting your GitSense Chat container, you must set the <code>GSC_REPOS_DIR</code> environment variable on your host machine. This variable should point to the <strong>absolute path</strong> of the directory on your host that contains your Git repositories. This directory will be mounted into the Docker container, making your repositories visible to the <code>gscb</code> tool.
            <br><br>
            <strong>Example:</strong>
            <ul>
                <li>On Linux/macOS: <code>export GSC_REPOS_DIR="/Users/youruser/my_git_repos"</code></li>
                <li>On Windows (PowerShell): <code>$env:GSC_REPOS_DIR="C:\\Users\\youruser\\my_git_repos"</code></li>
            </ul>
            <br>
            <strong>Important:</strong> If <code>GSC_REPOS_DIR</code> is not set when you run <code>gsc-docker start</code>, you will receive a warning, and the container will not be able to access your local Git repositories for import.
        `,i.appendChild(o),DomUtils.h.createH5()),o=(o.textContent="Steps to Import",i.appendChild(o),DomUtils.h.createDiv()),o=(o.innerHTML=`
            <p><strong>1. Set <code>GSC_REPOS_DIR</code> (if not already set):</strong><br>
            Open your terminal and set the environment variable to the path where your Git repositories are located on your host machine.</p>
            
            <pre class="import-data-command-syntax"># Example for macOS/Linux:
export GSC_REPOS_DIR="/path/to/your/local/git/repos"

# Example for Windows (PowerShell):
# $env:GSC_REPOS_DIR="C:\\path\\to\\your\\local\\git\\repos"</pre>
            
            <p><strong>2. Start GitSense Chat Docker Container:</strong><br>
            Start the GitSense Chat container using the <code>gsc-docker</code> helper script. The script will automatically bind-mount your specified <code>GSC_REPOS_DIR</code> into the container at <code>/app/host_repos</code>.</p>
            
            <pre class="import-data-command-syntax">./gsc-docker start</pre>
            
            <p>You should see a message indicating that your host directory is being mounted:
            <code>Mounting host directory '/path/to/your/local/git/repos' to '/app/host_repos' inside the container.</code></p>
            
            <p><strong>3. Start an Interactive Bash Session and Import Your Git Repository:</strong><br>
            Once the container is running, you will need to start an interactive bash session inside the container to run the <code>gscb</code> command. <strong>Crucially, for <code>&lt;path to repo&gt;</code>, you must use the *internal container path* where your repository is mounted, which is <code>/app/host_repos/&lt;your_repo_name&gt;</code>.</strong></p>
            
            <pre class="import-data-command-syntax"># Start an interactive bash session
./gsc-docker bash

# Once inside the container, execute the gscb import command:
gscb import git /app/host_repos/awesome acme awesome main</pre>
        `,i.appendChild(o),DomUtils.h.createH5()),o=(o.textContent="Updating an Imported Repository",i.appendChild(o),DomUtils.h.createP()),o=(o.innerHTML=`
            To update an already imported repository with its latest changes, you will need to repeat the steps above: start a bash session using <code>./gsc-docker bash</code> and then execute the <strong>exact same <code>gscb import</code> command</strong> again from within the container. <code>gscb</code> will perform an incremental update, fetching new commits and updating existing files efficiently.
            <br><br>
            <blockquote><strong>IMPORTANT:</strong> There are no safe guards in place to prevent you from accidentally deleting, renaming, moving or editing a file or tree. In future updates, this will be addressed.</blockquote>
        `,i.appendChild(o),t.appendChild(i),DomUtils.h.createP());o.className="import-data-doc-link",o.innerHTML="For complete documentation, see <strong>Importing Repositories with GSCB</strong> in your personal help guild.",t.appendChild(o),this.elements=this.elements||{},this.elements.detailedInstructions=t,e.appendChild(t)}_toggleDetailedInstructions(){this.showDetailedInstructions=!this.showDetailedInstructions,this.elements.detailedInstructions&&(this.elements.detailedInstructions.style.display=this.showDetailedInstructions?"block":"none")}cleanup(){this.containerElement&&(this.containerElement.innerHTML="")}}module.exports=ManualTabView;
