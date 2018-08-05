jQuery(document).ready(function(){
     $(document).on('click', '.add', function () {
		 if($(this).prev().val() < 10){
			 $(this).prev().val(+$(this).prev().val() + 1);
		 }
	  });
	  $(document).on('click', '.sub', function () {
		  if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
	  });
	
	createModals([['interests',['AWS', 'S3', 'Nodejs']]]);
	fillPreferences([['interests',['Node', 'ML', 'AI']],['languages',['Java', 'Jquery']]])
	var modalButton = $('.modal-add');
	modalButton.on('click', function(){
		var interest = $(this).parent().find('span').text();
		console.log(interest);
		var pref = createPrefElement(interest);
		var containerName = $(this).closest(".modal");
		var container = document.querySelector('.'+containerName.attr('id').substr(5));
		container.innerHTML += pref;
	});
	
	$('.submit').on('click', function(){
		
		var interestScore = $('input[name=similiarinterersts]:checked').val(); 
		var languagesScroe = $('input[name=similiarlanguages]:checked').val(); 
		var techScore = $('input[name=similiartechnologies]:checked').val(); 
		var fieldsScore = $('input[name=similiarfields]:checked').val(); 
		
	})
});


function createPrefElement(preference){
	var pref = '';
	pref += '<div class="row">';
	pref += '<div class="col-md-8" style="margin-left: 10"><span>'+preference+'</span></div>';
	pref += '<div class="plusminus">';
	pref += '<i class="sub fa fa-minus"></i>';
	pref += '<input disabled type="number" value="0" class="field" />';
	pref += '<i class="add fa fa-plus"></i>';
	pref += '</div>';
	pref += '</div>';
	return pref;
}

function fillPreferences(data){
	for(i = 0; i < data.length; i++){
		var container = document.querySelector("."+data[i][0]);
		var content = '';
		for(j = 0; j < data[i][1].length; j++){
			var pref = createPrefElement(data[i][1][j]);
			content += pref;
		}
		container.innerHTML += content;
	}
}

function createModals(data){
	for(i = 0; i < data.length; i++){
		var container = document.querySelector('#modal'+data[i][0]);
		console.log(container);
		container = container.querySelector('.modal-body');
		var content = '';
		for(j = 0; j < data[i][1].length; j++){
			content += '<div class="row"><div class="col-md-10">';
			content += '<span class="interest" style="padding-left: 30px;">'+data[i][1][j]+'</span>';
			content += '</div><button class="modal-add pull-right" style="border:none;"><i class="fa fa-plus"></i>Add</button></div>';
			if(j != data[i][1].length-1){
				content += '</div><hr>'
			}
		}
		container.innerHTML += content;
	}
	return content;
					
}
