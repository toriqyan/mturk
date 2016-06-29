var step = 1;
var tagNum = 0;
var result = [];
var str_result = "";
var d;
var posx;
var posy;
var initx=false;
var inity=false;
var tags = ["event", "style", "season", "ethnicity", "body_shape"]
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
		"Work":["https://s-media-cache-ak0.pinimg.com/564x/d3/78/1a/d3781a3e9582c179d8d0e7e4093758ea.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/ba/4c/e3/ba4ce3ca947d7598962d855e363139e2.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/08/aa/9b/08aa9b5f175459550a3770fa748a884b.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/22/e9/23/22e92317f45f648e3d8800594331e696.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/39/71/4e/39714ea8960bcda1628fe350a8271ca4.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/87/42/07/874207c4577bd0662aa63e6ac68cc49d.jpg"], 
		"Special Occassion":["https://s-media-cache-ak0.pinimg.com/564x/42/42/8f/42428fe2f1bbc44cc9c7e12e5d6ae694.jpg",
							 "https://s-media-cache-ak0.pinimg.com/564x/df/d9/76/dfd976d8df98b7b4f63511d8856dd40f.jpg",
							 "https://s-media-cache-ak0.pinimg.com/564x/32/87/00/328700f5ddd082323bc59c630b0b2bbe.jpg",
							 "https://s-media-cache-ak0.pinimg.com/564x/e3/a3/eb/e3a3eb61b505391acfbf99f0830bb290.jpg",
							 "https://s-media-cache-ak0.pinimg.com/564x/04/02/37/0402374f759aceb225014cd6e6894ee9.jpg",
							 "https://s-media-cache-ak0.pinimg.com/564x/ff/6e/92/ff6e927061032deb9021d13a7ebb03b8.jpg"], 
		"Weekend":["https://s-media-cache-ak0.pinimg.com/564x/e2/8a/d8/e28ad87defb4db0b708b38343237f2ac.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/28/1b/4b/281b4b506ddae7454bab56cf27962f8d.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/c5/fc/d6/c5fcd6e1947647b26769c933357e68e2.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/2c/47/8e/2c478e60081c220e63640bdc944d2971.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/d2/ac/81/d2ac8174781d2f7cfdceec76661824a6.jpg"], 
		"Date Night":["https://s-media-cache-ak0.pinimg.com/564x/4e/7e/84/4e7e849cb5dbe7ec38d1356db6eb5513.jpg",
					  "https://s-media-cache-ak0.pinimg.com/564x/80/65/b3/8065b3b327eaa9cf3d05c6e0a165703f.jpg",
					  "https://s-media-cache-ak0.pinimg.com/564x/b9/29/6d/b9296dd3af7068bc500ed1e19b83c317.jpg",
					  "https://s-media-cache-ak0.pinimg.com/564x/36/34/6d/36346d0ce8d953c7a07fc703d41795bd.jpg",
					  "https://s-media-cache-ak0.pinimg.com/564x/fe/62/01/fe62010b1560ea9724dc4eecb676fe90.jpg",
					  "https://s-media-cache-ak0.pinimg.com/564x/16/14/95/161495ee2e632a35e07357802b14bf63.jpg"]
	}, 
	"style":{
		"Classic":["https://s-media-cache-ak0.pinimg.com/564x/9e/dd/4e/9edd4ea5688dadc5294b7d0d0e632442.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/dc/97/c9/dc97c90e37192f14b7a29ecdde08c269.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/62/48/04/624804309174b5ac2f3793b208a2cfdb.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/b1/3d/90/b13d90a5bbfe6ebb65ed01efedaf341c.jpg",
				   "https://s-media-cache-ak0.pinimg.com/564x/15/b7/61/15b761172778783a54eb4553e7cd9a74.jpg"], 
		"Trendy":["https://s-media-cache-ak0.pinimg.com/564x/7d/80/9c/7d809cae57df2645963e7d4b93e93a85.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/36/ef/02/36ef02675ed38dbb6a6107350290213c.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/c6/63/bf/c663bfbad217b140d1aba3d3a9948a38.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/f7/4b/f7/f74bf786b7612d9740763d7007b2f246.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/d1/9f/9b/d19f9b1fdefc7c680ed7e094e7d07fad.jpg"], 
		"Bohemian":["https://s-media-cache-ak0.pinimg.com/564x/d3/dd/d8/d3ddd8d478c1757ea3ac6dc491ade303.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/d9/f8/1c/d9f81ca91969bce6a8aa0fbdf587661c.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/6e/1c/2b/6e1c2be04915303d6484d85612a6a8ea.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/d4/a4/f9/d4a4f9fb2dd850a40d4df12b3177a63d.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/1d/83/9d/1d839d04adce5486a368ee0e8f8dcb9f.jpg"], 
		"Dramatic":["https://s-media-cache-ak0.pinimg.com/564x/85/e7/99/85e7997c7ee3ea79e39f377bbcf32a82.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/8f/02/0f/8f020fe390394e07e37cd3ee6a55a93a.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/0f/70/a8/0f70a89383e6ef159181ef6cb1a137f0.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/d0/2b/ca/d02bcae65f6a66d99ca2039ff937d5d2.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/98/6d/83/986d836f9ef731b51097e45fcb08697d.jpg"], 
		"Feminine":["https://s-media-cache-ak0.pinimg.com/564x/db/ba/27/dbba27380a7e6e137a12bbd788daf0a9.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/e8/cc/dc/e8ccdc6ed9ebc934e2884d8343282f4f.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/9c/8b/8f/9c8b8ffa2441c1184eed2a3c9d33522a.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/49/45/50/4945505c462c54f0cef2ba485d42de7c.jpg",
					"https://s-media-cache-ak0.pinimg.com/564x/50/2c/dc/502cdca30da244fdbdaf970ca17d5871.jpg"], 
		"Edgy":["https://s-media-cache-ak0.pinimg.com/564x/ff/dc/09/ffdc099b20c4876a5a12722d6a0e5e4b.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/6f/ac/3b/6fac3b132bdd0cb2e636443559db8e2e.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/ee/e6/29/eee629e9dbcc267ed555894bd2e81a6d.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/bc/0c/e6/bc0ce6346ac85af2dea927dcb072a188.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/fa/86/26/fa8626c0d15e88ef71bcdde9b8699fd8.jpg"]
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
		"Latino":["https://s-media-cache-ak0.pinimg.com/564x/79/11/ff/7911ffa9a152c95d9a2e30db48cd0a46.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/f2/78/14/f2781491d98722cb4abfcfbf577c90f1.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/bd/62/d5/bd62d570f552a15ecd4705de62e36e2f.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/62/5b/91/625b91eb97dba3d1ff441dd0de2c7b36.jpg",
				  "https://s-media-cache-ak0.pinimg.com/564x/5c/4d/92/5c4d92f7ff6577155d1a45682a4de236.jpg"],
		"Asian":["https://s-media-cache-ak0.pinimg.com/564x/ee/26/05/ee26055e84f32ca7a4afff338d8f9cbd.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/53/5e/44/535e440d0f8149cbef6a4dcf11039071.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_anna_october_off_the_shoulder_ruffle_top_ag_jeans_schutz_sandals_gucci_bag.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_of_style_caroline_constas_striped_dress_venice_2.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_of_style_two_songs_pink_sleeveless_trench_coat_proenza_schouler_shoes_dior_split_sunglasses.jpg"],
		"Other":["https://s-media-cache-ak0.pinimg.com/564x/ce/0a/cc/ce0acc6379aa58c3d5143914b41e9c9e.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/f1/e9/12/f1e912a9dc8b94edcf7e69d8f756acda.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/8d/93/49/8d93494f14526af35ce830832951ab4e.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/2b/09/27/2b0927d33113a7367ca89392b46c3860.jpg",
				 "https://s-media-cache-ak0.pinimg.com/564x/c8/53/39/c8533980b67f68a5e335ff50b12cdbdc.jpg"]},
	"body_shape":
		{"Slim":["http://www.wendyslookbook.com/wp-content/uploads/2016/06/NYC-MW-15-433x650.jpg",
				"http://i2.wp.com/chicstreetstyle.me/wp-content/uploads/2016/06/IMG_0571.jpg?resize=683%2C1024",
				"http://www.bittersweetcolours.com/wp-content/uploads/2016/06/P1010049-1.jpg",
				"http://www.songofstyle.com/wp-content/uploads/2016/06/aimee_song_of_style_white_blouse_vetements_denim_skirt_JW_Anderson_bag.jpg",
				"http://beautejadore.com/wp-content/uploads/2016/05/off-the-shoulder-print-dress2-800x1200.jpg"],
		"Full":["http://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-sleeveless-vest-dress.jpg~original",
				"http://i246.photobucket.com/albums/gg111/jadorecoutureblog/jadorecoutureblog005/jadore-couture-olive-bomber.jpg~original",
				"http://thelifbissue.com/wp-content/uploads/2016/06/cholmondeley-farm-shop1-890x1024.jpg",
				"http://thelifbissue.com/wp-content/uploads/2016/05/polka-dots-and-check1-809x1024.jpg",
				"http://thedailylace.com/wp-content/uploads/2016/06/TDL-floralskirtSheIN-3186.jpg"],
		"Plus":["https://s-media-cache-ak0.pinimg.com/564x/01/66/3f/01663f655bf5668d0dce483fa9ad4132.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/83/a3/f8/83a3f8d0e1ed5451c737da1532d3215c.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/bc/c6/96/bcc696467a3b588b8e8897ed0c483001.jpg",
				"https://s-media-cache-ak0.pinimg.com/564x/c4/3a/96/c43a96ff382958a5ee842c2222f50cde.jpg",
				"https://4.bp.blogspot.com/-RMABjHRU8pc/V2fnx-KKnFI/AAAAAAAAOco/KpASN8C8KkgeLyCEAo5wqAXCMaeRzDmdQCLcB/s1600/andigetdressed_plus%2Bsize%2Bdresses.jpg"]}
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
			var cur_tag = $('input[name="'+tags[step-2]+'Answer"]:checked').val();
			if (typeof(cur_tag) == "undefined") {
				alert("You have to select a tag.");
				return;
			}
			str_result+=cur_tag+" ";
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
			console.log(str_result);
		}
		step++;
	});
}