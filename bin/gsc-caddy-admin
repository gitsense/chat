#!/usr/bin/env node

/*
 * Component: Caddy Admin CLI Tool
 * Block-UUID: ffd6e8fc-399d-4254-827c-ef17e2f7d0d5
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: A command-line tool to manage Caddy server subdomain configurations via its Admin API.
 * Language: JavaScript
 * Created-at: 2025-08-24T02:47:00.000Z
 * Authors: Gemini 2.5 Flash (v1.0.0)
 */


const { Command } = require('commander');
const program = new Command();

// --- Configuration ---
const CADDY_ADMIN_API_URL = 'http://localhost:2019';
const CADDY_ROUTES_ENDPOINT = `${CADDY_ADMIN_API_URL}/config/apps/http/servers/srv0/routes`; // srv0 is the default server ID

// --- Helper Functions ---

/**
 * Makes an HTTP request to the Caddy Admin API.
 * @param {string} method - HTTP method (GET, POST, DELETE).
 * @param {string} url - The full URL for the API endpoint.
 * @param {object} [body] - Request body for POST/PUT requests.
 * @returns {Promise<object>} - JSON response from the API.
 * @throws {Error} If the API call fails or returns a non-OK status.
 */
async function caddyApiRequest(method, url, body = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            let errorDetails = `Status ${response.status}`;
            try {
                const errorJson = await response.json();
                errorDetails += `: ${JSON.stringify(errorJson)}`;
            } catch (e) {
                errorDetails += `: ${await response.text()}`;
            }
            throw new Error(`Caddy API responded with ${errorDetails}`);
        }

        // For DELETE requests, response might be empty or not JSON
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return {}; // Return empty object for no content
        }

        return await response.json();

    } catch (error) {
        if (error.cause && error.cause.code === 'ECONNREFUSED') {
            throw new Error(`Could not connect to Caddy Admin API at ${CADDY_ADMIN_API_URL}. Is Caddy running?`);
        }
        throw new Error(`API request failed: ${error.message}`);
    }
}

/**
 * Extracts the target port from a Caddy route object.
 * @param {object} route - A Caddy route object.
 * @returns {string|null} The target port or null if not found.
 */
function getTargetPortFromRoute(route) {
    if (route.handle && route.handle.length > 0 && route.handle[0].handler === 'reverse_proxy' &&
        route.handle[0].upstreams && route.handle[0].upstreams.length > 0 && route.handle[0].upstreams[0].dial) {
        const dial = route.handle[0].upstreams[0].dial;
        const match = dial.match(/localhost:(\d+)/);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

// --- CLI Setup ---
program
    .name('gsc-caddy-admin')
    .version('1.0.0')
    .description('A command-line tool to manage Caddy server subdomain configurations via its Admin API.')
    .addHelpText('after', `
Examples:
  gsc-caddy-admin list
  gsc-caddy-admin add istio.gitsense.com 3002
  gsc-caddy-admin remove facebook.gitsense.com
`);

// --- Commands ---

// List Subdomains
program
    .command('list')
    .description('List all configured subdomains.')
    .action(async () => {
        try {
            const routes = await caddyApiRequest('GET', CADDY_ROUTES_ENDPOINT);
            const subdomains = [];

            for (const route of routes) {
                if (route.match && route.match.length > 0 && route.match[0].host && route.match[0].host.length > 0) {
                    const subdomain = route.match[0].host[0];
                    const port = getTargetPortFromRoute(route);
                    subdomains.push({ subdomain, port });
                }
            }

            if (subdomains.length === 0) {
                console.log('No subdomains currently configured.');
            } else {
                console.log('Configured Subdomains:');
                subdomains.forEach(item => {
                    console.log(`- ${item.subdomain} (-> localhost:${item.port || 'unknown'})`);
                });
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

// Add Subdomain
program
    .command('add <subdomain> <port>')
    .description('Add a new subdomain and its target port.')
    .action(async (subdomain, port) => {
        if (!subdomain || !port || isNaN(parseInt(port))) {
            console.error('Error: Missing or invalid arguments for \'add\' command.');
            program.help();
            process.exit(1);
        }

        const portNum = parseInt(port);
        if (portNum < 1 || portNum > 65535) {
            console.error('Error: Port must be a number between 1 and 65535.');
            process.exit(1);
        }

        const newRoute = {
            "match": [
                {
                    "host": [subdomain]
                }
            ],
            "handle": [
                {
                    "handler": "reverse_proxy",
                    "upstreams": [
                        {
                            "dial": `localhost:${portNum}`
                        }
                    ]
                }
            ],
            "terminal": true
        };

        try {
            // Check if subdomain already exists to prevent duplicates
            const existingRoutes = await caddyApiRequest('GET', CADDY_ROUTES_ENDPOINT);
            const exists = existingRoutes.some(route =>
                route.match && route.match.length > 0 &&
                route.match[0].host && route.match[0].host.includes(subdomain)
            );

            if (exists) {
                console.error(`Error: Subdomain '${subdomain}' already exists in Caddy configuration.`);
                process.exit(1);
            }

            await caddyApiRequest('POST', CADDY_ROUTES_ENDPOINT, newRoute);
            console.log(`Subdomain '${subdomain}' added successfully, proxying to localhost:${portNum}.`);
            console.log('Caddy configuration updated dynamically.');
        } catch (error) {
            console.error(`Error: Failed to add subdomain '${subdomain}'. ${error.message}`);
            process.exit(1);
        }
    });

// Remove Subdomain
program
    .command('remove <subdomain>')
    .description('Remove an existing subdomain.')
    .action(async (subdomain) => {
        if (!subdomain) {
            console.error('Error: Missing subdomain for \'remove\' command.');
            program.help();
            process.exit(1);
        }

        try {
            const routes = await caddyApiRequest('GET', CADDY_ROUTES_ENDPOINT);
            let routeIdToRemove = null;

            for (const route of routes) {
                if (route.match && route.match.length > 0 && route.match[0].host && route.match[0].host.includes(subdomain)) {
                    routeIdToRemove = route._id; // Caddy's internal ID for the route
                    break;
                }
            }

            if (!routeIdToRemove) {
                console.error(`Error: Subdomain '${subdomain}' not found in Caddy configuration.`);
                process.exit(1);
            }

            await caddyApiRequest('DELETE', `${CADDY_ROUTES_ENDPOINT}/${routeIdToRemove}`);
            console.log(`Subdomain '${subdomain}' removed successfully.`);
            console.log('Caddy configuration updated dynamically.');
        } catch (error) {
            console.error(`Error: Failed to remove subdomain '${subdomain}'. ${error.message}`);
            process.exit(1);
        }
    });

// Parse arguments and execute commands
program.parse(process.argv);

// If no command is provided, show help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
