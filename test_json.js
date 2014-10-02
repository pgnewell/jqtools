// not even sure what exactly this is for
// 
function test_json ( o ) {
	var test_json_options = { 
		type: 'POST',
		url:  '/index/test_json',
		data: { object: JSON.stringify(o) },
		beforeSubmit: function() {
			$('#results').html("Working...");
		},
		success: function(response) {
			$('body').html(response);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert("status " + xhr.status + thrownError);
    }
	};
	$.ajax( test_json_options );
};

