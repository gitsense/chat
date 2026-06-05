/*
 * Component: Batch Component Public API Declarations
 * Block-UUID: 6b45badc-a58b-4fc2-858d-4dd4fef3989e
 * Parent-UUID: 694d953a-94ea-488b-b862-df3ca3b7f4c4
 * Version: 1.16.0
 * Description: Provides higher-level data access methods for the batch_jobs, batch_items, and batch_groups tables, now supporting the new llm_api_attempts field for groups, the flexible `stats` JSON field, detailed item counts per group, efficient polling with lastUpdated parameter, and worker status monitoring.
 * Language: TypeScript
 * Created-at: 2025-09-10T16:15:31.046Z
 * Authors: Gemini 2.5 Flash (v1.4.0), Gemini 2.5 Flash (v1.5.0), Gemini 2.5 Flash (v1.6.0), Gemini 2.5 Flash (v1.7.0), Gemini 2.5 Flash (v1.8.0), Gemini 2.5 Flash (v1.9.0), Gemini 2.5 Flash (v1.10.0), Gemini 2.5 Flash (v1.11.0), Gemini 2.5 Flash (v1.12.0), Gemini 2.5 Flash (v1.13.0), GLM-4.6 (v1.14.0), GLM-4.6 (v1.15.0), GLM-4.7 (v1.16.0)
 */


export interface BatchJobResult {
    batchJobId: number;
    status: string;
    message: string;
}

export interface BatchGroupDetails {
    id: number;
    groupNumber: number;
    status: string;
    errorDetails: string | null;
    startedAt: string | null;
    finishedAt: string | null;
    llmApiAttempts: number;
    stats: {
        totalItemsInGroup: number;
        totalGroupTokens?: number;
    };
    successfulItemsInGroup: number;
    failedItemsInGroup: number;
    pendingItemsInGroup: number;
    analyzeChatUuid: string | null;
    generationConfig: any;
}

export interface BatchJobDetails {
    batchJobId: number;
    displayName: string;
    status: string;
    llmProviderJobId: string | null;
    llmProviderName: string;
    llmModelId: string;
    triggerChatId: number;
    createdAt: string;
    startedAt: string | null;
    finishedAt: string | null;
    lastPolledAt: string | null;
    nextPollAt: string | null;
    pollAttempts: number;
    errorDetails: string | null;
    totalGroups: number;
    totalFiles: number;
    successfulFiles: number;
    failedFiles: number;
    pendingFiles: number;
    successfulPolls: number;
    failedPolls: number;
    llmProviderCurrentStatus: string | null;
    llmProviderError: any;
    groupDetails: BatchGroupDetails[];
    timeSinceLastPoll: number | null;
    pollingOverdue: boolean;
}

export interface ChatMessagePayload {
    role: 'system' | 'user' | 'assistant';
    message: string;
}

export interface InitializeOptions {
    gscHome: string;
}

export interface BatchGroup {
    id: number;
    chatIds: number[];
}

export interface BatchOptions {
    temperature?: number;
}

export interface WorkerActivity {
    timestamp: string;
    message: string;
}

export interface WorkerStatusInfo {
    worker_name: string;
    pid: number;
    status: string;
    uptime: string;
    last_heartbeat: string;
    seconds_since_heartbeat: number;
    health: string;
    activities: WorkerActivity[];
}

export function initialize(options: InitializeOptions): Promise<{ config: any; providers: any; dbApi: any }>;
export function createBatchJob(
    batchType: string,
    analyzerId: string,
    modelId: string,
    groups: BatchGroup[],
    options: BatchOptions,
    triggerChatId: number,
    type?: 'realtime' | 'scheduled',
): Promise<BatchJobResult>;
export function createAnalyzeBatchJob(
    analyzerId: string,
    modelId: string,
    groups: BatchGroup[],
    options: BatchOptions,
    triggerChatId: number,
    type?: 'realtime' | 'scheduled',
): Promise<BatchJobResult>;
export function getScheduableBatchProviders(): string[];
export function getBatchDetails(batchJobId: number, lastUpdated?: string): Promise<BatchJobDetails>;
export function getAnalyzeBatchDetails(batchJobId: number): Promise<BatchJobDetails>;
export function cancelBatchJob(batchJobId: number): Promise<{ success: boolean, message: string, newStatus: string }>;
export function getBatchJobType(batchJobId: number): Promise<string>;
export function shutdown(): Promise<void>;
export function getAnalyzeBatchGroupChatMessages(batchJobId: number, groupNumber: number): Promise<ChatMessagePayload[]>;
export function updateBatchGroupAnalyzeChatUuid(batchJobId: number, groupNumber: number, analyzeChatUuid: string | null): Promise<void>;
export function resetBatchGroup(batchJobId: number, groupNumber: number): Promise<{ success: boolean, message: string }>;
export function getWorkerStatus(): Promise<WorkerStatusInfo[]>;
