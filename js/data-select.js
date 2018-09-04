'use strict';

//////////////////
// by Michael// //
// 2018-4-14-16点34分//
//////////////////
(function () {
	function addEventListener(json) {
		json.elements.addEventListener(json.event, json.function);
	}

	function removeEventListener(json) {
		json.elements.removeEventListener(json.event, json.funtionName);
	}

	function querySelectorAll(str) {
		return document.querySelectorAll(str);
	}

	function getAttr(elements, attr) {
		return elements.getAttribute(attr);
	}

	function setAttr(elements, attr, value) {
		elements.setAttribute(attr, value);
	}

	function addClass(elements, classname) {

		var oldClass = getAttr(elements, 'class').split(' ');
		var str = '';
		var newclass = classname.indexOf(' ') >= 0 ? classname.split(' ') : [classname];
		oldClass = oldClass.concat(newclass);
		for (var i = 0; i < oldClass.length; i++) {
			if (oldClass[i]) {
				i == 0 ? str += oldClass[i] : str += ' ' + oldClass[i];
			}
		}
		setAttr(elements, 'class', str);
	}

	function removeClass(elements, classname) {

		var oldClass = getAttr(elements, 'class').split(' ');
		var str = '';

		var newclass = classname.indexOf(' ') >= 0 ? classname.split(' ') : [classname];
		for (var i = 0; i < newclass.length; i++) {

			for (var j = 0; j < oldClass.length; j++) {
				if (newclass[i] == oldClass[j]) {
					oldClass[j] = '';
				}
			}
		}
		for (var i = 0; i < oldClass.length; i++) {
			if (oldClass[i]) {
				i == 0 ? str += oldClass[i] : str += ' ' + oldClass[i];
			}
		}

		setAttr(elements, 'class', str);
	}

	function isDate(yaer, month, day) {
		if (!day) {
			if (day == 0) {
				return false;
			}
			return isMonth(month);
		} else {
			return isMonth(month) && isDay(day);
		}
	}
	//判断日期是否为正常日期

	function isMonth(month) {
		if (month >= 0 && month <= 11) {
			return true;
		} else {
			return false;
		}
	}
	//判断月份是否为正常日期

	function isDay(day) {
		if (day >= 1 && day <= 31) {
			return true;
		} else {
			return false;
		}
	}
	//判断天数是否为正常日期


	function getweek(year, month, day) {
		if (isDate(year, month, day)) {
			return day ? new Date(year, month, day).getDay() : new Date(year, month, 1).getDay();
			// 0代表周日 1 -- 6
		} else {
			return 'error Date';
		}
	}
	//获取今天是周几


	function monthday(year, month) {
		if (isDate(year, month)) {
			if (isleap(year) && month === 1) {
				return 29;
			} else {
				if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
					return 31;
				} else {
					if (month == 1) {
						return 28;
					} else {
						return 30;
					}
				}
			}
		} else {
			return 'error Date';
		}
	}
	//获取这个月有多少天


	function previousMonthDay(year, month) {
		if (isDate(year, month)) {
			return month == 0 ? monthday(year - 1, 11) : monthday(year, month - 1);
		} else {
			return 'error Date';
		}
	}
	//上个月的天数

	function nextMonthDay(year, month) {
		if (isDate(year, month)) {
			return month == 11 ? monthday(year + 1, 0) : monthday(year, month + 1);
		} else {
			return 'error Date';
		}
	}
	//下个月的天数

	function previousDate(year, month) {
		if (isDate(year, month)) {
			return month == 0 ? [year - 1, 11] : [year, month - 1];
		} else {
			return 'error Date';
		}
	}
	//上个月是几月份

	function nextDate(year, month) {
		if (isDate(year, month)) {
			return month == 11 ? [year + 1, 0] : [year, month + 1];
		} else {
			return 'error Date';
		}
	}
	//下个月是几月份

	function isleap(year) {
		return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	}
	//是否闰年

	function prevMonth(yaer, month) {
		var newdate = previousDate(yaer, month);
		setAttr(querySelectorAll('.date-select-container')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1]);
	}
	//绑定事件上一个月


	function nextMonth(yaer, month) {
		var newdate = nextDate(yaer, month);
		setAttr(querySelectorAll('.date-select-container')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1]);
	}
	//绑定事件下一个月

	function prevYear(yaer, month) {
		var newdate = [yaer - 1, month];
		setAttr(querySelectorAll('.date-select-container')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1]);
	}

	function nextYear(yaer, month) {
		var newdate = [yaer + 1, month];
		setAttr(querySelectorAll('.date-select-container')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1]);
	}

	function format(str) {
		if (str == null || str == '') {
			return '';
		}
		var arry = str.split('-');
		for (var i = 0; i < arry.length; i++) {
			arry[i] = parseInt(arry[i]);
		}
		return arry;
	}
	//格式化日期

	function renderSelected() {
		var startDate = format(getAttr(querySelectorAll('.date-select-container')[0], 'select_date'));
		var elementsList = querySelectorAll('.date-select-container .day-container .row .day.is-select');
		if (startDate == '') return;
		for (var i = 0; i < elementsList.length; i++) {
			var temp = format(getAttr(elementsList[i], 'date'));
			if (new Date(startDate[0], startDate[1], startDate[2]) - new Date(temp[0], temp[1], temp[2]) == 0) {
				addClass(elementsList[i], 'select_date');
			} else {
				removeClass(elementsList[i], 'select_date');
			}
		}
	}

	function renderYearMonth(year, month) {

		var domElements = querySelectorAll('.date-select-container .date-container .date')[0];

		var str = year + '年' + (month + 1) + '月';
		domElements.innerHTML = str;
		setAttr(domElements, 'currentDate', year + '-' + month);
	}
	// 渲染标题年月份

	function renderDays(target, yaer, month) {
		var firstWeek = getweek(yaer, month),
			totalDays = monthday(yaer, month),
			prevMonthDays = previousMonthDay(yaer, month),
			prevdate = previousDate(yaer, month),
			nextdate = nextDate(yaer, month),
			count = 0,
			elements = '',
			child = '',
			i = 1;
		//2018法定节假日
		var holiday = ['2018,1,1', '2018,2,15', '2018,2,16', '2018,2,17', '2018,2,18', '2018,2,19', '2018,2,20', '2018,2,21', '2018,4,5', '2018,4,6', '2018,4,7', '2018,4,29', '2018,4,30', '2018,5,1', '2018,6,16', '2018,6,17', '2018,6,18', '2018,9,22', '2018,9,23', '2018,9,24', '2018,10,1', '2018,10,2', '2018,10,3', '2018,10,4', '2018,10,5', '2018,10,6', '2018,10,7'],
			mark = {
				'1-1': '元旦',
				'2-14': '情人',
				'3-8': '妇女',
				'3-12': '植树',
				'4-1': '愚人',
				'5-1': '劳动',
				'5-4': '青年',
				'6-1': '儿童',
				'9-10': '教师',
				'10-1': '国庆',
				'12-25': '圣诞'
			};
		//法定节假日时间


		for (; i <= firstWeek; i++) {
			if (count % 7 == 0 && 1 != i) {
				elements += '<div class="row">' + child + '</div>';
				child = '';
			}
			// child += '<div class="day" date="' + prevdate[0] + '-' + prevdate[1] + '-' + (prevMonthDays - firstWeek + i) + '"><span>' + (prevMonthDays - firstWeek + i) + '</span></div>';
			child += '<div class="day is-disbled"><span></span></div>';
			//把上个月的天数渲染成空
			count++;
		}
		for (i = 1; i <= totalDays; i++) {
			// if (count % 7 == 0 && firstWeek == 0 && 1 != i) {
			if (count % 7 == 0 && 1 != i) {
				elements += '<div class="row">' + child + '</div>';
				child = '';
			}
			///
			var holiday_str = '';
			for (var index = 0; index < holiday.length; index++) {
				var temp = holiday[index].split(',');
				if (new Date(yaer, month, i) - new Date(temp[0] - 0, temp[1] - 1, temp[2] - 0) == 0) {

					//判断节日
					mark[month + 1 + '-' + i] == undefined ? holiday_str = '<div class="day is-jia is-disbled" date="' + yaer + '-' + month + '-' + i + '"><span>' + i + '</span></div>' : holiday_str = '<div class="day is-jia is-disbled" date="' + yaer + '-' + month + '-' + i + '"><span>' + mark[month + 1 + '-' + i] + '</span></div>';

					break;
				}
			}
			if (holiday_str != '') {
				child += holiday_str;
			} else {
				// child += '<div class="day is-disbled" date="' + yaer + '-' + month + '-' + i + '"><span>' + i + '</span></div>';
				mark[month + 1 + '-' + i] == undefined ? child += '<div class="day is-disbled" date="' + yaer + '-' + month + '-' + i + '"><span>' + i + '</span></div>' : child += '<div class="day is-disbled" date="' + yaer + '-' + month + '-' + i + '"><span>' + mark[month + 1 + '-' + i] + '</span></div>';
			}
			//判断是否是2018年法定节假日


			count++;
		}
		for (; count % 7 != 0; count++) {
			// child += '<div class="day" date="' + nextdate[0] + '-' + nextdate[1] + '-' + (i - totalDays) + '"><span>' + (i - totalDays) + '</span></div>';
			child += '<div class="day is-disbled"><span></span></div>';
			//把下个月的也渲染成空
			i++;
		}
		elements += '<div class="row">' + child + '</div>';

		target.innerHTML = elements;
	}
	//渲染Days


	function renderDomElements() {
		var date = format(getAttr(querySelectorAll('.date-select-container')[0], 'currentDate'))
		renderYearMonth(date[0], date[1]);
		renderDays(querySelectorAll('.date-select-container .day-container')[0], date[0], date[1]);
		addSelect();
	}
	//渲染骨架


	function addSelect() {
		var i = 0;
		var domElements = querySelectorAll('.date-select-container .day-container .row .day');
		var today = format(getAttr(querySelectorAll('.date-select-container')[0], 'today'));
		for (; i < domElements.length; i++) {
			var className = getAttr(domElements[i], 'class');
			if (!className) {
				continue;
			}
			if (className.indexOf('day') >= 0) {
				//默认全部不可选加上select则为可选
				var date = format(getAttr(domElements[i], 'date'));
				if (new Date(date[0], date[1], date[2]) > new Date(today[0], today[1], today[2])) {
					addClass(domElements[i], 'is-select');
				} else {
					if (date[0] == today[0] && date[1] == today[1] && date[2] == today[2]) {
						addClass(domElements[i], 'is-select');
						//today 没用到
					}
				}
			}
		}
	}
	//添加可选日期

	function bindEvent() {
		//绑定事件
		addEventListener({
			elements: querySelectorAll('.date-select-container .date-container .arrow-left')[0],
			event: 'click',
			function: function _function() {
				var date = format(getAttr(querySelectorAll('.date-select-container')[0], 'currentDate'));
				prevMonth(date[0], date[1]);
				renderSelected();
			}

		});
		addEventListener({
			elements: querySelectorAll('.date-select-container .date-container .arrow-right')[0],
			event: 'click',
			function: function _function() {
				var date = format(getAttr(querySelectorAll('.date-select-container')[0], 'currentDate'));
				nextMonth(date[0], date[1]);
				renderSelected();
			}
		});

		// addEventListener({

		// 	elements: querySelectorAll('.date-select-container .day-container')[0],
		// 	event: 'click',
		// 	function: function _function(e) {
		// 		var taggetElement = e.path.find(function (value, index) {
		// 			if (value.className.indexOf('day-container') >= 0) {
		// 				return null;
		// 			} else {
		// 				if (value.className.indexOf('is-disbled') >= 0) {
		// 					return value;
		// 				}
		// 			}
		// 		});
		// 		if (taggetElement.className.indexOf('is-select') >= 0) {
		// 			//判断当前日期是否可以选择
		// 			// addClass(taggetElement, 'today')
		// 			setAttr(querySelectorAll('.date-select-container')[0], 'select_date', getAttr(taggetElement, 'date'));
		// 			renderSelected();
		// 		}
		// 	}

		// });
		$('.date-select-container .day-container').on('click', '.is-select', function () {
			setAttr(querySelectorAll('.date-select-container')[0], 'select_date', getAttr(this, 'date'));
			renderSelected();

		})
	}

	function init() {
		var nowdate = new Date();
		var initY = parseInt(nowdate.getFullYear());
		var initM = parseInt(nowdate.getMonth());
		//0是值一月份
		var initD = parseInt(nowdate.getDate());
		var initH = parseInt(nowdate.getHours());
		var initI = parseInt(nowdate.getMinutes());
		var initS = parseInt(nowdate.getSeconds());

		setAttr(querySelectorAll('.date-select-container')[0], 'currentDate', initY + '-' + (initM+2));
		setAttr(querySelectorAll('.date-select-container')[0], 'today', initY + '-' + initM + '-' + initD);

		renderDomElements();
		bindEvent();
	}
	if (querySelectorAll('.date-select-container .day-container').length != 0) {
		init();
	}
	//today属性没有使用到
})();