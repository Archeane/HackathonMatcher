$(document).ready(function(){



	var allMajors = [];
	var allGradYears = [];
	var allEduLevels = [];
	var allNumOfHacks = [];

	for(i = 0; i < allMatches.length; i++){
		var user = JSON.parse(allMatches[i]);
		if(!(allMajors.includes(user.major))){
			allMajors.push(user.major);
		}
		if(!(allGradYears.includes(user.graduationYear))){
			allGradYears.push(user.graduationYear);
		}
		if(!(allEduLevels.includes(user.educationLevel))){
			allEduLevels.push(user.educationLevel);
		}
		if(!(allNumOfHacks.includes(user.hackathons.length))){
			allNumOfHacks.push(user.hackathons.length);
		}
	}

	var gradFilter = document.querySelector(".gradYear");
	for(g = 0; g < allGradYears.length; g++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allGradYears[g];
		checkBox.value = allGradYears[g];
		checkBox.id = allGradYears[g];

		var label = document.createElement('label');
		label.htmlFor = allGradYears[g];
		label.appendChild(document.createTextNode(allGradYears[g]));
		gradFilter.appendChild(checkBox);
		gradFilter.appendChild(label);
	}
	var eduFilter = document.querySelector(".eduLevel");
	for(m = 0; m < allEduLevels.length; m++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allEduLevels[m];
		checkBox.value = allEduLevels[m];
		checkBox.id = allEduLevels[m];

		var label = document.createElement('label');
		label.htmlFor = allEduLevels[m];
		label.appendChild(document.createTextNode(allEduLevels[m]));
		eduFilter.appendChild(checkBox);
		eduFilter.appendChild(label);
	}
	var hacksFilter = document.querySelector(".numOfHacks");
	for(m = 0; m < allNumOfHacks.length; m++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allNumOfHacks[m];
		checkBox.value = allNumOfHacks[m];
		checkBox.id = allNumOfHacks[m];

		var label = document.createElement('label');
		label.htmlFor = allNumOfHacks[m];
		label.appendChild(document.createTextNode(allNumOfHacks[m]));
		hacksFilter.appendChild(checkBox);
		hacksFilter.appendChild(label);
	}
	var majorsFilter = document.querySelector(".major");
	for(m = 0; m < allMajors.length; m++){
		var checkBox = document.createElement('input');
		checkBox.type="checkbox";
		checkBox.name=allMajors[m];
		checkBox.value = allMajors[m];
		checkBox.id = allMajors[m];

		var label = document.createElement('label');
		label.htmlFor = allMajors[m];
		label.appendChild(document.createTextNode(allMajors[m]));
		majorsFilter.appendChild(checkBox);
		majorsFilter.appendChild(label);
	}
	

   
	var j = JSON.stringify({'content':'hello','csrfmiddlewaretoken': '{{ csrf_token }}'})
	var filters = [];
	$('#submitFilters').on('click', (event) => {
		//event.preventDefault();
		$('input[type=checkbox]').each(function(){
			if(this.checked == true){
				filters.push(this.value);
			}
		});

		//TODO: replace hardcoded url
		$.ajax(
		    {
		        type: 'POST',
		        url: 'http://localhost:8080/test',
		        data: "hellllooo",
		        success: function(data){
			       console.log(data);
			    },
	            error: function(jqXHR, textStatus, err) {
	                //show error message
	              	console.log('text status '+textStatus+', err '+err)
	            }
		    }
		);
	});
	
	/*
	$(':checkbox').on('change',function(){
		if($(this).prop('checked')){
			filters.push($(this).val());
			console.log(filters);
		}else{
			var index = filters.indexOf($(this).val());
			if (index !== -1) filters.splice(index, 1);
			console.log(filters);
		}
	});
	*/
});