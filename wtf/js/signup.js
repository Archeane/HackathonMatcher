
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
$(document).ready(function(){
	$('#reg-error').hide();

	var interestContainer = document.querySelector('#interests');
	
	
   	var unis = [];
	
	$.getJSON( "../../wtf/assets/us_institutions.json", function(data) {
		for(i = 0 ; i < data.length; i++){
			unis.push(data[i]["institution"]);
		}
		console.log(unis);
		$( "#universities" ).autocomplete({
			minLength:3,
			source: unis
		});
		
		
		/*
		var options = '';
		for(i = 0; i < data.length; i++){
			options += '<input type="checkbox" name="interest-group" value="unit-in-group" ng-click="addTags('+(data[i]['name']).toString()+');">'+data[i]['name']+"</input>";
		}
		interestContainer.innerHTML += options;
		*/
	});
  
    
  	
});


$('#msform').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});



//user information 
var user = {};

$(".next").click(function(){
	//validate fields are set
	if(!($('#reg-school').val() && $('#reg-major').val() && $('#reg-graduationYear').val() && $('#reg-educationLevel').val())){
		$('#reg-error').text('Please fill in all required fields');
		$('#reg-error').show();
	}else{
		$('#reg-error').hide();

		//append data to user variable
		user['school'] = $('#reg-school');
		user['major'] = $('#reg-major');
		user['graduationYear'] = $('#reg-graduationYear');
		user['educationLevel'] = $('#reg-educationLevel');

		//change form animation

		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
	        'transform': 'scale('+scale+')',
	        'position': 'absolute'
	      });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	}	
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	
})
