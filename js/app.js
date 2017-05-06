$(document).foundation();

Foundation.Abide.defaults.patterns['fr_tel'] = /[+]7\s[(]\d\d\d[)]\s\d\d\d\s\d\d\s\d\d/;

$(document)	
.on("invalid.zf.abide", function(ev, elem) {
	console.log("Field id " + ev.target.id + " is invalid");
})
	// field element is valid
	.on("valid.zf.abide", function(ev, elem) {
		console.log("Field name " + elem.attr("name") + " is valid");
	})
	// form validation failed
	.on("forminvalid.zf.abide", function(ev, frm) {
		console.log("Form id " + ev.target.id + " is invalid");
	})
	// form validation passed, form will submit if submit event not returned false
	.on("formvalid.zf.abide", function(ev, frm) {
		console.log("Form id " + frm.attr("id") + " is valid");
		// ajax post form
	})
	// to prevent form from submitting upon successful validation
	.on("submit", function(ev) {
		ev.preventDefault();
		console.log("Submit for form id " + ev.target.id + " intercepted");
	});
// You can bind field or form event selectively
$("#foo").on("invalid.zf.abide", function(ev, el) {
	alert("Input field foo is invalid");
});
$("#bar").on("formvalid.zf.abide", function(ev, frm) {
	alert("Form is valid, finally!");
	// do something perhaps
});

window.onload = function() {
	// <SELECT> OBJECT LIB

	// #TODO: Не забыть удалить addoptions. В итоге такая реализация объекта не помогла. Addoptions переезжают в свой собственный объект поиск будет по ключу selectValue
	var topLevelObjects = {
		bt: [
		{
			selectValue: "BT_WM",
			selectOption: "Стиральная машина"
		},

		{
			selectValue: "BT_DW",
			selectOption: "Посудомоечная машина"
		},
		{
			selectValue: "BT_H",
			selectOption: "Холодильник"
		},
		{
			selectValue: "BT_EO",
			selectOption: "Электрическая плита"
		},
		{
			selectValue: "BT_EPP",
			selectOption: "Электрическая панель"
		},
		{
			selectValue: "BT_D",
			selectOption: "Духовой шкаф (независимый)"
		},
		{
			selectValue: "BT_D_EP",
			selectOption: "Зависимые электрическая панель и духовой шкаф"
		},
		{
			selectValue: "BT_AIR",
			selectOption: "Вытяжка"
		},
		{
			selectValue: "BT_WATER",
			selectOption: "Водонагреватель"
		}
		],

		cond: [
		{
			selectValue: "condSetup",
			selectOption: "Установка"
		},
		{
			selectValue: "condRemove",
			selectOption: "Демонтаж"
		},
		{
			selectValue: "condServ",
			selectOption: "Обслуживание"
		}
		],

		tv: [
		{
			selectValue: "tvTableSetup",
			selectOption: "Установка ТВ на тумбу"
		},
		{
			selectValue: "tvWallSetup",
				selectOption: "Установка ТВ на подвес" // #TODO: Установка на подвес - вопрос к яне в TRELLO
			},
			{
				selectValue: "thTableSetup",
				selectOption: "Установка домашнего кинотеатра"
			},
			{
				selectValue: "thWallSetup",
				selectOption: "Подвес домашнего кинотеатра"
			},
			{
				selectValue: "tvSmart",
				selectOption: "Доработка SMART+"
			}
			],
			sateliteTv: [
			{
				selectValue: "sateliteTvTest",
				selectOption: "Тестирование спутникового сигнала"
			},
			{
				selectValue: "sateliteTvSetup",
				selectOption: "Подключение спутниковой тарелки"
			}
			],
			DT: [
			{
				selectValue: "DT_ROUTER",
				selectOption: "Подключение роутера"
			},
			{
				selectValue: "DT_HARDWARE",
				selectOption: "Подключение переферийного устройства"
			},
			{
				selectValue: "DT_SETUP",
				selectOption: "Найстройка и оптимизация"
			},
			{
				selectValue: "DT_OS",
				selectOption: "Установка операционной системы"
			}
			]
		};

	// Параметры дейсвтия
	//	[] - пустое без значений оставляет SELECT во всю форму

	var btObjects = {
		// Стиралка
		BT_WM: ["Встроенная", "Соло"],

		//Холодильник
		BT_H: ["Встроенный", "Соло", "Side-By-Side"],

		// Плита
		BT_P: ["Встроенная", "Соло"],

		// Посудомойка
		BT_DW: ["Встроенная", "Соло"],

		BT_EO: [],
		BT_EPP: [],
		BT_D: [],
		BT_D_EP: [],
		BT_AIR: ["Купольная", "Плоская", "Встраиваемая"],
		BT_WATER: [
		"Проточный",
		"Накопительный до 50 л.",
		"Накопительный от 51 л."
		],

		// Кондиционер
		condSetup: ["7000", "9000", "12000"],
		condRemove: ["7000", "9000", "12000"],
		condServ: [],

		// ТВ _ домашний кинотеатр
		tvTableSetup: [
		'Диагональ до 32"',
		'Диагональ до 46"',
		'Диагональ свыше 46"'
		],
		tvWallSetup: [
		'Диагональ до 32"',
		'Диагональ до 46"',
		'Диагональ свыше 46"'
		],
		thTableSetup: [],
		thWallSetup: [],
		tvSmart: [],

		// Спутников
		sateliteTvTest: [],
		sateliteTvSetup: ["Диаметр до 0.79", "Диаметр свыше 0.8"],

		// Цифровая техника

		DT_ROUTER: [],
		DT_HARDWARE: [],
		DT_SETUP: [],
		DT_OS: []
	};

	var firstOptionInSelectObjects = {
		bt: ["А именно"],
		cond: ["Установка / Демонтаж / Обслуживание "],
		tv: ["Установка / Подвес / Домашний кинотеатр / SMART+ "],
		sateliteTv: ["Тестирование сигнала / Подключение"],
		BT_AIR: ["Купольная / Плоская / Встраиваемая "],
		DT: [" Роутер / Переферия / Оптимизация /  Операционная система "]
	};

	var productObject = {
		btBT_WMВстроенная: {
			standartText: "Подключение производится к уже имеющимся у Вас коммуникациям, без их доработки.",
			vipText: "Производится установка и подключение техники, а так же доработка  точек водоснабжения, электроснабжения и системы слива.",
			standartOptions: [
			"Доработка электросети | +700 руб.",
			"Доработка водоснабжения | +800 руб.",
			"Доработка слива | +900 руб."
			],
			vipOptions: [
			"Доработка электросети | включено",
			"Доработка водоснабжения | включено",
			"Доработка слива | включено"
			],
			standartWorks: "<li> Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс-листу на дополнительные работы)</li><li> Распаковка и визуальная проверка техники</li><li> Консультация по вопросам эксплуатации</li><li> Проверка исправности и готовности к подключению к точкам водоснабжения, электросети и системы слива</li><li> Снятие транспортных креплений</li><li> Перфорация стен (мебельных перегородок) для прокладки коммуникаций</li><li> Встраивание техники в мебель на место эксплуатации и выставление по уровню в разных плоскостях </li><li>  Подключение к существующим точкам водо- и электроснабжения с учетом особенностей техники и требований техники безопасности</li><li> Подключение стационарного слива, при необходимости установка манжетки или червячного хомута</li><li> Проверка герметичности всех соединений</li><li> Проверка работоспособности техники</li><li> Очистка рабочей зоны</li><li> Демонстрация работы Вашей новой техники и объяснение основных функций</li><p>Материалы, входящие в стоимость Купона:<ul>Хомут червячный или муфта.</ul></p><p>В стоимость подключения не входит: <ul><li>выравнивание пола</li><li>работы по изменению конфигурации шкафов  или рабочих поверхностей</li><li>навеска фасада на технику</li></ul></p>",
			vipWorks: '<li> Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс-листу на дополнительные работы)</li><li> Распаковка и визуальная проверка техники</li><li> Проверка исправности и готовности к подключению водоснабэению, электросети и системы слива.</li><li> Снятие транспортных креплений</li><li> <mark>Установка техники на место эксплуатации и выставление по уровню в разных плоскостях </mark></li><li> <mark>Доработка сети электроснабжения: установка розетки с заземляющим контактом; Перфорация стен или перегородок для прокладки коммуникаций; Прокладка электрического кабеля открытым способом (до 5 м.); монтажные работы в электрощитке.</mark></li><li> Доработка системы водоснабжения: Перфорация стен (перегородок) для прокладки коммуникаций; монтаж водопроводного крана в водосеть клиента; замена/сращивание/ удлинение наливного, шланга (до 4 м.), гибкой подводки</li><li> Доработка системы канализации: замена/сращивание/удлинение, сливного шланга ( до 1 м.); организация стационарного слива</li><li> Подключение к точкам водо-, электроснабжения и системе канализации, с учетом требований производителя техники и «Правил техники безопасности»</li><li> Проверка герметичности всех соединений</li><li> Проверка работоспособности техники.</li><li> Очистка рабочей зоны </li><li> Демонстрация работы Вашей новой техники и объяснение основных функций</li><p>Материалы, входящие в стоимость Купона: Розетка "евростандарт" 16 А. для открытой проводки; вилка "евростандарт" 16 А. (разборная); автомат 16 А. / 2п. (отеч.); коробка под автомат; провод ПВС  3*1,5 мм. (белый); провод МПВ 4.0 мм (белый); крепежные изделия пластиковые зажимы для кабеля 7-8 мм; сливной шланг до 1 м.; концевик на модульный сливной шланг; крепежные хомуты "Norma","ABA" 17-28 мм.; сифон с отводом для подключения СМА и ПММ; гибкий гофрированный выпуск к сифону; патрубок прямой - d.40 (d.50) мм.;  ниппель для сращивания сливных шлангов d.19/d.21 мм. (пласт.); муфта резиновая d.50*d.73 мм.; шланг наливной пластиковый (Италия) до 4 м; подводка гибкая бронированная на воду; кран; водоотвод латунный (в сборе); тройник; переходник; муфта, бочонок.</p><p>В стоимость подключения не входит:<ul><li>выравнивание пола</li><li>работы по изменению конфигурации шкафов  или рабочих поверхностей.</li></ul></p>'
		},

		btBT_WMСоло: {
			standartText: "Подключение производится к уже имеющимся у Вас коммуникациям, без их доработки.",
			vipText: "Производится установка и подключение техники, а так же доработка  точек водоснабжения, электроснабжения и системы слива.",
			standartOptions: [
			"Доработка слива | 200 | ",
			"Доработка водоснабжения | 300",
			"Доработка электросети | 400"
			],
			vipOptions: [
			"Доработка слива |  включено",
			"Доработка водоснабжения | включено",
			"Доработка электросети | включено"
			],
			standartWorks: "<li>Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс<li>листу на дополнительные работы)</li><li>Распаковка и визуальная проверка техники</li><li>Проверка исправности и готовности к подключению к точкам водоснабжения, электросети и системы слива</li><li>Снятие транспортных креплений</li><li>Установка машины на место эксплуатации и выставление по уровню в разных плоскостях </li><li>Подключение к существующим точкам водо<li> и электроснабжения с учетом особенностей техники и требований техники безопасности</li><li>Подключение стационарного слива, при необходимости установка манжетки или червячного хомута</li><li>Проверка герметичности всех соединений</li><li>Проверка работоспособности товара</li><li>Очистка рабочей зоны </li><li>Демонстрация работы  новой техники и объяснение основных функций</li><br>В стоимость стандартного подключения не входит: <br><li>выравнивание пола </li><li>удлинение шнуров питания</li><li>отключение и демонтаж старой техники</li><li>встраивание техники в мебель</li><li>работы по изменению конфигурации шкафов или рабочих поверхностей</li>",
			vipWorks: '<li> Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс-листу на дополнительные работы)</li><li> Распаковка и визуальная проверка техники</li><li> Проверка исправности и готовности к подключению водоснабэению, электросети и системы слива.</li><li> Снятие транспортных креплений</li><li> Установка техники на место эксплуатации и выставление по уровню в разных плоскостях </li><li> Доработка сети электроснабжения: установка розетки с заземляющим контактом; Перфорация стен или перегородок для прокладки коммуникаций; Прокладка электрического кабеля открытым способом (до 5 м.); монтажные работы в электрощитке.</li><li> Доработка системы водоснабжения: Перфорация стен (перегородок) для прокладки коммуникаций; монтаж водопроводного крана в водосеть клиента; замена/сращивание/ удлинение наливного, шланга (до 4 м.), гибкой подводки</li><li> Доработка системы канализации: замена/сращивание/удлинение, сливного шланга ( до 1 м.); организация стационарного слива</li><li> Подключение к точкам водо-, электроснабжения и системе канализации, с учетом требований производителя техники и «Правил техники безопасности»</li><li> Проверка герметичности всех соединений</li><li> Проверка работоспособности техники.</li><li> Очистка рабочей зоны </li><li> Демонстрация работы Вашей новой техники и объяснение основных функций</li><p>Материалы, входящие в стоимость Купона: Розетка "евростандарт" 16 А. для открытой проводки; вилка "евростандарт" 16 А. (разборная); автомат 16 А. / 2п. (отеч.); коробка под автомат; провод ПВС  3*1,5 мм. (белый); провод МПВ 4.0 мм (белый); крепежные изделия пластиковые зажимы для кабеля 7-8 мм; сливной шланг до 1 м.; концевик на модульный сливной шланг; крепежные хомуты "Norma","ABA" 17-28 мм.; сифон с отводом для подключения СМА и ПММ; гибкий гофрированный выпуск к сифону; патрубок прямой - d.40 (d.50) мм.;  ниппель для сращивания сливных шлангов d.19/d.21 мм. (пласт.); муфта резиновая d.50*d.73 мм.; шланг наливной пластиковый (Италия) до 4 м; подводка гибкая бронированная на воду; кран; водоотвод латунный (в сборе); тройник; переходник; муфта, бочонок.</p><p>В стоимость подключения не входит:<ul><li>выравнивание пола</li><li>работы по изменению конфигурации шкафов  или рабочих поверхностей.</li></ul></p>'
		},

		btBT_DWВстроенная: {
			standartText: "Подключение производится к уже имеющимся у Вас коммуникациям, без их доработки.",
			vipText: "Производится установка и подключение техники, а так же доработка  точек водоснабжения, электроснабжения и системы слива.",
			standartOptions: [
			"Доработка электросети | 700",
			"Доработка водоснабжения | 800",
			"Доработка слива | 900"
			],
			vipOptions: [
			"Доработка электросети | включено",
			"Доработка водоснабжения | включено",
			"Доработка слива | включено"
			],
			standartWorks: "<li> Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс-листу на дополнительные работы)</li><li> Распаковка и визуальная проверка техники</li><li> Консультация по вопросам эксплуатации</li><li> Проверка исправности и готовности к подключению к точкам водоснабжения, электросети и системы слива</li><li> Снятие транспортных креплений</li><li> Перфорация стен (мебельных перегородок) для прокладки коммуникаций</li><li> Встраивание техники в мебель на место эксплуатации и выставление по уровню в разных плоскостях </li><li>  Подключение к существующим точкам водо- и электроснабжения с учетом особенностей техники и требований техники безопасности</li><li> Подключение стационарного слива, при необходимости установка манжетки или червячного хомута</li><li> Проверка герметичности всех соединений</li><li> Проверка работоспособности техники</li><li> Очистка рабочей зоны</li><li> Демонстрация работы Вашей новой техники и объяснение основных функций</li><p>Материалы, входящие в стоимость Купона:<ul>Хомут червячный или муфта.</ul></p><p>В стоимость подключения не входит: <ul><li>выравнивание пола</li><li>работы по изменению конфигурации шкафов  или рабочих поверхностей</li><li>навеска фасада на технику</li></ul></p>",
			vipWorks: '<li> Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс-листу на дополнительные работы)</li><li> Распаковка и визуальная проверка техники</li><li> Проверка исправности и готовности к подключению водоснабэению, электросети и системы слива.</li><li> Снятие транспортных креплений</li><li> Установка техники на место эксплуатации и выставление по уровню в разных плоскостях </li><li> Доработка сети электроснабжения: установка розетки с заземляющим контактом; Перфорация стен или перегородок для прокладки коммуникаций; Прокладка электрического кабеля открытым способом (до 5 м.); монтажные работы в электрощитке.</li><li> Доработка системы водоснабжения: Перфорация стен (перегородок) для прокладки коммуникаций; монтаж водопроводного крана в водосеть клиента; замена/сращивание/ удлинение наливного, шланга (до 4 м.), гибкой подводки</li><li> Доработка системы канализации: замена/сращивание/удлинение, сливного шланга ( до 1 м.); организация стационарного слива</li><li> Подключение к точкам водо-, электроснабжения и системе канализации, с учетом требований производителя техники и «Правил техники безопасности»</li><li> Проверка герметичности всех соединений</li><li> Проверка работоспособности техники.</li><li> Очистка рабочей зоны </li><li> Демонстрация работы Вашей новой техники и объяснение основных функций</li><p>Материалы, входящие в стоимость Купона: Розетка "евростандарт" 16 А. для открытой проводки; вилка "евростандарт" 16 А. (разборная); автомат 16 А. / 2п. (отеч.); коробка под автомат; провод ПВС  3*1,5 мм. (белый); провод МПВ 4.0 мм (белый); крепежные изделия пластиковые зажимы для кабеля 7-8 мм; сливной шланг до 1 м.; концевик на модульный сливной шланг; крепежные хомуты "Norma","ABA" 17-28 мм.; сифон с отводом для подключения СМА и ПММ; гибкий гофрированный выпуск к сифону; патрубок прямой - d.40 (d.50) мм.;  ниппель для сращивания сливных шлангов d.19/d.21 мм. (пласт.); муфта резиновая d.50*d.73 мм.; шланг наливной пластиковый (Италия) до 4 м; подводка гибкая бронированная на воду; кран; водоотвод латунный (в сборе); тройник; переходник; муфта, бочонок.</p><p>В стоимость подключения не входит:<ul><li>выравнивание пола</li><li>работы по изменению конфигурации шкафов  или рабочих поверхностей.</li></ul></p>'
		},

		btBT_DWСоло: {
			standartText: "Подключение производится к уже имеющимся у Вас коммуникациям, без их доработки.",
			vipText: "Производится установка и подключение техники, а так же доработка  точек водоснабжения, электроснабжения и системы слива.",
			standartOptions: [
			"Доработка слива | 200",
			"Доработка водоснабжения | 300",
			"Доработка электросети | 400"
			],
			vipOptions: [
			"Доработка слива |  включено",
			"Доработка водоснабжения | включено",
			"Доработка электросети | включено"
			],
			standartWorks: "<li>Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс<li>листу на дополнительные работы)</li><li>Распаковка и визуальная проверка техники</li><li>Проверка исправности и готовности к подключению к точкам водоснабжения, электросети и системы слива</li><li>Снятие транспортных креплений</li><li>Установка машины на место эксплуатации и выставление по уровню в разных плоскостях </li><li>Подключение к существующим точкам водо<li> и электроснабжения с учетом особенностей техники и требований техники безопасности</li><li>Подключение стационарного слива, при необходимости установка манжетки или червячного хомута</li><li>Проверка герметичности всех соединений</li><li>Проверка работоспособности товара</li><li>Очистка рабочей зоны </li><li>Демонстрация работы  новой техники и объяснение основных функций</li><br>В стоимость стандартного подключения не входит: <br><li>выравнивание пола </li><li>удлинение шнуров питания</li><li>отключение и демонтаж старой техники</li><li>встраивание техники в мебель</li><li>работы по изменению конфигурации шкафов или рабочих поверхностей</li>",
			vipWorks: '<li> Выезд специалиста по городу (выезд мастера за пределы города оплачивается по действующему прайс-листу на дополнительные работы)</li><li> Распаковка и визуальная проверка техники</li><li> Проверка исправности и готовности к подключению водоснабэению, электросети и системы слива.</li><li> Снятие транспортных креплений</li><li> Установка техники на место эксплуатации и выставление по уровню в разных плоскостях </li><li> Доработка сети электроснабжения: установка розетки с заземляющим контактом; Перфорация стен или перегородок для прокладки коммуникаций; Прокладка электрического кабеля открытым способом (до 5 м.); монтажные работы в электрощитке.</li><li> Доработка системы водоснабжения: Перфорация стен (перегородок) для прокладки коммуникаций; монтаж водопроводного крана в водосеть клиента; замена/сращивание/ удлинение наливного, шланга (до 4 м.), гибкой подводки</li><li> Доработка системы канализации: замена/сращивание/удлинение, сливного шланга ( до 1 м.); организация стационарного слива</li><li> Подключение к точкам водо-, электроснабжения и системе канализации, с учетом требований производителя техники и «Правил техники безопасности»</li><li> Проверка герметичности всех соединений</li><li> Проверка работоспособности техники.</li><li> Очистка рабочей зоны </li><li> Демонстрация работы Вашей новой техники и объяснение основных функций</li><p>Материалы, входящие в стоимость Купона: Розетка "евростандарт" 16 А. для открытой проводки; вилка "евростандарт" 16 А. (разборная); автомат 16 А. / 2п. (отеч.); коробка под автомат; провод ПВС  3*1,5 мм. (белый); провод МПВ 4.0 мм (белый); крепежные изделия пластиковые зажимы для кабеля 7-8 мм; сливной шланг до 1 м.; концевик на модульный сливной шланг; крепежные хомуты "Norma","ABA" 17-28 мм.; сифон с отводом для подключения СМА и ПММ; гибкий гофрированный выпуск к сифону; патрубок прямой - d.40 (d.50) мм.;  ниппель для сращивания сливных шлангов d.19/d.21 мм. (пласт.); муфта резиновая d.50*d.73 мм.; шланг наливной пластиковый (Италия) до 4 м; подводка гибкая бронированная на воду; кран; водоотвод латунный (в сборе); тройник; переходник; муфта, бочонок.</p><p>В стоимость подключения не входит:<ul><li>выравнивание пола</li><li>работы по изменению конфигурации шкафов  или рабочих поверхностей.</li></ul></p>'
		}
	};

	var pricesObject = {
		btBT_WMВстроенная: ["1000", "1500"],
		btBT_WMСоло: ["500", "1000"],
		btBT_DWВстроенная: ["1100", "2500"],
		btBT_DWСоло: ["900", "1800"]
	};

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
			"#my-next-button",
			"#my-send-button"
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

				return text;
			})();

		// // console.log(textToSend);

		var normalPrice = pricesObject[textToSend][0] || 0;
		var vipPrice = pricesObject[textToSend][1] || 0;

		// LINK TEMPLATE на перечень работ
		var templateLinkWorks = "";

		var standartText = productObject[textToSend]["standartText"] || 0;
		var standartOptions = productObject[textToSend]["standartOptions"] || 0;
		var standartWorks = productObject[textToSend]["standartWorks"] || 0;

		document.querySelector("#normalPrice").innerHTML = normalPrice;
		document.querySelector("#standartText").innerHTML = standartText;
		document.querySelector(
			"#standartWorksToggleUl"
			).innerHTML = standartWorks;

		// Генерим LI от StandartOptions

		console.log(standartOptions[0].split("|")[0]);

		if (standartOptions) {
			for (var i = 0; i < standartOptions.length; i++) {
				var standartLi = document.createElement("li");
				var optionList = standartOptions[i].split("|");
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
				"</label></div>" +
				"<div class='small-3 column'><span id='standartCheckboxValue" +
				i +
				"'>" +
				optionList[1] +
				"</span></div></div>";
				document.querySelector("#standartLi").appendChild(standartLi);

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
							var newprice = parseInt(oldprice) - parseInt(price);
							document.querySelector(
								"#normalPrice"
								).innerHTML = newprice;
							this.className = "";
						} else {
							var oldprice = document.querySelector(
								"#normalPrice"
								).innerHTML;
							var newprice = parseInt(oldprice) + parseInt(price);
							document.querySelector(
								"#normalPrice"
								).innerHTML = newprice;
							this.className = "js-cruwl";
						}
					};
				})(myValue, parseInt(optionList[1]));
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
					"<div class='small-3 column'><span id='vipCheckboxValue" +
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

	document.querySelector(".my-send-button-class").onclick = function() {
		// #TODO: Хватит писать как мудак. Напиши обход всех  OPTION:CHECKED разом а не руками их собирай.

		var textToSend = (function() {
			var allJsCruwl = document.querySelectorAll(
				".js-cruwl option:checked"
				);
			var text = "";

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

	// INPUT PHONE MASK

	var phoneInputs = new PhoneMask(document.querySelectorAll('#my-select-phone'), {
		pattern: '(XXX) XXX XX XX',
		prefix: '+7 ',
		patternChar: 'X'
	});














};