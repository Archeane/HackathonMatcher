// templatemo 467 easy profile

// PRELOADER

$(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut("slow"); // set duration in brackets
});

// HOME BACKGROUND SLIDESHOW
$(function(){
    jQuery(document).ready(function() {
		$('body').backstretch([
	 		 "../../wtf/images/tm-bg-slide-1.jpg",
	 		 "../../wtf/images/tm-bg-slide-2.jpg",
			 "../../wtf/images/tm-bg-slide-3.jpg"
	 			], 	{duration: 3200, fade: 1300});
		});
	fillAbout('a');
	fillAboutSettings('b');
	fillLanaguages('c');
	fillFamiliarTechnologies('d');
	fillInterestedTechnologies('e');

	$('.language').on('click', function(event){
		event.preventDefault();
		$(this).parents().eq(2).remove();
	});
})



function fillHeader(data){

}

function fillAbout(data){
	var aboutContainer = document.querySelector("#about > .content");
	var content = '';
	content += '<div>';
	content += '<p style="margin-top:-1.5em;">Computer Science<span class="pull-right">Undergraduate</span></p>';
	content += '<p style="margin-top:-1.7em;">Stony Brook University<span class="pull-right"> 2021</span></p>';
	content += '</div>';
	content += '<div>';
	content += '<ul class="social-icons">';

	//TODO: logic here
	content += '<li><a href="#" class="fa fa-facebook"></a></li><li><a href="#" class="fa fa-phone"></a></li><li><a href="#" class="fa fa-instagram"></a></li><li><a href="#" class="fa fa-github"></a></li><li><a href="#" class="fa fa-linkedin"></a></li><li><a href="#" class="fa fa-user"></a></li>';
	content += '</ul>';
	content += '</div>';
	aboutContainer.innerHTML += content;
}
function fillAboutSettings(data){
	var aboutContainer = document.querySelector("#about > .settings");
	var content ='';
	content += '<div><select>';
	//TODO: Logic here
	content += '<option selected="selected" value="computer science">Computer Science</option>';
	content += '<option value="Mechanical Engineering">Mechanical Engineering</option>';
	content += '</select>';
	content += '<select class="pull-right text-right" style="width:140px;">';
	content += '<option value="High School">High School</option><option selected="selected" value="2019">Undergraduate</option><option value="2020">Graduate</option><option value="2021">PhD</option></select>'
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

function fillLanaguages(data){
	var skillsContainer = document.querySelector("#skills");
	var content = '<div class="lan">';
	content += '<div class="content" style="padding-bottom: 10px;">';
	content += '<strong>Java</strong><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>15</span>';
	content += '<span class="pull-right" >70%</span>';
	content += '<div class="progress">';
	content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" style="width: 70%;"></div></div></div>';
	content += '<div class="settings" style="padding-top:15px;"><div>';
	content += '<strong>Java</strong><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i><span>15</span>';
	content += '<i class="language pull-right fa fa-times"></i><span class="pull-right">%</span>';
	content += '<input value=70 class="pull-right" type="number" style="margin-top: -.2em; height: 20px !important;width:70px;" min="1" max="100">';
	content += '</div>';
	content += '<div class="progress" style="margin-top:10px;">';
	content += '<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" style="width: 70%;"></div></div>';
	content += '</div></div>';
	skillsContainer.innerHTML += content;
}


function fillFamiliarTechnologies(data){
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
	settings += '<button class="fa fa-plus" style="border-radius: 0px; border-width: 0px; margin-left: 80px;" data-toggle="modal" data-target="#tech-familiar">Add</button>';
	settingsContainer.innerHTML += settings;
}

function fillInterestedTechnologies(data){
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

function fillFields(data){

}

function fillHackathons(data){

}
