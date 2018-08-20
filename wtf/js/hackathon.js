window.onload = function(){
	var visulURl = window.location.toString() + '/visual';
	var preferenceURL = window.location.toString() + '/preferences';
	console.log(preferenceURL);
	if(containsHackers){
    	document.getElementById("visLink").href = visulURl;
	}
    console.log(document.getElementById("prefLink"));
    document.getElementById("prefLink").href = preferenceURL;
}
$(document).ready(function(){

	//fillHackersVue(matches);
	//console.log(hackathon);
	fillHeader();
	fillAbout();
	fillSponsors();
	if(containsHackers){
		fillHackers(matches);
	}
	
});

function fillHeader(){
	var hero = document.querySelector('#mu-hero');
	hero.style="background-image: url("+hackathon.imageurl+");";
	var logo = hero.querySelector('.mu-logo-img')
	logo.height = "280px";
	logo.src = hackathon.logo;
	var name = hero.querySelector('.mu-logo')
	name.text = hackathon.name;
	var content = hero.querySelector('.mu-hero-featured-content');
	content.innerHTML += '<p class="mu-event-date-line">'+hackathon.date+'  '+hackathon.city+', ' +hackathon.state+'</p>';
//	content.innerHTML += '<button class="btn-default" href="'+hackathon.URL+'"> Website</button>';
//	content.innerHTML += '<button class="btn-primary" onclick="addToHackathon()"> I am going!</button>';
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

function fillHackersVue(data){
	console.log(data);
	new Vue({
		el: '#app-search',
		data: {
			hackers: data,
		}
	});
}



function fillHackers(data){
	console.log(data);
	var hackerContainer = document.querySelector('.attending-hackers');
	var content = '';
	for(i = 0; i < data.length; i++){
		content += '<div class="row" style="padding-top:30px">';
		content += '<div class="col-md-2">';
		content += '<img src="'+data[i]['profileimg']+'" alt="profile image" />';
		content += '</div>';
		content += '<div class="col-md-4">';
		content += '<ul>';
		content += '<li>'+data[i]['firstname']+ " "+data[i]['lastname']+'</li>';
		content += '<li>'+data[i]['major']+'</li>';
		content += '<li>'+data[i]['school']+'</li>';
		content += '</ul></div>';
		content += '<div class="col-md-6" style="border-left:2px dotted #444; ">';
		content += '<ul>';
		content += '<li>Interests: '
		for(j = 0; j < data[i].preferences.interests.length; j++){
			content += '<span class="badge badge-pill badge-info">'
			content += data[i].preferences.interests[j][0]+'</span>';
		}
		content += '</li>';
		content += '<li>Languages: '
		for(j = 0; j < data[i].preferences.languages.length; j++){
			content += '<span class="badge badge-pill badge-primary">'
			content += data[i].preferences.languages[j][0]+'</span> ';
		}
		content += '</li>';
		content += '<li>Technologies: '
		for(j = 0; j < data[i].preferences.technologies.length; j++){
			content += '<span class="badge badge-pill badge-warning">'
			content += data[i].preferences.technologies[j][0]+'</span> ';
		}
		content += '</li>';

		content += '<li>Fields: '
		for(j = 0; j < data[i].preferences.fields.length; j++){
			content += '<span class="badge badge-pill badge-dark">'
			content += data[i].preferences.fields[j][0]+"</span>";
		}
		content += '</li>';
		
		content += '</ul>';
		content += '</div></div>';
		
	}
	hackerContainer.innerHTML += content;	
}