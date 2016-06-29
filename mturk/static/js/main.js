var step = 1;
var tagNum = 0;
var result = [];
var d;
var posx;
var posy;
var initx=false;
var inity=false;

var global_feature = {
	"Color": ["White","Black","Red","Aqua","Blue","Green","Purple","Teal","Pink","Peach","Grey","Coral/Orange","Brown","Taupe","Yellow"],
	"Material": ["Cotton","Chiffon","Silk","Woolen","Denim","Leather","Lace","Satin","Sequin","Velvet"],
	"Pattern": ["Block","Solid","Graphics","Stripe-vertical","Plaid","Stripe-horizontal","Animal-Prints","Camouflage","Floral","Dots"],
	"Length": ["Short","Medium","Long"],
	"Pockets": ["None", "1", "2", "3+"],
	"End Treatment": ["None","Peplum","Flare","Rolled-up","Cutoffs","Asymmetric","Scallop"],
	"Front Enclosure": ["Open","Buttons","Zip","Wraparound","Drawstring","Bow"]
};
var features={
	"Top":{
		"category":["Bralet","Blouse","Buttoned-Shirt","T-Shirt","Tank-top","Sweaters","Sweat-Shirt","Tunic","Camisole","Polo-Shirt","Halter-top"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"],
			"Sleeve": ["None","Short","Medium","Long"],
			"Neckline": ["Strap","Strapless","V-neck","Crew-neck","Boat-neck","U-neck","Cow-neck","Turtle-neck","One-shoulder","Asymmetric"]
		}
	},
	"Bottom":{
		"category": ["Jeans","Pants","Leggings/Tights","Skirts","Capris","Shorts"],
		"feature": {
			"Style": ["Skinny","Straight","Flare","Relaxed","Wild-Leg","Pleated","Pencil","Low-high","Flare","Maxi","mini","Bubble"]
		}
		
	},
	"Outwear":{
		"category":["Vest","Cape","Blazer","Jacket","Coat","Cardigan"],
		"feature":{
			"Collar":["Yes", "No"], 
			"Hood": ["Yes", "No"]
		}
	},
	"Set Wear":{
		"category": ["Dress","Suit-Pant","Suit-Skirt","Romper","Jumper"],
		"Dress_style":["Swing","Body-conscious","Maxi","Shirt","Low-high","Baby-Doll"]
	},
	"Accessories":{
		"category": ["Watch","Tie","Earrings","Glasses","Sunglasses","Necklace","Clutches","Ring","Bracelet","Belt","Hat","Shoes","Gloves","Handbag","Scarf","Stockings","Socks"],
		"Shoes_style": ["Mules","Platforms","Heels","Slippers","Boots","Booties","Clogs","Flats","Pumps","Sandals","Sneakers","Loafers","Wedges"],
		"Handbag_style": ["Backpacks","Beach-Bags","Bucket Bags","Cross-Body","Diaper-Bags","Fringe-Bags","Hobo","Mini","Saddle","Satchels","Shoulder-Bags","Totes","Wallets","Wristlets","Work-Bags"]
	}
};
var references = {
	"event":{
		"Work":[], 
		"Special Occassion":[], 
		"Weekend":[], 
		"Date Night":[]
	}, 
	"style":{
		"Classic":[], 
		"Trendy":[], 
		"Bohemian":[], 
		"Dramatic":[], 
		"Feminine":[], 
		"Edgy":[]
	}, 
	"season":
		{"Spring":["https://s-media-cache-ak0.pinimg.com/564x/c3/9a/2a/c39a2a9fed0bbdd4d63ff65519b66036.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/fb/6a/fe/fb6afe1931cba328d7101ef3e5318d3d.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/57/ff/37/57ff37f521b1ffa03c89fc566cc3eeed.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/b3/f7/57/b3f7577d807ae0230f0bfcf2ee090d40.jpg",
					"http://www.fenzyme.com/wp-content/uploads/2016/02/Spring-Work-Outfits-Ideas-4.jpg"], 
		"Summer":["http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/559490ebe4b0e276e048893c/559490ede4b0f2448bc2e040/1436144195146/Bebe+All+Black+SS+2015.jpg?format=750w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/559490ebe4b0e276e048893c/559490eee4b00251f830a96a/1436144242239/Black+Jumpsuit+Red+Platform+Pumps+Outfit+Idea.jpg?format=750w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/559490ebe4b0e276e048893c/559490efe4b0f2448bc2e048/1436144289152/Classic+White+Dress+with+Hat.jpg?format=750w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/559490ebe4b0e276e048893c/559490f2e4b00251f830a97b/1436144463389/Falling+For+Floral+Dress%2C+Navy-Pink.jpg?format=750w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/559490ebe4b0e276e048893c/559490f3e4b0f2448bc2e06e/1436144520207/Gina+Tricot+Top+and+Zara+Shorts.jpg?format=500w"],
		"Fall":["https://s-media-cache-ak0.pinimg.com/564x/09/f8/a1/09f8a13054b18170263db48366274477.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/ae/64/c7/ae64c7f01361abe9f9913b347c87fd1e.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/83/f8/48/83f84813a24a4dc7995e4ab3ca09656a.jpg",
				 "http://wachabuy.com/wp-content/uploads/2015/10/fall-fashion-red-jacket.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/22/f0/87/22f087cb58cd27b42b6512581f4c8b37.jpg"],
		"Winter":["http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/569bdfe4bfe87383e5df1f2a/569bdfe4dc5cb4298582c6f2/1453056079961/1-3266-700x1050.jpg?format=1000w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/569bdfe4bfe87383e5df1f2a/569bdfe4fd5d084e14a1b9b8/1453056064824/0z3.jpg?format=1000w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/569bdfe4bfe87383e5df1f2a/569bdfe4dc5cb4298582c6ee/1453056048950/_E9A8772.jpg?format=1000w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/569bdfe4bfe87383e5df1f2a/569bdfe5dc5cb4298582c6f5/1453056199208/5Nov_Matadero-12.jpg?format=1000w",
				   "http://static1.squarespace.com/static/511b12efe4b0d075328d3e82/569bdfe4bfe87383e5df1f2a/569bdfe6fd5d084e14a1b9f3/1453056300745/22748118069_a62f3f72b5_o.jpg?format=1000w"]},
	"ethnicity":
		{"Caucasian":["http://www.bittersweetcolours.com/wp-content/uploads/2016/06/P1010075-2.jpg",
					"http://www.bittersweetcolours.com/wp-content/uploads/2016/06/P1011191-2-1.jpg",
					"http://thedailylace.com/wp-content/uploads/2016/06/thedailylaceblog-3288-683x1024.jpg",
					"http://thelifbissue.com/wp-content/uploads/2016/06/eccleston-cheshire20-695x1024.jpg",
					"http://i1.wp.com/chicstreetstyle.me/wp-content/uploads/2016/06/IMG_0044-1.jpg?resize=683%2C1024"],
		"African American":["http://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-distressed-jean-jacket.jpg~original",
							"https://4.bp.blogspot.com/-RMABjHRU8pc/V2fnx-KKnFI/AAAAAAAAOco/KpASN8C8KkgeLyCEAo5wqAXCMaeRzDmdQCLcB/s1600/andigetdressed_plus%2Bsize%2Bdresses.jpg",
							"http://beautejadore.com/wp-content/uploads/2016/06/cropped-maxi-800x1200.jpg",
							"http://beautejadore.com/wp-content/uploads/2016/03/faux-maxi-dress2.jpg",
							"http://s246.photobucket.com/user/jadorecoutureblog/media/jadorecoutureblog005/jadore-couture-sleeveless-vest-dress.jpg.html"],
		"Latino":[],
		"Asian":["https://s-media-cache-ak0.pinimg.com/564x/ee/26/05/ee26055e84f32ca7a4afff338d8f9cbd.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/53/5e/44/535e440d0f8149cbef6a4dcf11039071.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_anna_october_off_the_shoulder_ruffle_top_ag_jeans_schutz_sandals_gucci_bag.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_of_style_caroline_constas_striped_dress_venice_2.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_of_style_two_songs_pink_sleeveless_trench_coat_proenza_schouler_shoes_dior_split_sunglasses.jpg"],
		"Other":[]},
	"body_shape":
		{"Slim":["http://www.wendyslookbook.com/wp-content/uploads/2016/06/NYC-MW-15-433x650.jpg",
				"http://www.wendyslookbook.com/wp-content/uploads/2016/06/In-the-Office-2-433x650.jpg"],
		"Full":["http://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-sleeveless-vest-dress.jpg~original",
				"http://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-olive-bomber.jpg~original",
				"http://thelifbissue.com/wp-content/uploads/2016/06/cholmondeley-farm-shop1-890x1024.jpg",
				"http://thelifbissue.com/wp-content/uploads/2016/05/polka-dots-and-check1-809x1024.jpg",
				"http://thedailylace.com/wp-content/uploads/2016/06/TDL-floralskirtSheIN-3186.jpg"],
		"Plus":[]}
};
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

	$('#end').hide();
	$('#items').hide();
	$('#segment').hide();
	$('#task').hide();
	$('#description').show();
}

function setupSegment() {
	document.getElementById("segment").innerHTML = '<img id=\"Canvas\" src=\"'+images[0]+'\">';
}

function setupItem() {
	var out = '<ul>';
	
	for (var segment in features) {
		// console.log(segment);
		var seg_fea = '<li><input type=\"checkbox\" id=\"'+segment
		+'\"><label for=\"'+segment+'\" />'+segment+'</label><ul>';
		

		for (var i= 0; i < features[segment]['category'].length; i++) {
			var item = features[segment]['category'][i];
			// console.log(item);
			seg_fea+='<li><input type=\"checkbox\" id=\"'+segment+item
			+'\"/><label for=\"'+segment+item
			+'\" />'+item+'</label><ul>';
			if (segment != "Accessories") {
				for (var feature in global_feature) {
					// console.log(feature);
					seg_fea+=appendFeature(segment+item, feature, global_feature[feature]);
				}
			}
			if (segment == "Top" || segment == "Bottom" || segment == "Outwear") {
				for (var feature in features[segment]['feature']) {
					// console.log(feature);
					seg_fea+=appendFeature(segment+item, feature, features[segment]['feature'][feature]);
				}
			} else if (item == "Dress" || item == "Shoes" || item == "Handbag") {
				seg_fea+=appendFeature(segment+item, "Style", features[segment][item+'_style']);
			}
			seg_fea+='</ul></li>';
		}
		seg_fea+='</ul></li>';
		out+=seg_fea;
	}
	out+='</ul>';
	document.getElementById("items").innerHTML = out;

}

// item: string; feature: string; options: list
// example: item: TopBlouse, feature: Color, options: ["White", "Red",...]
function appendFeature(item, feature, options) { 
	var res = '<li><input type=\"checkbox\" id=\"'+item+feature
	+'\" /><label for=\"'+item+feature+'\" />'+feature+'</label><ul>';
	for (var i = 0; i < options.length; i++) {
		var id = item+feature+options[i];
		res+='<li><input type=\"checkbox\" id=\"'+id
		+'\" /><label for=\"'+id+'\" />'+options[i]+'</label></li>';
	}
	res+='</ul></li>';
	return res;
}

function setupTag() {
	var task = document.getElementById('task');
	var i = 0;
	for (i = 0; i < taskNum; i++) {
		result.push({key:images[i], value:[]});
	}
	var out = "";
	tagNum = 0;
	for (var category in references) {
		tagNum++;
		out+='<div class="tag" id="tag'+tagNum
			+'"><div class="reference"><h3>For reference: </h3>';
		var button_sec = '<fieldset class=\"'+category
			+'\"><legend>Please select the '+ category 
			+' for this outfit/model:</legend>';

		for (var option in references[category]) {
			out+='<p>'+option+': </p><ul class=\"imagewrap\">';
			for (var reference in references[category][option]) {
				out+='<li><img src=\"'+ references[category][option][reference] +'\"></li>';
			}
			out+='</ul>';
			button_sec+='<div class="radio"><label><input name=\"'
				+category+'Answer\" type=\"radio\" value=\"'+option
				+'\" />'+option+'</label></div>';
		}
		button_sec+='</fieldset>';
		out+="</div><ul id=\"images\">";
		for (var image in images) {
			out+='<li><img src=\"'+images[image]+'\">'+button_sec+'</li>';
		}
		out+='</ul></div>';

	}
	task.innerHTML = out;
}

function nextstep() {
	$('#next').click(function() {
		if (step == 1) {
			$('#description').hide();
			$('#task').show();
			$('#tag1').show();
			var i = 2;
			for (i = 2; i <= tagNum; i++) {
				$('#tag'+i).hide();
			}
		} else if(step <= tagNum) {
			window.scrollTo(0, 0);
			$('#tag'+step).show();
			$('#tag'+(step-1)).hide();
		} else if (step == tagNum+1) {
			$('#tag'+(step-1)).hide();
			$('#items').show();
			$('#segment').show();
			jQuery(function($) {

			    var main_content = $('.col_two'),
			        gen_box = null,
			        i  = 1;

			    //make .col_two selectable and...
			    main_content.selectable({ 
		        start: function(e) {
		                
		                //get the mouse position on start
		                x_begin = e.pageX,
		                y_begin = e.pageY;

		            },
		        stop: function(e) {
		                
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
		            $(this).append('<div class="gen_box_' + i + '"></div>');
		            gen_box = $('.gen_box_' + i);

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
		            .draggable({ grid: [20, 20] })
		            .resizable();

		            //if the mouse was dragged left, offset the gen_box position 
		            drag_left ? $(gen_box).offset({ left: x_end, top: y_begin }) : false;
		            console.log( 'width: ' + width + 'px');
		            console.log( 'height: ' + height + 'px' );
		            console.log( 'x: ' + $(gen_box).css("left"));
		            console.log( 'y: ' + $(gen_box).css("top") + 'px');
		            //add thr styles of generated div into .inner_col_one
		            i++;
		        }});
			});
		} else {
			$('#items').hide();
			$('#next').hide();
			$('#segment').hide();
			$('#end').show();
		}
		step++;
	});
}