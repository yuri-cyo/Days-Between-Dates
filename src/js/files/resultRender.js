let isLoad = false;
window.addEventListener('load', ()=> {
	isLoad = true
})

export function contentDefault(selector) {
		if (isLoad === true && document.querySelector('.content-here__wrapper') === null) {
			const $el = document.querySelector(selector)
			$el.innerHTML = ''
		
			$el.insertAdjacentHTML('beforeend', `
			<div class="content-here__wrapper">
				<span class="_icon-content content-here__icon"></span>
			</div>
			`)

		}

}
contentDefault('.days-between-dates')

export function resultRenderHtml(selector, options) {
	
	const $el = document.querySelector(selector)

	// $el.innerHTML = ''
	// contentDefault('.days-between-dates')
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
		// && document.querySelector('.result-render-dbd') === null
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
		// $el.classList.add(options.errorClassName)
	} else if (options.isError === false) {
		$el.innerHTML = ''
		// $el.classList.remove(options.errorClassName)
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

	}

	

}