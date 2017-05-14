$(document).foundation();

Foundation.Abide.defaults.patterns[
"fr_tel"
] = /[+]7\s[(]\d\d\d[)]\s\d\d\d\s\d\d\s\d\d/;

window.onload = function() {

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

			mainMinPrice(suggestion.data.city);
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
			mainMinPrice(suggestion.data.city);
			document.querySelector(".my-a-choose").innerHTML =
			suggestion.data.city;
		}
	});

	// GEO TEST YA MAPS

	ymaps.ready(mapInit);

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

			var city = result.geoObjects
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
			
			document.querySelector(
				".my-a-choose"
				).innerHTML += city;

			// заполняем miPrice от города

			mainMinPrice(city);

		});
	}

	//	SELECT №1 onChange

	document.querySelector(".my-select-one").onchange = function() {
		var selectOneChecked = document.querySelector(
			".my-select-one option:checked"
			).value;
		
		// #TODO: Переделать в одну функцию удаления слоя если он есть
		// Удаление полей слоя при перевыборе

		removeBtDiv();

		// Заполняем вторую строку формы

		var lineTwoDiv = document.querySelector(".lineTwo");

		// #TODO: По-хорошему тут надо все переписать на функции, иначе проверки на отсутствие объекта номенклатуры нет.

		var bt = topLevelObjects[selectOneChecked];

		if (bt) {
			// Первый левый DIV в который обернем первый SELECT
			var firstBtDiv = document.createElement("div");

			firstBtDiv.className = "large-8 small-12 column js-firstBtDiv js-cruwl";
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
					firstBtDiv_select.appendChild(option);
				}
			}
		}
		document.querySelector(".my-select-two").focus();
	};

	// my-select-two onChange Function

	function selectTwoOnChange() {

		if (document.querySelector(".js-secondBtDiv")) {
			document.querySelector(".js-secondBtDiv").remove();
		}

		var selectTwoChecked = document.querySelector(
			".my-select-two option:checked"
			).value;

		var btAddOptions = btObjects[selectTwoChecked];

		if (btAddOptions.length > 0) {
			var lineTwoDiv = document.querySelector(".lineTwo");
			var firstBtDiv = document.querySelector(".js-firstBtDiv");
			var secondBtDiv = document.createElement("div");
			var secondBtDiv_select = document.createElement("select");

			secondBtDiv_select.className = "my-select-three";
			secondBtDiv_select.setAttribute("required", "true");
			firstBtDiv.className = "large-4 small-12 column js-firstBtDiv js-cruwl";
			secondBtDiv.className = "large-4 small-12 column js-secondBtDiv js-cruwl";
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
			"large-8 small-12 column js-firstBtDiv js-cruwl";
		}

		document.querySelector(".my-select-three").focus();
	}

	// FORM BACK BUTTON

	// Очищаем все innerHTML по кнопке back

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

		if ($(".my-select-two").length > 0) {
			var b = plugin.validateInput($(".my-select-two"));
		} else {
			var b = true;
		}

		if ($(".my-select-three").length > 0) {
			var c = plugin.validateInput($(".my-select-three"));
		} else {
			var c = true;
		}
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

					standartLi.innerHTML = generateOptionsLayout(
						i,
						optionList[0],
						pricesObject["Aprelevka"][optionPrice][i],
						myModal
						);

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

			Foundation.reflow($(document), "toggler");

			if (vipPrice) {
				document.querySelector("#standartDiv").className = "large-6 small-12 column my-price";
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
				"my-hide";
				document.querySelector("#standartDiv").className = "large-8 small-12 column my-price";
			}
		} else {
			console.log("хуй там");
		}
	};

	// FORM SUBMIT FUNCTION

	document.querySelector(
		".my-send-button-class-standart"
		).onclick = function() {
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

	// document.querySelector(".my-a-click").onclick = function() {
	// 	this.innerHTML.charAt(22) === "r"
	// 		? (this.innerHTML = "<i class='fa fa-caret-down'></i> перечень работ и материалов 'Стандарт'.")
	// 		: (this.innerHTML = "<i class='fa fa-caret-right'></i> перечень работ и материалов 'Стандарт'.");
	// };

	// document.querySelector(".my-a-click2").onclick = function() {
	// 	this.innerHTML.charAt(22) === "r"
	// 		? (this.innerHTML = "<i class='fa fa-caret-down'></i> перечень работ и материалов 'Премиум'.")
	// 		: (this.innerHTML = "<i class='fa fa-caret-right'></i> перечень работ и материалов 'Премиум'.");
	// };

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
		case "btBT_DWВстроенная":
		return "Установка и подключение встроенной посудомоечной машины";
		break;
		case "btBT_DWСоло":
		return "Установка и подключение посудомоечной машины";
		break;
		case "btBT_HСоло":
		return "Установка и подключение холодильника";
		break;
		case "btBT_HВстроенный":
		return "Установка и подключение встроенного холодильника";
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
		return (
			"" +
			"<p>Данная услуга приобретается дополнительно к стандартной установке техники. При приобретении услуги отдельно, выезд специалиста оплачивается по действующему Прейскуранту цен на работы.<p>" +
			"<h5>Работы входящие в стоимость:</h5>" +
			"<ul>" +
			"<li>Перфорация стен (перегородок) для прокладки коммуникаций</li>" +
			"<li>Установка розетки с заземляющим контактом</li>" +
			"<li>Прокладка электрического кабеля  открытым способом (до 5 м.)</li>" +
			"<li>Монтажные работы в электрощитке.</li>" +
			"</ul>" +
			"<h5>Материалы, входящие в стоимость доработки:</h5>" +
			"<ul>" +
			"<li>Розетка 'евростандарт' 16 А. для открытой проводки;</li>" +
			"<li>Вилка 'евростандарт' 16 А. (разборная);</li>" +
			"<li>Автомат 16 А. / 2п. (отеч.);</li>" +
			"<li>коробка под автомат;</li>" +
			"<li>провод ПВС  3*1,5 мм (белый);</li>" +
			"<li>Провод МПВ 4.0 мм (белый);</li>" +
			"<li>крепежные изделия пластиковые зажимы для кабеля 7-8 мм.</li>" +
			"</ul>" +
			"<p>" +
			"<br>Доработка производится с учетом требований производителя техники, «Правил техники безопасности» и контролирующих органов самоуправления." +
			"</p>"+
			"<div style='text-align:right'><a href='#price' data-toggle='standartOptions0'>закрыть</a></div>"
			);
		break;

		case "Доработка водоснабжения":
		return (
			"" +
			"<p>Данная услуга приобретается дополнительно к стандартной установке техники. При приобретении услуги отдельно, выезд специалиста оплачивается по действующему Прейскуранту цен на работы.<p>" +
			"<h5>Работы входящие в стоимость:</h5>" +
			"<ul>" +
			"<li>Перфорация стен (перегородок) для прокладки коммуникаций</li>" +
			"<li>Монтаж водопроводного крана в водосеть клиента (один узел сантехкомплекта: кран, тройник, бочонок 1/2', переходник или водоотвод)</li>" +
			"<li>Замена/сращивание/удлинение наливного шланга (до 4 м.), гибкой подводки</li>" +
			"</ul>" +
			"<h5>Материалы, входящие в стоимость доработки:</h5>" +
			"<ul>" +
			"<li>шланг наливной пластиковый (Италия)</li>" +
			"<li>подводка гибкая бронированная на воду</li>" +
			"<li>кран</li>" +
			"<li>водоотвод латунный (в сборе)</li>" +
			"<li>угольник</li>" +
			"<li>переходник</li>" +
			"<li>бочонок</li>" +
			"<li>муфта</li>" +		
			"</ul>" +
			"<p>" +
			"<br>Доработка производится с учетом требований производителя техники, «Правил техники безопасности» и контролирующих органов самоуправления." +
			"</p>"+
			"<div style='text-align:right'><a href='#price' data-toggle='standartOptions1'>закрыть</a></div>"
			);
		break;

		case "Доработка слива":
		return (
			"" +
			"<p>Данная услуга приобретается дополнительно к стандартной установке техники. При приобретении услуги отдельно, выезд специалиста оплачивается по действующему Прейскуранту цен на работы.<p>" +
			"<h5>Работы входящие в стоимость:</h5>" +
			"<ul>" +
			"<li>Замена/сращивание/удлинение, сливного шланга (до 1м.)</li>" +
			"<li>Организация стационарного слива с гидрозатвором через отдельный сток (установка специального сифона с демонтажем старого), либо частичная замена деталей старого сифона (установка отвода, муфты)</li>" +
			"</ul>" +
			"<h5>Материалы, входящие в стоимость доработки:</h5>" +
			"<ul>" +
			"<li>сливной шланг</li>" +
			"<li>концевик на модульный сливной шланг</li>" +
			"<li>крепежные хомуты 'Norma','ABA' 17-28 мм.</li>" +
			"<li>сифон с отводом для подключения СМА и ПММ, либо отвод для слива, гибкий гофрированный выпуск к сифону</li>" +
			"<li>ниппель для сращивания сливных шлангов d.19/d.21 мм (пласт.)</li>" +
			"</ul>" +
			"<p>" +
			"<br>Доработка производится с учетом требований производителя техники, «Правил техники безопасности» и контролирующих органов самоуправления." +
			"</p>"+
			"<div style='text-align:right'><a href='#price' data-toggle='standartOptions2'>закрыть</a></div>"
			);
		break;

		case "Перенавес дверей холодильника с электронным табло ":
		return (
			"" +
			"<p>Данная услуга приобретается дополнительно к стандартной установке техники. При приобретении услуги отдельно, выезд специалиста оплачивается по действующему Прейскуранту цен на работы.<p>" +
			"<h5>Работы входящие в стоимость:</h5>" +
			"<ul>" +
			"<li>Перенавешивание дверей холодильника на левую или правую сторону в зависимости от Вашего желания</li>" +
			"<li>Подключение электронного управления</li>" +
			"<li>Проверка работоспособности техники</li>" +
			"<li>Очистка рабочей зоны</li>" +
			"</ul>" +
			"<h5>Материалы, входящие в стоимость доработки:</h5>" +
			"<ul>" +
			"<li></li>" +
			"<li></li>" +
			"<li></li>" +
			"<li></li>" +
			"<li></li>" +
			"</ul>" +
			"<p>" +
			"<br>Доработка производится с учетом требований производителя техники, «Правил техники безопасности» и контролирующих органов самоуправления." +
			"</p>"+
			"<div style='text-align:right'><a href='#price' data-toggle='standartOptions0'>закрыть</a></div>"
			);
		break;

		case "Перенавес дверей холодильника без электронного табло ":
		return (
			"" +
			"<p>Данная услуга приобретается дополнительно к стандартной установке техники. При приобретении услуги отдельно, выезд специалиста оплачивается по действующему Прейскуранту цен на работы.<p>" +
			"<h5>Работы входящие в стоимость:</h5>" +
			"<ul>" +
			"<li></li>" +
			"<li></li>" +
			"</ul>" +
			"<h5>Материалы, входящие в стоимость доработки:</h5>" +
			"<ul>" +
			"<li></li>" +
			"<li></li>" +
			"<li></li>" +
			"<li></li>" +
			"<li></li>" +
			"</ul>" +
			"<p>" +
			"<br>Доработка производится с учетом требований производителя техники, «Правил техники безопасности» и контролирующих органов самоуправления." +
			"</p>"+
			"<div style='text-align:right'><a href='#price' data-toggle='standartOptions1'>закрыть</a></div>"
			);
		break;

		default:
		return "0";
		break;
	}
}

function generateOptionsLayout(i, optionName, optionPrice, optionText) {
	var text =
	"<li>" +
	"<div class='row'>" +
	"<div class='large-9 small-9 column'>" +
	"<input value='" +
	optionName +
	"' id='standartCheckbox" +
	i +
	"' type='checkbox'>" +
	"<a class='my-a-click-options' data-toggle='standartOptions" +
	i +
	"'>" +
	optionName +
	"</a>" +
	"</div>" +
	"<div class='large-3 small-3 column'>" +
	"<span id='standartCheckboxValue" +
	i +
	"'>" +
	optionPrice +
	"</span>" +
	"</div>" +
	"</div>" +
	"<div id='standartOptions" +
	i +
	"' data-toggler='.my-hide' class = 'my-hide'>" +
	optionText +
	"</div>" +
	"</li>";

	return text;
}


function removeBtDiv () {
	if (document.querySelector(".js-secondBtDiv")) {
		document.querySelector(".js-secondBtDiv").remove();
	}

	if (document.querySelector(".js-firstBtDiv")) {
		document.querySelector(".js-firstBtDiv").remove();
	}

}

function mainMinPrice (city) {

	if (
		city === "Апрелевка" ||
		city === "г Апрелевка"
		) 
	{
		document.querySelector('.data-cond-price').innerHTML = "от " + pricesObject["Aprelevka"]["condcondSetup7000"][0] + " руб." || 0;
		document.querySelector('.data-btwm-price').innerHTML = "от " + pricesObject["Aprelevka"]["btBT_WMСоло"][0] + " руб."|| 0;
		document.querySelector('.data-bth-price').innerHTML = "от " + pricesObject["Aprelevka"]["btBT_HСоло"][0] + " руб." || 0;
		
	}

	if (
		city === "Москва" ||
		city === "г Москва"
		) 
	{
		document.querySelector('.data-cond-price').innerHTML = "от " + pricesObject["Moskva"]["condcondSetup7000"][0] + " руб." || 0;
		document.querySelector('.data-btwm-price').innerHTML = "от " + pricesObject["Moskva"]["btBT_WMСоло"][0] + " руб." || 0;
		document.querySelector('.data-bth-price').innerHTML = "от " + pricesObject["Moskva"]["btBT_HСоло"][0] + " руб." || 0;
		
	}



}


