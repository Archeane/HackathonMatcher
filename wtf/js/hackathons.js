

$(document).ready(function(){
	var hackathonlistContainer = document.querySelector(".hackathons-list");
	//console.log(hackathonlistContainer);
	var hackathonslist = list;
	//console.log(hackathonslist);
	for(i = 0; i < hackathonslist.length; i++){
		var content = '<div class="event event-'+hackathonslist[i].index+' col-lg-3 col-md-4 col-sm-6" itemscope itemtype="http://schema.org/Event">';
		content += '<div class="event-wrapper">';
		content += '<a target="_black" class="event-link" itemprop="url" title="'+hackathonslist[i].name+'" href="/hackathons/'+hackathonslist[i].urlId+'">';
		content += '<div class="inner">';
		content += '<div class="image-wrap">';
		content += '<img src="'+hackathonslist[i].imageurl+'" alt="background" />';
		content += '</div>';
		content += '<h3 itemprop="name">'+hackathonslist[i].name+'</h3>';
		//content += '<p itemprop="location" itemscope itemtype="http://schema.org/PostalAddress">'+hackathonslist[i].address+'</p>';
		content += '</div></a></div></div>';
		//console.log(content);
		hackathonlistContainer.innerHTML += content;
	}

	
});