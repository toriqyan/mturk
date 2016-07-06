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
	"Color": ["White","Black","Red","Aqua","Blue","Green","Purple","Teal","Pink","Peach","Grey","Coral/Orange","Brown","Taupe","Yellow","Don't-know/Other"],
	"Material": ["Cotton","Chiffon","Silk","Woolen","Denim","Leather","Lace","Satin","Sequin","Velvet","Don't-know/Other"],
	"Pattern": ["Block","Solid","Graphics","Stripe-vertical","Plaid","Stripe-horizontal","Animal-Prints","Camouflage","Floral","Dots","Don't-know/Other"],
};
var radios = ["Collar", "Hood", "Sleeve", "Heel", "Size"];
var features={
	"Top":{
		"category":["Bralet","Blouse","Buttoned-Shirt","T-Shirt","Tank-top","Sweaters","Sweat-Shirt","Tunic","Camisole","Polo-Shirt","Halter-top"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"],
			"Sleeve": ["None","Short","Medium","Long"],
			"Neckline": ["Strap","Strapless","V-neck","Crew-neck","Boat-neck","U-neck","Cow-neck","Turtle-neck","One-shoulder","Asymmetric","Don't-know/Other"]
		}
	},
	"Bottom":{
		"category": ["Jeans","Pants","Leggings/Tights","Skirts","Capris","Shorts"],
		"feature": {
			"Style": ["Skinny","Straight","Flare","Relaxed","Wild-Leg","Pleated","Pencil","Low-high","Flare","Maxi","Mini","Bubble"]
		}		
	},
	"Outwear":{
		"category":["Vest","Cape","Blazer","Jacket","Coat","Cardigan"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"]
		}
	},
	"Set-Wear":{
		"category": ["Dress","Suit-Pant","Suit-Skirt","Romper","Jumper"],
		"feature": {},
		"Dress-style":["Swing","Body-conscious","Maxi","Shirt","Low-high","Baby-Doll", "Don't-know/Other"]
	},
	"Shoes":{
		"category":["Mules","Platforms","Slippers","Boots","Booties","Clogs","Flats","Pumps","Sandals","Sneakers","Loafers","Wedges","Don't-know/Other"],
		"feature":{
			"Heel":["Flat", "Low", "High"],
			"Color": ["White","Black","Red","Aqua","Blue","Green","Purple","Teal","Pink","Peach","Grey","Coral/Orange","Brown","Taupe","Yellow","Don't-know/Other"],
		}
	},
	"Handbag":{
		"Size":["Small", "Medium", "Large"]
	}
};
var segments = ["Top", "Bottom", "Outwear", "Set-Wear", "Shoes", "Handbag"];
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
		"Full":["http://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-sleeveless-vest-dress.jpg~original"],
		"Plus":["https://s-media-cache-ak0.pinimg.com/564x/bc/c6/96/bcc696467a3b588b8e8897ed0c483001.jpg"]}
};
var inst = 
{
	"occasion":"Please tag which occasion(s) this outfit is appropriate for:  Work, Casual Weekend, Date night/Dining out, or formal special occasions like weddings.  You can select all that applies.",
	"style":"Please tag which style(s) this outfit is: Classic, Trendy, Bohemian, Dramatic, Feminine, Edgy.  Select all that applies.",
	"season":"Please tag which season(s) this outfit is good for: Spring, Summer, Fall, Winter.",
	"ethnicity":"Please specify the ethnicity of the model in the picture: Caucasian, African American, Latino, Asian, Other",
	"body-shape":"Please tag the model’s body size: Slim, Full, Plus.",
};
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
	$('#clear').hide();
	$('#items').hide();
	$('#segment').hide();
	$('#task').hide();
	$('#rejection').hide();
	$('#description').show();
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
	str_result += ("reject; "+images);
	window.scrollTo(0, 0);
}

function setupSegment() {
	document.getElementById("segment").innerHTML = '<h3>In this task we need you to identify the individual '+
	'clothing items by drawing boxes around them, then tag the individual '+
	'clothing items accordingly.</h3><label for="clear">This button would allow '+
	'you to clear the last box you drew:</label><button class="pure-button" name="clear" '+
	'id="clear" type="button" onClick="clearBox()">Clear</button><img id=\"Canvas\" src=\"'
	+images+'\">';
}

function setupItem() {
	var out = '';
	
	for (var segment in features) {
		var seg_fea = '<div style="float: none;" id="'+ segment
		+'"><p>If there\'s a '+segment
		+' in the image, draw a box around the '+ segment
		+', and then describe this item using the list we offer below. If you are not sure whether there\'s a '+segment
		+' in the image, click Don\'t Know/Can\'t Tell. If there does not exist a '
		+segment+ ' in the image, click Not Applicable.</p><legend style="float:none; display:block;">'
		+segment+'</legend>';

		if (segment != "Handbag") {
			for (var i= 0; i < features[segment]['category'].length; i++) {
				var item = features[segment]['category'][i];				
				seg_fea+='<input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_'+item
				+'\" value=\"'+segment+'_'+item
				+'\" /><label for=\"'+segment+'_'+item
				+'\" >'+item+'</label><ul style="" >';
				if(segment != "Shoes") {
					for (var feature in global_feature) {
						seg_fea+=appendFeature(segment+'_'+item, feature, global_feature[feature]);
					}
				}
				for (var feature in features[segment]['feature']) {
					seg_fea+=appendFeature(segment+'_'+item, feature, features[segment]['feature'][feature]);
				}
				if (item == "Dress") {
					seg_fea+=appendFeature(segment+'_'+item, "Style", features[segment][item+'-style']);
				}
				seg_fea+='</ul></li>';
			}
			seg_fea+='<input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_NA'
				+'\" value=\"NA\" /><label for=\"'
				+segment+'_NA\" >Not Applicable</label>';
			seg_fea+='<input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_DK'
				+'\" value=\"DK\" /><label for=\"'+segment
				+'_DK\" >Don\'t Know/Can\'t Tell</label>';
		} else {
			seg_fea+='<ul>';
			seg_fea+=appendFeature(segment, "Color", global_feature['Color']);
			seg_fea+=appendFeature(segment, "Pattern", global_feature['Pattern']);
			seg_fea+=appendFeature(segment, "Size", features[segment]['Size']);
			seg_fea+='</ul>';
			seg_fea+='<input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_NA'
				+'\" value=\"NA\" /><label for=\"'
				+segment+'_NA\" >Not Applicable</label>';
			seg_fea+='<input type=\"radio\" name=\"'+segment
				+'\" id=\"'+segment+'_DK'
				+'\" value=\"DK\" /><label for=\"'+segment
				+'_DK\" >Don\'t Know/Can\'t Tell</label>';
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
	var res = '<li style="float:none; margin: 10px; border: 1px red solid; "><legend style="float:none; display:block;">'+feature
	+'</legend><form style="float:none; ">';
	for (var i = 0; i < options.length; i++) {
		var id = item+'_'+feature+'_'+options[i];
		if (radios.indexOf(feature)>0) {
			res+='<input type=\"radio\" id=\"'+id+'\" value=\"'+id
			+'\" name=\"'+item+'_'+feature+'\"/><label for=\"'+id+'\" >'+options[i]
			+'</label>';
		} else {
			res+='<input type=\"checkbox\" id=\"'+id+'\" value=\"'+id
			+'\" name=\"'+item+'_'+feature+'\"/><label for=\"'+id+'\" >'+options[i]
			+'</label>';
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
			+'"><div class="reference"><p>'+ inst[category] 
			+'</p>';
		if (references[category].length >0) {
			out+='<h3>For reference: </h3>';
		}
		var button_sec = '<fieldset class=\"'+category +'\">';

		for (var option in references[category]) {
			if (references[category][option].length != 0) {
				out+='<ul class=\"imagewrap\"><legend>'+option+': </legend>';
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
			str_result+=images+" ";
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
		} else if(step < tags.length) {
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
			window.scrollTo(0, 0);
			$('#tag'+(step+1)).show();
			$('#tag'+(step)).hide();
		} else if (step == tags.length) {
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
			window.scrollTo(0, 0);
			$('#tag'+(step)).hide();
			$('#instruction').show();
		} else if (step == tags.length+1) { //features[0] show
			// console.log(step);
			$('#instruction').hide();
			$('#clear').show();
			$('#next').show();
			$('#items').show();
			for (var i= 1; i < segments.length; i++) {
				// console.log(segments[i]);
				$('#'+segments[i]).hide();
			}
			$('input').click(function(){
			    if(this.checked){ // if checked - check all parent checkboxes
			        $(this).parents('li').children('input[type=checkbox]').prop('checked',true);
			    } else {
				    // children checkboxes depend on current checkbox
				    $(this).parent().find('input[type=checkbox]').prop('checked',this.checked); 
				}
			});
			boundingBox();
			$('#segment').show();
		} else if (step <=tags.length+segments.length) {
			if (!recordResult(segments[step-tagNum-2])) {
				// alert("Input illegal");
				return;
			}
			$('#'+segments[step-tagNum-2]).hide();
			$('#'+segments[step-tagNum-1]).show();
			boundingBox();
		} else {
			if (!recordResult(segments[step-tagNum-2])) {
				// alert("Input illegal");
				return;
			}
			$('#'+segments[step-tagNum-2]).hide();
			$('#items').hide();
			$('#next').hide();
			$('#segment').hide();
			$('#clear').hide();
			$('#end').show();
			$('#submit').show();
			
			document.getElementsByTagName('textarea')[0].value=str_result;
			console.log(document.getElementsByTagName('textarea')[0].value);
			// $("#amazon").submit();
		}
		console.log(step);
		step++;
	});
}

function clearBox() {
	if (boxNum > 0) {
		$('.gen_box_' + boxNum).remove();
		boxNum -= 1;
	}
	$('#items input:checked').each(function(){
		$(this).prop('checked', false);
	});
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
        		alert("Only one box at a time!");
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
	            // console.log( 'width: ' + width + 'px');
	            // console.log( 'height: ' + height + 'px' );
	            // console.log( 'x: ' + $(gen_box).position().left);
	            // console.log( 'y: ' + $(gen_box).position().top);
	            // console.log(boxNum);
	            //add thr styles of generated div into .inner_col_one
            }
        }});
	});
}

function recordResult(segment) {
	console.log(segment);
	if(boxNum==1) {
		var cleft = $($('#Canvas')).position().left;
		var ctop = $($('#Canvas')).position().top;
		var gen_box = $('.gen_box_1');
		var left = $(gen_box).position().left;
		var top = $(gen_box).position().top;
		var res = "(" + (left - cleft)
			+ ", "+ (top - ctop) + ", "
			+ $(gen_box).css("width") + ", " 
			+ $(gen_box).css("height") + ") ";
		console.log(res);
		if (segment != 'Handbag') {
			var item = $('input[name="'+segment+'"]:checked').val();
			if (typeof item == 'undefined') {
				alert('Please tag the item you marked out!');
				return false;
			}
			res+=item;
			// console.log(item);
			if (item!='DK' && item!='NA') {
				for (var i = 0; i < item_feature[item].length; i++) {
					console.log(item_feature[item][i]);
					var item_fea="";
					$('input[name="'+item_feature[item][i]+'"]:checked').each(function(){
						item_fea+=($(this).val()+', ');
						// console.log(item_fea);
					});
					if (item_fea=="") {
						alert("Please tag "+item_feature[item][i]+"!");
						return false;
					}
					res+=item_fea;
				}
			}
		} else {
			for (var i = 0; i < item_feature[segment].length; i++) {
				var item_fea="";
				$('input[name="'+item_feature[segment][i]+'"]:checked').each(function(){
					item_fea+=($(this).val()+', ');
					console.log(item_fea);
				});
				if (item_fea=="") {
					alert("Please tag "+item_feature[segment][i]+"!");
					return false;
				}
				res+=item_fea;
			}
		}
		str_result+=res;
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
		}
	} else {
		alert("Please just tag one item at a time!");
	}
	return true;
}