$(document).ready(function() {
	setup();
});

function setup() {
// 	if (!isNaN(document.getElementById("output").value)) {
	   // alert(document.getElementById("output").value);
	    console.log(document.getElementById("output").value);
		var images = JSON.parse(document.getElementById("output").value);
		var out='<ul class="imagewrap">';
		for (var i in images){
		    var index = images[i].split("/")[2]+'/'+images[i].split("/")[3].replace('.jpg','');
			out+='<li class"images"><img src="'
			+translation[images[i]]
			+'"/><label>'+index+'</label></li>';
		}
		out+="</ul>";
		document.getElementById("task").innerHTML=out;
// 	}
}