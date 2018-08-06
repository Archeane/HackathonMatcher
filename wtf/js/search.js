$(document).ready(function(){
	$.ajax({
		url:'/currentuser',
		type: 'GET',
		data:{
			'success':'success!'
		},
	    success : function(data) {              
	        console.log('Data: '+data['data']);
	    },
	    error : function(request,error)
	    {
	    	console.log("Error:", error)
	        console.log("Request: "+JSON.stringify(request));
	    }
	});
	/*
	fetch('/currentuser').then(function(response) {
	  console.log(response.body);
	}).then(handleErrors(response));
	*/
});


function handleErrors(response) {
    if (response.status != 200) {
        console.log("Error! Status:", response.status);
        console.log("Msg:", response.status);
    }
    return response;
}