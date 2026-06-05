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

class CompactMessageStateMachine{constructor(){this.states={IDLE:"idle",WAITING:"waiting",POLLING:"polling",RECEIVED:"received",ERROR:"error",EXPIRED:"expired"},this.currentState=this.states.IDLE,this.sessionData=null,this.compactedMessage=null,this.error=null,this.stateHistory=[],this.validTransitions={[this.states.IDLE]:[this.states.WAITING],[this.states.WAITING]:[this.states.POLLING,this.states.RECEIVED,this.states.ERROR],[this.states.POLLING]:[this.states.RECEIVED,this.states.EXPIRED,this.states.ERROR],[this.states.RECEIVED]:[this.states.IDLE],[this.states.ERROR]:[this.states.IDLE,this.states.WAITING],[this.states.EXPIRED]:[this.states.IDLE,this.states.WAITING]}}transitionTo(t,s={}){return this.isValidTransition(this.currentState,t)?(this.stateHistory.push({from:this.currentState,to:t,timestamp:(new Date).toISOString(),data:{...s}}),this.currentState=t,s.sessionData&&(this.sessionData=s.sessionData),s.compactedMessage&&(this.compactedMessage=s.compactedMessage),s.error&&(this.error=s.error),!0):(console.error(`Invalid state transition from ${this.currentState} to `+t),!1)}isValidTransition(t,s){return this.validTransitions[t]&&this.validTransitions[t].includes(s)}getCurrentState(){return this.currentState}getSessionData(){return this.sessionData}getCompactedMessage(){return this.compactedMessage}getError(){return this.error}getStateHistory(){return[...this.stateHistory]}reset(){this.currentState=this.states.IDLE,this.sessionData=null,this.compactedMessage=null,this.error=null,this.stateHistory=[]}isActive(){return this.currentState===this.states.WAITING||this.currentState===this.states.POLLING}isCompleted(){return this.currentState===this.states.RECEIVED}hasError(){return this.currentState===this.states.ERROR||this.currentState===this.states.EXPIRED}}module.exports={CompactMessageStateMachine:CompactMessageStateMachine};
