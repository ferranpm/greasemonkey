// ==UserScript==
// @name        FIB Plazas Matricula
// @namespace   http://github.com/ferranpm
// @description Mostrar solo las asignaturas que interesen
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresFS.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresGRAU.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresPLA.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresETIG.html
// @include     http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresETIS.html
// @require     http://code.jquery.com/jquery-2.0.3.min.js
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
    document.cookie = c_name + '=' + value + '; expires=' + 'Tue, 13 Nov 2023 12:34:56 GMT' + '; path=/';
}

function getCookie(c_name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].substr(0, cookies[i].indexOf('='));
        var val = cookies[i].substr(cookies[i].indexOf('=') + 1);
        name = name.replace(/^\s+|\s+$/g,"");
        if (name == c_name) return unescape(val);
    }
}
