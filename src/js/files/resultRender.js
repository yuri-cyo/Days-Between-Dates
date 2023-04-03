import anime from "animejs";

let isLoad = false;
window.addEventListener('load', ()=> {
	isLoad = true
})

export let isResult = false;

export function contentDefault(selector) {
		if (isLoad === true && document.querySelector('.content-here__wrapper') === null) {
			const $el = document.querySelector(selector)
		
			$el.innerHTML = ''
			
			$el.insertAdjacentHTML('beforeend', `
			<div class="content-here__wrapper">
			<span class="_icon-content content-here__icon"></span>
			</div>
			`)

			document.querySelector('.content-here__wrapper').style.transform = 'scale(0)'
			anime({
				targets: '.content-here__wrapper',
				scale: {
					value: 1,
					duration: 700,
					// easing: 'easeInOutExpo'
				},
			});
		}
	
}
contentDefault('.days-between-dates')

export function resultRenderHtml(selector, options) {
	
	const $el = document.querySelector(selector)

	let currentOrSetEndDate = ''

	if (options.endDate === 'current') {
		currentOrSetEndDate = options.curentData
	} else {
		currentOrSetEndDate = options.endDate
	}

	function incldFirstDayRender() {
		if (options.includingFirstDay === true) {
			return `(включно)`
		} else {
			return ``
		}
	}

	if (options.isError === true 
		) {
		$el.innerHTML = ''
		

		$el.insertAdjacentHTML('beforeend', `
		<div class="result-render-dbd error-blinking-result unselectable">
			<h4 class='tittle tittle-error tittle-result'>Помилка!!!</h4>
			<div class="dbd__column-result">
				<p class="error-result">${options.errorMessage}</p>
			</div>
		</div>
		`)

		document.querySelector('.result-render-dbd').style.transform = 'scale(0)'
		anime({
			targets: '.result-render-dbd',
			scale: {
				value: 1,
				duration: 700,
			},
		});
	
	} else if (options.isError === false) {
		$el.innerHTML = ''

		$el.insertAdjacentHTML('beforeend', `
			<div class="result-render-dbd">
				<h4 class="tittle dbd__tittle tittle-result">Результат</h4>
				<div class="dbd__table">
					<div class="dbd__title-result-wrapper">
							<div class="dbd__column-title">
								<p>Період&nbsp;${incldFirstDayRender()}:</p>
							</div>
							<div class="dbd__column-result">
								<p>${options.starDate} - ${currentOrSetEndDate}</p>
							</div>
					</div>
					<div class="dbd__title-result-wrapper">
						<div class="dbd__column-title">
							<p>Інтервал:</p>
						</div>
						<div class="dbd__column-result">
							<p>${options.years}р. ${options.months}міс. ${options.days}дн.</p>
						</div>
					</div>
					<div class="dbd__title-result-wrapper">
						<div class="dbd__column-title">
							<p>Календарних&nbsp;днів:</p>
						</div>
						<div class="dbd__column-result">
							<p>${options.totalDays} дн.</p>
						</div>
					</div>
				</div>
			</div>
		`)
		const resultElem = document.querySelector('.result-render-dbd')

		resultElem.style.transform = 'scale(0) translateY(550px)'
		anime({
			targets: '.result-render-dbd',
			translateY:  {
				value: 0,
				duration: 700,
			},
			scale: {
				value: 1,
				duration: 300,
				easing: 'easeInOutQuad'
			},
		});
		
	}
}