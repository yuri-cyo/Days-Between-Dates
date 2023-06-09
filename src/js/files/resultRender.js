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
			<div class="content-here__cells-wrapper">
			
			</div>
			<div class="content-here__line"></div>
			</div>
			`)
			
			function cellsGenerate(num) {
				document.querySelector('.content-here__cells-wrapper').insertAdjacentHTML('beforeend', `
					<div class="content-here__cell cell${num}"></div>
				`)
			}
			
			let randomNumberStart = Math.floor(Math.random() * 7) + 1;
			let randomNumberMonth = Math.floor(Math.random() * 4) + 28;
			console.log('randomNumberStart', randomNumberStart);
			console.log('randomNumberMonth', randomNumberMonth);
			const startD = 1
			for (let i = 1; i <= 42; i++) {
				const colorWeekends = '#d24f41'
				cellsGenerate(i)
				if (i >= randomNumberStart && i < randomNumberMonth + randomNumberStart) {
					document.querySelector(`.cell${i}`).style.opacity = 1
					// document.querySelector(`.cell${i}`).innerHTML = i - randomNumberStart + 1
				}
				if (i % 7 === 0) {
					document.querySelector(`.cell${i}`).style.backgroundColor = colorWeekends
					let saturday = i - 1
					document.querySelector(`.cell${saturday}`).style.backgroundColor = colorWeekends
				}
			}
			anime({
				targets: '.content-here__cell',
				scale: [
					{value: 0.1, easing: 'easeOutSine', duration: 2000},
					{value: 1, easing: 'easeInOutQuad', duration: 1500},
				],
				delay: anime.stagger(400, {grid: [7, 6], from: `${randomNumberStart - 1}`}),
				loop: true,
			});
			
			anime({
				targets: '.content-here__wrapper',
				scale: {
					value: [0, 1],
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
			return ` (включно)`
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

		anime({
			targets: '.result-render-dbd',
			scale: {
				value: [0, 1],
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
								<p>Період${incldFirstDayRender()}:</p>
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

		// resultElem.style.transform = 'scale(0) translateY(550px)'
		anime({
			targets: '.result-render-dbd',
			translateY:  {
				value: [-300, 0],
				duration: 1000,
				// easing: 'easeInOutCirc'
			},
			scale: {
				value: [0, 1],
				duration: 1000,
				// easing: 'easeInOutCirc'
			},
		});
		
	}
}