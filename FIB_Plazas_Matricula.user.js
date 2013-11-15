// ==UserScript==
// @name        FIB Plazas Matricula
// @namespace   http://github.com/ferranpm
// @description Mostrar solo las asignaturas que interesen
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresFS.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresGRAU.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresPLA.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresETIG.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresETIS.html
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
	if (!getCookie('asigs')) setCookie('asigs', '~');
	var asignaturas = new Array();
	$("#table tr").each(function(){
		var asignatura = $(this);
		var nombre = asignatura.find('th').text();
		var close = $('<button>');
		close.text('X');
		close.click(function() {
			asignatura.hide();
			setCookie('asigs', getCookie('asigs').replace(nombre + '~', ''));
		});
		asignatura.append(close);
		asignaturas.push(nombre);
		if (getCookie('asigs').indexOf('~' + nombre + '~') < 0) asignatura.hide();
	});
	var table = $('#table').before(make_form(asignaturas));
});

function make_form(asignaturas) {
	var div = $('<div>');

	var select = $('<select>');
	jQuery.each(asignaturas, function(i, el) {
		var option = $('<option>');
		option.text(el);
		select.append(option);
	});
	div.append(select);

	var button = $('<button>');
	button.text('Add');
	button.click(function() {
		var nombre = select.find(':selected').text();
		$("#table tr").each(function(){
			if ($(this).find('th').text() == nombre && $(this).is(':hidden')) {
				$(this).show();
				setCookie("asigs", getCookie("asigs") + nombre + '~');
			}
		});
	});
	div.append(button);

	return div;
}

function setCookie(c_name, value) {
	var d = new Date();
	document.cookie = c_name + '=' + value + '; expires=' + (d.getTime() + (10 * 365 * 24 * 60 * 60)) + '; path=/';
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");

	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}
