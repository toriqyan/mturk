$(document).ready(function() {
	setup();
});

function setup() {
	
	if (!isNaN(document.getElementById("output"))) {
		var images = JSON.parse("[" + document.getElementById("output") + "]");
		var out='';
		for (var i in images){
			out+='<li><img src="'+images[i]+'"/></li>';
		}
		document.getElementById("result").innerHTML=out;
	}
}