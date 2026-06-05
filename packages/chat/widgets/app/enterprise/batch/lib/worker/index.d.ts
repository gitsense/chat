/*
 * Component: Batch Worker Public API Declarations
 * Block-UUID: a9807f2f-f027-47e5-9756-3897ce1afe9b
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: TypeScript declaration file for the batch worker's public API.
 * Language: TypeScript
 * Created-at: 2025-08-31T18:55:37.844Z
 * Authors: Gemini 2.5 Flash (v1.0.0)
 */


export function startPolling(providers: any, dbApi: any, initialInterval?: number): void;
export function stopPolling(): void;
export function calculateNextPollingInterval(llmProviderName: string, currentAttempt: number): number;
