var step = 0;
var images = "";
var ran = 0;
var tagNum = 0;
var result = [];
var str_result = "";
var global_feature = {
	"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow","Other"],
	"Special-Material": ["Denim","Leather","Lace","Sequin","Velvet","N/A"],
	"Pattern": ["Animal-Prints","Color-Blocking","Camouflage","Dots","Floral","Graphics","Plaid/Checks","Solid","Stripe-vertical","Stripe-horizontal","Other"],
};
var extra_style = ["Dress", "Jeans", "Pants", "Skirts"];
var limits = {
	"Neckline": ["Buttoned-Shirt","Camisole","Halter-Top","Polo-Shirt","Suit-Jacket","Sweat-Shirt","Tank-top"],
	"Hood": ["Tank-top", "Camisole", "Halter-Top"],
	"Collar": ["Tank-top", "Camisole", "Halter-Top"],
	"Special-Material": ["Jeans","Backpack", "Clutch", "Shoulder-Bag", "Tote", "Other"]
};
var extra_length = ["Jacket","Coat","Cardigan","Dress", "Skirts"];
var radios = ["Neckline","Collar", "Hood", "Sleeve", "Heel", "Size", "Length"];
var features={
	"Top":{
		"category":["Blouse","Buttoned-Shirt","Camisole","Halter-Top","Polo-Shirt","Suit-Jacket","Sweaters","Sweat-Shirt","Tank-top","T-Shirt","Tunic"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"],
			"Sleeve": ["None","Short","Medium","Long","Other"],
			"Neckline": ["Asymmetric","Boat","Cowl","Crew","Round","Grecian","Halter","V-neck","Off-the-shoulder","Pussy-bow","Turtleneck","Scoop","Spaghetti","Square","Strapless","Other"]
		},
	},
	"Bottom":{
		"category": ["Capris","Jeans","Leggings/Tights","Pants","Shorts","Skirt","Suit-Pants","Suit-Skirt"],
		"feature": {},
		"Pants-style": ["Wide-leg", "Straight","Skinny","Boot-cut","Flare","Other"],
		"Jeans-style": ["Wide-leg", "Straight","Skinny","Boot-cut","Flare","Other"],
		"Skirt-style": ["Straight","Pencil","A-line","Slit","Round","Pleat","Wrap","Prairie","Layered","Flounce" ,"Other"],
		"Skirt-length": ["Very-short/Mini-skirt", "Knee-length", "Midi/Calf-length", "Ankle-length", "Floor-length", "Other"]
	},
	"Dress": {
		"category": ["A-line","Body-conscious","High-low","Maxi", "Shirt-dress","Swing-dress","Wrap-dress","Other"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"],
			"Sleeve": ["None","Short","Medium","Long","Other"],
			"Neckline": ["Asymmetric","Boat","Cowl","Crew","Round","Grecian","Halter","V-neck","Off-the-shoulder","Pussy-bow","Turtleneck","Scoop","Spaghetti","Square","Strapless","Other"],
			"Length": ["Very-short", "Knee-length", "Midi", "Full-body"]
		},
	},
	// "One-piece": {
	// 	"category": ["Dress","Jumpsuit"],
	// 	"feature":{
	// 		"Collar":["Yes", "No"], 
	// 		"Hood": ["Yes", "No"],
	// 		"Sleeve": ["None","Short","Medium","Long","Other"],
	// 		"Neckline": ["Asymmetric","Boat","Cowl","Crew","Round","Grecian","Halter","V-neck","Off-the-shoulder","Pussy-bow","Turtleneck","Scoop","Spaghetti","Square","Strapless","Other"]
	// 	},
	// 	"Dress-length":["Very-short", "Knee-length", "Midi", "Full-body"],
	// 	"Dress-style":["A-line","Body-conscious","High-low","Maxi", "Shirt-dress","Swing-dress","Wrap-dress","Other"]
	// },
	"Outerwear":{
		"category":["Blazer","Cape","Cardigan","Coat","Jacket","Sweaters","Suit-Jacket","Vest"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"]
		},
		"Jacket-length":["Cropped","Normal","Long","Very-long"],
		"Coat-length":["Cropped","Normal","Long","Very-long"],
		"Cardigan-length":["Cropped","Normal","Long","Very-long"]
	},
	"Shoes":{
		"category":["Pumps","Sandals(Open-toe)","Mules","Clogs","Flats","Loafers/Oxford","Sneakers","Ankle-boots","Boots"],
		"feature":{
			"Heel":["Flat", "Low", "High"],
			"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow","Other"],
		}
	},
	"Bags":{
		"category":["Backpack", "Clutch", "Shoulder-Bag", "Tote", "Other"]
	}
};
var segments = ["Top", "Bottom","Dress", "OuterWear", "Shoes", "Bags"];
var seg_ref = {
	"Top": "https://s-media-cache-ak0.pinimg.com/564x/ad/44/c4/ad44c4b48a20222cdb7285c8e5ceedbc.jpg",
	"Bottom_Jeans_Style": "https://s-media-cache-ak0.pinimg.com/564x/f1/95/60/f19560e706ef2ef3f97983f7a8cad4cd.jpg",
	"Bottom_Pants_Style": "https://s-media-cache-ak0.pinimg.com/564x/f1/95/60/f19560e706ef2ef3f97983f7a8cad4cd.jpg",
	"Outerwear": "https://s-media-cache-ak0.pinimg.com/564x/f0/ef/d2/f0efd2ffd628861cd0f966a8e635ac65.jpg",
	"Shoes": "https://s-media-cache-ak0.pinimg.com/564x/e0/84/26/e08426e924c421145a66bcc7fc9cdeed.jpg",
	"Pattern": "https://s-media-cache-ak0.pinimg.com/564x/cb/32/2e/cb322ed9f98d8f5b7340d308ff168224.jpg",
	"Neckline": "https://s-media-cache-ak0.pinimg.com/564x/6d/63/30/6d6330a36399a9f230fae05a4184f70f.jpg",
	"Dress": "https://s-media-cache-ak0.pinimg.com/564x/02/3b/96/023b96f16a5d4ce5c91f2ce7c3d2daf7.jpg",
	"Bottom_Skirt_Style": "https://s-media-cache-ak0.pinimg.com/564x/bf/7f/35/bf7f356f1e67b9f01706514d10f5d059.jpg",
	"Bags": "https://s-media-cache-ak0.pinimg.com/564x/89/c8/a9/89c8a98f16abb5ad621b9eabd5de8019.jpg"
};


var item_feature = new Array();
$(document).ready(function() {
	setup();
});

function setup() {
	ran = parseInt(document.getElementById("imageIndex").value);
	if (isNaN(ran)) {
	    ran = 0;
	}
	if (ran >= urls.length) {
		alert("you are done!");
		return;
	}
	// if (ran == -1) {
	// 	alert("You have done this task before so we are not gonna ask you to do it again. Please return the hit. Thank you!");
	// 	$('#next').hide();
	// 	$('#rejection').hide();
	// }
	console.log(ran);
	images=urls[ran];
	document.getElementById('target').src= images;
	setupItem();
}

function showImage(segment) {
	var id = '#'+segment+'_ref';
	var left = $('#'+segment+' a').position().left+20;
	var top = $('#'+segment+' a').position().top-parseInt($(id).css("height").replace("px",""));
	$(id).css({
		'left': left+'px',
		'top': top+'px',
		'position': 'absolute',
		'display': 'block',
	});
}

function hideImage(segment) {
	var id = '#'+segment+'_ref';
	$(id).css({
		'position': 'absolute',
		'display': 'none',
	});
}

function changeImage(segment) {
	var id = '#'+segment+'_ref';
	if ($(id).css('display') == 'none') {
		showImage(segment);
	} else {
		hideImage(segment);
	}
}

function setupItem() {
	var out = '';
	
	for (var segment in features) {
		var seg_fea= '';
		if (segment in seg_ref) {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><legend style="float:none; display:block;">'
			+segment+'<a onclick="changeImage(\''+segment+'\')" ><img id=\"'
				+segment+'_ref\" style="display:none;" src=\"'+seg_ref[segment]+'\"/>?</a></legend>';
		} else {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><legend style="float:none; display:block;">'
			+segment+'</legend>';
		}
		

		// if (segment != "Bags") {
			// if (segment != "Top") {
			// 	seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
			// 		+'\" id=\"'+segment+'_NA'
			// 		+'\" value=\"NA\" /><label for=\"'
			// 		+segment+'_NA\" >Not Applicable</label></div>';
			// 	}
			for (var i= 0; i < features[segment]['category'].length; i++) {
				var item = features[segment]['category'][i];				
				seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_'+item
				+'\" value=\"'+segment+'_'+item
				+'\" /><label for=\"'+segment+'_'+item
				+'\" >'+item+'</label><ul>';
				if(segment != "Shoes") {
					for (var feature in global_feature) {
						if (feature in limits) {
							if (limits[feature].indexOf(item) == -1) {
								seg_fea+=appendFeature(segment+'_'+item, feature, global_feature[feature]);
							}
						} else {
							seg_fea+=appendFeature(segment+'_'+item, feature, global_feature[feature]);
						}
						
					}
				}
				for (var feature in features[segment]['feature']) {

					if (feature in limits) {
						// console.log(feature);
						// console.log(item);
						if (limits[feature].indexOf(item) == -1) {
							seg_fea+=appendFeature(segment+'_'+item, feature, features[segment]['feature'][feature]);
						}
					} else {
						seg_fea+=appendFeature(segment+'_'+item, feature, features[segment]['feature'][feature]);
					}
					
				}
				if (extra_style.indexOf(item) >= 0) {
					seg_fea+=appendFeature(segment+'_'+item, "Style", features[segment][item+'-style']);
				}
				if (extra_length.indexOf(item) >= 0) {

					seg_fea+=appendFeature(segment+'_'+item, "Garment-Length", features[segment][item+'-length']);
				}
				seg_fea+='</ul></div></li>';
			}
			
			// seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
			// 	+'\" id=\"'+segment+'_DK'
			// 	+'\" value=\"DK\" /><label for=\"'+segment
			// 	+'_DK\" >Don\'t Know/Can\'t Tell</label></div>';
		// } else {
			// seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
			// 	+'\" id=\"'+segment+'_NA'
			// 	+'\" value=\"NA\" /><label for=\"'
			// 	+segment+'_NA\" >Not Applicable</label></div>';
			// seg_fea+='<ul>';
			// seg_fea+=appendFeature(segment, "Color", global_feature['Color']);
			// seg_fea+=appendFeature(segment, "Pattern", global_feature['Pattern']);
			// seg_fea+=appendFeature(segment, "Size", features[segment]['Size']);
			// seg_fea+='</ul>';
			// seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
			// 	+'\" id=\"'+segment+'_DK'
			// 	+'\" value=\"DK\" /><label for=\"'+segment
			// 	+'_DK\" >Don\'t Know/Can\'t Tell</label></div>';
		// }
		seg_fea+='</ul></div>';
		out+=seg_fea;
	}
	// out+='';
	document.getElementById("items").innerHTML = out;
}

// item: string; feature: string; options: list
// example: item: Top_Blouse, feature: Color, options: ["White", "Red",...]
function appendFeature(item, feature, options) {
	if (typeof item_feature[item] == "undefined") {
		item_feature[item] = [];
	}
	item_feature[item].push(item+'_'+feature);
	if (item+'_'+feature in seg_ref) {
		var res = '<li style="float:none; margin: 10px; border: 1px red solid; " id="'+item+'_'+feature+'"><legend style="float:none; display:block;">'+feature
	+'<a onclick="changeImage(\''+item+'_'+feature+'\')" ><img id=\"'
	+item+'_'+feature+'_ref\" style="display:none;" src=\"'+seg_ref[item+'_'+feature]+'\"/>?</a></legend><form style="float:none; ">';
	} else if (feature in seg_ref) {
		var res = '<li style="float:none; margin: 10px; border: 1px red solid; " id="'+item+'_'+feature+'"><legend style="float:none; display:block;">'+feature
	+'<a onclick="changeImage(\''+item+'_'+feature+'\')" ><img id=\"'
	+item+'_'+feature+'_ref\" style="display:none;" src=\"'+seg_ref[feature]+'\"/>?</a></legend><form style="float:none; ">';
	} else {
		var res = '<li style="float:none; margin: 10px; border: 1px red solid; "><legend style="float:none; display:block;">'+feature
	+'</legend><form style="float:none; ">';
	}
	
	for (var i = 0; i < options.length; i++) {
		var id = item+'_'+feature+'_'+options[i];
		if (radios.indexOf(feature)>=0) {
			res+='<div style="display:inline-block;"><input type=\"radio\" id=\"'+id+'\" value=\"'+id
			+'\" name=\"'+item+'_'+feature+'\"/><label for=\"'+id+'\" >'+options[i]
			+'</label></div>';
		} else {
			res+='<div style="display:inline-block;"><input type=\"checkbox\" id=\"'+id+'\" value=\"'+id
			+'\" name=\"'+item+'_'+feature+'\"/><label for=\"'+id+'\" >'+options[i]
			+'</label></div>';
		}
	}
	res+='</form></li>';
	return res;
}



function nextstep() {
	// $('#submit').click(function() {
		// if (step == 0) {
	str_result+=images+"\n";
	var i=0;
	for (i = 0; i < segments.length; i++) {
		console.log(segments[i]);
		recordResult(segments[i]);
	}
	// step++;
	console.log(str_result);
	document.getElementsByTagName('textarea')[0].value=str_result;
	document.getElementById('user-input2').value=str_result;
	$('#database').submit();
	// });
}

function recordResult(segment) {
		var res = "";
		var item = $('input[name="'+segment+'"]:checked').val();
		if (typeof item == 'undefined') {
			console.log('undefined');
			return;
		}
		res+=("Item: "+item.replace(segment+"_",""));
		for (var i = 0; i < item_feature[item].length; i++) {
			var item_fea=", "+item_feature[item][i].replace(item+"_", "")+":";
			$('input[name="'+item_feature[item][i]+'"]:checked').each(function(){
				item_fea+=(' '+$(this).val().replace(item_feature[item][i]+"_", ""));
			});
			if (item_fea==", "+item_feature[item][i].replace(item+"_", "")+":") {
				alert("Please tag "+item_feature[item][i]+"!");
				return;
			}
			res+=item_fea;
		}
		console.log(res);
		str_result+=res+"\n";
		str_result+=(segment+": "+item+"\n");

	return;
}
