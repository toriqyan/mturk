var cb = {
	"occasion":["Work","Special-Occassions","Casual-Outing","Night-Out","All"],
// 	"style":["Classic","Trendy","Bohemian","Dramatic","Feminine","Punk-Rock","All"],
	"temperature":["40","50","60","70","All"],
	"ethnicity":["Caucasian","African","Latino","Asian","All"],
	"body_size":["Slim","Full","Plus","All"],
};

var features = {
	"Color": ["Aqua","Black","Blue","Brown","Coral_Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow","All"],
	"Pattern": ["Animal-Prints","Color-Blocking","Camouflage","Dots","Floral","Graphics","Plaid_Checks","Solid","Stripe-vertical","Stripe-horizontal","All"],
};
var txt={
	"top":["Blouse","Buttoned-Shirt","Camisole","Halter-Top","Polo-Shirt","Suit-Jacket","Sweaters","Sweat-Shirt","Tank-top","T-Shirt","Tunic","All"],
	"bottom":["Capris","Jeans","Leggings_Tights","Pants","Shorts","Skirt","Suit-Pants","Suit-Skirt","All"],
	"dress": ["A-line","Body-conscious","High-low","Maxi", "Shirt-dress","Swing-dress","Wrap-dress","All"],
	"outerwear":["Blazer","Cape","Cardigan","Coat","Jacket","Sweaters","Suit-Jacket","Vest","All"],
};
// var frm;

$(document).ready(function() {
	setupItem();
	setupTag();
});

function get_input () {
// 	alert("submit");
	if (typeof $('input[name=occasion]:checked').val() !== 'undefined') {
		var occasion = $('input[name=occasion]:checked').val().replace('-','_');
		if (occasion == "All") {
		    occasion = "";
		}
		document.getElementById('occasion1').value=occasion;
		document.getElementById('occasion2').value=occasion;
	}
	if (typeof $('input[name=style]:checked').val() !== 'undefined') {
		var style = $('input[name=style]:checked').val().replace('-','_');
		if (style == "All") {
		    style = "";
		}
		document.getElementById('style1').value=style;
		document.getElementById('style2').value=style;
		document.getElementById('style3').value=style;
	}
	if (typeof $('input[name=ethnicity]:checked').val() !== 'undefined') {
		var ethnicity = $('input[name=ethnicity]:checked').val().replace('-','_');
		if (ethnicity == "All") {
		    ethnicity = "";
		}
		document.getElementById('ethnicity').value=ethnicity;
	}
	if (typeof $('input[name=body_size]:checked').val() !== 'undefined') {
		var body_size = $('input[name=body_size]:checked').val().replace('-','_');
		if (body_size == "All") {
		    body_size = "";
		}
		document.getElementById('body_size').value=body_size;
	}
	if (typeof $('input[name=temperature]:checked').val() !== 'undefined') {
		var temperature = $('input[name=temperature]:checked').val();
		if (temperature == "All") {
		    temperature = "-1";
		}
		document.getElementById('temperature').value=temperature;
	}
// 	result = {
// 		"occasion1": occasion,
// 		"occasion2": occasion,
// 		"style1": style,
// 		"style2": style,
// 		"style3": style,
// 		"body_size": body_size,
// 		"temperature": temperature,
// 		"ethnicity": ethnicity,
// 		"items":[]
// 	};
    var items = [];
	for (var item in txt) {
		if (typeof $('input[name='+item+']:checked').val() !== 'undefined') {

			if (typeof $('input[name='+item+'_Color'+']:checked').val() !== 'undefined') {
			    var color = $('input[name='+item+'_Color'+']:checked').val().split('_')[2].replace('-','_');
			    if (color == "All") {
        		    color = "";
        		}
			} else {
			    var color = '';
			}

			if (typeof $('input[name='+item+'_item'+']:checked').val() !== 'undefined') {
			    var subclass = $('input[name='+item+'_item'+']:checked').val().split('_')[2].replace('-','_');
			    if (subclass == "All") {
        		    subclass = "";
        		}
			} else {
			    var subclass = '';
			}

			if (typeof $('input[name='+item+'_Pattern'+']:checked').val() !== 'undefined') {
			    var pattern = $('input[name='+item+'_Pattern'+']:checked').val().split('_')[2].replace('-','_');
			    if (pattern == "All") {
        		    pattern = "";
        		}
			} else {
			    var pattern = '';
			}
			items.push({
				"item_class": item,
				"item_subclass": subclass,
				"color1": color,
				"color2": color,
				"pattern1": pattern,
				"pattern2": pattern,
				"special_material1": "",
				"special_material2": "",
				"neckline": "",
				"collar": false,
				"hood": false,
				"style": "",
				"sleeve": "",
				"length": "",
			});
		}
	}
	var valu = "[";
	for (var i = 0; i < items.length; i++) {
	    valu+="{";
	    for (var e in items[i]) {
	        valu+='"'+e+'":"'+items[i][e]+'",';
	    }
	    valu+="},";
	}
	valu+="]";
	document.getElementById('item').value=valu;
// 	alert(document.getElementById('item').value);
	$('input_form').submit();

}

function setupItem() {
	var out = '';

	for (var segment in txt) {
		var seg_fea= '';
		seg_fea += '<div style="float: none; margin: 10px; border: 1px red solid; "><input type=\"checkbox\" name=\"'+segment
				+'\" id=\"'+segment
				+'\" value=\"'+segment
				+'\" /><label for=\"'+segment
				+'\" >'+segment+'</label><ul>';
			seg_fea+=appendFeature(segment, 'item', txt[segment]);
			for (var feature in features) {
				seg_fea+=appendFeature(segment, feature, features[feature]);
			}

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
        if (options[i] == 'All') {
            res+='<div style="display:inline-block;"><input type=\"radio\" id=\"'+id+'\" value=\"'+id
	    	+'\" name=\"'+item+'_'+feature+'\" checked/><label for=\"'+id+'\" >'+options[i]
	    	+'</label></div>';
        } else {
    		res+='<div style="display:inline-block;"><input type=\"radio\" id=\"'+id+'\" value=\"'+id
    		+'\" name=\"'+item+'_'+feature+'\"/><label for=\"'+id+'\" >'+options[i]
    		+'</label></div>';
        }
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
		out+='';
		var button_sec = '<fieldset class=\"'+category +'\"><legend style="float:none; display:block;">'+category+'</legend>';

		for (var option in cb[category]) {
		    if (cb[category][option] == 'All') {
		        button_sec+='<div class="radio"><label><input name=\"'
				    +category+'\" type=\"radio\" value=\"'+cb[category][option]
				    +'\" checked/>'+cb[category][option]+'</label></div>';
		    } else {
		        button_sec+='<div class="radio"><label><input name=\"'
    				+category+'\" type=\"radio\" value=\"'+cb[category][option]
    				+'\" />'+cb[category][option]+'</label></div>';
		    }
		}
		out+='</div><div class="images">'+button_sec+'</div>';
	}
	document.getElementById('task').innerHTML = out;
}