export class DaysBetweenDates {
	constructor(selector, option) {
		this.$el = document.querySelector(selector)
		this.startDate = option.startDate
		this.endDate = option.endDate
		this.includingFirstDay = option.includingFirstDay
		this.includingLastDay = option.includingLastDay
		
		
		console.log('Сьогоднішня дата', this.liveD, this.liveM, this.liveY);
		if (this.endDate !== 'current') {
			console.log('this.endDate', this.endDate);
			// if (this.endDate[0].length === 2
			// 	&& this.endDate[1].length === 2
			// 	&& this.endDate[2].length === 4) {
			// }
			const endDateArr = this.endDate.split('.')
			console.log(endDateArr);
			this.liveD = Number(endDateArr[0])
			this.liveM = Number(endDateArr[1])
			this.liveY = Number(endDateArr[2])
		} else {
			this.liveY = new Date().getFullYear(); //? Today's Year!
			this.liveM = new Date().getMonth() + 1; //? Today's month!
			this.liveD = new Date().getDate(); //? Today's day!
		}
		console.log('this.liveD', this.liveD);
		console.log('this.liveM', this.liveM);
		console.log('this.liveY', this.liveY);

		this.arrMonths = []
		this.clearArrM = []
		this.arrMinusZeroM = []

		this.lastD = 0
		this.firstD = 0

		this.calcDays = 0
		this.calcMonths = 0
		this.calcYear = 0

		this.daysAllCount()
		this.editMStartEnd()
		this.editDStartEnd()
		this.countDMY()
		// this.errorMessage()

		console.log('this.startDateEnter(D)', this.startDateEnter('D'));
		console.log("this.startDateEnter('M')", this.startDateEnter('M'));
		console.log("this.startDateEnter('Y')", this.startDateEnter('Y'));
		
	}

	startDateEnter(mod) {
		if (this.startDate.length === 10) {

			switch (mod) {
				case 'D':
					return this.startDate.split('.').map(Number)[0]
					break;
				case 'M':
					return this.startDate.split('.').map(Number)[1]
					break;
				case 'Y':
					return this.startDate.split('.').map(Number)[2]
					break;
			}
		} else {
			return false	
		}
	
	}
	
	calendarGen(year) {
		const daysArray = [];

		for (let i = 0; i < 12; i++) {
			const daysInMonth = new Date(year, i + 1, 0).getDate();
			daysArray.push(daysInMonth);
		}
		return daysArray;
}

// calendarGen(year) { //! OLD my function total days in year
// 		this.sumDaysInYear = 0 
	
// 	this.monthsInYear = [];
// 	for (let iM = 1; 12 >= iM; iM++) {
// 		if (iM <= 7) {
// 			if (iM % 2 === 0) {
// 				this.monthsInYear.push(30);
// 			} else {
// 				this.monthsInYear.push(31)
// 			}
// 		}
// 		if (iM >= 8) {
// 			if (iM % 2 === 0) {
// 				this.monthsInYear.push(31);
// 			} else {
// 				this.monthsInYear.push(30)
// 			}
// 		}
// 	}

// 	if (year % 4 === 0){
// 		this.monthsInYear[1] = 29;
// 		console.log(`${year} р. - високосний, Лютий 29`);
// 	} else {
// 		this.monthsInYear[1] = 28;
// 		console.log(`${year} р. - не високосний, Лютий 28`);
// 	}
	
// 	//* ====================================================================================================
// 	this.monthsInYear.forEach(i => {
// 		this.sumDaysInYear += i
// 	})
// 	console.log(`${this.sumDaysInYear} - днів в ${year} році`); //? Amount of days a year
// 	//* ====================================================================================================
// 	return this.monthsInYear
// }
	
	daysAllCount() {
		for (let iYears = this.startDateEnter('Y'); iYears <= this.liveY; iYears++) {
			// console.log(iYears) //! lists the rookid from and to the specified
			this.arrMonths = this.arrMonths.concat(this.calendarGen(iYears)) //! makes all the arrays of the calendar of years at one massif (all days of months at one massif)
		}
	}
	
	editMStartEnd() {
		let count = null
		this.arrMonths = this.arrMonths.map((e)=> {
			count += 1
			if (count < this.startDateEnter('M')) {
			return e = 0
			}
			if (count > this.arrMonths.length - 12 + this.liveM) {
			return e = 0
			}
			if (e !== 0) {
			this.clearArrM.push(e)
			this.arrMinusZeroM.push(e)
			}
			return e
		})
		// console.log('this.clearArrM', this.clearArrM)
		this.firstOriginM = this.clearArrM[0]
		this.lastOriginM = this.clearArrM[this.clearArrM.length - 1]
		// console.log('this.firstOriginM', this.firstOriginM);
		// console.log('this.lastOriginM', this.lastOriginM);
	}
		
	editDStartEnd() {
	if (this.includingLastDay === true) {
		this.clearArrM[this.clearArrM.length - 1] = this.liveD
	} else {
		this.clearArrM[this.clearArrM.length - 1] = this.liveD - 1
	}
	
	if (this.includingFirstDay === true) {
		this.clearArrM[0] = this.clearArrM[0] - this.startDateEnter('D') + 1
	} else {
		this.clearArrM[0] = this.clearArrM[0] - this.startDateEnter('D')
	}
	
		// console.log('this.clearArrM', this.clearArrM)
		this.lastD = this.clearArrM[this.clearArrM.length - 1]
		this.firstD = this.clearArrM[0]
		// console.error('this.firstD', this.firstD);
		// console.error('this.lastD', this.lastD);
	}

	totalDays() {
	let days = null
		this.clearArrM.forEach((e)=> {
			days += e
		})
		return days
	}

	countDMY() {
		for (let i = 0; i <= this.clearArrM.length - 1; i++) {
			if (this.clearArrM[i] === this.arrMinusZeroM[i]) {
				this.calcMonths += 1
			} else if (this.clearArrM[i] !== this.arrMinusZeroM[i]){
				this.calcDays += this.clearArrM[i]
			}
		}

		if (this.calcDays >= this.firstOriginM) {
			this.calcDays -= this.firstOriginM
			this.calcMonths += 1
		}
		if (this.calcMonths >= 12) {
			this.calcYear = Math.floor(this.calcMonths / 12)
			this.calcMonths -= 12 * this.calcYear
		}

	}

	errorMessage() {
		this.startDateStr = `${this.startDateEnter('D')}.${this.startDateEnter('M')}.${this.startDateEnter('Y')}`
		this.endDateStr = `${this.liveD}.${this.liveM}.${this.liveY}`

		console.log('DaysBetweenDates this.startDate', this.startDateStr);
		console.log('DaysBetweenDates this.endDate', this.endDateStr);

		if (this.totalDays() <= 0 || isNaN(this.totalDays())) {
			console.log('this.startDateStr === this.endDateStr TRUE');
			return false
		}
	}

}