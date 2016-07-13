var step = -1;
var tagNum = 0;
var result = [];
var str_result = "";
var d;
var posx;
var posy;
var initx=false;
var inity=false;
var boxNum = 0;
var tags = ["occasion", "style", "season", "ethnicity", "body-shape"];
var global_feature = {
	"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow","Don't-know/Other"],
	"Material": ["Cotton","Chiffon","Denim","Leather","Lace","Satin","Sequin","Silk","Woolen","Velvet","Don't-know/Other"],
	"Pattern": ["Animal-Prints","Color-Blocking","Camouflage","Dots","Floral","Graphics","Plaid/Checks","Solid","Stripe-vertical","Stripe-horizontal","Don't-know/Other"],
};
var extra_style = ["Dress", "Jeans", "Pants", "Skirts"];
var extra_length = ["Jacket","Coat","Cardigan","Dress", "Skirts"];
var radios = ["Collar", "Hood", "Sleeve", "Heel", "Size", "Length"];
var features={
	"Top":{
		"category":["Blouse","Buttoned-Shirt","Camisole","Dress","Halter-top","Jumpsuit","Polo-Shirt","Suit-Jacket","Sweaters","Sweat-Shirt","Tank-top","T-Shirt","Tunic"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"],
			"Sleeve": ["None","Short","Medium","Long","Don't-know/Other"],
			"Neckline": ["Asymmetric","Boat","Cowl","Crew","Round","Grecian","Halter","V-neck","Mock-turtle","Off-the-shoulder","Pussy-bow","Turtleneck","Scoop","Spaghetti","Square","Strapless","Don't-know/Other"]
		},
		"Dress-length":["Very-short/Mini-skirt", "Knee-length", "Midi/Calf-length", "Ankle-length", "Full-length","Don't-know/Other"],
		"Dress-style":["Shift","A-line","Sheath","Bodycon","Tent","Empire","Strapless","Halter-dress","One-shoulder","Slip-dress","Qi-Pao","Shirt-dress","Maxi","Ball-Gown","Don't-know/Other"]
	},
	"Bottom":{
		"category": ["Capris","Jeans","Leggings/Tights","Pants","Shorts","Skirts","Suit-Pant","Suit-Skirt"],
		"feature": {},
		"Pants-style": ["Wide-leg", "Straight","Skinny","Boot-cut","Flare","Don't-know/Other"],
		"Jeans-style": ["Wide-leg", "Straight","Skinny","Boot-cut","Flare","Don't-know/Other"],
		"Skirts-style": ["Straight","Pencil","A-line","Slit","Round","Pleat","Wrap","Prairie","Layered","Flounce" ,"Don't-know/Other"],
		"Skirts-length": ["Very-short/Mini-skirt", "Knee-length", "Midi/Calf-length", "Ankle-length", "Full-length", "Don't-know/Other"]
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
		"category":["Pumps","Sandals","Mules","Clogs","Ballerina","Espadrille","Loafers","Sneakers","Flip-flop","Ankle-boots","Boots","Western-boots"],
		"feature":{
			"Heel":["Flat", "Low", "High"],
			"Color": ["Aqua","Black","Blue","Brown","Coral/Orange","Green","Grey","Gold","Nude","Pink","Peach","Purple","Red","Silver","Taupe","Teal","White","Yellow","Don't-know/Other"],
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
	// "Outer-Wear": "https://s-media-cache-ak0.pinimg.com/564x/e2/2e/fa/e22efa4d1e6205bb6d46531d782c6ff0.jpg",
	"Shoes": "https://s-media-cache-ak0.pinimg.com/564x/49/e1/fb/49e1fbecaeaa30371a4bceaff9f1a086.jpg",
	// "Handbag": "https://s-media-cache-ak0.pinimg.com/564x/e6/7d/95/e67d95597fb3ed62a80ea93aaef3dae2.jpg",
	"Pattern": "https://s-media-cache-ak0.pinimg.com/564x/cb/32/2e/cb322ed9f98d8f5b7340d308ff168224.jpg",
	"Neckline": "https://s-media-cache-ak0.pinimg.com/564x/6d/63/30/6d6330a36399a9f230fae05a4184f70f.jpg",
	"Top_Dress_Style": "https://s-media-cache-ak0.pinimg.com/564x/fe/55/2e/fe552e9a58824d842253369e4201cde9.jpg",
	"Bottom_Skirts_Style": "https://s-media-cache-ak0.pinimg.com/564x/bf/7f/35/bf7f356f1e67b9f01706514d10f5d059.jpg"
};
var references = {
	"occasion":{
		"Work":["https://s-media-cache-ak0.pinimg.com/564x/08/aa/9b/08aa9b5f175459550a3770fa748a884b.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/39/71/4e/39714ea8960bcda1628fe350a8271ca4.jpg"], 
		"Special-Occassion":["https://s-media-cache-ak0.pinimg.com/564x/04/02/37/0402374f759aceb225014cd6e6894ee9.jpg",
							 "https://s-media-cache-ak0.pinimg.com/564x/ff/6e/92/ff6e927061032deb9021d13a7ebb03b8.jpg"], 
		"Weekend-Casual":["https://s-media-cache-ak0.pinimg.com/564x/28/1b/4b/281b4b506ddae7454bab56cf27962f8d.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/d2/ac/81/d2ac8174781d2f7cfdceec76661824a6.jpg"], 
		"Date-Night":["https://s-media-cache-ak0.pinimg.com/564x/80/65/b3/8065b3b327eaa9cf3d05c6e0a165703f.jpg",
					  "https://s-media-cache-ak0.pinimg.com/564x/16/14/95/161495ee2e632a35e07357802b14bf63.jpg"]
	}, 
	"style":{
		"Classic":["https://s-media-cache-ak0.pinimg.com/564x/dc/97/c9/dc97c90e37192f14b7a29ecdde08c269.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/62/48/04/624804309174b5ac2f3793b208a2cfdb.jpg"], 
		"Trendy":["https://s-media-cache-ak0.pinimg.com/564x/7d/80/9c/7d809cae57df2645963e7d4b93e93a85.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/c6/63/bf/c663bfbad217b140d1aba3d3a9948a38.jpg"], 
		"Bohemian":["https://s-media-cache-ak0.pinimg.com/564x/d9/f8/1c/d9f81ca91969bce6a8aa0fbdf587661c.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/1d/83/9d/1d839d04adce5486a368ee0e8f8dcb9f.jpg"], 
		"Dramatic":["https://s-media-cache-ak0.pinimg.com/564x/85/e7/99/85e7997c7ee3ea79e39f377bbcf32a82.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/98/6d/83/986d836f9ef731b51097e45fcb08697d.jpg"], 
		"Feminine":["https://s-media-cache-ak0.pinimg.com/564x/db/ba/27/dbba27380a7e6e137a12bbd788daf0a9.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/9c/8b/8f/9c8b8ffa2441c1184eed2a3c9d33522a.jpg"], 
		"Punk-Rock":["https://s-media-cache-ak0.pinimg.com/564x/ff/dc/09/ffdc099b20c4876a5a12722d6a0e5e4b.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/fa/86/26/fa8626c0d15e88ef71bcdde9b8699fd8.jpg"],
		"Don't-Know/Other":[]
	}, 
	"season":
		{"Spring":[], 
		"Summer":[],
		"Fall":[],
		"Winter":[]},
	"ethnicity":
		{"Caucasian":[],
		"African American":[],
		"Latino":[],
		"Asian":[],
		"Other":[]},
	"body-shape":
		{"Slim":["http://i2.wp.com/chicstreetstyle.me/wp-content/uploads/2016/06/IMG_0571.jpg?resize=683%2C1024"],
		"Full":["https://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-sleeveless-vest-dress.jpg~original"],
		"Plus":["https://s-media-cache-ak0.pinimg.com/564x/bc/c6/96/bcc696467a3b588b8e8897ed0c483001.jpg"]}
};
var inst = 
{
	"occasion":"Please tag which occasion(s) this outfit is appropriate for: Work, Special Occasion, Weekend Casual, or Date night/Dining out. Select all that applies.",
	"style":"Please tag which style(s) this outfit is: Classic, Trendy, Bohemian, Dramatic, Feminine, Punk Rock or Other. Select all that applies.",
	"season":"Please tag which season(s) this outfit is good for: Spring, Summer, Fall or Winter. Select all that applies.",
	"ethnicity":"Please tag the ethnicity of the model in the picture: Caucasian, African American, Latino, Asian or Other.",
	"body-shape":"Please tag the model’s body size: Slim, Full or Plus.",
};
var tag_exp = 
{
	"Classic": "a timeless style with tailored looks",
    "Trendy": "a style that keeps up with the latest trends",
    "Bohemian": "a \"free spirit\" style, prints, fringes, maxi dresses, cowboy boots, loose and flowy",
    "Dramatic": "a theatric style, bold color, patterns and accessories",
    "Feminine": "a \"lady-like\" style, floral prints, full skirts, lace, bows and ruffles",
    "Punk-Rock": "a \"rock star\" style, leather, studs, and ripped jeans"
}
var item_feature = new Array();
var next;
$(document).ready(function() {
	setup();
	next = document.getElementById('next');
	nextstep();
});

function setup() {
	setupTag();
	setupItem();
	setupSegment();
	setupReject();

	$('#end').hide();
	$('#submit').hide();
	$('#instruction').hide();
	$('#items').hide();
	$('.segment').hide();
	$('#task').hide();
	$('#rejection').hide();
	$('#description').show();
	console.log(document.getElementById("image_index").value);
}

function setupReject() {
	document.getElementById("target").src = images;
}

function reject() {
	ran = Math.floor(Math.random() * len);
	images=urls[ran];
	document.getElementById("target").src = images;
	document.getElementById("Canvas").src = images;
	for (var i = 1; i <= tagNum; i++) {
		$('#images'+i).each(function() {
			$(this).children('img').attr('src', images);
		});
	}
	str_result += (" reject\n"+images);
	window.scrollTo(0, 0);
}

function setupSegment() {
	document.getElementById("segment").innerHTML = '<img id=\"Canvas\" src=\"'
	+images+'\">';
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
			+'"><p>If there is a Top in the image, draw a box around the Top, and then describe the item using the list we offer below.  Sometimes an outfit has a Top AND an Outer-wear (jacket, coat or a sweater), select the Top in this step for now, you can select the Outer-wear later. If you are not sure whether there\'s a '+segment
			+' in the image, click Don\'t Know/Can\'t Tell. If you see ?, you can get some references by clicking on it.</p><legend style="float:none; display:block;">'
			+segment+'</legend>';
		}
		else if (segment in seg_ref) {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><p>If there\'s a '+segment
			+' in the image, draw a box around the '+ segment
			+', and then describe this item using the list we offer below. If you are not sure whether there\'s a '+segment
			+' in the image, click Don\'t Know/Can\'t Tell. If there does not exist a '
			+segment+ ' in the image, click Not Applicable. If you see ?, you can get some references by clicking on it.</p><legend style="float:none; display:block;">'
			+segment+'<a onclick="changeImage(\''+segment+'\')" ><img id=\"'
				+segment+'_ref\" style="display:none;" src=\"'+seg_ref[segment]+'\"/>?</a></legend>';
		} else {
			seg_fea += '<div style="float: none;" id="'+ segment
			+'"><p>If there\'s a '+segment
			+' in the image, draw a box around the '+ segment
			+', and then describe this item using the list we offer below. If you are not sure whether there\'s a '+segment
			+' in the image, click Don\'t Know/Can\'t Tell. If there does not exist a '
			+segment+ ' in the image, click Not Applicable. If you see ?, you can get some references by clicking on it.</p><legend style="float:none; display:block;">'
			+segment+'</legend>';
		}
		

		if (segment != "Handbag") {
			if (segment != "Top") {
				seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
					+'\" id=\"'+segment+'_NA'
					+'\" value=\"NA\" /><label for=\"'
					+segment+'_NA\" >Not Applicable</label></div>';
				}
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
			
			seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_DK'
				+'\" value=\"DK\" /><label for=\"'+segment
				+'_DK\" >Don\'t Know/Can\'t Tell</label></div>';
		} else {
			seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_NA'
				+'\" value=\"NA\" /><label for=\"'
				+segment+'_NA\" >Not Applicable</label></div>';
			seg_fea+='<ul>';
			seg_fea+=appendFeature(segment, "Color", global_feature['Color']);
			seg_fea+=appendFeature(segment, "Pattern", global_feature['Pattern']);
			seg_fea+=appendFeature(segment, "Size", features[segment]['Size']);
			seg_fea+='</ul>';
			seg_fea+='<div style="display:inline-block;"><input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_DK'
				+'\" value=\"DK\" /><label for=\"'+segment
				+'_DK\" >Don\'t Know/Can\'t Tell</label></div>';
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

function setupTag() {
	var task = document.getElementById('task');
	var i = 0;
	var out = "";
	tagNum = 0;
	for (var category in references) {
		tagNum++;
		out+='<div class="tag" id="tag'+tagNum
			+'"><h3>Part One: '+ category +
			'</h3><div class="reference"><p>'+ inst[category] 
			+'</p>';
		if (references[category].length >0) {
			out+='<h3>For reference: </h3>';
		}
		var button_sec = '<fieldset class=\"'+category +'\">';

		for (var option in references[category]) {
			if (references[category][option].length != 0) {
				if (category != "style") {
					out+='<ul class=\"imagewrap\"><legend>'+option+': </legend>';
				} else {
					out+='<ul class=\"imagewrap\"><legend style="width:300px;">'+option+': '+tag_exp[option]+'</legend>';
				}
				
				for (var reference in references[category][option]) {
					out+='<li><img src=\"'+ references[category][option][reference] +'\"></li>';
				}
				out+='</ul>';
			}
			if (category == "ethnicity" ||category =="body-shape") {
				button_sec+='<div class="radio"><label><input name=\"'
					+category+'Answer\" type=\"radio\" value=\"'+option
					+'\" />'+option+'</label></div>';
			} else {
				button_sec+='<div class="checkbox"><label><input name=\"'
					+category+'Answer\" type=\"checkbox\" value=\"'+option
					+'\" />'+option+'</label></div>';
			}
		}
		button_sec+='<button style="float: right;" class="pure-button" name="next" onclick="$(\'#next\').click()" type="button">Next</button></fieldset>';
		out+='</div><div class="images" id=\"images'+tagNum+'\"><img src=\"'+images+'\">'+button_sec+'</div></div>';
	}
	task.innerHTML = out;
}

function nextstep() {
	$('#next').click(function() {
		if (step == -1) {
			// if($('#workerId').val() == "") {
			// 	alert("Please accept the HIT before proceeding!");
			// 	return;
			// }
			str_result+=("workerId: "+$('#workerId').val()+"\n");
			str_result+=("assignmentId: "+$('#assignmentId').val()+"\n");
			str_result+=("hitId: "+$('#hitId').val()+"\n");
			str_result+=images+"";
			$('#description').hide();
			$('#rejection').show();
		} else if (step == 0) {
			$('#rejection').hide();
			$('#task').show();
			$('#next').hide();
			$('#tag1').show();
			var i = 2;
			for (i = 2; i <= tags.length; i++) {
				$('#tag'+i).hide();
			}
			str_result+="\n";
		} else if(step < tags.length) {
			str_result+=(tags[step-1]+": ");
			$('input[name="'+tags[step-1]+'Answer"]:checked').each(function() {
				var cur_tag = $(this).val();
				// console.log(tags[step]);
				// console.log(cur_tag);
				if (typeof(cur_tag) == "undefined") {
					alert("You have to select a tag.");
					return;
				}
				str_result+=cur_tag+" ";
			});
			str_result+="\n";
			window.scrollTo(0, 0);
			$('#tag'+(step+1)).show();
			$('#tag'+(step)).hide();
		} else if (step == tags.length) {
			str_result+=(tags[step-1]+": ");
			$('input[name="'+tags[step-1]+'Answer"]:checked').each(function() {
				var cur_tag = $(this).val();
				if (typeof(cur_tag) == "undefined") {
					alert("You have to select a tag.");
					return;
				}
				str_result+=cur_tag+" ";
			});
			str_result+="\n";
			window.scrollTo(0, 0);
			$('#tag'+(step)).hide();
			$('#instruction').show();
		} else if (step == tags.length+1) { //features[0] show
			$('#instruction').hide();
			$('#next').show();
			$('#items').show();
			for (var i= 1; i < segments.length; i++) {
				// console.log(segments[i]);
				$('#'+segments[i]).hide();
			}
			$('input:radio[name="'+segments[step-tagNum-1]+'"]').click(function(){
			    if(this.checked){ // if checked - check all parent checkboxes
			        $(this).parents('div').find('input').prop('checked',false);
			        $(this).prop('checked',true);
			    } 
			});
			boundingBox();
			$('.segment').show();
		} else if (step <=tags.length+segments.length) {
			if (!recordResult(segments[step-tagNum-2])) {
				// alert("Input illegal");
				return;
			}
			$('#'+segments[step-tagNum-2]).hide();
			$('#'+segments[step-tagNum-1]).show();
			$('input:radio[name="'+segments[step-tagNum-1]+'"]').click(function(){
			    if(this.checked){ // if checked - check all parent checkboxes
			        $(this).parents('div').find('input').prop('checked',false);
			        $(this).prop('checked',true);
			    } 
			});
			boundingBox();
		} else {
			if (!recordResult(segments[step-tagNum-2])) {
				// alert("Input illegal");
				return;
			}
			$('#'+segments[step-tagNum-2]).hide();
			$('#items').hide();
			$('#next').hide();
			$('.segment').hide();
			$('#end').show();
			$('#submit').show();
			$('#database').submit();
			console.log(str_result);
			document.getElementsByTagName('textarea')[0].value=str_result;
			console.log(document.getElementsByTagName('textarea')[0].value);
			// $("#amazon").submit();
		}
		step++;
		console.log(str_result);
	});
}

function clearBox() {
	if (boxNum > 0) {
		$('.gen_box_' + boxNum).remove();
		boxNum -= 1;
	}
	// $('#items input:checked').each(function(){
	// 	$(this).prop('checked', false);
	// });
}

function boundingBox() {
	$(function() {

	    var main_content = $('.col_two'),
	        gen_box = null;

	    //make .col_two selectable and...
	    main_content.selectable({ 
        start: function(e) {
                
                //get the mouse position on start
                x_begin = e.pageX,
                y_begin = e.pageY;

            },
        stop: function(e) {
        	
        	if (boxNum==1) {
        		alert("You can draw only one box at one step! Click Clear first, then draw again.");
        	} else {
        		boxNum++;
	            //get the mouse position on stop
	            x_end = e.pageX,
	            y_end = e.pageY;

	            /***  if dragging mouse to the right direction, calcuate width/height  ***/
	            if( x_end - x_begin >= 1 ) {
	                width  = x_end - x_begin,
	                height = y_end - y_begin;
	            
	            /***  if dragging mouse to the left direction, calcuate width/height (only change is x) ***/
	            } else {
	                
	                width  = x_begin - x_end,
	                height =  y_end - y_begin;
	                var drag_left = true;
	            }
	            
	            //append a new div and increment the class and turn it into jquery selector
	            // $(this).append('<div class="gen_box_' + boxNum + '"><p>'
	            // 	+ boxNum +'</p></div>');
				$(this).append('<div class="gen_box_' + boxNum + '"></div>');
	            gen_box = $('.gen_box_' + boxNum);

	            //add css to generated div and make it resizable & draggable
	            $(gen_box).css({
	                 'background' : 'none',
	                 'width'     : width,
	                 'height'    : height,
	                 'position'  : 'absolute',
	                 'left'      : x_begin,
	                 'top'         : y_begin,
	                 'border'    : '2px dashed red'
	            })
	            .draggable()
	            .resizable();

	            //if the mouse was dragged left, offset the gen_box position 
	            drag_left ? $(gen_box).offset({ left: x_end, top: y_begin }) : false;
            }
        }});
	});
}

function recordResult(segment) {
	if(boxNum==1) {
		var cleft = $($('#Canvas')).position().left;
		var ctop = $($('#Canvas')).position().top;
		var gen_box = $('.gen_box_1');
		var left = $(gen_box).position().left;
		var top = $(gen_box).position().top;
		var res = segment+"=Location: (" + (left - cleft)
			+ ", "+ (top - ctop) + ", "
			+ $(gen_box).css("width").replace('px','') + ", " 
			+ $(gen_box).css("height").replace('px','') + ")";
		if (segment != 'Handbag') {
			var item = $('input[name="'+segment+'"]:checked').val();
			if (typeof item == 'undefined') {
				alert('Please tag the item you marked out!');
				return false;
			}
			res+=(", Item: "+item.replace(segment+"_",""));
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
			} else if (item=='NA') {
				alert("Please select Don't Know/Can't Tell if you are not sure about the item you marked!");
				return false;
			}
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
		clearBox();
	} else if (boxNum==0) {
		var item = $('input[name="'+segment+'"]:checked').val();
		if (typeof item == 'undefined') {
			alert("If you are not sure whether there's a "+segment+" in the image, click Don't Know/Can't Tell. If there does not exist a "+segment+ " in the image, click Not Applicable.");
			return false;
		}
		if (item != 'DK' && item !='NA') {
			alert('Please draw a box around the item you tagged!');
			return false;
		} else {
			str_result+=(segment+": "+item+"\n");
		}
	} else {
		alert("Please just tag one item at a time!");
	}
	
	return true;
}

function submitBoth() {
	$('#database').submit();
	$('#amazon').submit();

}