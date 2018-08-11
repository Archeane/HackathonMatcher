//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$('#msform').on('keyup keypress', function (e) {
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13) {
		e.preventDefault();
		return false;
	}
});



$(document).ready(function () {
	$('#reg-error').hide();

	$('button.registerButton').click( function() {
		$('form.uploadForm').submit(function(event){
        	$(this).append('<input type="hidden" name="field_name" value="value" /> ');
        	return true;
        });
        $('form.registerForm').submit();
    });
    $('button.upload').click( function() {
    	console.log('??');
    	console.log($('#hello').val())
    });

	//--------populate select2 options------------------
	var $interests = $('#reg-interest').select2();
	var $intrequest = $.ajax({
		url: '/assets/interests.json' // wherever your data is actually coming from
	});

	$intrequest.then(function (data) {
		for (var d = 0; d < data.length; d++) {
			var item = data[d];
			var option = new Option(item.name, item.name, false, false);
			$interests.append(option);
		}
		$interests.trigger('change');
	});

	var $lanelement = $('#reg-languages').select2();
	var $lanrequest = $.ajax({
		url: '/assets/languages.json' // wherever your data is actually coming from
	});

	$lanrequest.then(function (data) {
		for (var d = 0; d < data.length; d++) {
			var item = data[d];
			var option = new Option(item.name, item.name, false, false);
			$lanelement.append(option);
		}
		$lanelement.trigger('change');
	});

	var $techelement = $('#reg-technologies').select2();
	var $techrequest = $.ajax({
		url: '/assets/technologies.json' // wherever your data is actually coming from
	});

	$techrequest.then(function (data) {
		for (var d = 0; d < data.length; d++) {
			var item = data[d];
			var option = new Option(item.name, item.name, false, false);
			$techelement.append(option);
		}
		$techelement.trigger('change');
	});

	var $fieldelement = $('#reg-fields').select2();
	var $fiedrequest = $.ajax({
		url: '/assets/fields.json' // wherever your data is actually coming from
	});

	$fiedrequest.then(function (data) {
		for (var d = 0; d < data.length; d++) {
			var item = data[d];
			var option = new Option(item.name, item.name, false, false);
			$fieldelement.append(option);
		}
		$fieldelement.trigger('change');
	});


	var $hobbieelement = $('#reg-hobbies').select2();
	var $hobbyrequest = $.ajax({
		url: '/assets/hobbies.json' // wherever your data is actually coming from
	});

	$hobbyrequest.then(function (data) {
		for (var d = 0; d < data.length; d++) {
			var item = data[d];
			var option = new Option(item.name, item.name, false, false);
			$hobbieelement.append(option);
		}
		$hobbieelement.trigger('change');
	});


	//-------------display chosen image-------------------
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

	//-------------populate options---------------

	//TODO: change route to localhost when integrating && Very slow autocomplete
	var unisDatalist = [];
	$.getJSON("/assets/us_institutions.json", function (data) {
		/*
		$.each(result, function() {
		    $('#reg-school').append($("<option />").val(data['institution']).text(data['institution']));
		});
		*/
		for (i = 0; i < data.length; i++) {
			$('#reg-school').append($("<option />").val(data[i]["institution"]).text(data[i]['institution']));
		}
		/*
		$("#reg-school").autocomplete({
			minLength: 2,
			source: unisDatalist
		});
		*/
	});
	var majors = [];
	$.getJSON("/assets/majors.json", function (data) {
		for (i = 0; i < data.length; i++) {
			majors.push(data[i]["major"]);
		}
		$("#reg-major").autocomplete({
			minLength: 2,
			source: majors
		});
	});

	//------------hackathon select-------------------
	var attendedHackathons = [];
	 $('#reg-hackathons').change(function () {
		 var container = document.querySelector('#selectHackathons');
	 	if ($('#reg-hackathons').val() != 0) {
	 		container.innerHTML = '';
	 		if ($('#reg-hackathons').val() > 5) {
	 			container.innerHTML += '<div class="row">';
	 			container.innerHTML += '<label>Choose Your Top 5 Hackathons</label>';
	 			container.innerHTML += '</div>';
	 		} else {
	 			container.innerHTML += '<label>Which Hackathons?</label>';
	 		}
	 		for (i = 1; i <= Math.min($('#reg-hackathons').val(), 5); i++) {
	 			var content = '';
	 			content += '<div class="row">';
	 			content += '<select placeholder="Year" class="hackYear" name="hackYear" id="hack' + i + '">';
				content += '<option value="0">Year</option>'
	 			content += '<option value="2014">2014</option>';
	 			content += '<option value="2015">2015</option>';
	 			content += '<option value="2016">2016</option>';
	 			content += '<option value="2017">2017</option>';
	 			content += '<option value="2018">2018</option>';
				content += '</select><div class="selectHack"></div>';
	 			content += '</div>';
	 			container.innerHTML += content;
	 		}

			$('.hackYear').on('change', function(){
				var selectHack = $(this).parent().children().last();
				selectHack.empty();
				selectHack.append('<select name="hackathon" style="width:100%; margin-left:20px;">');
				var select = selectHack.children();
				var year = $(this).val();
				$.getJSON({
					method: "GET",
					url: '/assets/hackathons' + year + '.json', // wherever your data is actually coming from
					data: {name:'value'},
					dataType: 'JSON'
				}).done(function(data){
					for (var d = 0; d < data.length; d++) {
						var item = data[d];
						//var option = '<option value="'+item.name+'">'+item.name+'</option>';
						var option = new Option(item.name, item.name, false, false);
						select.append(option);
					}
				}).fail(function(data)  {
					alert("Sorry. Server unavailable. ");
				});

			});
	 	}else{
			container.innerHTML = '';
		}
	 });


	 console.log('finished populating!');
});

var user = {};
$(".next").click(function () {
	/*
	if (!($('#reg-school').val() && $('#reg-major').val()) || $('#reg-graduationYear').val() == "null" || $('#reg-educationLevel').val() == "null") {
		$('#reg-error').text('Please fill in all required fields');
		$('#reg-error').show();
	} else {*/
		$('#reg-error').hide();

		//append data to user variable
		/*user['school'] = $('#reg-school').val();
		user['major'] = $('#reg-major').val();
		user['graduationYear'] = $('#reg-graduationYear').val();
		user['educationLevel'] = $('#reg-educationLevel').val();*/
		user['numOfHackathons'] = $('#reg-hackathons').val();
		if($('#reg-hackathons').val() > 0){
			var hackathonArray = [];
			$('#selectHackathons').children().each(function(index){
				if(index > 0){
					var arr = [];
					$(this).children().each(function(index){
						if(index == 1){	//at selectHack: select specific hackathon
							arr.push($(this).children().val());
							hackathonArray.push(arr);
						}else{
							arr.push($(this).val());
						}
					});
				}
			});
			user['hackathonsArray'] = [];
			user['hackathonsArray'].push(hackathonArray);
		}
		document.getElementById("user").value = user;
		console.log(user);

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
	/*
	console.log('submit clicked');
	var data = [{"username": "dmccreadie0"},
	   {"username": "bwillerson1"},
	   {"username": "fteese2"},
	   {"username": "dsummerell3"}];

	fetch('http://localhost:3000/signup2', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {'Content-Type': 'application/json'}
	}).then(response => {
	  return response.json();
	}).then(data => {
	  alert(JSON.stringify(data));
	}).catch(err => {
		alert(err);
	});
	*/
});
