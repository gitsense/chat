#!/usr/bin/env node

/*
 * Component: GitSense Chat Admin LLM List Commands
 * Block-UUID: 52f840d3-e2d8-4e6e-9bfd-17567af66312
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: Handles the 'list providers' and 'list models' commands for the LLM admin CLI.
 * Language: JavaScript
 * Created-at: 2026-05-31T00:43:50.000Z
 * Authors: GLM-4.7 (v1.0.0)
 */


const { displayModels } = require('./gsc-admin-llm-helpers');

module.exports = (program) => {
    const listCommand = program.command('list')
        .description('List LLM models and providers.');

    listCommand.command('providers')
        .option('-f, --format <format>', 'Output format (text or json)', 'text')
        .description('List all registered LLM providers.')
        .action(async (options) => {
            try {
                const { readChatConfig } = require('../lib/utils-esm');
                const config = await readChatConfig();
                const providers = config.providers || [];

                if (options.format === 'json') {
                    const output = {
                        providers: providers.map(p => ({
                            name: p.name,
                            apiKeyName: p.apiKeyName,
                            baseURL: p.baseURL || null
                        }))
                    };
                    console.log(JSON.stringify(output, null, 2));
                    return;
                }

                // Default text format
                if (providers.length === 0) {
                    console.log('No LLM providers registered.');
                    return;
                }

                console.log('\nRegistered LLM Providers:');
                providers.forEach(provider => {
                    console.log(`- Name: ${provider.name}`);
                    console.log(`  API Key Env: ${provider.apiKeyName}`);
                    if (provider.baseURL) {
                        console.log(`  Base URL: ${provider.baseURL}`);
                    }
                    console.log('');
                });
            } catch (error) {
                console.error(`Error listing providers: ${error.message}`);
                process.exit(1);
            }
        });

    listCommand.command('models')
        .option('-f, --format <format>', 'Output format (text or json)', 'text')
        .description('List all registered LLM models and dividers in their configured order.')
        .action(async (options) => {
            try {
                const { readChatConfig } = require('../lib/utils-esm');
                const config = await readChatConfig();
                const models = config.models || [];

                if (options.format === 'json') {
                    const output = {
                        models: models.map((item, index) => {
                            if (item.name === '---------') {
                                return {
                                    index: index,
                                    name: item.name,
                                    type: 'divider'
                                };
                            }
                            return {
                                index: index,
                                name: item.name,
                                provider: item.providers && item.providers[0] ? item.providers[0].name : null,
                                modelId: item.providers && item.providers[0] ? item.providers[0].modelId : null,
                                maxOutputTokens: item.providers && item.providers[0] ? item.providers[0].maxOutputTokens : null,
                                default: item.default || false
                            };
                        })
                    };
                    console.log(JSON.stringify(output, null, 2));
                    return;
                }

                // Default text format
                displayModels(models);
            } catch (error) {
                console.error(`Error listing models: ${error.message}`);
                process.exit(1);
            }
        });
};
