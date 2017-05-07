$(document).foundation();

Foundation.Abide.defaults.patterns[
	"fr_tel"
] = /[+]7\s[(]\d\d\d[)]\s\d\d\d\s\d\d\s\d\d/;

window.onload = function() {
	// <SELECT> OBJECT LIB

	// #TODO: Не забыть удалить addoptions. В итоге такая реализация объекта не помогла. Addoptions переезжают в свой собственный объект поиск будет по ключу selectValue

	// var pricesObject = {
	// 	btBT_WMВстроенная: ["1000", "1500"],
	// 	btBT_WMСоло: ["500", "1000"],
	// 	btBT_DWВстроенная: ["1100", "2500"],
	// 	btBT_DWСоло: ["900", "1800"]
	// };

	// console.log(topLevelObjects);

	// DADATA.ru Suggestion

	// onClick по ссылке наверху

	$("#geoModalTopInput").suggestions({
		token: "daa7df9d3d75b308e28317375c6c0587d5c17c06",
		type: "ADDRESS",
		count: 5,
		bounds: "city",
		onSelect: function(suggestion) {
			// // console.log(suggestion);
			document.querySelector(".my-a-choose").innerHTML =
				suggestion.data.city;
			$(".reveal").foundation("close");
			document.querySelector("#geoDownInput").value =
				suggestion.data.city;
		}
	});

	// inChange по полю в форме

	$("#geoDownInput").suggestions({
		token: "daa7df9d3d75b308e28317375c6c0587d5c17c06",
		type: "ADDRESS",
		count: 5,
		bounds: "city",
		onSelect: function(suggestion) {
			// // console.log(suggestion);
			// document.querySelector(".my-a-choose").innerHTML = suggestion.data.city;
			// $(".reveal").foundation("close");
			// document.querySelector("#geoDownInput").value = suggestion.data.city;
		}
	});

	// // IP GEO API ipinfo.io

	// $.get("https://ipinfo.io", function(response) {

	//  	//var myGeo = JSON.stringify(response);

	//  	document.querySelector(".my-a-choose").innerHTML += "ipinfo.io: " + (response.city) + "<br>";

	//  }, "jsonp")

	// GEO TEST YA MAPS

	ymaps.ready(mapInit);
	// console.log("ymaps", ymaps);

	function mapInit() {
		ymaps.geolocation
			.get({
				provider: "yandex",
				autoReverseGeocode: true
			})
			.then(function(result) {
				var tmp = result.geoObjects
					.get(0)
					.properties.get("metaDataProperty").GeocoderMetaData.Address
					.Components.length;
				document.querySelector(
					".my-a-choose"
				).innerHTML += result.geoObjects
					.get(0)
					.properties.get(
						"metaDataProperty"
					).GeocoderMetaData.Address.Components[tmp - 1].name;
				document.querySelector(
					"#geoDownInput"
				).value = result.geoObjects
					.get(0)
					.properties.get(
						"metaDataProperty"
					).GeocoderMetaData.Address.Components[tmp - 1].name;
			});
	}

	// 	// GEO TEST DADA

	// 	$.ajaxSetup({
	// 	url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/detectAddressByIp",
	// 	headers: {
	// 		Accept: "application/json",
	// 		Authorization: "Token daa7df9d3d75b308e28317375c6c0587d5c17c06"
	// 	}
	// });

	// 	$.ajax()
	// 	.done(function(data){
	// 		document.querySelector(".my-a-choose").innerHTML += "dada.ru: " + (data.location.data.city) + "<br>";
	// 	});

	// MY FIRST FORM

	document.querySelector(".my-select-one").onchange = function() {
		var selectOneChecked = document.querySelector(
			".my-select-one option:checked"
		).value;
		//// console.log(selectOneChecked.value + ": " + selectOneChecked.text);

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
			option.value = "";
			option.text = firstOptionInSelectObjects[selectOneChecked][0];
			option.setAttribute("disabled", true);
			option.setAttribute("selected", true);
			option.setAttribute("hidden", true);

			firstBtDiv_select.appendChild(option);

			// #TODO: А вот как то можно передать не только функцию но и объекты, но функцию не выполнять (bt например).
			firstBtDiv_select.onchange = selectTwoOnChange;
			firstBtDiv.appendChild(firstBtDiv_select);

			Foundation.reInit("abide");

			// Добавляем OPTION первого SELECT
			for (var i = 0; i < bt.length; i++) {
				var option = document.createElement("option");

				if (i === 12) {
				} else {
					option.value = bt[i]["selectValue"];
					option.text = bt[i]["selectOption"];
					// console.log("Option: " + bt[i]["selectOption"]);

					firstBtDiv_select.appendChild(option);
				}
			}
		}
	};

	// my-select-two onChange Function

	function selectTwoOnChange() {
		// #TODO: Передавая сюда this как нам проверить checked в select? Псевдокласса нет же?
		//// console.log(this);

		if (this.value === "BT_WM") {
			document.querySelector(".my-form-center").style.backgroundImage =
				"url('js/1.png')";
		}
		if (this.value === "BT_DW") {
			document.querySelector(".my-form-center").style.backgroundImage =
				"url('js/2.png')";
		}

		if (document.querySelector(".js-secondBtDiv")) {
			document.querySelector(".js-secondBtDiv").remove();
		}

		var selectTwoChecked = document.querySelector(
			".my-select-two option:checked"
		).value;

		// console.log(selectTwoChecked);

		var btAddOptions = btObjects[selectTwoChecked];

		if (btAddOptions.length > 0) {
			var lineTwoDiv = document.querySelector(".lineTwo");
			var firstBtDiv = document.querySelector(".js-firstBtDiv");
			var secondBtDiv = document.createElement("div");
			var secondBtDiv_select = document.createElement("select");

			secondBtDiv_select.className = "my-select-three";
			secondBtDiv_select.setAttribute("required", "true");
			firstBtDiv.className = "small-4 column js-firstBtDiv js-cruwl";
			secondBtDiv.className = "small-4 column js-secondBtDiv js-cruwl";
			lineTwoDiv.appendChild(secondBtDiv);
			secondBtDiv.appendChild(secondBtDiv_select);

			// Подсказка OPTION в SELECT

			if (firstOptionInSelectObjects[selectTwoChecked]) {
				var option = document.createElement("option");
				option.value = "";
				option.text = firstOptionInSelectObjects[selectTwoChecked][0];
				option.setAttribute("disabled", true);
				option.setAttribute("selected", true);
				option.setAttribute("hidden", true);

				secondBtDiv_select.appendChild(option);
			}

			for (var i = 0; i < btAddOptions.length; i++) {
				var option = document.createElement("option");
				option.value = btAddOptions[i];
				option.text = btAddOptions[i];
				// console.log("Option: " + btAddOptions[i]);

				secondBtDiv_select.appendChild(option);
			}
		} else {
			document.querySelector(".js-firstBtDiv").className =
				"small-8 column js-firstBtDiv js-cruwl";
		}
	}

	// FORM BACK BUTTON

	document.querySelector(".my-back-button").onclick = function() {
		var idToCleanArr = [
			"#standartLi",
			"#vipLi",
			"#standartText",
			"#vipText",
			"#vipPrice",
			"#normalPrice",
			"#vipWorks",
			"#standartWorksToggleUl"
		];

		for (var i = 0; i < idToCleanArr.length; i++) {
			// console.log(idToCleanArr[i]);
			if (document.querySelector(idToCleanArr[i])) {
				document.querySelector(idToCleanArr[i]).innerHTML = "";
			}
		}

		document.querySelector("#my-form-head").innerHTML = switchFormHead("");
	};

	// FORM NEXT BUTTON

	document.querySelector("#my-next-button a").onclick = function() {
		// ABIDE VALIDATE

		var plugin = new Foundation.Abide($("form"), {});
		var e = plugin.validateInput($("#my-select-phone"));
		var a = plugin.validateInput($(".my-select-one"));
		var b = plugin.validateInput($(".my-select-two"));
		var c = plugin.validateInput($(".my-select-three"));
		var d = plugin.validateInput($("#geoDownInput"));

		// Проверяем на валидность все поля первого экрана
		if (a * b * c * d * e) {
			var arrayToggle = [
				"#standartWorksToggleUl",
				"#my-form-center-page1",
				"#my-form-center-page2",
				"#my-back-button",
				"#my-next-button"
			];

			arrayToggle.forEach(function(element, index) {
				$(element).foundation("toggle");
			});

			// Соибраем все JS-CRUWL
			var textToSend = (function() {
				var allJsCruwl = document.querySelectorAll(
					".js-cruwl option:checked"
				);
				var text = "";

				for (var i = 0; i < allJsCruwl.length; i++) {
					text += allJsCruwl[i].value;
				}

				return text.replace(/-|\s|\.|\"/g, "_");
			})();

			console.log(textToSend);

			document.querySelector("#my-form-head").innerHTML = switchFormHead(
				textToSend
			);

			if (
				$("#geoDownInput")[0].value === "Апрелевка" ||
				$("#geoDownInput")[0].value === "г Апрелевка"
			) {
				var normalPrice = pricesObject["Aprelevka"][textToSend][0] || 0;
				var vipPrice = pricesObject["Aprelevka"][textToSend][1] || 0;
			}

			if (
				$("#geoDownInput")[0].value === "Москва" ||
				$("#geoDownInput")[0].value === "г Москва"
			) {
				var normalPrice = pricesObject["Moskva"][textToSend][0] || 0;
				var vipPrice = pricesObject["Moskva"][textToSend][1] || 0;
			}

			// LINK TEMPLATE на перечень работ
			var templateLinkWorks = "";

			var standartText = productObject[textToSend]["standartText"] || 0;
			var standartOptions =
				productObject[textToSend]["standartOptions"] || 0;
			var standartWorks = productObject[textToSend]["standartWorks"] || 0;

			document.querySelector("#normalPrice").innerHTML = normalPrice;
			document.querySelector("#standartText").innerHTML = standartText;
			document.querySelector(
				"#standartWorksToggleUl"
			).innerHTML = standartWorks;

			// Генерим LI от StandartOptions

			//console.log(standartOptions[0].split("|")[0]);

			if (standartOptions) {
				for (var i = 0; i < standartOptions.length; i++) {
					var standartLi = document.createElement("li");
					
					var optionList = standartOptions[i].split("|");
					var optionPrice = textToSend + "Options";
					var myModal = switchDorabotkaModal(optionList[0]);
					console.log("sdsdsd"+myModal);
					standartLi.innerHTML =
						"<div class='row'><div class='small-7 column'><input value='" +
						optionList[0] +
						"' id='standartCheckbox" +
						i +
						"' type='checkbox'>" +
						"<label for='standartCheckbox" +
						i +
						"'>" +
						optionList[0] +
						"</label><a data-open='" +
						myModal +
						"'><i class='fa fa-question-circle dorabotka-info'></i></a></div>" +
						"<div class='small-4 column'><span id='standartCheckboxValue" +
						i +
						"'>" +
						pricesObject["Aprelevka"][optionPrice][i] +
						"</span></div></div>";
					document
						.querySelector("#standartLi")
						.appendChild(standartLi);

					var myValue = "#standartCheckboxValue" + i;

					// ЭТО ЧО ХОТЬ ТАКОЕ ТО! почему так работает, понятно что замыкания но как именно ?
					(function(num, price) {
						document.querySelector(
							"#standartCheckbox" + i
						).onclick = function() {
							if (!this.checked) {
								var oldprice = document.querySelector(
									"#normalPrice"
								).innerHTML;
								var newprice =
									parseInt(oldprice) - parseInt(price);
								document.querySelector(
									"#normalPrice"
								).innerHTML = newprice;
								this.className = "";
							} else {
								var oldprice = document.querySelector(
									"#normalPrice"
								).innerHTML;
								var newprice =
									parseInt(oldprice) + parseInt(price);
								document.querySelector(
									"#normalPrice"
								).innerHTML = newprice;
								this.className = "js-cruwl";
							}
						};
					})(
						myValue,
						parseInt(pricesObject["Aprelevka"][optionPrice][i])
					);
				}
			}

			if (vipPrice) {
				document.querySelector("#vipDiv").className =
					"small-6 column my-price";
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
							"<div class='row'><div class='small-7 column'><input checked disabled id='vipCheckbox" +
							i +
							"' type='checkbox'>" +
							"<label for='vipCheckbox" +
							i +
							"'>" +
							optionList[0] +
							"</label></div>" +
							"<div class='small-4 column'><span id='vipCheckboxValue" +
							i +
							"'>" +
							optionList[1] +
							"</span></div></div>";
						document.querySelector("#vipLi").appendChild(vipLi);
					}
				}
			} else {
				document.querySelector("#vipDiv").className =
					"small-6 column my-price my-hide";
			}
		} else {
			console.log("хуй там");
		}
	};

	// FORM SUBMIT FUNCTION

	document.querySelector(".my-send-button-class-standart").onclick = function() {
		// #TODO: Хватит писать как мудак. Напиши обход всех  OPTION:CHECKED разом а не руками их собирай.

		var textToSend = (function() {
			var allJsCruwl = document.querySelectorAll(
				".js-cruwl option:checked"
			);
			var text = "STANDART + ";

			for (var i = 0; i < allJsCruwl.length; i++) {
				text += allJsCruwl[i].value;
			}

			var allJsCruwlInput = document.querySelectorAll(
				"input:checked.js-cruwl"
			);

			for (var i = 0; i < allJsCruwlInput.length; i++) {
				text += allJsCruwlInput[i].value;
			}

			return text;
		})();

		console.log(textToSend);
	};

	document.querySelector(".my-send-button-class-vip").onclick = function() {
		// #TODO: Хватит писать как мудак. Напиши обход всех  OPTION:CHECKED разом а не руками их собирай.

		var textToSend = (function() {
			var allJsCruwl = document.querySelectorAll(
				".js-cruwl option:checked"
			);
			var text = "VIP + ";

			for (var i = 0; i < allJsCruwl.length; i++) {
				text += allJsCruwl[i].value;
			}

			
			return text;
		})();

		console.log(textToSend);
	};


	// INPUT PHONE MASK

	var phoneInputs = new PhoneMask(
		document.querySelectorAll("#my-select-phone"),
		{
			pattern: "(___) ___ __ __",
			prefix: "+7 ",
			patternChar: "_"
		}
	);

	document.querySelector(".my-a-click").onclick = function() {
		this.innerHTML.charAt(19) === "d"
			? (this.innerHTML = "<i class='fi-arrow-down'></i> перечень работ и материалов.")
			: (this.innerHTML = "<i class='fi-arrow-right'></i> перечень работ и материалов.");
	};

	// document.querySelector(".my-select-two").onchange = function () {
	// 	if (this.value==="BT_WM") {
	// 		document.querySelector(".my-form-center").style.backgroundImage = "url('../js/1.png')";
	// 	};
	// 	if (this.value==="BT_DW") {
	// 		document.querySelector(".my-form-center").style.backgroundImage = "url('../js/2.png')";
	// 	};
	// }
};

function switchFormHead(text) {
	switch (text) {
		case "btBT_WMВстроенная":
			return "Установка и подключение встроенной стиральной машины";
			break;
		case "btBT_WMСоло":
			return "Установка и подключение стиральной машины";
			break;
		default:
			return "Рассчитайте стоимость онлайн";
			break;
	}
}

function switchDorabotkaModal(name) {
	console.log(name);
	switch (name) {
		case "Доработка электросети":
			return "dorabotkaModalTopElectro";
			break;
		case "Доработка водоснабжения":
			return "dorabotkaModalTopVoda";
			break;
		case "Доработка слива":
			return "dorabotkaModalTopSliv";
			break;
		case "Перенавес дверей холодильника с электронным табло ":
			return "dorabotkaModalTopPerenaves";
			break;
		default:
			return "0";
			break;
	}
}