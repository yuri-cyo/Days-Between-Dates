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
inputsDbd.isloadPage()
// inputsDbd.autoRenameDayInYear()
// inputsDbd.eTargetClick()

for (let count = 0; count < inputsDbd.$el.length; count++) {
	let iInputs = inputsDbd.$el[count]

	iInputs.addEventListener('focus', (event) => { //! event FOCUS iInputs!!!==================
		inputsDbd.inputsFocusKey(event.target, count)
		inputsDbd.autoRenameDayInYear()
		inputsDbd.changeplaceholderContent(event.target, count)
		inputsDbd.setPlaceholder(event.target, count)
		// inputsDbd.cursorPositionClick(event.target, count)

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



console.error('inputsDbd.includingFirstDay 1', inputsDbd.includingFirstDay);
console.error('inputsDbd.includingLastDay 2', inputsDbd.includingLastDay);
inputsDbd.runLocalStorage()
// if ()
// inputsDbd.dateEnd() 

inputsDbd.$btnSubmit.addEventListener('click', (e) => { //! event CLICK btnSubmit!!!===========
	inputsDbd.errorInpust()
	
	// inputsDbd.showSubmitLoadingAnimation(inputsDbd.dateStart())
	for (let count = 0; count < inputsDbd.$el.length; count++) {
		let iInputs = inputsDbd.$el[count]

		inputsDbd.validEventTargetClick(iInputs, count)

		// // inputsDbd.errorInpust()
		console.error('Number(inputsDbd.$inputM) <= 12', inputsDbd.$el[1].value <= 12 );
	}	//*================================================================================================== 
		if (inputsDbd.dateStart() !== false 
				&& inputsDbd.$el[1].value <= 12
				&& inputsDbd.$el[4].value <= 12
				) {
			console.error('inputsDbd.includingFirstDay 1', inputsDbd.includingFirstDay);
			console.error('inputsDbd.includingLastDay 2', inputsDbd.includingLastDay);
			
			const dbd = new DaysBetweenDates('.days-between-dates', {
				startDate: inputsDbd.dateStart(),
				endDate: inputsDbd.dateEnd(),
				includingFirstDay: inputsDbd.includingFirstDay,
				includingLastDay: inputsDbd.includingLastDay,
				
			})
			
			console.warn('inputsDbd.dateStart()', inputsDbd.dateStart());
			console.warn('inputsDbd.dateEnd()', inputsDbd.dateEnd());

			const errorNameClass = 'error-result-dbd' //!====
			if (inputsDbd.dateEnd() === 'error') {

				// inputsDbd.errorInpust()
				dbd.$el.classList.add(errorNameClass)
				// resultRenderHtml('.days-between-dates', {
				// 	isError: true,
				// 	errorClassName: 'error-result-dbd',
				// 	errorMessage: 'Некоректна кінцева дата!!!'
				// })
			} else {
				dbd.$el.classList.remove(errorNameClass)
			}
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
				// inputsDbd.errorInpust()
				resultRenderHtml('.days-between-dates', {
					isError: true,
					errorClassName: 'error-result-dbd',
					errorMessage: 'Початкова дата більша за кінцеву дату!'
				})
				// console.log('calendarGen calendarGen', dbd.calendarGen(2024));
			}
		} else {
			// inputsDbd.errorInpust()
		}
	
		//*=============================================================================================== 
			
	inputsDbd.ifRenderResultDbd()
	// inputsDbd.removeSubmitLoadingAnimation()
	// inputsDbd.showSubmitLoadingAnimation(inputsDbd.dateStart())
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
			// const dataRipple = data 
			// .dataset[data] = 'once'
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

