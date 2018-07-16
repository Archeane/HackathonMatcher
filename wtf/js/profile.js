// templatemo 467 easy profile

// PRELOADER

$(window).on('load', function () {
	$('.preloader').delay(1000).fadeOut("slow"); // set duration in brackets
});


// HOME BACKGROUND SLIDESHOW
$(function () {
	jQuery(document).ready(function () {
		$('body').backstretch([
	 		 "images/tm-bg-slide-1.jpg",
	 		 "images/tm-bg-slide-2.jpg",
			 "images/tm-bg-slide-3.jpg"
	 			], {
			duration: 3200,
			fade: 1300
		});
	});



	//name, major, uni, educationLevel, graduationYear, Fb, phone, insta, github, linkdin, website
	var about = ['Jenny Xu','Computer Science','Stony Brook University','Undergraduate','2021','Jenny Gong','6318939325','','www.github.com/archeane','www.linkedin.com/in/xu-jenny',''];
	fillAbout(about);
	var languages = [['Java', 50, 15],['Javascript', 35, 10],['Python', 20, 5]];
	fillAboutSettings(languages);
	fillLanaguages('c');
	fillFamiliarTechnologies('d');
	fillInterestedTechnologies('e');
	fillFields('d');
	fillHackathons('g');

	$('.language').on('click', function (event) {
		event.preventDefault();
		$(this).parents().eq(2).remove();
	});
})



function fillHeader(data) {

}

function fillAbout(data) {
	const socialIcons = ['facebook','phone','instagram','github','linkedin','user'];
	var aboutContainer = document.querySelector("#about > .content");
	var content = '';
	content += '<div>';
	content += '<p style="margin-top:-1.5em;">'+data[1]+'<span class="pull-right">'+data[3]+'</span></p>';
	content += '<p style="margin-top:-1.7em;">'+data[2]+'<span class="pull-right">'+data[4]+'</span></p>';
	content += '</div>';
	content += '<div>';
	content += '<ul class="social-icons">';
	for(i=5; i < data.length; i++){
		if(data[i] != ''){
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
	for(i = 0; i < data.length; i++){
		var content = '<div class="lan">';
		content += '<div class="content" style="padding-bottom: 10px;">';
		content += '<strong>'+data[i][0]+'</strong><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>'+data[i][2]+'</span>';
		content += '<span class="pull-right" >'+data[i][1]+'%</span>';
		content += '<div class="progress">';
		content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+data[i][1]+'" style="width:'+data[i][1]+'%;"></div></div></div>';
		content += '<div class="settings" style="padding-top:15px;"><div>';
		content += '<strong>'+data[i][0]+'</strong><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>'+data[i][2]+'</span>';
		content += '<i class="language pull-right fa fa-times"></i><span class="pull-right">%</span>';
		content += '<input value='+data[i][1]+'class="pull-right" type="number" style="margin-top: -.2em; height: 20px !important;width:70px;" min="1" max="100" class="progressInput">';
		content += '</div>';
		var input = document.querySelector(".progressInput");
		console.log($('.progressInput'));
		/*input.addEventListener('input', function(){
			content += '<div class="progress" style="margin-top:10px;">';
			content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+input.valueOf()+'" style="width:'+input.valueOf()+'%;"></div></div>';
		})
		*/
		content += '</div></div>';
	}
	skillsContainer.innerHTML += content;
}


function fillFamiliarTechnologies(data) {
	var techContainer = document.querySelector("#familiar > .content");
	var content = '<ul>';
	content += '<li>Virtual Reality</li>';
	content += '<i class="pull-right fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span class="pull-right">15</span><span class="pull-right">8/10</span>';
	content += '<li>Hardware</li>'
	content += '<li>Virtual Reality</li>';
	content += '<li>Virtual Reality</li>';
	content += '</ul>';
	techContainer.innerHTML += content;

	var settingsContainer = document.querySelector("#familiar > .settings");
	var settings = '<div style="padding-bottom: 20px;">';
	settings += '<i class="pull-left fa fa-times" style="padding-right:5px"></i>Virtual Reality</div>';
	settings += '<button class="fa fa-plus" style="border-radius: 0px; border-width: 0px; margin-left: 80px;" data-toggle="modal" data-target="#tech-familiar"></button>Add';
	settingsContainer.innerHTML += settings;
}

function fillInterestedTechnologies(data) {
	var techContainer = document.querySelector("#interested > .content");
	var content = '<ul>';
	content += '<li>Virtual Reality</li>';
	content += '<span class="pull-right">8/10</span>';
	content += '<li>Hardware</li>'
	content += '<li>Virtual Reality</li>';
	content += '<li>Virtual Reality</li>';
	content += '</ul>';
	techContainer.innerHTML += content;
}

function fillFields(data) {
	var fieldsContainer = document.querySelector("#fields > .content");
	var fields = '<ul>';
	fields += '<li>Health</li>';
	fields += '<li>Finance</li>';
	fields += '</ul>'
	fieldsContainer.innerHTML += fields;

	var settingsContainer = document.querySelector("#fields > .settings");
	var settings = '<ul>';
	settings += '<i class="pull-left fa fa-times" style="padding-right:5px"></i>Health';
	settings += '<button class="fa fa-plus" style="border-radius: 0px; border-width: 0px; margin-left: 80px;" data-toggle="modal" data-target="#tech-familiar"></button>Add';
	settings += '</ul>'
	settingsContainer.innerHTML += settings;

}

function fillHackathons(data) {
	var hackContainer = document.querySelector("#hackathons > .content");
	var hacks = '<p>YHacks 2017<i class="pull-right fa fa-trophy"></i></p>';
	hackContainer.innerHTML += hacks;

	var settingsContainer = document.querySelector("#hackathons > .settings");
	var settings = '<ul>';
	settings += '<i class="pull-left fa fa-times" style="padding-right:5px"></i>YHacks 2018';
	settings += '<button class="fa fa-plus" style="border-radius: 0px; border-width: 0px; margin-left: 80px;" data-toggle="modal" data-target="#tech-familiar"></button>Add';
	settings += '</ul>'
	settingsContainer.innerHTML += settings;

}

function fillNote(note){
	var container = document.querySelector("#note > .content");
	var note = '<p>this is a note</p>';
	container.innerHTML += note;

	var settings = document.querySelector("#note > .settings");
	//var textArea = textArea();
}

function addTechFamiliar(technology,endorse){
	var techContainer = document.querySelector("#familiar > .content");
	var tech = techContainer.querySelector('ul');
	tech.innerHTML += '<li>'+technology+'</li>';
}



