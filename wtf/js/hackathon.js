$(document).ready(function(){

	
	$.ajax({
        type: "GET",
        url: '/hackathons/ef49c2c0-d206-47fe-8241-5ac47feae273/process',
        success: function(data) {
        	alert("data received");
        	//console.log("data received!!");
            console.log(data);
        },
        error: function(jqXHR, textstatus, errorThrown) {
            alert('text status ' + textstatus + ', err ' + errorThrown);
        }
    });

	fillHeader();
	fillAbout();
	fillSponsors();

/*
	fetch('/hackathons/ef49c2c0-d206-47fe-8241-5ac47feae273').then(function(data) {
		console.log("DATA!", data);
	}).catch(function(error){
		alert(error);
	});
*/
	


});

function fillHeader(){
	var hero = document.querySelector('#mu-hero');
	hero.style="background-image: url(https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350);";
	var logo = hero.querySelector('.mu-logo-img')
	logo.height = "280px";
	logo.src = hackathon.logo;
	var name = hero.querySelector('.mu-logo')
	name.text = hackathon.name;
	var content = hero.querySelector('.mu-hero-featured-content');
	content.innerHTML += '<p class="mu-event-date-line">'+hackathon.date+'  '+hackathon.city+', ' +hackathon.state+'</p>';
	content.innerHTML += '<button href="'+hackathon.URL+'"> Website</button>';
}

function fillAbout(){
	var aboutContainer = document.querySelector('.about');
	aboutContainer.innerHTML += '<p>'+hackathon.about+'</p>';
}

function fillSponsors(){
	var sponsor = document.querySelector('.sponsors');
	var content = '<div class="row">';
	for(i = 0; i < hackathon.sponsors.length; i++){
		content += '<a href="'+hackathon.sponsors[i].name+'">';
		content += '<img height="280" width="auto" src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiH_6Tr87XcAhWsm-AKHbQyCo0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.famouslogos.us%2Ffacebook-logo%2F&psig=AOvVaw2aycLXudUemEWVaNjpinQ-&ust=1532458743721236" />';
		content += '</a>';
	}
	content += '</div>';
	sponsor.innerHTML += content;
}


function fillHackers(data){
	var hackerContainer = document.querySelector('.attending-hackers');
	for(i = 0; i < data.length; i++){
		var content = '<article class="search-result row">';
		content += '<div class="col-xs-12 col-sm-12 col-md-3">';
		content += '<a href="'+data[i]['href']+'" title="'+data[i]['title']+'" class="thumbnail">';
		content += '<img src="'+data[i]['pfp']+'" alt="' +data[i]['title']+'"/></a></div>';

		content += '<div class="col-xs-12 col-sm-12 col-md-2">';
		content += '<ul class="meta-search">';
		content += '<li>'+data[i]['name']+'</li>';
		content += '<li>'+data[i]['major']+'</li>';
		content += '<li>'+data[i]['school']+'</li>';
		content += '</ul></div>';

		content += '<div class="col-xs-12 col-sm-12 col-md-7 excerpet">';
		//TODO: user tuned display interests, technologies, languages, fields or hobbies
		content += '<h3>'+data[i]['display']+'</h3>';
		//TODO: hacker social profiles
		content += '<a href=""><i class="fa fa-facebook"></i></a>';
		content += '</div></article>';
		
	}

}