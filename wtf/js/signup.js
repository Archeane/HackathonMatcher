//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(document).ready(function () {
	$('#reg-error').hide();

	var data = [
		{
			"id": 1,
			"text": "Artifical Intelligence"
		},
		{
			"id": 2,
			"text": "Computer Vision"
		},
		{
			"id": 3,
			"text": "Machine Learning"
		},
		{
			"id": 4,
			"text": "Medical Imaging"
		},
		{
			"id": 5,
			"text": "Tag5"
		},
		{
			"id": 6,
			"text": "Tag6"
		},
		{
			"id": 7,
			"text": "Tag7"
		},
		{
			"id": 8,
			"text": "Tag8"
		},
		{
			"id": 11,
			"text": "stony"
		},
		{
			"id": 12,
			"text": "mit"
		}
	];
	$(".multiselect").select2({
		data: data
	});

	/*
	// TODO: select2 ajax
	$('.multiselect').select2({
		 ajax: {
			url: "../../wtf/assets/us_institutions.json",
			dataType: 'json',
			delay: 250,
			data: function (params) {
				var query = {
					search: params.term,
					type:'public'
				}
			  	return query;
			},
			processResults: function (data, params) {
			  return {
				results: $.map(data, function(obj) {
					return { id: obj.institution, text: obj.institution };
				})
			  };
			},
			cache: true
		  },
		  placeholder: 'Search for a repository',
		  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
		  minimumInputLength: 1,
		  templateResult: formatRepo,
		  templateSelection: formatRepoSelection,
		  allowclear:true,
		  multiple:true
	});
*/

	//display chosen image
	$(document).on('change', '.btn-file :file', function () {
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
	});
	$('.btn-file :file').on('fileselect', function (event, label) {
		var input = $(this).parents('.input-group').find(':text'),
			log = label;
		if (input.length) {
			input.val(log);
		} else {
			if (log) alert(log);
		}
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#img-upload').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}
	$("#imgInp").change(function () {
		readURL(this);
	});

	//TODO: auto-complete dropdown for universities and majors
	/*
		var unisDatalist = [];
		var dataList = document.getElementById('unis-datalist');
		var request = new XMLHttpRequest();
		// Handle state changes for the request.
		request.onreadystatechange = function(response) {
			if (request.readyState === 4) {
				if (request.status === 200) {
					var jsonOptions = JSON.parse(request.responseText);
					jsonOptions.forEach(function(item) {
						var option = document.createElement('option');
						option.value = item['institution'];
						dataList.appendChild(option);
					});
					console.log(dataList);
				} else {
					input.placeholder = "Couldn't load datalist options :(";
				}
			}
		};
		request.open('GET', '../../wtf/assets/us_institutions.json', true);
		request.send();

		$.getJSON( "../../wtf/assets/us_institutions.json", function(data) {
			for(i = 0 ; i < data.length; i++){
				unisDatalist.push(data[i]["institution"]);
			}
			$( "#university" ).autocomplete({
				minLength:3,
				source: unis
			});
		});
		
		$('#university').on('input', function(e){
			var input = $(e.target);

			if(input.val().length < 3) {
				input.attr('list', '');
			} else {

				input.attr('list', dataList);
			}
		})
		


		var majors = [];
		$.getJSON( "../../wtf/assets/majors.json", function(data) {
			for(i = 0 ; i < data.length; i++){
				majors.push(data[i]["major"]);
			}
			$( "#major" ).autocomplete({
				minLength:2,
				source: majors
			});
		});

			/*
			var interestContainer = document.querySelector('#interests');

			var options = '';
			for(i = 0; i < data.length; i++){
				options += '<input type="checkbox" name="interest-group" value="unit-in-group" ng-click="addTags('+(data[i]['name']).toString()+');">'+data[i]['name']+"</input>";
			}
			interestContainer.innerHTML += options;
			*/


});


function formatRepoSelection(repo) {
	return repo.text;
}


function formatRepo(repo) {
	var markup = "<div class='select2-result-repository clearfix'>" + repo.text + "</div>";
	return markup;
}



$("#next1").click(function () {
	console.log($('#university').val());
	console.log($('#reg-graduationYear').val(), $('#reg-educationLevel').val());
})






$('#msform').on('keyup keypress', function (e) {
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13) {
		e.preventDefault();
		return false;
	}
});



//user information 
var user = {};

$(".next").click(function () {
	//validate fields are set
	//console.log(($('#reg-school').val() && $('#reg-major').val() && $('#reg-graduationYear').val() && $('#reg-educationLevel').val()));
	//if(!($('#reg-school').val() && $('#reg-major').val() && $('#reg-graduationYear').val() && $('#reg-educationLevel').val())){
	$('#reg-error').text('Please fill in all required fields');
	$('#reg-error').show();
	//}else{
	$('#reg-error').hide();

	//append data to user variable
	user['school'] = $('#reg-school');
	user['major'] = $('#reg-major');
	user['graduationYear'] = $('#reg-graduationYear');
	user['educationLevel'] = $('#reg-educationLevel');

	//change form animation

	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({
		opacity: 0
	}, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'transform': 'scale(' + scale + ')',
				'position': 'absolute'
			});
			next_fs.css({
				'left': left,
				'opacity': opacity
			});
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
	//}
});

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({
		opacity: 0
	}, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 50) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'left': left
			});
			previous_fs.css({
				'transform': 'scale(' + scale + ')',
				'opacity': opacity
			});
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function () {

})
