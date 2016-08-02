var test = false;
var PAGES = 3;
var ELENUM = 5;
var TOTAL = PAGES*ELENUM;
var step = 0;
var str_result = "Sort";

var spam_c = 
["http://images0.chictopia.com/photos/jamour/7500394172/jeffrey-campbell-boots-printed-zara-scarf-black-tote-drew-melie-bianco-bag_400.jpg",
"http://images0.chictopia.com/photos/FrancescaPenko/9918850709/light-brown-wedge-forever-21-boots-white-cargo-skinny-currentelliott-jeans_400.jpg",
"http://images2.chictopia.com/photos/sonyasjukebox/2326232580/navy-pleated-forever-21-shirt-red-impo-heels-31-phillip-lim-sweatshirt_400.jpg",
"http://images0.chictopia.com/photos/OliviaL/3107109207/3107109207_400.jpg",
"https://s-media-cache-ak0.pinimg.com/564x/cd/35/81/cd35817ba5f6cd0ccb68964603f26aa8.jpg",
"http://cdn11.lbstatic.nu/files/looks/large/2015/10/29/4727970_IMG_8129.jpg?1446133329",
"http://images2.chictopia.com/photos/falling4u/1782302674/sky-blue-jeans-army-green-thrifted-jacket-black-striped-forever-21-t-shirt_400.jpg",
"http://images0.chictopia.com/photos/Myblondegal/9328375659/blue-korean-dress-beige-forever-21-jacket-beige-miss-nabi-bag_400.jpg",
"http://cdn11.lbstatic.nu/files/looks/large/2015/12/11/4773122_Looks_oficina_(15).jpg?1449838359",
"http://images0.chictopia.com/photos/Janeisha/11078936344/11078936344_400.jpg",
"http://cdn12.lbstatic.nu/files/looks/large/2016/01/18/4808615_feline.jpg?1453124230",
"http://cdn10.lbstatic.nu/files/looks/large/2016/01/31/4822713_pazhalabirodriguez-fashion-blog-skinny-jeans-snake-boots-01.jpg?1454262093",
"http://cdn9.lbstatic.nu/files/looks/large/2015/10/14/4709076_Asilio-Long-Grey-Coat-Boyfriend-Jeans-Proenza-Schouler-Ps11-5-copy.jpg?1444829832",
"http://cdn11.lbstatic.nu/files/looks/large/2016/03/16/4866766_Leather_Stripes.jpg?1458160368",
"https://s-media-cache-ak0.pinimg.com/564x/b8/1a/bb/b81abba60aa58de8a8992a7af967609d.jpg"
];
var tag_exp = 
{
	"One-piece Dress": "Outfit with a one-piece dress",
	"Separate": " Outfit with a top AND a bottom.  Examples include shirts + jeans, blouses + skirts.",
	"Outerwear": "Outfit with an outer layer on top like jackets, coats, sweaters or vests.",
	"Bags": "clutches, handbags or backpacks.",
	"Sitting-position": "The model is not in standing position. "
};
var image_index;
var spam_i;
var spam_p;
var spam_img_i;
var radio = ["One-piece_Dress", "Separate", "N/A"];
var checkbox = ["Outerwear","Bags", "Shoes", "Sitting-position"];

$(document).ready(function() {
	if (test) {
		urls=spam_c;
	} else {
		spam_i = Math.floor((Math.random() * TOTAL));
		spam_p = Math.floor(spam_i / ELENUM)+1;
		spam_img_i = Math.floor((Math.random() * spam_c.length));
	}
	setup();
	
	next = document.getElementById('next');
	nextstep();
});

function setup() {
	image_index = parseInt(document.getElementById("imageIndex").value);

	if (isNaN(image_index) || test) {
	    image_index = 0;
	}
	setupTask();

	$('#end').hide();
	$('#submit').hide();
	$('#task').hide();
	$('#description').show();
}

function setupTask() {
	var task = document.getElementById('task');
	var i = 0;
	var out = "<div class=\"reference\">";
	for (e in tag_exp) {
		out+='<p>'
		+e+': '+tag_exp[e]+'</p>';
	}
	out+="</div>";

	for (var j = 0; j < PAGES; j++) {
		out+='<ul id="page'+j+'">';
		for (var i = 0; i < ELENUM; i++) {
			// console.log(urls[image_index]);
			var radio_button = '<div class="radio">';
			for (e in radio) {
				radio_button+='<label><input name=\"images'
				+image_index+'\" type=\"radio\" value=\"'+radio[e]
				+'\" />'+radio[e].replace('_', ' ')+'</label>';
			}
			radio_button+='</div>';
			var checkbox_button = '<div class="checkbox">';
			for (e in checkbox) {
				checkbox_button += '<label><input name=\"images'
				+image_index+'\" type=\"checkbox\" value=\"'+checkbox[e]
				+'\" />With '+checkbox[e]+'</label>';
			}
			checkbox_button+='</div>';
			out+= '<li><div class="images" id="images'+image_index+'"><img src=\"'+urls[image_index]+'\">'+radio_button+checkbox_button+'</div></li>';
			image_index++;
			if (j*ELENUM+i == spam_i) {
				var radio_button = '<div class="radio">';
				for (e in radio) {
					radio_button+='<label><input name=\"spam_checker'
					+'\" type=\"radio\" value=\"'+radio[e]
					+'\" />'+radio[e].replace('_', ' ')+'</label>';
				}
				radio_button+='</div>';
				var checkbox_button = '<div class="checkbox">';
				for (e in checkbox) {
					checkbox_button += '<label><input name=\"spam_checker'
					+'\" type=\"checkbox\" value=\"'+checkbox[e]
					+'\" />With '+checkbox[e]+'</label>';
				}
				checkbox_button+='</div>';
				out+= '<li><div class="images" id="spam_checker'+'"><img src=\"'+spam_c[spam_img_i]+'\">'+radio_button+checkbox_button+'</div></li>';
			}
		}
		out+='</ul>';
	}
	task.innerHTML = out;
}

function nextstep() {
	$('#next').click(function() {
		if (step == 0) {
			if($('#workerId').val() == "") {
				alert("Please accept the HIT before proceeding!");
				return;
			}
			
			str_result+=("workerId: "+$('#workerId').val()+"\n");
			str_result+=("assignmentId: "+$('#assignmentId').val()+"\n");
			str_result+=("hitId: "+$('#hitId').val()+"\n");
			$('#description').hide();
			$('#task').show();
			$('#page0').show();
			$('#page1').hide();
			$('#page2').hide();
		} else if(step < PAGES) {
			var out = "";
			for (var i = image_index-TOTAL+(step-1)*ELENUM; i < image_index-TOTAL+step*ELENUM; i++) {
				var result = "";
				$('#images'+i+' input[type="radio"]:checked').each(function() {
					var cur_tag = $(this).val();
					result+=i+" "+cur_tag+"\n";
				});
				if (result == "") {
					alert("You have to select a tag for image" + (i-image_index+TOTAL-(step-1)*ELENUM+1));
					return;
				}
				$('#images'+i+' input[type="checkbox"]:checked').each(function() {
					var cur_tag = $(this).val();
					result+=i+" "+cur_tag+"\n";
				});
				out+=result;
			}
			if (spam_p==step) {
				var result = "";
				$('#spam_checker input[type="radio"]:checked').each(function() {
					var cur_tag = $(this).val();
					result+="spam_c "+(spam_img_i)+' '+cur_tag+"\n";
				});
				if (result == "") {
					alert("You have to select a tag for image" + (i-image_index+TOTAL-(step-1)*ELENUM+1));
					return;
				}
				$('#spam_checker input[type="checkbox"]:checked').each(function() {
					var cur_tag = $(this).val();
					result+="spam_c "+(spam_img_i)+' '+cur_tag+"\n";
				});
				out+=result;
			}
			str_result+=out;

			
			window.scrollTo(0, 0);
			$('#page'+step).show();
			$('#page'+(step-1)).hide();
		} else {
			var out=""
			for (var i = image_index-TOTAL+(step-1)*ELENUM; i < image_index-TOTAL+step*ELENUM; i++) {
				var result = "";
				$('#images'+i+' input:checked').each(function() {
					var cur_tag = $(this).val();
					result+=i+" "+cur_tag+"\n";
				});
				if (result == "") {
					alert("You have to select a tag for image" + (i-image_index+TOTAL-(step-1)*ELENUM+1));
					return;
				}
				out+=result;
			}
			if (spam_p==step) {
				var result = "";
				$('#spam_checker input[type="radio"]:checked').each(function() {
					var cur_tag = $(this).val();
					result+="spam_c "+(spam_img_i)+' '+cur_tag+"\n";
				});
				if (result == "") {
					alert("You have to select a tag for image" + (i-image_index+TOTAL-(step-1)*ELENUM+1));
					return;
				}
				$('#spam_checker input[type="checkbox"]:checked').each(function() {
					var cur_tag = $(this).val();
					result+="spam_c "+(spam_img_i)+' '+cur_tag+"\n";
				});
				out+=result;
			}
			str_result+=out;
			window.scrollTo(0, 0);
			$('#task').hide();
			$('#next').hide();
			$('#end').show();
			$('#submit').show();
			document.getElementById('user-input').value = str_result;
		} 
		step++;
		console.log(str_result);
	});
}
