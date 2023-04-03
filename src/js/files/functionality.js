import { resultRenderHtml } from "./resultRender.js";
import { DaysBetweenDates } from "./DaysBetweenDates.js";
import { contentDefault } from "./resultRender.js";
export class InputsDbd {
	constructor(selector) {
		this.$el = document.querySelectorAll(selector);

		this.$dbdTextRender = document.querySelector('.days-between-dates')

		this.$btnSubmit = document.querySelector('.main__btn-submit')
		this.btnsSettings = document.querySelector('.main__settings')

		this.$inputD = document.getElementById('dateStartD');
		this.$inputM = document.getElementById('dateStartM');
		this.$inputY = document.getElementById('dateStartY');

		this.memoryInputsStart = ''
		this.memoryInputsEnd = ''
		this.trueMaxD //! правильна к-сть днів в місяці якщо нам відомо міс. і р.
		this.trueMaxDEnd //! правильна к-сть днів в місяці якщо нам відомо міс. і р.

		this.$inputEndD = document.getElementById('dateEndD');
		this.$inputEndM = document.getElementById('dateEndM');
		this.$inputEndY = document.getElementById('dateEndY');

		this.currentEndD = this.formatDateTwoNum(new Date().getDate())
		this.currentEndM = this.formatDateTwoNum(new Date().getMonth() + 1)
		this.currentEndY = new Date().getFullYear()
		
		this.$inputEndD.placeholder = this.currentEndD;
		this.$inputEndM.placeholder = this.currentEndM;
		this.$inputEndY.placeholder = this.currentEndY;
		
		this.currentDate = `${this.currentEndD}.${this.currentEndM}.${this.currentEndY}`

		this.$checkedFirstDay = document.querySelector(`[data-input-setting="first-day"]`)
		this.$checkedLastDay = document.querySelector(`[data-input-setting="last-day"]`)

		this.includingFirstDay = false
		this.includingLastDay = false

		this.isLoad = false 
		window.addEventListener('load', ()=> {
			this.isLoad = true
		})

		this.resultDbdVisible = false;
	} 

	changeplaceholderContent(eventTargetInput, count) {
		if (count >= 3 && count <= 6) {
			if (eventTargetInput.value !== ''
				|| this.$inputEndD.value !== ''
				|| this.$inputEndM.value !== ''
				|| this.$inputEndY.value !== ''
				) {
				this.$inputEndD.placeholder = 'дд'
				this.$inputEndM.placeholder = 'мм'
				this.$inputEndY.placeholder = 'рррр'
			} else if (this.$inputEndD.value === ''
			&& this.$inputEndM.value === ''
			&& this.$inputEndY.value === ''){
				this.$inputEndD.placeholder = this.currentEndD;
				this.$inputEndM.placeholder = this.currentEndM;
				this.$inputEndY.placeholder = this.currentEndY;
			}
		}
	}

	validEventTargetInput(eventTargetInput, count) {
		const eValue = eventTargetInput.value;

		if (count === 2 || count === 5) {

			eventTargetInput.value = eValue.replace(/(.{4})./, '$1').replace(/[^\d]/g, '')
			if (this.$el[count].value.length >= 4) {
				if (count + 1 < 4) {
					this.$el[count + 1].focus();
				}
			}
		} else {
			eventTargetInput.value = eValue.replace(/(.{2})./, '$1').replace(/[^\d]/g, '')
			if (this.$el[count].value.length >= 2) {
				this.$el[count + 1].focus();
			}

			if (count === 0 
				|| count === 3 
				&& this.isLoad === true
				&& this.$inputM.value === ''
				&& this.$inputY.value === '') {

				if (Number(eventTargetInput.value) > 31) {
					this.colorErrorInputOverDate(eventTargetInput, '31', 'red', 'black', count)
				}
				if (eventTargetInput.value === '00') {
					this.colorErrorInputOverDate(eventTargetInput, '01', 'red', 'black', count)
				}
				
			}

			if (count === 1 || count === 4) {
				if (eventTargetInput.value === '00') {
					this.colorErrorInputOverDate(eventTargetInput, '01', 'red', 'black', count)
				}
				if (Number(eventTargetInput.value) > 12) {
					this.colorErrorInputOverDate(eventTargetInput, '12', 'red', 'black', count)
				}
			}
		}
	}

	autoRenameDayInYear() {
		if (this.$inputD.value.length === 2 
				&& this.$inputM.value.length === 2 
				&& this.$inputY.value.length === 4

				|| this.$inputEndD.value.length === 2
				&& this.$inputEndM.value.length === 2
				&& this.$inputEndY.value.length === 4) {

			const d = Number(this.$inputD.value)
			const m = Number(this.$inputM.value)
			const y = Number(this.$inputY.value)

			const dEnd = Number(this.$inputEndD.value)
			const mEnd = Number(this.$inputEndM.value)
			const yEnd = Number(this.$inputEndY.value)

			const calendarGen = (year, index)=> {
				const daysArray = [];
		
				for (let i = 0; i < 12; i++) {
					const daysInMonth = new Date(year, i + 1, 0).getDate();
					daysArray.push(daysInMonth);
				}
				return daysArray[index];
			}
	
			if (this.$inputM.value !== '' && this.$inputY.value !== '') {
				let onlineInputsStart = `${this.$inputM.value}${this.$inputY.value}`
				
				if (onlineInputsStart !== this.memoryInputsStart) {
					this.memoryInputsStart = `${this.$inputM.value}${this.$inputY.value}`
					this.trueMaxD = calendarGen(y, m - 1)
				}
			} else {
				this.memoryInputsStart === ''
			}

			if (this.memoryInputsEnd[0] !== this.$inputEndM.value
				|| this.memoryInputsEnd[1] !== this.$inputEndY.value) {
					this.memoryInputsEnd = [this.$inputEndM.value, this.$inputEndY.value]
					this.trueMaxDEnd = calendarGen(yEnd, mEnd - 1)		
				}
			
			if (Number(this.$inputD.value) > this.trueMaxD ) {
				this.$inputD.style.color = 'red';
				setTimeout(() => {
					this.$inputD.value = this.trueMaxD
					this.$inputD.style.color = 'green'
					localStorage.setItem('inputD', this.trueMaxD)
					setTimeout(() => {
						this.$inputD.style.color = 'black'
					}, 1000);
				}, 200);
			}
			
			if (Number(this.$inputEndD.value) >= this.trueMaxDEnd) {
				this.$inputEndD.value = this.trueMaxDEnd
				localStorage.setItem('inputEndD', this.$inputEndD.value)
			}
		}
	}

	runSetItemLS(count, $element) {
			switch (count) {
			case 0:
				localStorage.setItem('inputD', $element)
				break;
			case 1:
				localStorage.setItem('inputM', $element)
				break;
			case 2:
				localStorage.setItem('inputY', $element)
				break;

			case 3:
				localStorage.setItem('inputEndD', $element)
				break;
			case 4:
				localStorage.setItem('inputEndM', $element)
				break;
			case 5:
				localStorage.setItem('inputEndY', $element)
				break;
		}
	}

	ifRenderResultDbd() {
		const resultDbd = document.querySelector('.result-render-dbd');
		if (resultDbd) {
			this.resultDbdVisible = true;
			localStorage.setItem('resultDbdVisible', this.resultDbdVisible)
		} else {
			this.resultDbdVisible = false;
			localStorage.setItem('resultDbdVisible', this.resultDbdVisible)
		}
	}

	colorErrorInputOverDate($el, rplc, colorEror, color, count) {
		$el.style.color = colorEror
			setTimeout(()=> {
				$el.style.color = 'green'
				$el.value = $el.value.replace(/\d+/, rplc)
				// localStorage.setItem('inputD', $el.value)
				this.runSetItemLS(count, $el.value)
				setTimeout(() => {
					$el.style.color = color
				}, 1000);
			}, 200)
	}

	inputsFocusKey(eventTargetInput, count) {
		// this.countBackspace = 0
		let countBackspacePositionZero = 0
		let countKeyLeft = 0
		let countKeyRight = 0

		const cursorPosition = eventTargetInput.selectionStart;
		eventTargetInput.setSelectionRange(cursorPosition, cursorPosition);


		eventTargetInput.addEventListener('blur', function(e) {
			const changeFirstStr = (str)=> {
				eventTargetInput.value = eventTargetInput.value.replace(/^(\d)$/, `${str}$1`)
			}

			if (eventTargetInput.value.length === 1 
				&& count === 0 
				|| count === 1 
				|| count === 3 
				|| count === 4 
				) {
					changeFirstStr('0')
			}
			
			if (count === 2 || count === 5) {
				if (Number(eventTargetInput.value) >= 10 
					&& Number(eventTargetInput.value) <= 29 
					&& eventTargetInput.value.length === 2) {
						eventTargetInput.value = eventTargetInput.value.replace(/^/, `20`)
					}
				if (Number(eventTargetInput.value) >= 30 
					&& Number(eventTargetInput.value) <= 99 
					&& eventTargetInput.value.length === 2) {
						eventTargetInput.value = eventTargetInput.value.replace(/^/, `19`)
					}

				}
			
			switch (count) {
				case 0:
					localStorage.setItem('inputD', e.target.value)
					break;
				case 1:
					localStorage.setItem('inputM', e.target.value)
					break;
				case 2:
					localStorage.setItem('inputY', e.target.value)
					break;

				case 3:
					localStorage.setItem('inputEndD', e.target.value)
					break;
				case 4:
					localStorage.setItem('inputEndM', e.target.value)
					break;
				case 5:
					localStorage.setItem('inputEndY', e.target.value)
					break;
			}
		});

		eventTargetInput.addEventListener('keyup', (e)=> {
			if (e.keyCode === 8 && e.target.selectionStart === 0) { //! Backspace key
				countBackspacePositionZero += 1

				if (count - 1 !== -1 && countBackspacePositionZero === 2) {
					this.$el[count - 1].focus();
					const lastSymbol = this.$el[count - 1].value.length
					this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol)
					countBackspacePositionZero = 0
				}
				
			} else {
				countBackspacePositionZero = 0
			}
			
			//======================================================================

			if (e.keyCode === 13) { //! Enter key
				e.target.blur()
				window.addEventListener('unload', function() {
					e.target.blur();
				})
				this.$btnSubmit.click()
			}
			
			if (e.keyCode === 37 && e.target.selectionStart === 0) { //! <- key

				countKeyLeft += 1
				countKeyRight = 0

				if (count - 1 !== -1 && countKeyLeft === 2) {
					countKeyLeft = 0
					this.$el[count - 1].focus();
					const lastSymbol = this.$el[count - 1].value.length
					this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol)
				}
				
			} else {
				countKeyLeft = 0
			} 

			if (e.keyCode === 39 && e.target.selectionStart === e.target.value.length) { //! -> key
				countKeyRight += 1
				countKeyLeft = 0
				if (count - 1 !== 4 && countKeyRight === 2) {
					countKeyRight = 0
					this.$el[count + 1].focus();
					this.$el[count + 1].setSelectionRange(0, 0)
				}

			} else {
				countKeyRight = 0
			}
		})
	}

	escapeFromFocusInputUnload() {
		this.$el.forEach(elem => {
			window.addEventListener('unload', ()=> {
				elem.blur();
			})
		});
	}

	eTargetClick() {
		document.addEventListener('click', (event) => {
			return event.target
		})
	}

	validEventTargetClick(eventTargetClick, count) {
		const value = eventTargetClick.value;
		
		if (count === 2 || count === 5) {
			eventTargetClick.value = value.slice(0, 4)
		} else {
			eventTargetClick.value = value.slice(0, 2)
		}
	}

	setLoadLocalStorage($elem, key) {
		$elem.addEventListener('blur', ()=> {
			localStorage.setItem(key, $elem.value);

		})
		$elem.addEventListener('input', () => {
			localStorage.setItem(key, $elem.value);
		});

		window.addEventListener('load', () => {
			$elem.value = localStorage.getItem(key);
			contentDefault('.days-between-dates')
		});
	}

	afterLocalStorageRun() {
		window.addEventListener('load', () => {
			if (this.dateStart() !== false && localStorage.getItem('resultDbdVisible') === 'true') {
					this.$btnSubmit.click();
				}
		})
	}

	loadLocalStorageCheackbox(key, $elem, includingDays) {
		window.addEventListener('load', () => {
			const incDay = localStorage.getItem(key)
		
			if (incDay === 'false') {
				$elem.checked = false
				includingDays = false
			}
			if (incDay === 'true') {
				$elem = true
				includingDays = true
			}
		});
	}

	runLocalStorage() {
		this.setLoadLocalStorage(this.$inputD, 'inputD')
		this.setLoadLocalStorage(this.$inputM, 'inputM')
		this.setLoadLocalStorage(this.$inputY, 'inputY')

		this.setLoadLocalStorage(this.$inputEndD, 'inputEndD')
		this.setLoadLocalStorage(this.$inputEndM, 'inputEndM')
		this.setLoadLocalStorage(this.$inputEndY, 'inputEndY')

		this.loadLocalStorageCheackbox('includingFirstDay', this.$checkedFirstDay, this.includingFirstDay)
		this.loadLocalStorageCheackbox('includingLastDay', this.$checkedLastDay, this.includingLastDay)

		this.afterLocalStorageRun()

		return this
	}

	localStorageClear(mod) {
		if (mod === 'start') {
			localStorage.removeItem('inputD');
			localStorage.removeItem('inputM');
			localStorage.removeItem('inputY');

		} else if (mod === 'end') {
			localStorage.removeItem('inputEndD');
			localStorage.removeItem('inputEndM');
			localStorage.removeItem('inputEndY');
		}
	}

	formatDateTwoNum(liveDate) {
		liveDate += ''
		if (liveDate.length === 1) {
			return liveDate = '0' + liveDate
		} else {
			return Number(liveDate)
			} 
		}

	dateStart() {
		if (this.$inputD.value !== ''
		&& this.$inputM.value !== ''
		&& this.$inputY.value !== ''
		&& this.$inputD.value.length === 2
		&& this.$inputM.value.length === 2
		&& this.$inputY.value.length === 4) {
			return `${this.$inputD.value}.${this.$inputM.value}.${this.$inputY.value}`
		} else {
			return false
		}
	}

	dateEnd() {
		if (this.isLoad === true) {
			if (this.$inputEndD.value !== ''
			&& this.$inputEndM.value !== ''
			&& this.$inputEndY.value !== ''
			&& this.$inputEndD.value.length === 2
			&& this.$inputEndM.value.length === 2
			&& this.$inputEndY.value.length === 4) {
				return `${this.$inputEndD.value}.${this.$inputEndM.value}.${this.$inputEndY.value}`
			} else if (this.$inputEndD.value === ''
						&& this.$inputEndM.value === ''
						&& this.$inputEndY.value === ''){
				return 'current'
			} else if (this.$inputEndD.value.length !== 2
						|| this.$inputEndM.value.length !== 2
						|| this.$inputEndY.value.length !== 4){
				return 'error'
			}
		}
	}

	eventBtns() {
		const $elBtns = document.querySelectorAll('.btn')
		const $dbd = document.querySelector('.days-between-dates')
		const resultDbd = document.querySelector('.result-render-dbd');
		$elBtns.forEach((i)=> {
			i.addEventListener('click', (e)=> {
				if (e.target.closest(`[data-btn="clear-start"]`)) {
					this.$inputD.value = '';
					this.$inputM.value = '';
					this.$inputY.value = '';
					
					this.localStorageClear('start')
					this.ifRenderResultDbd()
				// } else if (e.target.dataset.btn === 'clear-end') {
				} else if (e.target.closest(`[data-btn="clear-end"]`)) {
					this.$inputEndD.value = '';
					this.$inputEndM.value = '';
					this.$inputEndY.value = '';

					this.$inputEndD.placeholder = this.currentEndD;
					this.$inputEndM.placeholder = this.currentEndM;
					this.$inputEndY.placeholder = this.currentEndY;

					this.localStorageClear('end')
					this.ifRenderResultDbd()
				} else if (e.target.closest(`[data-btn="clear-result"]`)) {
						contentDefault('.days-between-dates')
						this.resultDbdVisible = false
						localStorage.setItem('resultDbdVisible', this.resultDbdVisible)
					}
			})
		})
	}

	setPlaceholder(evenTarget, count) {
		const originalPlaceholder = evenTarget.getAttribute('placeholder');

		if (evenTarget.getAttribute('placeholder') === originalPlaceholder) {
			evenTarget.setAttribute('placeholder', '');
		}
		evenTarget.addEventListener('blur', () => {
			if (evenTarget.getAttribute('placeholder') === '') {
				evenTarget.setAttribute('placeholder', originalPlaceholder);
			}
		})
	}


	setChekbox() {
		const classNameChecked = 'checked'

			if (this.$checkedFirstDay.checked === true || localStorage.getItem('includingFirstDay') === 'true') {
				this.$checkedFirstDay.parentNode.classList.add(classNameChecked)
				this.includingFirstDay = true
			} 
			if (this.$checkedFirstDay.checked === false || localStorage.getItem('includingFirstDay') === 'false') {
				this.$checkedFirstDay.parentNode.classList.remove(classNameChecked)
				this.includingFirstDay = false
			}
			
			if (this.$checkedLastDay.checked === true || localStorage.getItem('includingLastDay') === 'true') {
				this.$checkedLastDay.parentNode.classList.add(classNameChecked)
				this.includingLastDay = true
			} 
			if (this.$checkedLastDay.checked === false || localStorage.getItem('includingLastDay') === 'false') {
				this.$checkedLastDay.parentNode.classList.remove(classNameChecked)
				this.includingLastDay = false
			}

		this.btnsSettings.addEventListener('input', (e)=> {
			const setClassNameChekbox = (dataName, includingDay) => {
				if (e.target.dataset.inputSetting === dataName) {
					if (e.target.checked) {
						e.target.parentNode.classList.add(classNameChecked)

						if (includingDay === 1) {
							this.includingFirstDay = true
							localStorage.setItem('includingFirstDay', this.includingFirstDay);
						}
						if (includingDay === 2) {
							this.includingLastDay = true
							localStorage.setItem('includingLastDay', this.includingLastDay);
						}

					} else {
						e.target.parentNode.classList.remove(classNameChecked)
						if (includingDay === 1) {
							this.includingFirstDay = false
							localStorage.setItem('includingFirstDay', this.includingFirstDay);
						}
						if (includingDay === 2) {
							this.includingLastDay = false
							localStorage.setItem('includingLastDay', this.includingLastDay);
						}
					}
				}
			}

			setClassNameChekbox('first-day', 1)
			setClassNameChekbox('last-day', 2)
		})
	}

	errorInpust() {
		let countItems = 0
		const errorNameClass = 'error-result-dbd'
		

		this.$el.forEach((i)=> {
			countItems += 1
			
			const errorInput = (mod, err)=> {
				i.classList.add('error-inputs')
				contentDefault('.days-between-dates')

				i.addEventListener('animationend', () => {
					i.classList.remove('error-inputs');
				});
				
				if (mod === 'Error > 13M') {
					resultRenderHtml('.days-between-dates', {
						isError: true,
						errorClassName: 'error-result-dbd',
						errorMessage: 'Кількість місяців у році не може перевищувати 12!'
					})
				} 
			}
			
			if (this.isLoad === true) {
				if (countItems === 2 && Number(i.value) > 12
					|| countItems === 5 && Number(i.value) > 12) {

					errorInput('Error > 13M', i.value)
				}
	
				if (this.dateStart() === false) {
					if (i.value.length < 2 && countItems <= 2) { //! errorInpust Start date
						errorInput()
					} else if (i.value.length < 4 && countItems === 3) {
						errorInput()
					}
				}
	
				if (this.dateEnd() === 'error') {
					if (i.value.length < 2 && countItems >= 4 && countItems <= 5) { //! errorInpust End date

					errorInput()
					} else if (i.value.length < 4 && countItems === 6) {
						// this.$dbdTextRender.innerHTML = 'Помилка введення!!!'
						errorInput()
					}
				}
			}
		}) 
	}

	scrollToElem() {
		this.$btnSubmit.addEventListener('click', () => {
			const sparkPlan = document.querySelector('.result-render-dbd');
		//   const sparkPlanBottom = sparkPlan.offsetTop - sparkPlan.offsetHeight;
		if (sparkPlan) {
				const sparkPlanBottom = sparkPlan.offsetTop - 30
				window.scrollTo({
					top: sparkPlanBottom,
					behavior: 'smooth'
				});

			}
		});
	}
}