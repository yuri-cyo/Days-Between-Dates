
export function resultRenderHtml(selector, options) {
	const $el = document.querySelector(selector)
	console.warn('options.isError.errorMessage', options.isError);
	$el.innerHTML = ''
	let currentOrSetEndDate = ''
	console.error('resultRenderHtml options.starDate', options.endDate);

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

	console.log('incldFirstDayRender()', incldFirstDayRender());
	// console.log('$incldFirstDay.checked', inputsDbd.$checkedFirstDay);

	if (options.isError === true) {
		$el.insertAdjacentHTML('beforeend', `
		<div class="result-render-dbd error-blinking-result unselectable">
			<h4 class='tittle tittle-error tittle-result'>Помилка!!!</h4>
			<div class="dbd__column-result">
				<p class="dbd__error-result">${options.errorMessage}</p>
			</div>
		</div>
		`)
		$el.classList.add(options.errorClassName)
	} else if (options.isError === false) {
		$el.classList.remove(options.errorClassName)
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
	// if (options.isError === true) {
	// 	$el.insertAdjacentHTML('beforeend', `
	// 	<div class="result-render-dbd error-blinking-result unselectable">
	// 		<h4 class='tittle tittle-error'>Помилка!!!</h4>
	// 		<p>${options.errorMessage}</p>
	// 	</div>
	// 	`)
	// 	$el.classList.add(options.errorClassName)
	// } else if (options.isError === false) {
	// 	$el.classList.remove(options.errorClassName)
	// 	$el.insertAdjacentHTML('beforeend', `
	// 		<div class="result-render-dbd">
	// 			<h4 class="tittle dbd__tittle">Результат</h4>
	// 			<table class="dbd-table">
	// 				<tbody>
	// 					<tr>
	// 						<th>Період&nbsp;${incldFirstDayRender()}:</th>
	// 						<td>${options.starDate} - ${currentOrSetEndDate}</td>
	// 					</tr>
	// 					<tr>
	// 						<th>Інтервал:</th>
	// 						<td>${options.years}р. ${options.months}міс. ${options.days}дн.</td>
	// 					</tr>
	// 					<tr>
	// 						<th>Календарних днів:</th>
	// 						<td>${options.totalDays} дн.</td>
	// 					</tr>
	// 				</tbody>
	// 			</table>
	// 		</div>
	// 	`)

	// }
}