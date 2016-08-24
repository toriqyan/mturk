var cb = {
	"occasion":["Work","Special-Occassion","Weekend-Casual","Date-Night"], 
	"style":["Classic","Trendy","Bohemian","Dramatic","Feminine","Punk-Rock","Don't-Know/Other"],
	"temperature":[40,50,60,70],
	"ethnicity":["Caucasian","African American","Latino","Asian","Other"],
	"body_size":["Slim","Full","Plus"],
};

var features = {
	"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow","Other"],
	"Pattern": ["Animal-Prints","Color-Blocking","Camouflage","Dots","Floral","Graphics","Plaid/Checks","Solid","Stripe-vertical","Stripe-horizontal","Other"],
};
var txt={
	"top":["Blouse","Buttoned-Shirt","Camisole","Halter-Top","Polo-Shirt","Suit-Jacket","Sweaters","Sweat-Shirt","Tank-top","T-Shirt","Tunic"],
	"bottom":["Capris","Jeans","Leggings/Tights","Pants","Shorts","Skirt","Suit-Pants","Suit-Skirt"],
	"dress": ["A-line","Body-conscious","High-low","Maxi", "Shirt-dress","Swing-dress","Wrap-dress","Other"],
	"outerwear":["Blazer","Cape","Cardigan","Coat","Jacket","Sweaters","Suit-Jacket","Vest"],
};
// var frm;

$(document).ready(function() {
	setupItem();
	setupTag();
});

function get_input () {
	alert("submit");
	result = {
		"occasion1": $('input[name=occasion]:checked').val().replace('-','_'),
		"occasion2": $('input[name=occasion]:checked').val().replace('-','_'),
		"style1": $('input[name=style]:checked').val().replace('-','_'),
		"style2": $('input[name=style]:checked').val().replace('-','_'),
		"style3": $('input[name=style]:checked').val().replace('-','_'),
		"body_size": $('input[name=body_size]:checked').val().replace('-','_'),
		"temperature": $('input[name=temperature]:checked').val().replace('-','_'),
		"ethnicity": $('input[name=ethnicity]:checked').val().replace('-','_'),
		"items":[]
	};
	for (var item in txt) {
		// console.log($('#'+item+' input:checked').val())
		if (typeof $('#'+item+' input:checked').val() !== 'undefined') {
			result["items"].push({
				"item_class": item,
				"item_subclass": $('input[name='+item+'_item'+']:checked').val().split('_')[2].replace('-','_'), 
				"color1": $('input[name='+item+'_Color'+']:checked').val().split('_')[2].replace('-','_'), 
				"color2": $('input[name='+item+'_Color'+']:checked').val().split('_')[2].replace('-','_'),
				"pattern1": $('input[name='+item+'_Pattern'+']:checked').val().split('_')[2].replace('-','_'),
				"pattern2": $('input[name='+item+'_Pattern'+']:checked').val().split('_')[2].replace('-','_'),
				"special_material1": "", 
				"special_material2": "", 
				"neckline": null, 
				"collar": null, 
				"hood": null, 
				"style": null, 
				"sleeve": null, 
				"length": null, 
			});
		}
	}
	test = {
		'key1':'val1',
		'key2':'val2',
		'key3':'val3'
	}
	console.log(result);
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", 'https://wix5uh8vve.execute-api.us-west-2.amazonaws.com/prod//clueless/get-profile-by-id', true); // true for asynchronous 
    xmlHttp.send(test);

    // $.ajax({
    //     type: 'GET',
    //     url: '[url to the wepAPI]',
    //     contentType : 'application/json',
    //     data: JSON.stringify(result),
    //     success: function (data) {
    //         if(data.errorMessage)
    //             alert('' + data.errorMessage);
    //         else      
    //             alert('' + data);
    //     },
    //     error: function (data) {
    //         alert('error:' + data.errorMessage );
    //     }
    // });
    // ev.preventDefault();
}

function setupItem() {
	var out = '';
	
	for (var segment in txt) {
		var seg_fea= '';
		seg_fea += '<div style="float: none; margin: 10px; border: 1px red solid; " id="'+ segment
			+'"><legend style="float:none; display:block;">'+segment+'</legend>';
		// for (var i= 0; i < txt[segment].length; i++) {
		// 	var item = txt[segment][i];				
		// 	seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
		// 	+'\" id=\"'+segment+'_'+item
		// 	+'\" value=\"'+segment+'_'+item
		// 	+'\" /><label for=\"'+segment+'_'+item
		// 	+'\" >'+item+'</label><ul>';
			for (var feature in features) {
				seg_fea+=appendFeature(segment, feature, features[feature]);
			}
			seg_fea+=appendFeature(segment, 'item', txt[segment]);
		// 	seg_fea+='</ul></div>';
		// }

		seg_fea+='</div>';
		out+=seg_fea;
	}
	document.getElementById("items").innerHTML = out;
}

// item: string; feature: string; options: list
// example: item: Top_Blouse, feature: Color, options: ["White", "Red",...]
function appendFeature(item, feature, options) {
	var res = '<li style="float:none; "><legend style="float:none; display:block;">'+feature
	+'</legend><form style="float:none; ">';
	
	for (var i = 0; i < options.length; i++) {
		var id = item+'_'+feature+'_'+options[i];

		res+='<div style="display:inline-block;"><input type=\"radio\" id=\"'+id+'\" value=\"'+id
		+'\" name=\"'+item+'_'+feature+'\"/><label for=\"'+id+'\" >'+options[i]
		+'</label></div>';
	}
	res+='</form></li>';
	return res;
}

function setupTag() {
	var i = 0;
	var out = "";
	tagNum = 0;
	for (var category in cb) {
		tagNum++;
		out+='<div class="tag">';
		var button_sec = '<fieldset class=\"'+category +'\"><legend style="float:none; display:block;">'+category+'</legend>';

		for (var option in cb[category]) {
			button_sec+='<div class="radio"><label><input name=\"'
				+category+'\" type=\"radio\" value=\"'+cb[category][option]
				+'\" />'+cb[category][option]+'</label></div>';
		}
		out+='</div><div class="images">'+button_sec+'</div></div>';
	}
	document.getElementById('task').innerHTML = out;
}
// function setup() {
// 	var out = '';
	
// 	for (var category in cb) {
// 		out+='<ul><legend style="float:none; display:block;">'+category+'</legend>';
// 		for (var tag in cb[category]) {
// 			out+='<li class="radio" style="float:none; display:inline-block;"><label><input name=\"'+category+'" type=\"radio\" value=\"'+cb[category][tag]
// 					+'\" />'+cb[category][tag]+'</label></li>';
// 		}
// 		out+='</ul>';
// 	}
// 	for (var category in txt) {
// 		out+='<ul class="css-treeview"><label><input name=\"'+category+'" type=\"radio\" value=\"'+category
// 					+'\" />'+category+'</label>';
// 		out+='<li><ul><legend style="float:none; display:block;">Item</legend>';
// 		for (var tag in txt[category]) {
// 			out+='<li class="radio"><label><input name=\"'+category+'" type=\"radio\" value=\"'+txt[category][tag]
// 					+'_Item\" />'+txt[category][tag]+'</label></li>';
// 		}
// 		out+='</ul></li>';
// 		out+='<li><ul><legend style="float:none; display:block;">Color</legend>';
// 		for (var tag in feature['Color']) {
// 			out+='<li class="radio"><label><input name=\"'+category+'_Color" type=\"radio\" value=\"'+feature['Color'][tag]
// 					+'\" />'+feature['Color'][tag]+'</label></li>';
// 		}
// 		out+='</ul></li>';
// 		out+='<li><ul><legend style="float:none; display:block;">Pattern</legend>';
// 		for (var tag in feature['Pattern']) {
// 			out+='<li class="radio"><label><input name=\"'+category+'_Pttern" type=\"radio\" value=\"'+feature['Pattern'][tag]
// 					+'\" />'+feature['Pattern'][tag]+'</label></li>';
// 		}
// 		out+='</ul></li></ul>';
		
// 	}
// 	out+='<input type="submit">';
// 	document.getElementById('input').innerHTML = out;
// }