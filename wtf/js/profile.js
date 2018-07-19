// NOTE: DATA: technologies, fields, hackathons cannot have a field with same name

// PRELOADER

$(window).on('load', function () {
	$('.preloader').delay(500).fadeOut("slow"); // set duration in brackets
});


// HOME BACKGROUND SLIDESHOW
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

	//ajax request to get current logged in user
	console.log(User);
	var email = document.querySelector("#email");
	email.innerHTML += User.email;
	console.log(User.preferences.languages);
	//name, major, uni, educationLevel, graduationYear, Fb, phone, insta, github, linkdin, website
/*
	var about = ['Jenny Xu','Computer Science','Stony Brook University','Undergraduate','2021','Jenny Gong','6318939325','','www.github.com/archeane','www.linkedin.com/in/xu-jenny',''];
	var languages = [['Java', 50, 15],['Javascript', 35, 10],['Python', 20, 5],['jackdaniels', 100, 100],['vodka', 100,100],['tequila',100,100]];
	var familiar = [['Virtual Reality', 8, 15],['Hardware', 2], ['Computer Vision', 4, 7],['Arduino', 5],['Data Visualization', 10],['data mining', 8]];
	var interested = [['Augumented Reality', 4], ['Machine Learning', 10]];
	var fields = [['Health', 3],['Finance', 4],['Wearable Tech', 10]];
	var hackathons = [['YHacks', 2017, 'https://devpost.com/software/vrbind','Top 8, Emotion Detect'],
					  ['HackPrinceton', 2017, 'https://devpost.com/software/foodme-bopj6r'],
					  ['PennApps', 2018, 'https://devpost.com/software/hackermatcher'],
					  ['SheHacks', 2018, 'https://devpost.com/software/medrisk'],
					  ['HackHealth', 2018, 'https://devpost.com/software/classroom-monitor']];
	var note = ['Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met.', 'Luckily friends do ashamed to do suppose. Tried meant mr smile so. Exquisite behaviour as to middleton perfectly. Chicken no wishing waiting am.','Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. '];
*/
	var Userabout = [User.name, User.major, User.school, User.educationLevel, User.graduationYear, User.facebook, User.phone, User.instagram, User.github, User.linkedin, User.website];
	var UserLan = User.preferences.languages;
	var UserFamiliar = User.preferences.technologies;
	var UserInterest = User.preferences.interests;
	var UserFields = User.preferences.fields;
	var UserHobbies = User.preferences.hobbies;
	var UserHackatons = User.hackathons;

	fillAbout(Userabout);
	fillAboutSettings(Userabout);
	fillLanaguages(UserLan);
	fillFamiliarTechnologies(UserFamiliar);
	fillInterestedTechnologies(UserInterest);
	fillFields(UserFields);

	fillHackathons(UserHackatons);
	fillNote(UserHobbies);


	//modal content





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

})



function fillHeader(data) {

}

function fillAbout(data) {
	const socialIcons = ['facebook','phone', 'instagram','github','linkedin','user'];
	//document.querySelector("#about > h6").innerHTML += data[0];
	var aboutContainer = document.querySelector("#about > .content");
	var content = '';
	content += '<div>';
	content += '<p style="margin-top:-1.5em;">'+data[1]+'<span class="pull-right">'+data[3]+'</span></p>';
	content += '<p style="margin-top:-1.7em;">'+data[2]+'<span class="pull-right">'+data[4]+'</span></p>';
	content += '</div>';
	
	content += '<div>';
	content += '<ul class="social-icons">';
	for(i=5; i < data.length; i++){
		console.log(data[i]);
		if(data[i] != '' || data[i] != undefined || data[i] != null){
			content += '<li><a href="'+data[i]+'" class="fa fa-'+socialIcons[i-5]+'"></a></li>';
		}
	}
	content += '</ul>';
	content += '</div>';

	aboutContainer.innerHTML += content;
}

function fillAboutSettings(data) {
	var aboutContainer = document.querySelector("#about > .settings");
	var content = '';
	content += '<div><select>';
	content += '<option selected="selected" value="'+data[1]+'">'+data[1]+'</option>';
	//TODO: load majors json here, make default choice
	content += '<option value="'+data[2]+'">'+data[2]+'</option>';
	content += '</select>';

	content += '<select class="pull-right text-right" style="width:140px;">';
	content += '<option value="'+data[4]+'">'+data[4]+'</option><option selected="selected" value="2019">Undergraduate</option><option value="2020">Graduate</option><option value="2021">PhD</option></select>'
	content += '<div style="padding-top:3px"><select>';
	content += '<option selected="selected" value = "Stony Brook">Stony Brook University</option>';
	content += '</select>';
	content += '<select class="pull-right text-right">';
	content += '<option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option></select>';
	content += '<div>';
	content += '<label for="facebook">Facebook: </label><input name="facebook" type="text">	<label for="phone">Phone: </label><input name="facebook" type="text">';
	content += '</div>';

	aboutContainer.innerHTML += content;
}

function fillLanaguages(data) {
	var skillsContainer = document.querySelector("#skills");
	console.log("languages length: ",data.length);
	for(i = 0; i < data.length; i++){
		if(i == 5){
			content += '<span>'+data.length-5+' more...</span>';
			break;
		}
		if(data[i] != 0){
			var content = '<div class="lan">';
			content += '<div class="content" style="padding-bottom: 10px;">';
			content += '<strong>'+data[i][0]+'</strong><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>'+data[i][2]+'</span>';
			content += '<span class="pull-right" >'+data[i][1]+'%</span>';
			content += '<div class="progress">';
			content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+data[i][1]+'" style="width:'+data[i][1]+'%;"></div></div></div>';
			content += '<div class="settings" style="padding-top:15px;"><div>';
			content += '<strong>'+data[i][0]+'</strong><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>'+data[i][2]+'</span>';
			content += '<i class="language pull-right fa fa-times"></i><span class="pull-right">%</span>';
			content += '<input value='+data[i][1]+' class="pull-right" type="number" style="margin-top: -.2em; height: 20px !important;width:40px;" min="1" max="100" class="max100input">';
			content += '</div>';
			content += '<div class="progress" style="margin-top:10px;">';
			content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+data[i][1]+'" style="width:'+data[i][1]+'%;"></div></div>';
			content += '</div></div>';
			skillsContainer.innerHTML += content;
		}
	}

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
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#tech-familiar">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}


	settingsContainer.innerHTML += settings;

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
			settings += '<input value='+data[i][1]+' class="max10Input pull-right" type="number" style="height: 20px !important;width:40px;" min="1" max="10">';
			settings += '</div>';
		}
	}
	settings += '</ul>';
	if(data.length < 5){
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#tech-familiar">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}

	settingsContainer.innerHTML += settings;
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
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#tech-familiar">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}

	settingsContainer.innerHTML += settings;

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
			settings += '<div style="padding-bottom: 20px;" class="'+data[i][0].split(' ').join('_')+'">';
			settings += '<i class="tech pull-left fa fa-times" style="padding-right:5px"></i>'+data[i][0];
			settings += '</div>';
		}
	}
	settings += '</ul>';
	if(data.length < 5){
		settings += '<button style="border-radius: 0px; border-width: 1px; text-align:center" data-toggle="modal" data-target="#tech-familiar">';
		settings += '<i class="fa fa-plus"></i> add</button>';
	}

	settingsContainer.innerHTML += settings;

}

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




