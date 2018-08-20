jQuery(document).ready(function(){
	
	$(document).on('click', '.add', function () {
	 if($(this).next().val() < 10){
		 $(this).next().val(+$(this).next().val() + 1);
	 }
	});
	$(document).on('click', '.sub', function () {
	  if ($(this).prev().val() > 0) $(this).prev().val(+$(this).prev().val() - 1);
	});
	
	var UserLan = User.preferences.languages;
	var UserFamiliar = User.preferences.technologies;
	var UserInterest = User.preferences.interests;
	var UserFields = User.preferences.fields;
	fillLanVue(UserLan);
	fillTechVue(UserFamiliar);
	fillFieldsVue(UserFields);
	fillInterestsVue(UserInterest);
	/*
	createModals([['interests',['AWS', 'S3', 'Nodejs']]]);
	//TODO: debug this function for duplicae preferences. This function runs twice for some reason
	fillPreferences([['interests',['Node', 'ML', 'AI']]]);
	var modalButton = $('.modal-add');
	modalButton.on('click', function(){
		var interest = $(this).parent().find('span').text();
		var pref = createPrefElement(interest);
		var containerName = $(this).closest(".modal");
		var container = document.querySelector('.'+containerName.attr('id').substr(5));
		container.innerHTML += pref;
	});
	*/
/*
	$('.submit').on('click', function(){
		/*var interests = [];
		$('.interests :input').each(function(){
			var arr = [];
			arr.push($(this).attr('name'));
			arr.push($(this).val());
			interests.push(arr);
		});
		
		var languages = [];
		$('.languages :input').each(function(){
			var arr = [];
			arr.push($(this).attr('name'));
			arr.push($(this).val());
			languages.push(arr);
		});
		
		var technologies = [];
		$('.technologies :input').each(function(){
			var arr = [];
			arr.push($(this).attr('name'));
			arr.push($(this).val());
			technologies.push(arr);
		});
		
		var fields = [];
		$('.fields :input').each(function(){
			var arr = [];
			arr.push($(this).attr('name'));
			arr.push($(this).val());
			fields.push(arr);
		});
		
		var interestScore = $('input[name=similiarinterersts]:checked').val(); 
		var languagesScore = $('input[name=similiarlanguages]:checked').val(); 
		var techScore = $('input[name=similiartechnologies]:checked').val(); 
		var fieldsScore = $('input[name=similiarfields]:checked').val(); 
		
		console.log(interestScore);

		//TODO: more secure if condition	
		//if(interestScore != undefined && languagesScore != undefined && techScore != undefined && fieldsScore != undefined){
			
			$.ajax({
				url: "/preferences",
				type: "POST",
				dataType: "json",
				data: {
					CSRF: csrf_token,
					interests: interests,
					interestScore: interestScore,
					languages: languages,
					languageScore: languagesScore,
					technologies : technologies,
					techScore: techScore,
					fields: fields,
					fieldsScore : fieldsScore
				},
				cache: false,
				timeout: 5000,
				complete: function () {
					console.log('process complete');
				},
				success: function (data) {
					console.log(data);
					console.log('process sucess');
				},
				error: function () {
					console.log('process error');
				},
			});
			
			
		//}
	});*/
});

function fillLanVue(data){
	new Promise((resolve,reject) => {
		$.getJSON("/assets/languages.json", function (data) {
			resolve(data);
		})
	}).then((fieldsConstants) => {
		new Vue({
			el: '#languages-app',
			data: {
				languages: data,
				constants: fieldsConstants,
				input: data
			},
			computed: {
				totalLans() {
					return this.languages.reduce((sum) => {
						return sum + 1;
					}, 0);
				}
			},
			methods: {
				deleteObject: function(index) {
					this.$delete(this.languages, index);
				},
				appendObject: function(child, id, index) {
					var arr = [child, id];
					this.languages.push(arr);
					this.constants.splice(index,1);
					this.languages.push(arr);
				}
			}
		});
	});
}


function fillTechVue(data){
	new Promise((resolve,reject) => {
		$.getJSON("/assets/technologies.json", function (data) {
			resolve(data);
		})
	}).then((fieldsConstants) => {
		new Vue({
			el: '#tech-app',
			data: {
				fields: data,
				constants: fieldsConstants,
				input: data
			},
			computed: {
				totalFields() {
					return this.fields.reduce((sum) => {
						return sum + 1;
					}, 0);
				}
			},
			methods: {
				deleteObject: function(index) {
					this.$delete(this.fields, index);
				},
				appendObject: function(child, id, index) {
					var arr = [child, id];
					this.fields.push(arr);
					this.constants.splice(index,1);
					this.input.push(arr);
					
				}
			}
		});
	});
}


function fillFieldsVue(data){
	new Promise((resolve,reject) => {
		$.getJSON("/assets/fields.json", function (data) {
			resolve(data);
		})
	}).then((fieldsConstants) => {
		new Vue({
			el: '#app-fields',
			data: {
				fields: data,
				constants: fieldsConstants,
				input: data
			},
			computed: {
				totalFields() {
					return this.fields.reduce((sum) => {
						return sum + 1;
					}, 0);
				}
			},
			methods: {
				deleteObject: function(index) {
					this.$delete(this.fields, index);
				},
				appendObject: function(child, id, index) {
					
					var arr = [child, id];
					this.fields.push(arr);
					this.constants.splice(index,1);
					this.input.push(arr);
					
				}
			}
		});
	});
}


function fillInterestsVue(data){
	new Promise((resolve,reject) => {
		$.getJSON("/assets/interests.json", function (data) {
			resolve(data);
		})
	}).then((fieldsConstants) => {
		new Vue({
			el: '#app-interest',
			data: {
				fields: data,
				constants: fieldsConstants,
				input: data
			},
			computed: {
				totalFields() {
					return this.fields.reduce((sum) => {
						return sum + 1;
					}, 0);
				}
			},
			methods: {
				deleteObject: function(index) {
					this.$delete(this.fields, index);
				},
				appendObject: function(child, id, index) {
					var arr = [child, id];
					this.fields.push(arr);
					this.constants.splice(index,1);
					this.input.push(arr);
					
				}
			}
		});
	});
}

/*
function createPrefElement(preference){
	var pref = '';
	pref += '<div class="row">';
	pref += '<div class="col-md-8" style="margin-left: 10"><span>'+preference+'</span></div>';
	pref += '<div class="plusminus">';
	pref += '<i class="sub fa fa-minus"></i>';
	pref += '<input disabled type="number" value="0" class="field" name="'+preference+'" />';
	pref += '<i class="add fa fa-plus"></i>';
	pref += '</div>';
	pref += '</div>';
	console.log(preference);
	return pref;
}

function fillPreferences(data){
	console.log(data);
	for(i = 0; i < data.length; i++){
		var container = document.querySelector("."+data[i][0]);
		console.log(i);
		console.log(container);
		var content = '';
		for(j = 0; j < data[i][1].length; j++){
			var pref = createPrefElement(data[i][1][j]);
			content += pref;
		}
		container.innerHTML += content;
	}
	console.log(container);
}

function createModals(data){
	for(i = 0; i < data.length; i++){
		var container = document.querySelector('#modal'+data[i][0]);
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
*/