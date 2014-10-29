// ripped off (more or less) from jquery web site.
// provides autocompletion to a text input
//   element - the text input element
//   resource - the url of the element to retrieve the list
function autocomp (element, resource) {
	element
		.bind( "keydown", function( event ) {
			if ( event.keyCode === $.ui.keyCode.TAB &&
					$( this ).data( "ui-autocomplete" ).menu.active ) {
				event.preventDefault();
			}
		})
		.autocomplete({
			source: function( request, response ) {
				$.getJSON( resource, {
					term: request.term.split(/,\s*/).pop()
				}, response );
			},
			search: function() {
				// custom minLength
				var term = this.value.split(/,\s*/).pop();
				if ( term.length < 2 ) {
					return false;
				}
			},
			focus: function() {
				// prevent value inserted on focus
				return false;
			},
			select: function( event, ui ) {
				var terms = this.value.split(/,\s*/);
				// get rid of the incomplete entry
				terms.pop();
				// replace with the one selected
				terms.push( ui.item.value );
				// add placeholder to get the comma-and-space at the end
				terms.push( "" );
				ingredient_data[ui.item.value] = ui.item;
				this.value = terms.join( ", " );
				return false;
			}
		})
		.focusout( function() {
			var ingredients = this.value.split(/,\s*/);
			var elem = $(this).closest('.step').find('.ingredient-list');
			// yuck ! this could be better
			var step_no = elem.closest('.step').attr('id').match( /-(\d+)$/ ).pop();
			create_ingredient = create_ingredient_block.curry(elem, step_no);
			ingredients.filter(function (a){return a;}).forEach(create_ingredient);
		});
};
