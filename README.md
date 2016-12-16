# SuggestionsAndSearchJs

Include the js file like below

<script type="text/javascript" src="searchAndSuggestionHttpcart.js"></script>

If you have searchable input and button like this


<input type="text" id="myid">
<button id="myBtn">Try it</button>

then in the script file call function like this
//param1: url with parameter to be searched
//param2: input id which will provide suggestions
//param3: button id which will call search callback, send "" if not present or dont want : optional parameter
//param4: function callback if not object is there else object name like "callback" : optional parameter
//param5: object which contains the callback function : optional parameter
addSuggestionAndSearchHttpcart("test.php?search=","myid","myBtn",function(cal){console.log("chk "+cal);});

Let it roll and see the magic

Supports HTML5 , no need to include jquery, cross script fetching not allowed
