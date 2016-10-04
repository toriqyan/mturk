var step = 0;
var images = "";
var ran = 0;
var tagNum = 0;
var result = [];
var str_result = "";
var global_feature = {
	"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow"],
	"Material": ["Cotton","Chiffon","Denim","Leather","Lace","Satin","Sequin","Silk","Woolen","Velvet"],
	"Pattern": ["Animal-Prints","Color-Blocking","Camouflage","Dots","Floral","Graphics","Plaid/Checks","Solid","Stripe-vertical","Stripe-horizontal"],
};
var extra_style = ["Dress", "Jeans", "Pants", "Skirts"];
var extra_length = ["Jacket","Coat","Cardigan","Dress", "Skirts"];
var radios = ["Neckline","Collar", "Hood", "Sleeve", "Heel", "Size", "Length"];
var features={
	"Top":{
		"category":["Blouse","Buttoned-Shirt","Camisole","Dress","Halter-top","Jumpsuit","Polo-Shirt","Suit-Jacket","Sweaters","Sweat-Shirt","Tank-top","T-Shirt","Tunic"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"],
			"Sleeve": ["None","Short","Medium","Long"],
			"Neckline": ["Asymmetric","Boat","Cowl","Crew","Round","Grecian","Halter","V-neck","Mock-turtle","Off-the-shoulder","Pussy-bow","Turtleneck","Scoop","Spaghetti","Square","Strapless"]
		},
		"Dress-length":["Very-short/Mini-skirt", "Knee-length", "Midi/Calf-length", "Ankle-length", "Full-length"],
		"Dress-style":["Shift","A-line","Sheath","Bodycon","Tent","Empire","Strapless","Halter-dress","One-shoulder","Slip-dress","Qi-Pao","Shirt-dress","Maxi","Ball-Gown/Evening-Dress"]
	},
	"Bottom":{
		"category": ["Capris","Jeans","Leggings/Tights","Pants","Shorts","Skirts","Suit-Pant","Suit-Skirt"],
		"feature": {},
		"Pants-style": ["Wide-leg", "Straight","Skinny","Boot-cut","Flare"],
		"Jeans-style": ["Wide-leg", "Straight","Skinny","Boot-cut","Flare"],
		"Skirts-style": ["Straight","Pencil","A-line","Slit","Round","Pleat","Wrap","Prairie","Layered","Flounce" ],
		"Skirts-length": ["Very-short/Mini-skirt", "Knee-length", "Midi/Calf-length", "Ankle-length", "Full-length"]
	},
	"Outer-Wear":{
		"category":["Blazer","Cape","Cardigan","Coat","Jacket","Sweaters","Suit-Jacket","Vest"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"]
		},
		"Jacket-length":["Waist-length","Hip-length","Knee-length","Ankle-length","Full-body"],
		"Coat-length":["Waist-length","Hip-length","Knee-length","Ankle-length","Full-body"],
		"Cardigan-length":["Waist-length","Hip-length","Knee-length","Ankle-length","Full-body"]
	},
	"Shoes":{
		"category":["Pumps","Sandals","Mules","Clogs","Ballerina","Espadrille","Loafers","Sneakers","Flip-flop","Ankle-boots","Boots","Western-boots","Oxford"],
		"feature":{
			"Heel":["Flat", "Low", "High"],
			"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow"],
		}
	},
	"Handbag":{
		"Size":["Small", "Medium", "Large"]
	}
};
var segments = ["Top", "Bottom", "Outer-Wear", "Shoes", "Handbag"];
var seg_ref = {
	"Top": "https://s-media-cache-ak0.pinimg.com/564x/6e/5c/e1/6e5ce1af24fcc1cf4f0722ea3164e38b.jpg",
	"Bottom_Jeans_Style": "https://s-media-cache-ak0.pinimg.com/564x/f1/95/60/f19560e706ef2ef3f97983f7a8cad4cd.jpg",
	"Bottom_Pants_Style": "https://s-media-cache-ak0.pinimg.com/564x/f1/95/60/f19560e706ef2ef3f97983f7a8cad4cd.jpg",
	"Outer-Wear": "https://s-media-cache-ak0.pinimg.com/564x/f0/ef/d2/f0efd2ffd628861cd0f966a8e635ac65.jpg",
	"Shoes": "https://s-media-cache-ak0.pinimg.com/564x/0b/36/d0/0b36d0615f4bee87ee3054d816e38534.jpg",
	"Pattern": "https://s-media-cache-ak0.pinimg.com/564x/cb/32/2e/cb322ed9f98d8f5b7340d308ff168224.jpg",
	"Neckline": "https://s-media-cache-ak0.pinimg.com/564x/6d/63/30/6d6330a36399a9f230fae05a4184f70f.jpg",
	"Top_Dress_Style": "https://s-media-cache-ak0.pinimg.com/564x/fe/55/2e/fe552e9a58824d842253369e4201cde9.jpg",
	"Bottom_Skirts_Style": "https://s-media-cache-ak0.pinimg.com/564x/bf/7f/35/bf7f356f1e67b9f01706514d10f5d059.jpg"
};


var item_feature = new Array();
$(document).ready(function() {
	setup();
	nextstep();
});

function setup() {
	ran = parseInt(document.getElementById("imageIndex").value);
	if (isNaN(ran)) {
	    ran = 0;
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
		if (segment == 'Top') {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><legend style="float:none; display:block;">'
			+segment+'<a onclick="changeImage(\''+segment+'\')" ><img id=\"'
				+segment+'_ref\" style="display:none;" src=\"'+seg_ref[segment]+'\"/>?</a></legend>';
		}
		else if (segment in seg_ref) {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><legend style="float:none; display:block;">'
			+segment+'<a onclick="changeImage(\''+segment+'\')" ><img id=\"'
				+segment+'_ref\" style="display:none;" src=\"'+seg_ref[segment]+'\"/>?</a></legend>';
		} else {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><legend style="float:none; display:block;">'
			+segment+'</legend>';
		}

		if (segment != "Handbag") {
			// if (segment != "Top") {
			seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_NA'
				+'\" value=\"NA\" checked/><label for=\"'
				+segment+'_NA\" >Not Applicable</label></div>';
				// }
			for (var i= 0; i < features[segment]['category'].length; i++) {
				var item = features[segment]['category'][i];				
				seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_'+item
				+'\" value=\"'+segment+'_'+item
				+'\" /><label for=\"'+segment+'_'+item
				+'\" >'+item+'</label><ul>';
				if(segment != "Shoes") {
					for (var feature in global_feature) {
						seg_fea+=appendFeature(segment+'_'+item, feature, global_feature[feature]);
					}
				}
				for (var feature in features[segment]['feature']) {
					seg_fea+=appendFeature(segment+'_'+item, feature, features[segment]['feature'][feature]);
				}
				if (extra_style.indexOf(item) >= 0) {
					seg_fea+=appendFeature(segment+'_'+item, "Style", features[segment][item+'-style']);
				}
				if (extra_length.indexOf(item) >= 0) {
					seg_fea+=appendFeature(segment+'_'+item, "Length", features[segment][item+'-length']);
				}
				seg_fea+='</ul></div></li>';
			}
			
			// seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
			// 	+'\" id=\"'+segment+'_DK'
			// 	+'\" value=\"DK\" /><label for=\"'+segment
			// 	+'_DK\" >Don\'t Know/Can\'t Tell</label></div>';
		} else {
			seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_NA'
				+'\" value=\"NA\" checked/><label for=\"'
				+segment+'_NA\" >Not Applicable</label></div>';
			seg_fea+='<ul>';
			seg_fea+=appendFeature(segment, "Color", global_feature['Color']);
			seg_fea+=appendFeature(segment, "Pattern", global_feature['Pattern']);
			seg_fea+=appendFeature(segment, "Size", features[segment]['Size']);
			seg_fea+='</ul>';
			// seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
			// 	+'\" id=\"'+segment+'_DK'
			// 	+'\" value=\"DK\" /><label for=\"'+segment
			// 	+'_DK\" >Don\'t Know/Can\'t Tell</label></div>';
		}
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
	$('#submit').click(function() {
		// if (step == 0) {
		str_result+=images+"\n";
		var i=0;
		for (i = 0; i < segments.length; i++) {
			recordResult(segments[i]);
			// if (!recordResult(segments[i])) {
				// alert("Input illegal");
				// return;
			// }
				// $('#'+segments[step-tagNum-2]).hide();
				// $('#'+segments[step-tagNum-1]).show();
				// $('input:radio[name="'+segments[step-tagNum-1]+'"]').click(function(){
				//     if(this.checked){ // if checked - check all parent checkboxes
				//         $(this).parents('div').find('input').prop('checked',false);
				//         $(this).prop('checked',true);
				//     } 
				// });
		}
		// }
		// else {
		// 	if (!recordResult(segments[step-tagNum-2])) {
		// 		// alert("Input illegal");
		// 		return;
		// 	}
		// 	$('#'+segments[step-tagNum-2]).hide();
		// 	$('#items').hide();
		// 	$('#next').hide();
		// 	$('.segment').hide();
		// 	$('#end').show();
		// 	$('#submit').show();
		// 	console.log(str_result);
		// 	document.getElementsByTagName('textarea')[0].value=str_result;
		// 	document.getElementsByTagName('textarea')[1].value=str_result;
		// 	console.log(document.getElementsByTagName('textarea')[0].value);
		// 	// $("#amazon").submit();
		// }
		step++;
		console.log(str_result);
		document.getElementsByTagName('textarea')[0].value=str_result;
		// document.getElementsByTagName('textarea')[1].value=str_result;
		$('#database').submit();
	});
}

function recordResult(segment) {
		
		var res = "";
		if (segment != 'Handbag') {
			var item = $('input[name="'+segment+'"]:checked').val();
			if (typeof item != 'undefined') {
				
			
				res+=("Item: "+item.replace(segment+"_",""));
				if (item!='DK' && item!='NA') {
					for (var i = 0; i < item_feature[item].length; i++) {
						// console.log(item_feature[item][i]);
						var item_fea=", "+item_feature[item][i].replace(item+"_", "")+": [";
						$('input[name="'+item_feature[item][i]+'"]:checked').each(function(){
							item_fea+=($(this).val().replace(item_feature[item][i]+"_", "")+' ');
						});
						item_fea+="]";
						if (item_fea=="") {
							alert("Please tag "+item_feature[item][i]+"!");
							return false;
						}
						res+=item_fea;
					}
				} 
			}
			// else if (item=='NA') {
			// 	alert("Please select Don't Know/Can't Tell if you are not sure about the item you marked!");
			// 	return false;
			// }
		} else {
			// res+=(", ");
			for (var i = 0; i < item_feature[segment].length; i++) {
				var item_fea=", "+item_feature[segment][i].replace(segment+'_', '')+": [";
				$('input[name="'+item_feature[segment][i]+'"]:checked').each(function(){
					item_fea+=($(this).val().replace(item_feature[segment][i]+'_', '')+' ');
					console.log(item_fea);
				});
				item_fea+="]";
				if (item_fea=="") {
					alert("Please tag "+item_feature[segment][i]+"!");
					return false;
				}
				res+=item_fea;
			}
		}
		str_result+=res+"\n";
		var item = $('input[name="'+segment+'"]:checked').val();
		// if (typeof item == 'undefined') {
		// 	alert("If you are not sure whether there's a "+segment+" in the image, click Don't Know/Can't Tell. If there does not exist a "+segment+ " in the image, click Not Applicable.");
		// 	return false;
		// }
		// if (item != 'DK' && item !='NA') {
		// 	alert('Please draw a box around the item you tagged!');
		// 	return false;
		// } else {
		str_result+=(segment+": "+item+"\n");
		// }


	return true;
}
