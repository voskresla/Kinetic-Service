

$(document).foundation();

window.onload = function () {
	
	// <SELECT> OBJECT LIB

	// #TODO: Не забыть удалить addoptions. В итоге такая реализация объекта не помогла. Addoptions переезжают в свой собственный объект поиск будет по ключу selectValue
	var topLevelObjects = {
		"bt": [
		{
			"selectValue": "BT_WM",
			"selectOption" : "Стиральная машина"
		},

		{
			"selectValue": "BT_DW",
			"selectOption" : "Посудомоечная машина"
		},
		{
			"selectValue": "BT_H",
			"selectOption" : "Холодильник"
		},
		{
			"selectValue": "BT_EO",
			"selectOption" : "Электрическая плита"
		},
		{
			"selectValue": "BT_EPP",
			"selectOption" : "Электрическая панель"
		},
		{
			"selectValue": "BT_D",
			"selectOption" : "Духовой шкаф (независимый)"
		},
		{
			"selectValue": "BT_D_EP",
			"selectOption" : "Зависимые электрическая панель и духовой шкаф"
		},
		{
			"selectValue": "BT_AIR",
			"selectOption" : "Вытяжка"
		},
		{
			"selectValue": "BT_WATER",
			"selectOption" : "Водонагреватель"
		}
		
		],

		"cond": [
		{
			"selectValue": "condSetup",
			"selectOption" : "Установка",
		},
		{
			"selectValue": "condRemove",
			"selectOption" : "Демонтаж",
		},
		{
			"selectValue": "condServ",
			"selectOption" : "Обслуживание",
		}
		],

		"tv": [
		{
			"selectValue": "tvTableSetup",
			"selectOption" : "Установка ТВ на тумбу",
		},
		{
			"selectValue": "tvWallSetup",
			"selectOption" : "Установка ТВ на подвес", // #TODO: Установка на подвес - вопрос к яне в TRELLO
		},
		{
			"selectValue": "thTableSetup",
			"selectOption" : "Установка домашнего кинотеатра",
		},
		{
			"selectValue": "thWallSetup",
			"selectOption" : "Подвес домашнего кинотеатра",
		},
		{
			"selectValue": "tvSmart",
			"selectOption" : "Доработка SMART+",
		}
		],
		"sateliteTv": [
		{
			"selectValue": "sateliteTvTest",
			"selectOption" : "Тестирование спутникового сигнала",
		},
		{
			"selectValue": "sateliteTvSetup",
			"selectOption" : "Подключение спутниковой тарелки", 
		}
		],
		"DT": [
		{
			"selectValue": "DT_ROUTER",
			"selectOption" : "Подключение роутера",
		},
		{
			"selectValue": "DT_HARDWARE",
			"selectOption" : "Подключение переферийного устройства", 
		},
		{
			"selectValue": "DT_SETUP",
			"selectOption" : "Найстройка и оптимизация", 
		},
		{
			"selectValue": "DT_OS",
			"selectOption" : "Установка операционной системы", 
		}
		]

	};

	// Параметры дейсвтия 
	//	[] - пустое без значений оставляет SELECT во всю форму

	var btObjects = {
		// Стиралка
		"BT_WM": ["Встроенная","Соло"],
		
		//Холодильник
		"BT_H": ["Встроенный","Соло","Side-By-Side"],
		
		// Плита
		"BT_P": ["Встроенная","Соло"],

		// Посудомойка
		"BT_DW":["Встроенная","Соло"],

		'BT_EO': [],
		'BT_EPP': [],
		'BT_D': [],
		'BT_D_EP': [],
		"BT_AIR": ["Купольная","Плоская","Встраиваемая"],
		"BT_WATER": ["Проточный","Накопительный до 50 л.","Накопительный от 51 л."],
		
		// Кондиционер
		"condSetup": ["7000","9000","12000"],
		"condRemove": ["7000","9000","12000"],
		"condServ": [],

		// ТВ _ домашний кинотеатр
		"tvTableSetup": ['Диагональ до 32"', 'Диагональ до 46"', 'Диагональ свыше 46"'],
		"tvWallSetup": ['Диагональ до 32"', 'Диагональ до 46"', 'Диагональ свыше 46"'],
		"thTableSetup": [],
		"thWallSetup": [],
		"tvSmart": [],

		// Спутников
		"sateliteTvTest": [],
		"sateliteTvSetup": ["Диаметр до 0.79","Диаметр свыше 0.8"],

		// Цифровая техника

		"DT_ROUTER" : [],
		"DT_HARDWARE" : [],
		"DT_SETUP" : [],
		"DT_OS" : []


	}

	var firstOptionInSelectObjects = {
		"bt" : ["А именно"],
		"cond" : ["Установка / Демонтаж / Обслуживание "],
		"tv" : ["Установка / Подвес / Домашний кинотеатр / SMART+ "],
		"sateliteTv" : ["Тестирование сигнала / Подключение"],
		"BT_AIR": ["Купольная / Плоская / Встраиваемая "],
		"DT" : [" Роутер / Переферия / Оптимизация /  Операционная система "]

	}

	var productObject = {

		"btBT_WMВстроенная" : 
		{
			"standartText" : "Установка производиится только на подготовленные коммуникаци",
			"vipText": "Необходимые доработки уже включены в стоимость пакета",
			"standartOptions": ["Доработка электросети | 700","Доработка водоснабжения | 800","Доработка слива | 900"],
			"vipOptions": ["Доработка электросети | включено","Доработка водоснабжения | включено","Доработка слива | включено"],
			"standartWorks": "Link to works list",
			"vipWorks": "Link to works list",

		},

		"btBT_WMСоло" : 
		{
			"standartText" : "",
			"vipText": "",
			"standartOptions": ["option1 | priceOption1","option2 | priceOption2","option3 | priceOption3"],
			"vipOptions": ["option1 | priceOption1","option2 | priceOption2","option3 | priceOption3"],
			"standartWorks": "",
			"vipWorks": "",

		}

	}

	var pricesObject = {
		"btBT_WMВстроенная" : ["1000","1500"],
		"btBT_WMСоло" : ["500"]
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
		// Удаление полей слоя при перевыборе

		if (document.querySelector(".js-secondBtDiv")) {
			document.querySelector(".js-secondBtDiv").remove();
		}

		if (document.querySelector(".js-firstBtDiv")) {
			document.querySelector(".js-firstBtDiv").remove();
		}

		// Заполняем вторую строку формы

		var lineTwoDiv = document.querySelector(".lineTwo");

			// #TODO: По-хорошему тут надо все переписать на функции, иначе проверки на отсутствие объекта номенклатуры нет.

			var bt = topLevelObjects[selectOneChecked];
			
			if (bt) {
				// Первый левый DIV в который обернем первый SELECT
				var firstBtDiv = document.createElement("div");
				
				firstBtDiv.className = "small-8 column js-firstBtDiv js-cruwl";
				lineTwoDiv.appendChild(firstBtDiv);

				// Первый SELECT
				var firstBtDiv_select = document.createElement("select");
				
				firstBtDiv_select.className = "my-select-two";
				firstBtDiv_select.setAttribute("required", true);

				// Подсказка первого OPTION в SELECT
				var option = document.createElement("option");
				option.value="";
				option.text = firstOptionInSelectObjects[selectOneChecked][0];
				option.setAttribute("disabled", true);
				option.setAttribute("selected", true);
				option.setAttribute("hidden",true);

				firstBtDiv_select.appendChild(option);
				
				// #TODO: А вот как то можно передать не только функцию но и объекты, но функцию не выполнять (bt например).
				firstBtDiv_select.onchange = selectTwoOnChange;
				firstBtDiv.appendChild(firstBtDiv_select);
				
				// Добавляем OPTION первого SELECT
				for (var i = 0; i < bt.length; i++) {

					var option = document.createElement("option");					
					
					if (i===12) {

						

					}
					else {

						option.value = bt[i]["selectValue"];
						option.text =  bt[i]["selectOption"];
						console.log("Option: " + bt[i]["selectOption"]);

						firstBtDiv_select.appendChild(option);
					};

				};
			};

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
			secondBtDiv_select.setAttribute("required","true");
			firstBtDiv.className = "small-4 column js-firstBtDiv js-cruwl";
			secondBtDiv.className = "small-4 column js-secondBtDiv js-cruwl";
			lineTwoDiv.appendChild(secondBtDiv);
			secondBtDiv.appendChild(secondBtDiv_select);

			// Подсказка OPTION в SELECT

			if (firstOptionInSelectObjects[selectTwoChecked]) {

				

				var option = document.createElement("option");
				option.value="";
				option.text = firstOptionInSelectObjects[selectTwoChecked][0];
				option.setAttribute("disabled", true);
				option.setAttribute("selected", true);
				option.setAttribute("hidden",true);

				secondBtDiv_select.appendChild(option);
			};


			for (var i = 0; i < btAddOptions.length; i++) {

				var option = document.createElement("option");					
				option.value = btAddOptions[i];
				option.text = btAddOptions[i];;
				console.log("Option: " + btAddOptions[i]);

				secondBtDiv_select.appendChild(option);
			}
		}

		else {
			document.querySelector(".js-firstBtDiv").className = "small-8 column js-firstBtDiv js-cruwl";
		}

	};

	// FORM BACK BUTTON

	document.querySelector(".my-back-button").onclick = function () {
		document.querySelector("#standartLi").innerHTML="";
		document.querySelector("#vipLi").innerHTML="";
		document.querySelector("#standartText").innerHTML="";
		document.querySelector("#vipLi").innerHTML="";
		document.querySelector("#standartPrice").innerHTML="";
		document.querySelector("#vipPrice").innerHTML="";
	}

	// FORM NEXT BUTTON

	document.querySelector("#my-next-button").onclick = function () {

		

		// Соибраем все JS-CRUWL
		var textToSend = (function () {
			
			var allJsCruwl = document.querySelectorAll(".js-cruwl option:checked");
			var text = "";

			for (var i = 0; i < allJsCruwl.length; i++) {
				text += allJsCruwl[i].value;
			}

			return text;

		})();

		console.log(textToSend);

		var normalPrice = pricesObject[textToSend][0] || 0;
		var vipPrice = pricesObject[textToSend][1] || 0;
		var standartText = productObject[textToSend]["standartText"] || 0;
		var standartOptions = productObject[textToSend]["standartOptions"] || 0;
		var standartWorks = productObject[textToSend]["standartWorks"] || 0;

		document.querySelector("#normalPrice").innerHTML = normalPrice;
		document.querySelector("#standartText").innerHTML = standartText;
		document.querySelector("#standartWorks").innerHTML = standartWorks;

		// Генерим LI от StandartOptions

		console.log(standartOptions[0].split("|")[0]);

		if (standartOptions) {

			for (var i = 0; i < standartOptions.length; i++) {
				var standartLi = document.createElement("li");
				var optionList = standartOptions[i].split("|");
				standartLi.innerHTML = 
				"<input id='standartCheckbox" + i + "' type='checkbox'>" + 
				"<label for='standartCheckbox" + i + "'>" + optionList[0] + 
				"<span>"+ optionList[1] + "</span></label>";
				document.querySelector("#standartLi").appendChild(standartLi);
			}

		}

		if (vipPrice) {
			document.querySelector("#vipDiv").className = "small-6 column my-price";
			document.querySelector("#vipPrice").innerHTML = vipPrice;
			
			var vipText = productObject[textToSend]["vipText"] || 0;
			var vipOptions = productObject[textToSend]["vipOptions"] || 0;
			var vipWorks = productObject[textToSend]["vipWorks"] || 0;


			document.querySelector("#vipText").innerHTML = vipText;
			document.querySelector("#vipWorks").innerHTML = vipWorks;

			if (vipOptions) {

// Доработать onclick у чекбокса. Toggle класса JS-CRUWL

			for (var i = 0; i < vipOptions.length; i++) {
				var vipLi = document.createElement("li");
				var optionList = vipOptions[i].split("|");
				vipLi.innerHTML = 
				"<input id='vipCheckbox" + i + "' type='checkbox'>" + 
				"<label for='vipCheckbox" + i + "'>" + optionList[0] + 
				"<span>"+ optionList[1] + "</span></label>";
				document.querySelector("#vipLi").appendChild(vipLi);
			}

		}


		}
		else {
			document.querySelector("#vipDiv").className = "small-6 column my-price my-hide";
		}



	}

	// FORM SUBMIT FUNCTION

	document.querySelector(".my-send-button-class").onclick = function () {

		// #TODO: Хватит писать как мудак. Напиши обход всех  OPTION:CHECKED разом а не руками их собирай.
		
		var textToSend = (function () {
			
			var allJsCruwl = document.querySelectorAll(".js-cruwl option:checked");
			var text = "";

			for (var i = 0; i < allJsCruwl.length; i++) {
				text += allJsCruwl[i].value;
			}

			return text;

		})();

		console.log(textToSend);
	}

	
	

}
