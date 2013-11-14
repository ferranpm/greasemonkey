// ==UserScript==
// @name           FIB Plazas Matricula
// @namespace      http://github.com/ferranpm
// @description    Muestra solo las plazas de las asignaturas que uno busque
// @include        http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresGRAU.html
// @include        http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresFS.html
// @require        http://code.jquery.com/jquery-2.0.3.min.js
// @version        1.0
// ==/UserScript==

function make_form() {
	var div = $('<div>');

	var array = $('<div>');

	var input = $('<input>');
	div.append(input);

	var button = $('<button>');
	button.text('Add');
	button.click(function() {
		$("#table tr").each(function(){
			if ($(this).find('th').text() == input.val()) {
				$(this).show();
			}
		});
	});
	div.append(button);

	return div;
}

$(document).ready(function(){
	var table = $('#table').before(make_form());
	$("#table tr").each(function(){
		$(this).hide();
	});
});
