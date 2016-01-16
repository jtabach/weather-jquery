$(document).ready(function() {

var zip;
var locObj;

$.ajax({
	url: "http://api.wunderground.com/api/e58567a633f4600c/geolookup/q/autoip.json",
	contenttype: "json",
	type: "GET",
	success: function(data) {
		getWeather(data);
	},
});

function getWeather(data) {
	console.log(data.location.zip);
	zip = data.location.zip;
	$('#zip').val(zip);
	getForecast();
}

$('button').click(getForecast);

function getForecast() {
	zip = $('#zip').val();

	// 10 Day Forecast (does not include current temp)
	$.ajax({
		url: "http://api.wunderground.com/api/e58567a633f4600c/forecast10day/q/" + zip + ".json",
		contenttype: "json",
		type: "GET",
		success: function(data) {
			forecast(data);
		},
	});
	$.ajax({
		url: "http://api.wunderground.com/api/e58567a633f4600c/conditions/q/" + zip + ".json",
		contenttype: "json",
		type: "GET",
		success: function(data) {
			today(data);
		},
	});
}



function today(data) {
	var current = data.current_observation;
	$('.cityState').text(current.display_location.full + ", " + current.display_location.zip);
	$('.date').text(moment(current.local_time_rfc822).format('MMMM Do YYYY, h:mm a'));
	$('.iconT').attr('src', current.icon_url);
	$('.condition').text(current.temp_f + "F,  " + current.weather);
	$('.humidity').text(current.relative_humidity)
}





function forecast(data) {
	locObj = data.forecast.simpleforecast.forecastday;
	console.log(locObj);
	var $tenDay = $('#template').clone().attr('id', "");
	// $currentTemp = $('<h1>').text(locObj.)
}



});

