

$(document).foundation();

window.onload = function () {
	
	// <SELECT> OBJECT LIB

	// #TODO: Не забыть удалить addoptions. В итоге такая реализация объекта не помогла. Addoptions переезжают в свой собственный объект поиск будет по ключу selectValue
	var topLevelObjects = {
		"bt": [
		{
			"selectValue": "BT_WM",
			"selectOption" : "Стиральная машина",
			"addOptions" : 
			[
			"Встроенная",
			"Соло"
			]
		},
		{
			"selectValue": "BT_H",
			"selectOption" : "Холодильник",
			"addOptions" : 
			[
			"Встроенный",
			"Соло"
			]
		},
		{
			"selectValue": "BT_P",
			"selectOption" : "Плита",
			"addOptions" : 
			[
			"Встроенный",
			"Соло"
			]
		}
		],

		"cond": [
		{
			"selectValue": "SETUP",
			"selectOption" : "Установка",
		},
		{
			"selectValue": "REMOVE",
			"selectOption" : "Демонтаж",
		},
		{
			"selectValue": "SERV",
			"selectOption" : "Обслуживание",
		}
		]		
	};

	var btObjects = {
		"BT_WM": ["Встроенная","Соло"],
		"BT_H": ["Встроенный","Соло"],
		"BT_P": ["Встроенная","Соло"],
		"SETUP": ["7000","9000","12000"],
		"REMOVE": ["7000","9000","12000"],
		"SERV": []
	}

	var condObjects = {
		
	}

	console.log(topLevelObjects);

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
		
		var selectOneChecked = document.querySelector(".my-select-one option:checked").value;
		//console.log(selectOneChecked.value + ": " + selectOneChecked.text);

		// #TODO: Переделать в одну функцию удаления слоя если он есть
		
		if (document.querySelector(".js-secondBtDiv")) {
			document.querySelector(".js-secondBtDiv").remove();
		}

		if (document.querySelector(".js-firstBtDiv")) {
			document.querySelector(".js-firstBtDiv").remove();
		}



		var lineTwoDiv = document.querySelector(".lineTwo");

			// #TODO: По-хорошему тут надо все переписать на функции, иначе проверки на отсутствие объекта номенклатуры нет.

			var bt = topLevelObjects[selectOneChecked];
			
			if (bt) {
				// Первый левый DIV в который обернем первый SELECT
				var firstBtDiv = document.createElement("div");
				firstBtDiv.className = "small-8 column js-firstBtDiv";
				lineTwoDiv.appendChild(firstBtDiv);

				// Первый SELECT
				var firstBtDiv_select = document.createElement("select");
				firstBtDiv_select.className = "my-select-two";
				// #TODO: А вот как то можно передать не только функцию но и объекты, но функцию не выполнять (bt например).
				firstBtDiv_select.onchange = selectTwoOnChange;
				firstBtDiv.appendChild(firstBtDiv_select);
				
				// Добавляем OPTION первого SELECT
				for (var i = 0; i < bt.length; i++) {

					var option = document.createElement("option");					
					option.value = bt[i]["selectValue"];
					option.text = bt[i]["selectOption"];
					console.log("Option: " + bt[i]["selectOption"]);

					firstBtDiv_select.appendChild(option);

				};
			};

		// 	// HIDE
		// 	document.querySelector(".lineTwoC").style.display = "none";

		// 	// SHOW
		// 	document.querySelector(".lineTwoBT").style.display = "flex";






	};

	// my-select-two onChange Function

	function selectTwoOnChange () {

		// #TODO: Передавая сюда this как нам проверить checked в select? Псевдокласса нет же?
		//console.log(this);
		
		if (document.querySelector(".js-secondBtDiv")) {
			document.querySelector(".js-secondBtDiv").remove();
		}


		var selectTwoChecked = document.querySelector(".my-select-two option:checked").value;

		console.log(selectTwoChecked);

		var btAddOptions = btObjects[selectTwoChecked];

		if (btAddOptions.length>0) {

			var lineTwoDiv = document.querySelector(".lineTwo");
			var firstBtDiv = document.querySelector(".js-firstBtDiv");
			var secondBtDiv = document.createElement("div");	
			var secondBtDiv_select = document.createElement("select");

			secondBtDiv_select.className = "my-select-three";
			firstBtDiv.className = "small-4 column js-firstBtDiv";
			secondBtDiv.className = "small-4 column js-secondBtDiv";
			lineTwoDiv.appendChild(secondBtDiv);
			secondBtDiv.appendChild(secondBtDiv_select);


			for (var i = 0; i < btAddOptions.length; i++) {

				var option = document.createElement("option");					
				option.value = btAddOptions[i];
				option.text = btAddOptions[i];;
				console.log("Option: " + btAddOptions[i]);

				secondBtDiv_select.appendChild(option);
			}
		}

		else {
			document.querySelector(".js-firstBtDiv").className = "small-8 column js-firstBtDiv";
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
