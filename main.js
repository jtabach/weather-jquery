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
	zip = data.location.zip;
	$('#zip').val(zip);
	getForecast();
}

$('button').click(getForecast);

function getForecast() {
	zip = $('#zip').val();
	$('.days10').remove();
	// 10 Day Forecast (does not include current temp)
	$.ajax({
		url: "http://api.wunderground.com/api/e58567a633f4600c/forecast10day/q/" + zip + ".json",
		contenttype: "json",
		type: "GET",
		success: function(data) {
			forecast(data);
		},
	});
	// Current Forecast
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
	$('.date').text(moment(current.local_time_rfc822).format('MMMM Do, YYYY, h:mm a'));
	$('.iconT').attr('src', current.icon_url);
	$('.condition').text(current.temp_f + "F,  " + current.weather);
	$('.humidity').text(current.relative_humidity);
}

function forecast(data) {
	locObj = data.forecast.simpleforecast.forecastday;
	locObj.forEach(function(day, i) {
		var $tr = $('#template10').clone();
		$tr.removeAttr('id').addClass('days10');
		var dated = day.date;
		var dateConcat = dated.weekday_short + ", " + dated.monthname_short + " " + dated.day
		$tr.find('.date10').text(dateConcat);
		$tr.find('.icon10').attr('src', day.icon_url);
		$tr.find('.condition10').text(day.conditions);
		$tr.find('.min10').text(day.low.fahrenheit);
		$tr.find('.max10').text(day.high.fahrenheit);
		$('#addDay').append($tr);
	});
}

});