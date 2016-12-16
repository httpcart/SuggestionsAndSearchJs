
function SearchAndSuggestionHttpcart(){
	this.buttonId="";
	this.inputId="";
	this.callBack='';
	this.callBackObject='';
	this.url='';
	this.myName='';
	this.optionsList=[];
	
	this.loadAjaxCall = function(url,callBack,obj) {
		if (typeof(callBack)==='undefined') callBack = "";
		if (typeof(obj)==='undefined') obj = "";
		
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();
		 } else {
			// code for old IE browsers
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
			   if (xmlhttp.status == 200) {
				   if(callBack!=''){
					   if(obj!='')
						obj[callBack](xmlhttp.responseText);
					   else
						callBack(xmlhttp.responseText);	
				   }
			   }
			   else if (xmlhttp.status == 400) {
				  alert('There was an error 400');
			   }
			   else {
				   alert('something else other than 200 was returned');
			   }
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
	
	this.handleSuggestion = function(){
		
	}
	
	this.addSuggestionAndSearch = function(){
		if(this.getButtonId()!=""){
			document.getElementById(this.getButtonId()).addEventListener("click", this, false);			
		}
		if(this.getInputId()!=""){
			document.getElementById(this.getInputId()).addEventListener("input", this, false);			
		}	
		
		
	}
	
	this.getDataListHtml=function(res){
		var h ='';
		for(var i=0;i<res.length;i++){
			h+='<option value="'+res[i]+'">';
		}
		h+="";
		return h;
	}
	this.addDataList=function(response){
		//console.log(response);
		try {
			var obj=JSON.parse(response);
			if (typeof(obj["status"])==='undefined'){
				console.log("Status not defined in Suggestion Api");
			}
			else{
				if(obj["status"]=="success"){
					if (typeof(obj["data"])!=='undefined'){
						var str = obj["data"];
						var delimiter=",";
						if (typeof(obj["delimiter"])!=='undefined'){
							delimiter= obj["delimiter"];
						}	
						var res = str.split(delimiter);
						this.setOptionsList(res);
						var listId=this.getInputId()+"_list";
						var htm=this.getDataListHtml(res);
						
						if( document.getElementById(listId) === null){
							document.getElementById(this.getInputId()).setAttribute("list",listId);
							document.getElementById(this.getInputId()).insertAdjacentHTML('afterend', '<datalist id="'+listId+'"></datalist>');
						}
						document.getElementById(listId).innerHTML=htm;
						if(this.containsOptionsList(document.getElementById(this.getInputId()).value)){
							if(this.callBack!=''){
							   if(this.getCallBackObject()!='')
								  this.getCallBackObject()[this.callBack](document.getElementById(this.getInputId()).value);
							   else
								  this.callBack(document.getElementById(this.getInputId()).value);	
						   }
						}
					}
					else{
						console.log("Data not found in suggestion response");
					}
				}
				else{
					alert(obj["error"]);
				}
			}
			
		} catch(e) {
			console.log(e); // error in the above string (in this case, yes)!
		}	
	}
	this.containsOptionsList=function(val){
		for(var i=0;i<this.getOptionsList().length;i++){
			if(this.getOptionsList()[i]==val)return true;
		}
		return false;
	}
	this.handleEvent = function(event) {
		//console.log(this.name); 
		switch(event.type) {
		  case 'click':
			if(this.callBack!=''){
			   if(this.getCallBackObject()!='')
				  this.getCallBackObject()[this.callBack](document.getElementById(this.getInputId()).value);
			   else
				  this.callBack(document.getElementById(this.getInputId()).value);	
		   }
		   break;
		  case 'input':
			if(this.getUrl()!=""){
				
					this.loadAjaxCall(this.getUrl()+document.getElementById(this.getInputId()).value,"addDataList",this);
			}
			
			break;
		}
	}//handleEvent finish
	
	this.setButtonId = function(buttonId) { this.buttonId = buttonId; } 
	this.getButtonId = function() { return this.buttonId; } 
	this.setInputId = function(inputId) { this.inputId = inputId; } 
	this.getInputId = function() { return this.inputId; } 
	this.setCallBackObject = function(callBackObject) { this.callBackObject = callBackObject; } 
	this.getCallBackObject = function() { return this.callBackObject; } 
	this.setUrl = function(url) { this.url = url; } 
	this.getUrl = function() { return this.url; } 
	this.setMyName = function(myName) { this.myName = myName; } 
	this.getMyName = function() { return this.myName; } 
	this.setOptionsList = function(optionsList) { this.optionsList = optionsList; } 
	this.getOptionsList = function() { return this.optionsList; } 
this.setCallBack = function(callBack) { this.callBack = callBack; } 
this.getCallBack = function() { return this.callBack; } 



}

function addSuggestionAndSearchHttpcart(url,inputId,buttonId,callBack,callBackObject){
	if (typeof(callBack)==='undefined') callBack = "";
	if (typeof(callBackObject)==='undefined') callBackObject = "";
	if (typeof(buttonId)==='undefined') buttonId = "";
	var myName="httpcart_object_suggestionandsearch_"+inputId;
	var p = new SearchAndSuggestionHttpcart();
	window[myName]=p;
	p.setButtonId(buttonId);
	p.setInputId(inputId);
	p.setCallBack(callBack);
	p.setCallBackObject(callBackObject);
	p.setMyName(myName);
	p.setUrl(url);
	p.addSuggestionAndSearch();
}