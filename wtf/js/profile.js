
$(window).on('load', function () {
	$('.preloader').delay(500).fadeOut("slow"); // set duration in brackets
});

$(function () {
	
	jQuery(document).ready(function () {
		$('body').backstretch([
	 		 "/images/tm-bg-slide-1.jpg",
	 		 "/images/tm-bg-slide-2.jpg",
			 "/images/tm-bg-slide-3.jpg"
	 			], {
			duration: 3200,
			fade: 1300
		});
	});

	if(settingsEnabled){
		var container = document.querySelector("#settingsicon")
		container.innerHTML += '<i class="fa fa-cog fa-lg" style="padding-left: 10px;"></i>';
	}

	var email = document.querySelector("#email");
	email.innerHTML += User.email;
	console.log(User);

	$('#pfp').attr('src', User.profileimg);



	var name = User.firstname + ' ' + User.lastname;
	var Userabout = [name, User.major, User.school, User.educationLevel, User.graduationYear, User.facebook, User.phone, User.instagram, User.github, User.linkedin, User.website];
	var UserLan = User.preferences.languages;
	var UserFamiliar = User.preferences.technologies;
	var UserInterest = User.preferences.interests;
	var UserFields = User.preferences.fields;
	var UserHobbies = User.preferences.hobbies;
	var UserHackatons = User.hackathons;

	fillAbout(Userabout);
	fillAboutSettings(Userabout);

	fillLanaguages(UserLan);
	fillLanguagesModal(UserLan);
	
	fillFamiliarTechnologies(UserFamiliar);
	fillTechModal(UserFamiliar);

	fillInterestedTechnologies(UserInterest);
	fillInterestsModal(UserInterest);
	fillFields(UserFields);
	fillFieldsModals(UserFields);

	fillHackathons(UserHackatons);
//	fillHackathonsModal(UserHackatons);
/*
	fillNote(UserHobbies);
*/
	//TODO: add fill modals

	$('.language').on('click', function (event) {
		event.preventDefault();
		$(this).parents().eq(2).remove();
	});

	$('.tech').on('click', function (event) {
		event.preventDefault();
		var remove = $(this).parent().attr('class');
		if($('.'+remove).parents().eq(1).children().length < 5){	//append button if number of items is less than 5
			var settingsContainer = document.querySelector("#familiar > .settings");
			var settings = '';
			settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#tech-familiar">';
			settings += '<i class="fa fa-plus"></i> add</button>';
			settingsContainer.innerHTML += settings;
		}
		$('.'+remove).remove();
	});


	//TODO: wait for user input to finish
	$('.max10Input').on('input', function(val){
		if($(this).val() > 10){
			$(this).val(10);
		}
	});

	$('.max100Input').on('input', function(val){
		if($(this).val() > 100){
			$(this).val(100);
		}
	});

});


function fillAbout(data) {
	const socialIcons = [['facebook', 'https://www.facebook.com/'],['phone',''], ['instagram','https://www.instagram.com/'],
						['github', 'https://www.github.com/'],['linkedin', 'https://www.linkedin.com/in/'],['user','https://']];
	var aboutContainer = document.querySelector("#about > .content");
	
	var content = '';
	content += '<div style="display:inline;">';
	content += '<p style="margin-top:-1.5em;"><span class="text-md-left">'+data[1]+', </span>';
	content += '<span class="text-md-right">'+data[3]+'</span></p>';
	content += '<p style="margin-top:-1.7em;">'+data[2]+', <span class="text-md-right">'+data[4]+'</span></p>';
	content += '</div>';
	
	content += '<div>';
	content += '<ul class="social-icons">';
	
	for(i=5; i < data.length; i++){
		if(data[i] != '' || data[i] != undefined || data[i] != null){
			var li = '';
			li = '<li>';
			li += '<a href="'+socialIcons[i-5][1]+data[i]+'" class="fa fa-'+socialIcons[i-5][0]+'" />';
			li += '</li>';
			content += li;
		}
	}
	content += '</ul>';
	content += '</div>';
	aboutContainer.innerHTML += content;
}

function fillAboutSettings(data) {
	socialIcons = [['Facebook', 'https://www.facebook.com/'],['Phone',''], ['Instagram','https://www.instagram.com/'],
						['Github', 'https://www.github.com/'],['Linkedin', 'https://www.linkedin.com/in/'],['Personal Website','https://']];
	console.log(data);
	var aboutContainer = document.querySelector("#about > .settings");
	var content = '';
	content += '<div><select name="major">';
	content += '<option selected="selected" value="'+data[1]+'">'+data[1]+'</option>';
	$.getJSON("/assets/majors.json", function (majors) {
		for (i = 0; i < majors.length; i++) {
			content += '<option value="'+majors[i]['major']+'">'+majors[i]['major']+'</option>';
		}
	}).then(() => {
		content += '</select>';

		content += '<select name="eduLevel" class="pull-right text-right" style="width:140px;">';
		content += '<option selected="selected" value="'+data[3]+'">'+data[3]+'</option>';
		content += '<option value="highschool">High School</option>';
		content += '<option value="undergraduate">Undergraduate</option>';
		content += '<option value="graduate">Graduate</option>';
		content += '<option value="phd">PhD</option>';
		content += '</select>';

		content += '<div style="padding-top:3px;"><select name="school">';
		content += '<option selected="selected" value="'+data[2]+'">'+data[2]+'</option>';
		$.getJSON("/assets/us_institutions.json", function (unis) {
			for(i = 0; i < unis.length;i++){
				content += '<option value="'+unis[i]['institution']+'" >'+unis[i]['institution']+'</option>';
			}
		}).then(() => {
			content += '</select>';

			content += '<select class="pull-right text-right" name="gradYear">';
			content += '<option value="'+data[4]+'">'+data[4]+'</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option></select>';
			
			content += '<div>';
			for(i = 0; i < socialIcons.length; i++){
				content += '<label for="'+socialIcons[i][0]+'">'+socialIcons[i][0]+': </label><input name="'+socialIcons[i][0]+'" type="text" />';
			}
			content += '</div>';

			aboutContainer.innerHTML += content;
		
	});
	});
}

function fillLanaguages(data) {
	var skillsContainer = document.querySelector("#skills > .content");
	for(i = 0; i < data.length; i++){
		if(i == 5){
			content += '<span>'+data.length-5+' more...</span>';
			break;
		}
		if(data[i] != 0){
			var content = '<div class="lan">';
			content += '<div class="content" style="padding-bottom: 10px;">';
			content += '<strong>'+data[i][0]+'</strong>';
			if(data[i].length == 3){	//There are endorsements for this language
				content += '<i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>'+data[i][2]+'</span>';
			}
			content += '<span class="pull-right" >'+data[i][1]+'%</span>';
			content += '<div class="progress">';
			content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+data[i][1]+'" style="width:'+data[i][1]+'%;"></div></div></div>';
			skillsContainer.innerHTML += content;
		}
	}

	var settings = '';
	for(i = 0; i < data.length; i++){
		settings += '<div class="settings" style="padding-top:15px;"><div>';
		settings += '<strong>'+data[i][0]+'</strong>';
		if(data[i].length == 3){
			settings += '<i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>'+data[i][2]+'</span>';
		}
		settings += '<i class="language pull-right fa fa-times"></i><span class="pull-right">%</span>';
		settings += '<input value='+data[i][1]+' class="pull-right" type="number" style="margin-top: -.2em; height: 20px !important;width:40px;" min="1" max="100" class="max100input">';
		settings += '</div>';
		settings += '<div class="progress" style="margin-top:10px;">';
		settings += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+data[i][1]+'" style="width:'+data[i][1]+'%;"></div></div>';
		settings += '</div></div>';
	}
	if(data.length < 5){
		settings += '<div padding-top="10px;">';
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#modalLanguages">';
		settings += '<i class="fa fa-plus"></i> add</button>';
		settings += '</div>';
	}
	skillsContainer.innerHTML += settings;
}


function fillLanguagesModal(data){
	var container = document.querySelector('#modalLanguages');
	container = container.querySelector('.modal-body');
	var content = '';
	if(data.length > 5){	//if there's more than 5 languages that user didn't put on dashboard
		for(i = 0; i < data.length; i++){
			content += '<div class="row"><div class="col-md-10">';
			content += '<span class="language" style="padding-left: 30px;">'+data[i]+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button></div>';
			if(j != data[i][1].length-1){
				content += '</div><hr>'
			}
		}
	}
	container.innerHTML += content;

	var languages = [];
	$.ajax({
		dataType:'json',
		type:'GET',
		url: '/assets/interests.json',
		success:function(data){
			languages = data;
		},
		error: function(req,err){
			alert("Error:", err, "Request:", req);
		}
	}).then(() => {
		languages.forEach(function(d){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+d.name+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div></div>'
			container.innerHTML += content;
		});
	});

	
}

function fillFamiliarTechnologies(data) {
	var techContainer = document.querySelector("#familiar > .content");
	var content = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){
			content += '<div class="'+data[i][0].split(' ').join('_')+'">';
			content += '<span class="pull-right">'+data[i][1]+'/10</span>';
			if(data[i].length == 3){	//has thumbs up
				content += '<i class="pull-right fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span class="pull-right">'+data[i][2]+'</span>';
			}
			content += '<li>'+data[i][0]+'</li>';
			content += '<input type="hidden" name="technology" value="'+data[i][0]+'" />';
			content += '</div>';
		}
	}
	content += '</ul>';
	techContainer.innerHTML += content;

	var settingsContainer = document.querySelector("#familiar > .settings");
	var settings = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){

			settings += '<div style="padding-bottom: 20px;" class="'+data[i][0].split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+data[i][0];
			settings += '<input value='+data[i][1]+' class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			if(data[i].length == 3){	//has thumbs up
				content += '<i class="pull-right fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span class="pull-right">'+data[i][2]+'</span>';
			}
			settings += '</div>';
		}
	}
	settings += '</ul>';
	if(data.length < 5){
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#modalfamiliar">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}


	settingsContainer.innerHTML += settings;

}

//TODO: take modalbutton to initialize after ajax request completed. Make function a promise?
function fillTechModal(data){
	var tech = [];
	$.ajax({
		dataType:'json',
		type:'GET',
		url: '/assets/technologies.json',
		success:function(data){
			tech = data;
		},
		error: function(req,err){
			alert("Error:", err, "Request:", req);
		}
	}).then(() => {
		var container = document.querySelector('#modalfamiliar');
		container = container.querySelector('.modal-body');
		var content = '';
		for(i = 0; i < data.length; i++){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+data[i]+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div>';
		}
		
		tech.forEach(function(d){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+d.name+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div>';
		});
		container.innerHTML += content;

		var modalButton = $('.modal-add');
		modalButton.on('click', function(){
			console.log('clicked');
			var containerName = $(this).closest(".modal").attr('id');
			var contentContainer = $('#'+containerName.substr(5)+' > .content');
			var settingsContainer = $('#'+containerName.substr(5)+' > .settings');
			var spanText = $(this).parent().find('span').text()
			var content = '', settings = '';

			content += '<div class="'+spanText.split(' ').join('_')+'">';
			content += '<span class="pull-right">10/10</span>';
			content += '<li>'+spanText+'</li>';
			content += '<input type="hidden" name="technology" value="'+spanText+'" />';
			content += '</div>';
			contentContainer.find('ul').append(content);

			settings += '<div style="padding-bottom: 20px;" class="'+spanText.split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+spanText;
			settings += '<input value=10 class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			settings += '</div>';
			settingsContainer.find('ul').append(settings);
		});
	});
		
}

function fillInterestedTechnologies(data) {
	var techContainer = document.querySelector("#interested > .content");
	var content = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){
			content += '<div class="'+data[i][0].split(' ').join('_')+'">';
			content += '<span class="pull-right">'+data[i][1]+'/10</span>';
			content += '<li>'+data[i][0]+'</li>';
			content += '</div>'
		}
	}
	content += '</ul>';
	techContainer.innerHTML += content;

	var settingsContainer = document.querySelector("#interested > .settings");
	var settings = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){

			settings += '<div style="padding-bottom: 20px;" class="'+data[i][0].split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+data[i][0];
			content += '<input type="hidden" name="interest" value="'+data[i][0]+'" />';
			settings += '<input name="interestcare" value='+data[i][1]+' class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			settings += '</div>';
		}
	}
	settings += '</ul>';
	if(data.length < 5){
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#modalinterested">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}

	settingsContainer.innerHTML += settings;
}

function fillInterestsModal(data){
	var tech = [];
	$.ajax({
		dataType:'json',
		type:'GET',
		url: '/assets/interests.json',
		success:function(data){
			tech = data;
		},
		error: function(req,err){
			alert("Error:", err, "Request:", req);
		}
	}).then(() => {
		var container = document.querySelector('#modalinterested');
		container = container.querySelector('.modal-body');
		var content = '';
		for(i = 0; i < data.length; i++){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+data[i]+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div>';
		}
		
		tech.forEach(function(d){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+d.name+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div>';
		});
		container.innerHTML += content;

		var modalButton = $('.modal-add');
		modalButton.on('click', function(){
			console.log('clicked');
			var containerName = $(this).closest(".modal").attr('id');
			var contentContainer = $('#'+containerName.substr(5)+' > .content');
			var settingsContainer = $('#'+containerName.substr(5)+' > .settings');
			var spanText = $(this).parent().find('span').text()
			var content = '', settings = '';

			content += '<div class="'+spanText.split(' ').join('_')+'">';
			content += '<span class="pull-right">10/10</span>';
			content += '<li>'+spanText+'</li>';
			content += '<input type="hidden" name="technology" value="'+spanText+'" />';
			content += '</div>';
			contentContainer.find('ul').append(content);

			settings += '<div style="padding-bottom: 20px;" class="'+spanText.split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+spanText;
			settings += '<input value=10 class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			settings += '</div>';
			settingsContainer.find('ul').append(settings);
		});
	});
}


function fillFields(data) {
	var fieldsContainer = document.querySelector("#fields > .content");
	var content = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){
			content += '<div class="'+data[i][0].split(' ').join('_')+'">';
			content += '<span class="pull-right">'+data[i][1]+'/10</span>';
			content += '<li>'+data[i][0]+'</li>';
			content += '</div>';
		}
	}
	content += '</ul>';
	fieldsContainer.innerHTML += content;

	var settingsContainer = document.querySelector("#fields > .settings");
	var settings = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){
			settings += '<div style="padding-bottom: 20px;" class="'+data[i][0].split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+data[i][0];
			settings += '<input value='+data[i][1]+' class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			settings += '</div>';
		}
	}
	settings += '</ul>';
	if(data.length < 5){
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#modalfields">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}

	settingsContainer.innerHTML += settings;

}

function fillFieldsModals(data){
	var tech = [];
	$.ajax({
		dataType:'json',
		type:'GET',
		url: '/assets/fields.json',
		success:function(data){
			tech = data;
		},
		error: function(req,err){
			alert("Error:", err, "Request:", req);
		}
	}).then(() => {
		var container = document.querySelector('#modalfields');
		container = container.querySelector('.modal-body');
		var content = '';
		for(i = 0; i < data.length; i++){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+data[i]+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div>';
		}
		
		tech.forEach(function(d){
			content += '<div class="row"><div class="col-md-8">';
			content += '<span class="language" style="padding-left: 30px;">'+d.name+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
			content += '</div>';
		});
		container.innerHTML += content;

		var modalButton = $('.modal-add');
		modalButton.on('click', function(){
			console.log('clicked');
			var containerName = $(this).closest(".modal").attr('id');
			var contentContainer = $('#'+containerName.substr(5)+' > .content');
			var settingsContainer = $('#'+containerName.substr(5)+' > .settings');
			var spanText = $(this).parent().find('span').text()
			var content = '', settings = '';

			content += '<div class="'+spanText.split(' ').join('_')+'">';
			content += '<span class="pull-right">10/10</span>';
			content += '<li>'+spanText+'</li>';
			content += '<input type="hidden" name="technology" value="'+spanText+'" />';
			content += '</div>';
			contentContainer.find('ul').append(content);

			settings += '<div style="padding-bottom: 20px;" class="'+spanText.split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+spanText;
			settings += '<input value=10 class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			settings += '</div>';
			settingsContainer.find('ul').append(settings);
		});
	});
}


function fillHackathons(data) {
	var hackContainer = document.querySelector("#hackathons > .content");
	var content = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){
			content += data.length-5+' more...';
			break;
		}
		if(data[i] != 0){
			content += '<div class="'+data[i][0].split(' ').join('_')+'">';
			if(data[i].length > 3){		//won an award
				content += '<i class="pull-right fa fa-trophy" title="'+data[i][3]+'"></i>'
			}
			content += '<li><a href="'+data[i][2]+'" style="color: black">'+data[i][0]+ " "+ data[i][1]+'</a></li>';
			content += '</div>';
		}
	}
	content += '</ul>';
	hackContainer.innerHTML += content;

	var settingsContainer = document.querySelector("#hackathons > .settings");
	var settings = '<ul>';
	for(i = 0; i < data.length; i++){
		if(i == 5){ break;}
		if(data[i] != 0){
			settings += '<div>';
			if(data[i].length > 3){		//won an award
				settings += '<i class="pull-right fa fa-trophy" title="'+data[i][3]+'"></i>'
			}
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>';
			settings += '<a href="'+data[i][2]+'" style="color: black">'+data[i][0]+ " "+ data[i][1]+'</a>';
			settings += '</div>';
		}
	}
	settings += '</ul>';
	if(data.length < 5){
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#modalhackathons">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}

	settingsContainer.innerHTML += settings;

}

function fillHackathonsModal(data){
	var tech = [];
	console.log($('#hackathonYear').val());
	$('#hackathonYear').on('change', ()=>{
		var hackYear = $('#hackathonYear').val()
		if(hackYear != 0){
			$.ajax({
				dataType:'json',
				type:'GET',
				url: '/assets/hackathons'+hackYear+'.json',
				success:function(data){
					tech = data;
				},
				error: function(req,err){
					alert("Error:", err, "Request:", req);
				}
			}).then(() => {
				var container = document.querySelector('#modalhackathons');
				container = container.querySelector('.modal-body');
				var content = '';
				for(i = 0; i < data.length; i++){
					content += '<div class="row"><div class="col-md-8">';
					content += '<span class="language" style="padding-left: 30px;">'+data[i]+'</span>';
					content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
					content += '</div>';
				}
				
				tech.forEach(function(d){
					content += '<div class="row"><div class="col-md-8">';
					content += '<span class="language" style="padding-left: 30px;">'+d.name+'</span>';
					content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button>';
					content += '</div>';
				});
				container.innerHTML += content;

				var modalButton = $('.modal-add');
				modalButton.on('click', function(){
					console.log('clicked');
					var containerName = $(this).closest(".modal").attr('id');
					var contentContainer = $('#'+containerName.substr(5)+' > .content');
					var settingsContainer = $('#'+containerName.substr(5)+' > .settings');
					var spanText = $(this).parent().find('span').text()
					var content = '', settings = '';

					content += '<div class="'+spanText.split(' ').join('_')+'">';
					content += '<span class="pull-right">10/10</span>';
					content += '<li>'+hackYear+" "+spanText+'</li>';
					content += '<input type="hidden" name="technology" value="'+spanText+'" />';
					content += '</div>';
					contentContainer.find('ul').append(content);

					settings += '<div style="padding-bottom: 20px;" class="'+spanText.split(' ').join('_')+'">';
					settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+hackYear+" "+spanText;
					settings += '</div>';
					settingsContainer.find('ul').append(settings);
				});
			});
		}
	});
	/*
	
	*/
}

/*
function fillNote(data){
	var container = document.querySelector("#note > .content");
	var content = '<h4 class="accent"> Hobbies</h4>';
	for(i = 0; i < data.length; i++){
		if(data[i] != 0){
			content += '<span>' + data[i] + '</span>';	
		}
	}
	container.innerHTML += content;

	var settingsContainer = document.querySelector("#note > .settings");
	var settings = '<textarea id="noteText" cols="65" maxLength="5" style="height:10em;border-radius:0px; color:black"></textarea>';
	settings += '<span>limit: 1000 characters</span>';
	settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" onclick="print()"> submit</button>';
	settingsContainer.innerHTML += settings;
}
function print(){
	var note = $('#noteText').val();
	var content = '<p>';
	for(i = 0; i < note.length; i++){
		if(note.charCodeAt(i) == 10){
		   content += '</p><p>';
		}
		content += note.charAt(i);
	}
	content += '</p>';
	container.innerHTML += content;
}



function addTechFamiliar(technology,like, endorse){
	var techContainer = document.querySelector("#familiar > .content");
	var tech = techContainer.querySelector('ul');
	var content = '';
	content += '<span class="pull-right">'+like+'/10</span>';
	if(endorse != 0){
		content += '<i class="pull-right fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span class="pull-right">'+endorse+'</span>';
	}
	content += '<li>'+technology+'</li>';
	tech.innerHTML += content;

	var settingsContainer = document.querySelector("#familiar > .settings");
	var set = settingsContainer.querySelector('ul');
	var settings = '<div style="padding-bottom: 20px;" class="familiarTech">';
	settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+technology;
	if(endorse != 0){
		settings += '<i class="pull-right fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span class="pull-right">'+endorse+'</span>';
	}
	settings += '<input value='+like+' class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
	settings += '</div>';
	set.innerHTML += settings;
}
*/



