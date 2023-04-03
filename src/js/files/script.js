// Подключение функционала "Чертогов Фрилансера"
//* import { isMobile } from "./functions.js";
// Подключение списка активных модулей
//* import { flsModules } from "./modules.js";

import { DaysBetweenDates } from "./DaysBetweenDates.js";
import { InputsDbd } from "./functionality.js";
import { resultRenderHtml } from "./resultRender.js";

//* ======================================================================

const inputsDbd = new InputsDbd('.main__input');

inputsDbd.runLocalStorage()
inputsDbd.eventBtns()

for (let count = 0; count < inputsDbd.$el.length; count++) {
	let iInputs = inputsDbd.$el[count];

	iInputs.setAttribute("inputmode", "numeric")

	iInputs.addEventListener('focus', (event) => { //! event FOCUS iInputs!!!==================
		inputsDbd.inputsFocusKey(event.target, count)
		inputsDbd.autoRenameDayInYear()
		inputsDbd.changeplaceholderContent(event.target, count)
		inputsDbd.setPlaceholder(event.target, count)
	})
	iInputs.addEventListener('input', (event) => { //! event INPUT iInputs!!!=================
		inputsDbd.validEventTargetInput(event.target, count)
		inputsDbd.autoRenameDayInYear()
		inputsDbd.changeplaceholderContent(event.target, count)
	})
	window.addEventListener('load', ()=> { //! event LOAD iInputs!!!=================
		inputsDbd.autoRenameDayInYear()
		inputsDbd.validEventTargetInput(iInputs, count)
		inputsDbd.changeplaceholderContent(iInputs, count)
	})
}

inputsDbd.setChekbox()
inputsDbd.runLocalStorage()

inputsDbd.$btnSubmit.addEventListener('click', (e) => { //! event CLICK btnSubmit!!!===========
	inputsDbd.errorInpust()
	
	for (let count = 0; count < inputsDbd.$el.length; count++) {
		let iInputs = inputsDbd.$el[count]

		inputsDbd.validEventTargetClick(iInputs, count)
	}	
	
	//*================================================================================================== 
	if (inputsDbd.dateStart() !== false && inputsDbd.$el[1].value <= 12 && inputsDbd.$el[4].value <= 12) {
		const dbd = new DaysBetweenDates('.days-between-dates', {
			startDate: inputsDbd.dateStart(),
			endDate: inputsDbd.dateEnd(),
			includingFirstDay: inputsDbd.includingFirstDay,
			includingLastDay: inputsDbd.includingLastDay
		})
		const errorNameClass = 'error-result-dbd' //!====

		if (dbd.errorMessage() !== false ) {
			resultRenderHtml('.days-between-dates', {
				isError: false,
				totalDays: dbd.totalDays(),
				starDate: inputsDbd.dateStart(),
				endDate: inputsDbd.dateEnd(),
				curentData: inputsDbd.currentDate,
				years: dbd.calcYear,
				months: dbd.calcMonths,
				days: dbd.calcDays,
				includingFirstDay: inputsDbd.includingFirstDay
			})
		} else if (dbd.errorMessage() === false && inputsDbd.dateEnd() !== 'error') {
			resultRenderHtml('.days-between-dates', {
				isError: true,
				errorClassName: 'error-result-dbd',
				errorMessage: 'Початкова дата більша за кінцеву дату!'
			})
		}
	} 
		//*=============================================================================================== 
		inputsDbd.ifRenderResultDbd()
		inputsDbd.scrollToElem()
})
	
inputsDbd.escapeFromFocusInputUnload()


//!====================================RIPPLE Button================================

function btnRipleEffect(data, className) {
	document.addEventListener("click", function (e) {
		const targetItem = e.target
		if (targetItem.closest(`[data-${data}]`)) {
	
			const button = targetItem.closest(`[data-${data}]`);
			const ripple = document.createElement('span');
			const diameter = Math.max(button.clientWidth, button.clientHeight);
			const radius = diameter / 2;
			
			ripple.style.width = ripple.style.height = `${diameter}px` ;
			ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
			ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
			ripple.classList.add(className);
	
			//! Налаштування: якщо дописати в HTML data-ripple="once", то анімація не накладується!!!

			button.dataset['ripple'] = 'once' && button.querySelector(`.${className}`) ?
				button.querySelector(`.${className}`).remove() : null;
	
			button.appendChild(ripple);
	
			const timeOut = getAnimationDuration(ripple);
	
			setTimeout(() => {
	
			ripple ? ripple.remove() : null;
			}, timeOut)
	
			function getAnimationDuration() {
				const aDuration = window.getComputedStyle(ripple).animationDuration;
				return aDuration.includes('ms') ?
					aDuration.replace("ms", '') : aDuration.replace("s", '') * 1000;
			}
		} 
	})
}

btnRipleEffect('ripple', 'ripple')
btnRipleEffect('ripple-clear', 'ripple-clear')
btnRipleEffect('input-ripple-clear', 'ripple-clear')