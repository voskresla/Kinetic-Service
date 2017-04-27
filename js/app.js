

$(document).foundation();

window.onload = function () {
	
	// DADATA.ru Suggestion

	$("#geoModalTopInput").suggestions({
		token: "daa7df9d3d75b308e28317375c6c0587d5c17c06",
		type: "ADDRESS",
		count: 5,
		bounds: "city",
		onSelect: function(suggestion) {
			console.log(suggestion);
			document.querySelector(".my-a-choose").innerHTML = suggestion.data.city;
			$(".reveal").foundation("close");
			document.querySelector("#geoDownInput").value = suggestion.data.city;
		}
		
	});

	// IP GEO API ipinfo.io

	$.get("https://ipinfo.io", function(response) {

	 	//var myGeo = JSON.stringify(response);


	 	document.querySelector(".my-a-choose").innerHTML += "ipinfo.io: " + (response.city) + "<br>";

	 }, "jsonp")

	// GEO TEST YA MAPS

	ymaps.ready(mapInit);
	
	function mapInit () {
		ymaps.geolocation

		.get({
			provider:'yandex',
			autoReverseGeocode: true
		})

		.then(function (result) {
			var tmp = result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.Address.Components.length;
			document.querySelector(".my-a-choose").innerHTML += "yandex (без https): " + result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.Address.Components[tmp-1].name + "<br>";
		});
	};

	// GEO TEST DADA

	$.ajaxSetup({
		url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/detectAddressByIp",
		headers: { "Accept" : "application/json", "Authorization" : "Token daa7df9d3d75b308e28317375c6c0587d5c17c06"}
	});

	$.ajax()
	.done(function(data){
		document.querySelector(".my-a-choose").innerHTML += "dada.ru: " + (data.location.data.city) + "<br>";
	});



	// MY FIRST FORM 
	
	document.querySelector(".my-select-one").onchange = function () {
		
		var selectOneChecked = document.querySelector(".my-select-one option:checked");
		console.log(selectOneChecked.value + ": " + selectOneChecked.text);

		if (selectOneChecked.value === "1") {

			// HIDE
			document.querySelector(".lineTwoC").style.display = "none";

			// SHOW
			document.querySelector(".lineTwoBT").style.display = "flex";
		}

		if (selectOneChecked.value === "2") {
			
			// HIDE
			document.querySelector(".lineTwoBT").style.display = "none";

			// SHOW
			document.querySelector(".lineTwoC").style.display = "flex";
		}
		
	};

	// FORM SUBMIT FUNCTION

	document.querySelector(".my-send-button-class").onclick = function () {

		// #TODO: Хватит писать как мудак. Напиши обход всех  OPTION:CHECKED разом а не руками их собирай.
		
		var textToSend= document.querySelector(".my-select-two option:checked").text 
			+ " " + document.querySelector(".my-select-two option:checked").text
			+ " " + document.querySelector(".my-select-three option:checked").text
			+ " " + document.querySelector("#geoDownInput").value
			+ " " + document.querySelector("#my-select-phone").value;
		console.log(textToSend);
	}

	
	

}
