// A javascript to allow loading html via Perl/TT or js (ajax) so initial load 
// (from from Perl/Catalyst) and subsequent ajax loads can be done from the same 
// source. means that URLs can be used to load html via ajax which moves the php 
// out of the views.

function loadform ( url, windowdiv ) {
	var loadform_options = { 
		type: 'GET',
		url:  url,
		accepts: { html:'text/html'},
		dataType: 'html',
		beforeSubmit: function() {
			$('#results').html("Working...");
		},
		success: function(response) {
			windowdiv.html(response);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert("status " + xhr.status + thrownError);
		}
	};
	$.ajax( loadform_options );
};

