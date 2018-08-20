$(document).ready(function(){
	var hackathons = [];
	var hackers = [];

	//Sort results by hackathons and hackers
	for(i = 0; i < results.length; i++){
		if(results[i].firstname != undefined || results[i].firstname != null){
			hackers.push(results[i]);
		}else{
			hackathons.push(results[i]);
		}
	}
	console.log(hackathons);
	console.log(hackers);
	new Vue({
		el: '#search-results',
		data: {
			hackers: hackers,
			hackathons: hackathons
		}
	});


	/*$.ajax({
		url:'/currentuser',
		type: 'GET',
		data:{
			'success':'success!'
		},
	    success : function(data) {              
	        console.log(data);
	        var json = JSON.parse(data);
	    },
	    error : function(request,error)
	    {
	    	console.log("Error:", error)
	        console.log("Request: "+JSON.stringify(request));
	    }
	});
	*/
    /*
	$.ajax({
		url:'/searchresult?key=all',
		type: 'GET',
		data:{
			'success':'success!'
		},
	    success : function(data) {              
	        console.log(data);
	        var json = JSON.parse(data);
	    },
	    error : function(request,error)
	    {
	    	console.log("Error:", error)
	        console.log("Request: "+JSON.stringify(request));
	    }
	});
*/
/*
	var url = window.location.href;
	results.forEach(function(result){
		var person = fillPerson(result);
		console.log(person);
		$('.searchcontent').append(person);
		$('.searchcontent').find(".preferenceDetails").each(function(element){
			element.style["padding-left"] = "2em";
		});
	});
	*/
	//console.log(results);

});


function handleErrors(response) {
    if (response.status != 200) {
        console.log("Error! Status:", response.status);
        console.log("Msg:", response.status);
    }
    return response;
}


function fillPerson(person){
	console.log(person);
	var content = '<div class="row profile-container">';
	content += '<div class="pfpcontainer pull-left">';
	content += '<img src="'+'https://upload.wikimedia.org/wikipedia/en/2/2f/Profile_image_Nadia_Lim_chef_2014.jpg'+'" />';
	content += '<div class="social-icons center">';
	
	content += '</div></div>';
	content += '<div class="profile-details">';
	content += '<h3 class="normal"><a href="/user/'+person.email+'" class="bold">'+person.name+'</a>';
	content += ' | <span class="bold">'+person.hackathons.length+'</span> hackathons | '+person.school+', '+person.major+'</h3>';
	
  	var data = person.preferences
  	for(var pref in data){
  		if(data.hasOwnProperty(pref)){
			content += '<div class="row" style="padding-left:2em;">';
			content += '<h6 class="bold">'+pref+'</h6>';
			for(i = 0 ; i < data[pref].length; i++){
				content += '<a href="#" class="badge badge-info">'+data[pref][i][0]+'</a>';
			}
			content += '</div>';
  		}
  	}
	content += '</div></div>';
	return content;
}
