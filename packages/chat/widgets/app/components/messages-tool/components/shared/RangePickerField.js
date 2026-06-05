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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,FormHelper=require("../../utils/FormHelper").FormHelper,MessageRangeGrid=require("./MessageRangeGrid").MessageRangeGrid;class RangePickerField{constructor(e,t={}){this.container=e,this.options={label:"",visibleText:"",hiddenText:"",min:1,max:100,from:2,to:100,messages:[],columnsPerRow:30,onChange:null,...t},this.h=DomUtils.h,this.fromInput=null,this.toInput=null,this.messageRangeGrid=null,this.fieldContainer=null,this.render()}render(){this.fieldContainer=this.h.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}});var e=FormHelper.createFieldInfo(this.h,this.options.label,this.options.visibleText,this.options.hiddenText),t=this.h.createDiv({style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"5px"}}),i=this.h.createLabel({text:"From:",style:{marginRight:"5px"}}),s=(this.fromInput=this.h.createInput({type:"number",className:"gs-range-picker-from",min:this.options.min,max:this.options.max,value:this.options.from,style:{width:"80px",padding:"8px",border:"1px solid #ddd",borderRadius:"4px"},onchange:()=>{this.handleInputChange()}}),this.h.createLabel({text:"To:",style:{marginRight:"5px"}})),i=(this.toInput=this.h.createInput({type:"number",className:"gs-range-picker-to",min:this.options.min,max:this.options.max,value:this.options.to,style:{width:"80px",padding:"8px",border:"1px solid #ddd",borderRadius:"4px"},onchange:()=>{this.handleInputChange()}}),t.appendChild(i),t.appendChild(this.fromInput),t.appendChild(s),t.appendChild(this.toInput),this.h.createDiv({className:"gs-range-picker-grid-container"}));this.messageRangeGrid=new MessageRangeGrid(i,{messages:this.options.messages,columnsPerRow:this.options.columnsPerRow,from:this.options.from,to:this.options.to,onRangeChange:e=>{this.handleGridRangeChange(e)}}),this.messageRangeGrid.render(),this.fieldContainer.appendChild(e),this.fieldContainer.appendChild(t),this.fieldContainer.appendChild(i),this.container.appendChild(this.fieldContainer)}handleInputChange(){var e=parseInt(this.fromInput.value)||this.options.min,t=parseInt(this.toInput.value)||this.options.max;e<this.options.min&&(this.fromInput.value=this.options.min),t>this.options.max&&(this.toInput.value=this.options.max),t<e&&(this.fromInput.value=t),this.messageRangeGrid.setRange(parseInt(this.fromInput.value),parseInt(this.toInput.value)),this.options.onChange&&this.options.onChange({from:parseInt(this.fromInput.value),to:parseInt(this.toInput.value)})}handleGridRangeChange(e){this.fromInput.value=e.from,this.toInput.value=e.to,this.options.onChange&&this.options.onChange(e)}getValue(){return{from:parseInt(this.fromInput.value),to:parseInt(this.toInput.value)}}setValue(e,t){this.fromInput.value=e,this.toInput.value=t,this.messageRangeGrid.setRange(e,t)}updateMessages(e){this.options.messages=e,this.options.max=e.length,this.fromInput.max=e.length,this.toInput.max=e.length,this.messageRangeGrid&&(this.messageRangeGrid.options.messages=e,this.messageRangeGrid.render())}destroy(){this.messageRangeGrid&&(this.messageRangeGrid.cleanup(),this.messageRangeGrid=null),this.fieldContainer&&this.fieldContainer.parentNode&&this.fieldContainer.parentNode.removeChild(this.fieldContainer),this.fromInput=null,this.toInput=null,this.fieldContainer=null}}module.exports={RangePickerField:RangePickerField};
