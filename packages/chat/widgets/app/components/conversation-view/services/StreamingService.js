/**
 * Component: StreamingService
 * Block-UUID: 99b0fe1b-065e-496b-b4ae-49d6fd9afbaa
 * Parent-UUID: dd4fceca-35f7-4de2-9ed1-1f79978cca53
 * Version: 2.5.0
 * Description: Refined buffered streaming to apply only when provider is 'Claude Code' AND chat type is 'analyze'. This preserves real-time parsing for other models while optimizing for the slower, noisier CLI stream.
 * Language: JavaScript
 * Created-at: 2026-05-08T03:45:12.456Z
 * Authors: Claude 3.7 Sonnet (v1.0.0), together.ai - DeepSeek v3 (v1.1.0), Claude 3.7 Sonnet (v1.2.0), Claude 3.7 Sonnet (v2.0.0), GLM-4.7 (v2.1.0), Claude Haiku 4.5 (v2.1.1), GLM-4.7 (v2.1.2), GLM-4.7 (v2.2.0), GLM-4.7 (v2.3.0), GLM-4.7 (v2.4.0), GLM-4.7 (v2.5.0)
 */


const { DomUtils, MarkdownUtils } = require('@gitsense/gsc-utils');
const ScrollUtils = require('../utils/ScrollUtils');
const { ScrollIntentState } = require('../utils/ScrollIntentManager');
const { ChatManager: ClaudeCodeChatManager } = require('../../claude-code');

const THINKING_MESSAGE = 'Thinking in progress...';
const WAITING_MESSAGE = '<p>Waiting for response...</p>';
const UPDATE_DOM_FREQUENCY = 20;

/**
 * Handles streaming message responses with enhanced auto-scrolling
 */
class StreamingService {
    /**
     * Creates a new StreamingService instance
     * @param {Object} options - Configuration options
     * @param {Object} options.widget - The widget instance
     * @param {Object} options.settings - The settings instance
     * @param {Object} options.chat - The chat data
     * @param {Object} options.message - The assistant message (placeholder with null content) being streamed into
     * @param {HTMLElement} options.contentBody - The content body element
     * @param {Object} options.md - The markdown renderer
     * @param {Function} options.onComplete - Callback when streaming completes
     * @param {Function} options.onError - Callback when streaming errors
     * @param {Object} options.chatInput - The ChatInput instance for button state updates
     * @param {HTMLElement} options.messagesContainer - The container for all messages
     * @param {Object} options.scrollOptions - Options for scroll behavior
     */
    constructor(options) {
        this.eventsCount = 0;
        this.lastDomUpdateAt = 0;

        this.widget = options.widget;
        this.settings = options.settings;
        this.chat = options.chat;
        this.assistantMessage = options.message;
        this.model = this.assistantMessage.real_model || this.assistantMessage.model;
        this.provider = this.getProvider();
        
        this.response = null;
        this.eventSource = null;
        this.checkForStopStreaming = null;
        this.stopStreaming = false;
        this.streamingInProgress = false;
       
        // Claude Code Manager
        this.claudeCodeManager;

        // Markdown renderer
        this.md = options.md;

        // Chat Input
        this.chatInput = options.chatInput;

        // UI Elements
        this.contentBody = options.contentBody || null;
        this.tempBody = this.contentBody ? this.contentBody.cloneNode(true) : null;
        this.messagesContainer = options.messagesContainer || document.body;
        this.scrollableElement = options.scrollOptions?.scrollableElement || window;
        this.scrollThreshold = options.scrollOptions?.scrollThreshold || 200;
        
        // Code block auto-scrolling
        this.codeBlockObservers = new WeakMap();
        this.mutationObserver = null;
        
        // Scroll state tracking
        this.updateScrolling = options.updateScrolling;
        this.scrollIntentManager = null;
        this.newMessagesIndicator = null;
        this.scrollStateChangeHandler = this.handleScrollStateChange.bind(this);

        // Events
        this.onMessage = options.onMessage || (() => {});
        this.onComplete = options.onComplete || (() => {});
        this.onError = options.onError || (() => {});

        // Debounce for findAndObserveCodeBlocks
        this.initialFindCodeBlocksCall = true;
        this.findCodeBlocksDebounceTimer = null;
        this.FIND_CODE_BLOCKS_DEBOUNCE_TIME = 50; // 50ms - adjusted for better responsiveness
        this.hasFoundCodeBlocksOnce = false; // Track first execution

        // Debounce for mutation observer callbacks (scroll operations)
        this.scrollDebounceTimers = new WeakMap();
        this.SCROLL_DEBOUNCE_TIME = 25;
        this.lastRenderedResponse = null;
    }
    
    /**
     * Handles scroll state changes
     * @param {ScrollIntentState} newState - The new scroll state
     * @param {ScrollIntentState} oldState - The previous scroll state
     */
    handleScrollStateChange(newState, oldState) {
        if (newState === ScrollIntentState.USER_INTERRUPTED && this.streamingInProgress) {
            // User has scrolled up during streaming, show the indicator
            if (!this.newMessagesIndicator) {
                this.newMessagesIndicator = ScrollUtils.createNewMessagesIndicator(
                    document.body,
                    () => {
                        // Force scroll to bottom and resume auto-scrolling
                        ScrollUtils.scrollToBottom(this.scrollableElement, this.contentBody, 0, "smooth", true);
                        if (this.scrollIntentManager) {
                            this.scrollIntentManager.forceAutoScrolling();
                        }
                    }
                );
            }
            this.newMessagesIndicator.show();
        } else if (newState === ScrollIntentState.AUTO_SCROLLING && oldState === ScrollIntentState.USER_INTERRUPTED) {
            // User has scrolled back to bottom, hide the indicator
            if (this.newMessagesIndicator) {
                this.newMessagesIndicator.hide();
            }
        }
    }
    
    /**
     * Starts streaming the message response
     * @param {boolean} scrollToBottom - Whether to scroll to bottom during streaming
     * @param {HTMLElement} scrollableElement - The scrollable element
     */
    startStreaming(scrollToBottom = true, scrollableElement = null) {
        // Show the stop button when streaming starts
        if (this.chatInput) {
            this.chatInput.showStopBtn();
        }

        // Initialize scroll intent tracking if not already done
        if (this.contentBody) {
            if (!this.scrollIntentManager && scrollToBottom) {
                const { intentManager } = ScrollUtils.setupEnhancedScrollDetection(
                    scrollableElement || this.scrollableElement,
                    {
                        scrollThreshold: this.scrollThreshold,
                        onScrollStateChange: this.scrollStateChangeHandler
                    }
                );
                this.scrollIntentManager = intentManager;
                
                // Force auto-scrolling state at the start of streaming
                this.scrollIntentManager.forceAutoScrolling();
            }

            // Check for Analyze Mode with Claude Code Provider
            // We only buffer for Claude Code because it's slower and noisier (thinking events)
            if (this.chat.type === 'analyze' && this.provider === 'Claude Code') {
                // Show specific loading message for analyze mode
                this.contentBody.innerHTML = `
                    <div>
                        <p style="font-weight: 500; margin-bottom: 8px;">Analysis in progress. Do not close this tab.</p>
                        <p style="font-size: 14px; color: #888; margin-top: 0;">
                            Character count updates may pause intermittently.
                            <br>
                            <span id="gsc-analyze-count">0</span> characters received
                        </p>
                    </div>
                `;
            } else {
                // Existing waiting message for coding-assistant or other providers
                const waitingMsg = WAITING_MESSAGE;
                this.contentBody.style.color = "gray";
                this.contentBody.innerHTML = waitingMsg;
            }
            
            if (scrollToBottom) {
                ScrollUtils.scrollToBottom(scrollableElement || this.scrollableElement, this.contentBody);
            }

            // Initialize mutation observer for code block auto-scrolling
            this.initCodeBlockObserver();
        }

        // Set up URL and event source
        const usp = new URLSearchParams();
        // Send the ID of the assistant message (placeholder) to the backend.
        // The backend will use this to find the parent user message.
        usp.set("assistant-message-id", this.assistantMessage.id);
        usp.set("provider", this.provider);
        
        const url = this.widget.streamURL + "?" + usp.toString();
        this.eventSource = new EventSource(url);

        // Route to appropriate handler based on mode and provider
        if (this.chat.type === 'analyze' && this.provider === 'Claude Code') {
            // Use ChatManager for Claude Code Coding-Assistant Mode
            // Use custom buffered handler for Claude Code Analyze Mode
            this.eventSource.onmessage = this.handleClaudeCodeAnalyzeMessage.bind(this);
        } else if (this.provider === 'Claude Code') {
            // Use ChatManager for Claude Code Coding-Assistant Mode
            
            this.claudeCodeManager = new ClaudeCodeChatManager({
                contentBody: this.contentBody,
                md: this.md,
                scrollUtils: ScrollUtils, 
                scrollIntentManager: this.scrollIntentManager,
                onComplete: (finalResponseText, error, userTriggered) => {
                    // 1. Sync the response text so StreamingService's state is correct
                    this.response = finalResponseText;
                    
                    // 2. Trigger the standard cleanup flow (button state, observers, etc.)
                    this.streamingStopped(null, error, userTriggered);
                },
                onError: (error) => {
                    this.handleError(error);
                },
                this.provider
            });

            // Override the onmessage handler
            this.eventSource.onmessage = (event) => this.claudeCodeManager.handleEvent(event);
        } else {
            // EXISTING: Standard handler for other providers
            this.eventSource.onmessage = this.handleMessage.bind(this, scrollToBottom, scrollableElement);
        }

        // Set up event handlers
        this.eventSource.onerror = this.handleError.bind(this);
        
        // Set up check for stop streaming
        this.checkForStopStreaming = setInterval(this.checkStopStreaming.bind(this), 50);
    }

    /**
     * Handles streaming messages for Claude Code Analyze Mode
     * Buffers content and updates character count without rendering.
     * Renders full markdown only on completion.
     */
    handleClaudeCodeAnalyzeMessage(event) {
        try {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'text':
                    // Buffer the text
                    if (this.response === null) {
                        this.response = '';
                    }
                    if (data.delta) {
                        this.response += data.delta;
                        
                        // Update character count in the UI
                        const countEl = document.getElementById('gsc-analyze-count');
                        if (countEl) {
                            // Format with commas (e.g., 1,234)
                            countEl.textContent = this.response.length.toLocaleString();
                        }
                    }
                    break;

                case 'done':
                    // Analysis complete: Render the full buffered response
                    if (this.response) {
                        this.contentBody.innerHTML = this.md.render(this.response);
                    }
                    this.streamingStopped();
                    break;

                case 'error':
                    this.handleError(data);
                    break;

                case 'init':
                case 'status':
                case 'thinking':
                    // Ignore these events for analyze mode to keep UI clean
                    break;

                default:
                    console.warn('[StreamingService] Unknown event type in analyze mode:', data.type);
            }
        } catch (e) {
            console.error('[StreamingService] Failed to parse analyze event:', e);
        }
    }
    
    /**
     * Initializes the mutation observer for code blocks
     */
    initCodeBlockObserver() {
        // Create a mutation observer to watch for DOM changes
        this.mutationObserver = new MutationObserver((mutations) => {
            // Process each mutation
            mutations.forEach(mutation => {
                // Check for added nodes that might contain code blocks
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    this.findAndObserveCodeBlocks();
                }
            });
        });
        
        // Start observing the content body for changes
        this.mutationObserver.observe(this.contentBody, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Finds and observes all code blocks in the content body (debounced)
     */
    findAndObserveCodeBlocks() {
        // Execute immediately on first call
        if (!this.hasFoundCodeBlocksOnce) {
            this.hasFoundCodeBlocksOnce = true;
            this._findAndObserveCodeBlocksImpl();
            return;
        }
        
        // Debounce subsequent calls
        if (this.findCodeBlocksDebounceTimer) {
            clearTimeout(this.findCodeBlocksDebounceTimer);
        }
        
        this.findCodeBlocksDebounceTimer = setTimeout(() => {
            this._findAndObserveCodeBlocksImpl();
            this.findCodeBlocksDebounceTimer = null;
        }, this.initialFindCodeBlocksCall ? 0 : this.FIND_CODE_BLOCKS_DEBOUNCE_TIME);

        this.initialFindCodeBlocksCall = false;
    }

    /**
     * Finds and observes all code blocks in the content body (internal implementation)
     */
    _findAndObserveCodeBlocksImpl() {
        // Find all pre elements in the content body
        const preElements = this.contentBody.querySelectorAll('pre');
        let newBlocksCount = 0;

        // Observe each pre element
        preElements.forEach(preElement => {
            // Skip if already observing this element
            if (this.codeBlockObservers.has(preElement)) {
                return;
            }

            newBlocksCount++;

            // Create a new observer for this pre element
            const observer = new MutationObserver(() => {
                this.debouncedScrollCodeBlockToBottom(preElement);
            });

            // Store the observer in the WeakMap
            this.codeBlockObservers.set(preElement, observer);

            // Start observing the pre element
            observer.observe(preElement, {
                childList: true,
                subtree: true,
                characterData: true
            });

            // Initial scroll to bottom
            this.scrollCodeBlockToBottom(preElement);
        });
    }

    /**
     * Scrolls a code block to its bottom (debounced)
     * @param {HTMLElement} preElement - The pre element to scroll
     */
    debouncedScrollCodeBlockToBottom(preElement) {
        // Clear existing timer for this element
        const existingTimer = this.scrollDebounceTimers.get(preElement);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        // Set new timer
        const timer = setTimeout(() => {
            this.scrollCodeBlockToBottom(preElement);
            this.scrollDebounceTimers.delete(preElement);
        }, this.SCROLL_DEBOUNCE_TIME);

        this.scrollDebounceTimers.set(preElement, timer);
    }

    /**
     * Scrolls a code block to its bottom
     * @param {HTMLElement} preElement - The pre element to scroll
     */
    scrollCodeBlockToBottom(preElement) {
        if (this.streamingInProgress && preElement) {
            // Only auto-scroll code blocks if we're in auto-scrolling mode
            if (!this.scrollIntentManager || this.scrollIntentManager.shouldAutoScroll()) {
                preElement.scrollTop = preElement.scrollHeight;
            }
        }
    }

    /**
     * Disconnects all code block observers
     */
    disconnectCodeBlockObservers() {
        // Disconnect the main mutation observer
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }

        // Disconnect all individual code block observers
        this.contentBody.querySelectorAll('pre').forEach(preElement => {
            const observer = this.codeBlockObservers.get(preElement);
            if (observer) {
                observer.disconnect();
                this.codeBlockObservers.delete(preElement);
            }

            // Clear any pending debounce timers
            const timer = this.scrollDebounceTimers.get(preElement);
            if (timer) {
                clearTimeout(timer);
                this.scrollDebounceTimers.delete(preElement);
            }
        });
    }

    /**
     * Stops streaming
     */
    stopStream() {
        // This will let checkStopStreaming know that it should stop and cleanup
        this.stopStreaming = true;

        if (this.claudeCodeManager) {
            this.claudeCodeManager.stop();
        }
    }

    /**
     * Handles streaming errors
     * @param {Event} error - The error event
     */
    handleError(error) {
        console.error("EventSource failed:", error);

        switch (this.eventSource.readyState) {
            case EventSource.CONNECTING:
                console.log("Reconnecting...");
                break;
            case EventSource.OPEN:
                console.log("Open");
                break;
            case EventSource.CLOSED:
                console.log("Connection Closed");
                break;
            default:
                console.log("Connection Error");
        }

        if (this.contentBody && this.contentBody.innerText === "Waiting for response...") {
            this.contentBody.innerHTML = "Error connecting to server. Please try again.";
        }

        this.streamingStopped(error);
    }

    /**
     * Handles streaming messages
     * @param {boolean} scrollToBottom - Whether to scroll to bottom
     * @param {HTMLElement} scrollableElement - The scrollable element
     * @param {Event} event - The message event
     */
    handleMessage(scrollToBottom, scrollableElement, event) {
        let positionTracker = null;

        if (this.contentBody) {
            // Track scroll position before updating content
            positionTracker = ScrollUtils.trackScrollPosition(
                scrollableElement || this.scrollableElement
            );

            if (this.response === null) {
                this.contentBody.style.color = null;
                this.contentBody.innerHTML = "";
            }
        }

        this.streamingInProgress = true;
        const data = JSON.parse(event.data);
        const { content, done } = data;

        if (content != null) {
            // We received our first event
            if (this.response === null ) {
                this.response = content;
            } else {
                if (this.response === THINKING_MESSAGE && content !== '') {
                    this.response = content;
                } else {
                    this.response += content;
                }
            }

            if (this.response === '') {
                this.response = THINKING_MESSAGE;
            }
        }

        const now = new Date().getTime();

        if (this.contentBody && now - this.lastDomUpdateAt > UPDATE_DOM_FREQUENCY) {
            // Only update DOM and scroll if content has actually changed
            if (this.response !== this.lastRenderedResponse) {
                this.tempBody.innerHTML = this.md.render(this.response);
                try {
                    DomUtils.h.updateDOM(this.tempBody, this.contentBody);
                    this.lastDomUpdateAt = now;
                } catch (error) {
                    // Fixme: Should we ignore this. There might be a race condition when an error 
                    // is thrown but this doesn't affect the app
                    console.error('[StreamingService Debug] DOM update error:', error);
                }

                // Update the last rendered response
                this.lastRenderedResponse = this.response;

                // Find and observe code blocks after DOM update (now debounced)
                this.findAndObserveCodeBlocks();

                // Check scroll position after content update
                const positionInfo = positionTracker();

                // Only auto-scroll if we're in auto-scrolling mode or if this is the first content
                if (scrollToBottom && (!this.scrollIntentManager || this.scrollIntentManager.shouldAutoScroll())) {
                    // Use 'auto' behavior during streaming to prevent jittery smooth scrolls
                    ScrollUtils.scrollToBottom(
                        scrollableElement || this.scrollableElement,
                        this.contentBody,
                        0,
                        "auto"
                    );
                } else if (scrollToBottom && positionInfo.heightChanged && !positionInfo.scrollChanged) {
                    // Content height changed but user didn't manually scroll
                    // Show the new messages indicator if we're in user interrupted mode
                    if (this.scrollIntentManager && 
                        this.scrollIntentManager.getState() === ScrollIntentState.USER_INTERRUPTED) {
                        if (!this.newMessagesIndicator) {
                            this.newMessagesIndicator = ScrollUtils.createNewMessagesIndicator(
                                document.body,
                                () => {
                                    // Force scroll to bottom and resume auto-scrolling
                                    ScrollUtils.scrollToBottom(
                                        scrollableElement || this.scrollableElement, 
                                        this.contentBody, 
                                        0, 
                                        "smooth", 
                                        true
                                    );
                                    if (this.scrollIntentManager) {
                                        this.scrollIntentManager.forceAutoScrolling();
                                    }
                                }
                            );
                        }
                        this.newMessagesIndicator.show();
                    }
                }
            }
        }

        if (done) {
            this.streamingStopped();
        }

        if (this.onMessage) {
            this.onMessage(this.response, event);
        }
    }

    /**
     * Checks if streaming should be stopped
     */
    checkStopStreaming() {
        if (this.stopStreaming) {
            clearInterval(this.checkForStopStreaming);
            this.checkForStopStreaming = null;
            this.response += "\n\n---\n\n**Warning: Response was interrupted and may be incomplete.**";

            if (this.contentBody) {
                this.tempBody.innerHTML = this.md.render(this.response);
                DomUtils.h.updateDOM(this.tempBody, this.contentBody);
            }

            this.streamingStopped(null, true);
        }
    }

    /**
     * Handles streaming completion
     */
    streamingStopped(error, userTriggered) {
        // Hide the new messages indicator if it exists
        if (this.newMessagesIndicator) {
            this.newMessagesIndicator.hide();
        }

        if (this.checkForStopStreaming) {
            clearInterval(this.checkForStopStreaming);
        }

        // Show the go button when streaming finishes
        if (this.chatInput) {
            this.chatInput.showGoBtn();
        }

        if (this.contentBody) { 
            MarkdownUtils.removeSignature(this.contentBody);

            // Disconnect all code block observers
            this.disconnectCodeBlockObservers();
        }

        this.eventSource.close();
        this.assistantMessage.message = this.response;
        this.stopStreaming = false;
        this.streamingInProgress = false;
        this.tempBody = null;

        // Execute any pending debounced call before clearing
        if (this.findCodeBlocksDebounceTimer) {
            clearTimeout(this.findCodeBlocksDebounceTimer);
            this._findAndObserveCodeBlocksImpl();
            this.findCodeBlocksDebounceTimer = null;
        }

        // Final scroll to bottom if in auto-scrolling mode
        if (this.scrollIntentManager && this.scrollIntentManager.shouldAutoScroll()) {
            ScrollUtils.scrollToBottom(this.scrollableElement, this.contentBody, 0, "smooth");
        }


        // Give the eventSource.onmessage a little bit of time to make it's last callback
        const onComplete = this.onComplete;

        setTimeout(() => {
            onComplete(this.assistantMessage, error, userTriggered);
        }, 50);
    }

    /**
     * Cleans up resources
     */
    cleanup() {
        // Clean up event source
        if (this.eventSource) {
            this.eventSource.close();
        }

        // Clean up interval
        if (this.checkForStopStreaming) {
            clearInterval(this.checkForStopStreaming);
        }

        // Clean up observers
        this.disconnectCodeBlockObservers();

        // Clean up new messages indicator
        if (this.newMessagesIndicator) {
            if (this.newMessagesIndicator.element.parentNode) {
                this.newMessagesIndicator.element.parentNode.removeChild(this.newMessagesIndicator.element);
            }
            this.newMessagesIndicator = null;
        }

        // Clean up scroll intent manager
        if (this.scrollIntentManager) {
            const targetElement = this.scrollableElement === window ? 
                document.documentElement : this.scrollableElement;

            if (targetElement._scrollIntentManager === this.scrollIntentManager) {
                delete targetElement._scrollIntentManager;
            }

            this.scrollIntentManager = null;
        }

        // Clear debounce timer for findAndObserveCodeBlocks
        if (this.findCodeBlocksDebounceTimer) {
            clearTimeout(this.findCodeBlocksDebounceTimer);
            this.findCodeBlocksDebounceTimer = null;
        }

        // Clear all scroll debounce timers
        if (this.contentBody) {
            this.contentBody.querySelectorAll('pre').forEach(preElement => {
                const timer = this.scrollDebounceTimers.get(preElement);
                if (timer) {
                    clearTimeout(timer);
                    this.scrollDebounceTimers.delete(preElement);
                }
            });
        }
    }

    /**
     * Gets the provider for the current model
     * @returns {string} The provider name
     */
    getProvider() {
        if (this.model.match(/^Fake/)) {
            return 'Fake Provider';
        }

        if (this.assistantMessage.real_model?.startsWith('Claude Code - ')) {
            return 'Claude Code';
        }

        const { models } = this.settings;

        for (let i = 0; i < models.length; i++) {
            const { name, providers } = models[i];

            if (name.match(/^---/)) {
                continue;
            }

            if (name !== this.model) {
                continue;
            }

            return providers[0].name;
        }

        return "Unknown Provider";
    }
}

module.exports = { StreamingService };
