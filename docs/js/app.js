(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    class DaysBetweenDates {
        constructor(selector, option) {
            this.$el = document.querySelector(selector);
            this.startDate = option.startDate;
            this.endDate = option.endDate;
            this.includingFirstDay = option.includingFirstDay;
            this.includingLastDay = option.includingLastDay;
            console.log("Сьогоднішня дата", this.liveD, this.liveM, this.liveY);
            if ("current" !== this.endDate) {
                console.log("this.endDate", this.endDate);
                const endDateArr = this.endDate.split(".");
                console.log(endDateArr);
                this.liveD = Number(endDateArr[0]);
                this.liveM = Number(endDateArr[1]);
                this.liveY = Number(endDateArr[2]);
            } else {
                this.liveY = (new Date).getFullYear();
                this.liveM = (new Date).getMonth() + 1;
                this.liveD = (new Date).getDate();
            }
            console.log("this.liveD", this.liveD);
            console.log("this.liveM", this.liveM);
            console.log("this.liveY", this.liveY);
            this.arrMonths = [];
            this.clearArrM = [];
            this.arrMinusZeroM = [];
            this.lastD = 0;
            this.firstD = 0;
            this.calcDays = 0;
            this.calcMonths = 0;
            this.calcYear = 0;
            this.daysAllCount();
            this.editMStartEnd();
            this.editDStartEnd();
            this.countDMY();
            console.log("this.startDateEnter(D)", this.startDateEnter("D"));
            console.log("this.startDateEnter('M')", this.startDateEnter("M"));
            console.log("this.startDateEnter('Y')", this.startDateEnter("Y"));
        }
        startDateEnter(mod) {
            if (10 === this.startDate.length) switch (mod) {
              case "D":
                return this.startDate.split(".").map(Number)[0];
                break;

              case "M":
                return this.startDate.split(".").map(Number)[1];
                break;

              case "Y":
                return this.startDate.split(".").map(Number)[2];
                break;
            } else return false;
        }
        calendarGen(year) {
            const daysArray = [];
            for (let i = 0; i < 12; i++) {
                const daysInMonth = new Date(year, i + 1, 0).getDate();
                daysArray.push(daysInMonth);
            }
            return daysArray;
        }
        daysAllCount() {
            for (let iYears = this.startDateEnter("Y"); iYears <= this.liveY; iYears++) this.arrMonths = this.arrMonths.concat(this.calendarGen(iYears));
 //! makes all the arrays of the calendar of years at one massif (all days of months at one massif)
                }
        editMStartEnd() {
            let count = null;
            this.arrMonths = this.arrMonths.map((e => {
                count += 1;
                if (count < this.startDateEnter("M")) return e = 0;
                if (count > this.arrMonths.length - 12 + this.liveM) return e = 0;
                if (0 !== e) {
                    this.clearArrM.push(e);
                    this.arrMinusZeroM.push(e);
                }
                return e;
            }));
            this.firstOriginM = this.clearArrM[0];
            this.lastOriginM = this.clearArrM[this.clearArrM.length - 1];
        }
        editDStartEnd() {
            if (true === this.includingLastDay) this.clearArrM[this.clearArrM.length - 1] = this.liveD; else this.clearArrM[this.clearArrM.length - 1] = this.liveD - 1;
            if (true === this.includingFirstDay) this.clearArrM[0] = this.clearArrM[0] - this.startDateEnter("D") + 1; else this.clearArrM[0] = this.clearArrM[0] - this.startDateEnter("D");
            this.lastD = this.clearArrM[this.clearArrM.length - 1];
            this.firstD = this.clearArrM[0];
        }
        totalDays() {
            let days = null;
            this.clearArrM.forEach((e => {
                days += e;
            }));
            return days;
        }
        countDMY() {
            for (let i = 0; i <= this.clearArrM.length - 1; i++) if (this.clearArrM[i] === this.arrMinusZeroM[i]) this.calcMonths += 1; else if (this.clearArrM[i] !== this.arrMinusZeroM[i]) this.calcDays += this.clearArrM[i];
            if (this.calcDays >= this.firstOriginM) {
                this.calcDays -= this.firstOriginM;
                this.calcMonths += 1;
            }
            if (this.calcMonths >= 12) {
                this.calcYear = Math.floor(this.calcMonths / 12);
                this.calcMonths -= 12 * this.calcYear;
            }
        }
        errorMessage() {
            this.startDateStr = `${this.startDateEnter("D")}.${this.startDateEnter("M")}.${this.startDateEnter("Y")}`;
            this.endDateStr = `${this.liveD}.${this.liveM}.${this.liveY}`;
            console.log("DaysBetweenDates this.startDate", this.startDateStr);
            console.log("DaysBetweenDates this.endDate", this.endDateStr);
            if (this.totalDays() <= 0 || isNaN(this.totalDays())) {
                console.log("this.startDateStr === this.endDateStr TRUE");
                return false;
            }
        }
    }
    let isLoad = false;
    window.addEventListener("load", (() => {
        isLoad = true;
    }));
    function contentDefault(selector) {
        if (true === isLoad && null === document.querySelector(".content-here__wrapper")) {
            const $el = document.querySelector(selector);
            $el.innerHTML = "";
            $el.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="content-here__wrapper">\n\t\t\t\t<span class="_icon-content content-here__icon"></span>\n\t\t\t</div>\n\t\t\t`);
        }
    }
    contentDefault(".days-between-dates");
    function resultRenderHtml(selector, options) {
        const $el = document.querySelector(selector);
        let currentOrSetEndDate = "";
        if ("current" === options.endDate) currentOrSetEndDate = options.curentData; else currentOrSetEndDate = options.endDate;
        function incldFirstDayRender() {
            if (true === options.includingFirstDay) return `(включно)`; else return ``;
        }
        if (true === options.isError) {
            $el.innerHTML = "";
            $el.insertAdjacentHTML("beforeend", `\n\t\t<div class="result-render-dbd error-blinking-result unselectable">\n\t\t\t<h4 class='tittle tittle-error tittle-result'>Помилка!!!</h4>\n\t\t\t<div class="dbd__column-result">\n\t\t\t\t<p class="error-result">${options.errorMessage}</p>\n\t\t\t</div>\n\t\t</div>\n\t\t`);
        } else if (false === options.isError) {
            $el.innerHTML = "";
            $el.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="result-render-dbd">\n\t\t\t\t<h4 class="tittle dbd__tittle tittle-result">Результат</h4>\n\t\t\t\t<div class="dbd__table">\n\t\t\t\t\t<div class="dbd__title-result-wrapper">\n\t\t\t\t\t\t\t<div class="dbd__column-title">\n\t\t\t\t\t\t\t\t<p>Період&nbsp;${incldFirstDayRender()}:</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="dbd__column-result">\n\t\t\t\t\t\t\t\t<p>${options.starDate} - ${currentOrSetEndDate}</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="dbd__title-result-wrapper">\n\t\t\t\t\t\t<div class="dbd__column-title">\n\t\t\t\t\t\t\t<p>Інтервал:</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="dbd__column-result">\n\t\t\t\t\t\t\t<p>${options.years}р. ${options.months}міс. ${options.days}дн.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="dbd__title-result-wrapper">\n\t\t\t\t\t\t<div class="dbd__column-title">\n\t\t\t\t\t\t\t<p>Календарних&nbsp;днів:</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="dbd__column-result">\n\t\t\t\t\t\t\t<p>${options.totalDays} дн.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`);
        }
    }
    class InputsDbd {
        constructor(selector) {
            this.$el = document.querySelectorAll(selector);
            this.$dbdTextRender = document.querySelector(".days-between-dates");
            this.$btnSubmit = document.querySelector(".main__btn-submit");
            this.btnsSettings = document.querySelector(".main__settings");
            this.$inputD = document.getElementById("dateStartD");
            this.$inputM = document.getElementById("dateStartM");
            this.$inputY = document.getElementById("dateStartY");
            this.memoryInputsStart = "";
            this.memoryInputsEnd = "";
            this.trueMaxD;
 //! правильна к-сть днів в місяці якщо нам відомо міс. і р.
                        this.trueMaxDEnd;
 //! правильна к-сть днів в місяці якщо нам відомо міс. і р.
                        this.$inputEndD = document.getElementById("dateEndD");
            this.$inputEndM = document.getElementById("dateEndM");
            this.$inputEndY = document.getElementById("dateEndY");
            this.currentEndD = this.formatDateTwoNum((new Date).getDate());
            this.currentEndM = this.formatDateTwoNum((new Date).getMonth() + 1);
            this.currentEndY = (new Date).getFullYear();
            console.error("this.formatDateTwoNum(new Date().getDate())", this.formatDateTwoNum(9));
            this.$inputEndD.placeholder = this.currentEndD;
            this.$inputEndM.placeholder = this.currentEndM;
            this.$inputEndY.placeholder = this.currentEndY;
            this.currentDate = `${this.currentEndD}.${this.currentEndM}.${this.currentEndY}`;
            console.error("this.formatDateTwoNum(new Date().getDate())", this.currentDate);
            this.$checkedFirstDay = document.querySelector(`[data-input-setting="first-day"]`);
            this.$checkedLastDay = document.querySelector(`[data-input-setting="last-day"]`);
            this.includingFirstDay = false;
            this.includingLastDay = false;
            this.isLoad = false;
            window.addEventListener("load", (() => {
                this.isLoad = true;
            }));
            this.resultDbdVisible = false;
            this.scrollToElem();
        }
        changeplaceholderContent(eventTargetInput, count) {
            if (count >= 3 && count <= 6) if ("" !== eventTargetInput.value || "" !== this.$inputEndD.value || "" !== this.$inputEndM.value || "" !== this.$inputEndY.value) {
                this.$inputEndD.placeholder = "дд";
                this.$inputEndM.placeholder = "мм";
                this.$inputEndY.placeholder = "рррр";
            } else if ("" === this.$inputEndD.value && "" === this.$inputEndM.value && "" === this.$inputEndY.value) {
                this.$inputEndD.placeholder = this.currentEndD;
                this.$inputEndM.placeholder = this.currentEndM;
                this.$inputEndY.placeholder = this.currentEndY;
            }
        }
        validEventTargetInput(eventTargetInput, count) {
            const eValue = eventTargetInput.value;
            if (2 === count || 5 === count) {
                console.log(count);
                eventTargetInput.value = eValue.replace(/(.{4})./, "$1").replace(/[^\d]/g, "");
                if (this.$el[count].value.length >= 4) if (count + 1 < 4) this.$el[count + 1].focus();
            } else {
                eventTargetInput.value = eValue.replace(/(.{2})./, "$1").replace(/[^\d]/g, "");
                if (this.$el[count].value.length >= 2) this.$el[count + 1].focus();
                if (0 === count || 3 === count && true === this.isLoad && "" === this.$inputM.value && "" === this.$inputY.value) {
                    console.error("(count === 0 || count === 3)");
                    if (Number(eventTargetInput.value) > 31) this.colorErrorInputOverDate(eventTargetInput, "31", "red", "black", count);
                    if ("00" === eventTargetInput.value) this.colorErrorInputOverDate(eventTargetInput, "01", "red", "black", count);
                }
                if (1 === count || 4 === count) {
                    if ("00" === eventTargetInput.value) this.colorErrorInputOverDate(eventTargetInput, "01", "red", "black", count);
                    if (Number(eventTargetInput.value) > 12) this.colorErrorInputOverDate(eventTargetInput, "12", "red", "black", count);
                }
            }
        }
        autoRenameDayInYear(mo, ye) {
            if (2 === this.$inputD.value.length && 2 === this.$inputM.value.length && 4 === this.$inputY.value.length || 2 === this.$inputEndD.value.length && 2 === this.$inputEndM.value.length && 4 === this.$inputEndY.value.length) {
                Number(this.$inputD.value);
                const m = Number(this.$inputM.value);
                const y = Number(this.$inputY.value);
                Number(this.$inputEndD.value);
                const mEnd = Number(this.$inputEndM.value);
                const yEnd = Number(this.$inputEndY.value);
                const calendarGen = (year, index) => {
                    const daysArray = [];
                    for (let i = 0; i < 12; i++) {
                        const daysInMonth = new Date(year, i + 1, 0).getDate();
                        daysArray.push(daysInMonth);
                    }
                    return daysArray[index];
                };
                if ("" !== this.$inputM.value && "" !== this.$inputY.value) {
                    let onlineInputsStart = `${this.$inputM.value}${this.$inputY.value}`;
                    if (onlineInputsStart !== this.memoryInputsStart) {
                        this.memoryInputsStart = `${this.$inputM.value}${this.$inputY.value}`;
                        this.trueMaxD = calendarGen(y, m - 1);
                        console.log("this.memoryInputsStart", this.memoryInputsStart, this.trueMaxD);
                    }
                } else "" === this.memoryInputsStart;
                if (this.memoryInputsEnd[0] !== this.$inputEndM.value || this.memoryInputsEnd[1] !== this.$inputEndY.value) {
                    this.memoryInputsEnd = [ this.$inputEndM.value, this.$inputEndY.value ];
                    this.trueMaxDEnd = calendarGen(yEnd, mEnd - 1);
                    console.log("this.memoryInputsEnd", this.memoryInputsEnd, this.trueMaxDEnd);
                }
                if (Number(this.$inputD.value) > this.trueMaxD) {
                    this.$inputD.style.color = "red";
                    setTimeout((() => {
                        this.$inputD.value = this.trueMaxD;
                        this.$inputD.style.color = "green";
                        localStorage.setItem("inputD", this.trueMaxD);
                        setTimeout((() => {
                            this.$inputD.style.color = "black";
                        }), 1e3);
                    }), 200);
                    console.log("autoRenameDayInYear StartDays", this.trueMaxD);
                }
                if (Number(this.$inputEndD.value) >= this.trueMaxDEnd) {
                    this.$inputEndD.value = this.trueMaxDEnd;
                    localStorage.setItem("inputEndD", this.$inputEndD.value);
                    console.log("autoRenameDayInYear EndDays");
                }
            }
        }
        runSetItemLS(count, $element) {
            switch (count) {
              case 0:
                localStorage.setItem("inputD", $element);
                break;

              case 1:
                localStorage.setItem("inputM", $element);
                break;

              case 2:
                localStorage.setItem("inputY", $element);
                break;

              case 3:
                localStorage.setItem("inputEndD", $element);
                break;

              case 4:
                localStorage.setItem("inputEndM", $element);
                break;

              case 5:
                localStorage.setItem("inputEndY", $element);
                break;
            }
        }
        ifRenderResultDbd() {
            const resultDbd = document.querySelector(".result-render-dbd");
            if (resultDbd) {
                this.resultDbdVisible = true;
                localStorage.setItem("resultDbdVisible", this.resultDbdVisible);
            } else {
                this.resultDbdVisible = false;
                localStorage.setItem("resultDbdVisible", this.resultDbdVisible);
            }
        }
        colorErrorInputOverDate($el, rplc, colorEror, color, count) {
            $el.style.color = colorEror;
            setTimeout((() => {
                $el.style.color = "green";
                $el.value = $el.value.replace(/\d+/, rplc);
                this.runSetItemLS(count, $el.value);
                setTimeout((() => {
                    $el.style.color = color;
                }), 1e3);
            }), 200);
        }
        inputsFocusKey(eventTargetInput, count) {
            let countBackspacePositionZero = 0;
            let countKeyLeft = 0;
            let countKeyRight = 0;
            const cursorPosition = eventTargetInput.selectionStart;
            eventTargetInput.setSelectionRange(cursorPosition, cursorPosition);
            let lastCursorPosition;
            eventTargetInput.addEventListener("blur", (function(e) {
                console.log("this.$el[count]", eventTargetInput.value.length);
                const changeFirstStr = str => {
                    eventTargetInput.value = eventTargetInput.value.replace(/^(\d)$/, `${str}$1`);
                };
                if (1 === eventTargetInput.value.length && 0 === count || 1 === count || 3 === count || 4 === count) changeFirstStr("0");
                if (2 === count || 5 === count) {
                    if (Number(eventTargetInput.value) >= 10 && Number(eventTargetInput.value) <= 29 && 2 === eventTargetInput.value.length) eventTargetInput.value = eventTargetInput.value.replace(/^/, `20`);
                    if (Number(eventTargetInput.value) >= 30 && Number(eventTargetInput.value) <= 99 && 2 === eventTargetInput.value.length) eventTargetInput.value = eventTargetInput.value.replace(/^/, `19`);
                }
                switch (count) {
                  case 0:
                    localStorage.setItem("inputD", e.target.value);
                    break;

                  case 1:
                    localStorage.setItem("inputM", e.target.value);
                    break;

                  case 2:
                    localStorage.setItem("inputY", e.target.value);
                    break;

                  case 3:
                    localStorage.setItem("inputEndD", e.target.value);
                    break;

                  case 4:
                    localStorage.setItem("inputEndM", e.target.value);
                    break;

                  case 5:
                    localStorage.setItem("inputEndY", e.target.value);
                    break;
                }
                lastCursorPosition = eventTargetInput.selectionStart;
                console.log("lastCursorPosition", lastCursorPosition);
            }));
            eventTargetInput.addEventListener("keyup", (e => {
                if (8 === e.keyCode && 0 === e.target.selectionStart) {
                    //! Backspace key
                    countBackspacePositionZero += 1;
                    console.log("countBackspacePositionZero", countBackspacePositionZero);
                    if (count - 1 !== -1 && 2 === countBackspacePositionZero) {
                        this.$el[count - 1].focus();
                        const lastSymbol = this.$el[count - 1].value.length;
                        this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol);
                        countBackspacePositionZero = 0;
                    }
                } else countBackspacePositionZero = 0;
                if (13 === e.keyCode) {
                    //! Enter key
                    e.target.blur();
                    window.addEventListener("unload", (function() {
                        e.target.blur();
                    }));
                    this.$btnSubmit.click();
                }
                if (37 === e.keyCode && 0 === e.target.selectionStart) {
                    //! <- key
                    console.log("cursorPosition <- key", cursorPosition);
                    countKeyLeft += 1;
                    countKeyRight = 0;
                    if (count - 1 !== -1 && 2 === countKeyLeft) {
                        countKeyLeft = 0;
                        this.$el[count - 1].focus();
                        const lastSymbol = this.$el[count - 1].value.length;
                        this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol);
                    }
                    console.log("countKeyLeft", countKeyLeft);
                } else countKeyLeft = 0;
                if (39 === e.keyCode && e.target.selectionStart === e.target.value.length) {
                    //! -> key
                    console.log("cursorPosition -> key", e.target.selectionStart);
                    console.log("e.target.value.length", e.target.value.length);
                    countKeyRight += 1;
                    countKeyLeft = 0;
                    if (count - 1 !== 4 && 2 === countKeyRight) {
                        countKeyRight = 0;
                        this.$el[count + 1].focus();
                        this.$el[count + 1].setSelectionRange(0, 0);
                    }
                    console.log("countKeyRight", countKeyRight);
                } else countKeyRight = 0;
            }));
        }
        escapeFromFocusInputUnload() {
            this.$el.forEach((elem => {
                window.addEventListener("unload", (() => {
                    elem.blur();
                }));
            }));
        }
        eTargetClick() {
            document.addEventListener("click", (event => event.target));
        }
        validEventTargetClick(eventTargetClick, count) {
            const value = eventTargetClick.value;
            if (2 === count || 5 === count) eventTargetClick.value = value.slice(0, 4); else eventTargetClick.value = value.slice(0, 2);
        }
        setLoadLocalStorage($elem, key) {
            $elem.addEventListener("blur", (() => {
                localStorage.setItem(key, $elem.value);
                console.log("BLUUUR localStorage.setItem(key, $elem.value);", $elem.value);
            }));
            $elem.addEventListener("input", (() => {
                localStorage.setItem(key, $elem.value);
            }));
            window.addEventListener("load", (() => {
                $elem.value = localStorage.getItem(key);
                console.warn("setLoadLocalStorage($elem, key)=======================================================================", this.dateEnd());
                contentDefault(".days-between-dates");
            }));
        }
        afterLocalStorageRun() {
            window.addEventListener("load", (() => {
                if (false !== this.dateStart() && "true" === localStorage.getItem("resultDbdVisible")) this.$btnSubmit.click();
            }));
        }
        loadLocalStorageCheackbox(key, $elem, includingDays) {
            window.addEventListener("load", (() => {
                const incDay = localStorage.getItem(key);
                if ("false" === incDay) {
                    $elem.checked = false;
                    false;
                }
                if ("true" === incDay) {
                    $elem = true;
                    true;
                }
            }));
        }
        runLocalStorage() {
            this.setLoadLocalStorage(this.$inputD, "inputD");
            this.setLoadLocalStorage(this.$inputM, "inputM");
            this.setLoadLocalStorage(this.$inputY, "inputY");
            this.setLoadLocalStorage(this.$inputEndD, "inputEndD");
            this.setLoadLocalStorage(this.$inputEndM, "inputEndM");
            this.setLoadLocalStorage(this.$inputEndY, "inputEndY");
            this.loadLocalStorageCheackbox("includingFirstDay", this.$checkedFirstDay, this.includingFirstDay);
            this.loadLocalStorageCheackbox("includingLastDay", this.$checkedLastDay, this.includingLastDay);
            this.afterLocalStorageRun();
            return this;
        }
        localStorageClear(mod) {
            if ("start" === mod) {
                localStorage.removeItem("inputD");
                localStorage.removeItem("inputM");
                localStorage.removeItem("inputY");
            } else if ("end" === mod) {
                localStorage.removeItem("inputEndD");
                localStorage.removeItem("inputEndM");
                localStorage.removeItem("inputEndY");
            }
        }
        formatDateTwoNum(liveDate) {
            liveDate += "";
            if (1 === liveDate.length) return liveDate = "0" + liveDate; else return Number(liveDate);
        }
        dateStart() {
            if ("" !== this.$inputD.value && "" !== this.$inputM.value && "" !== this.$inputY.value && 2 === this.$inputD.value.length && 2 === this.$inputM.value.length && 4 === this.$inputY.value.length) return `${this.$inputD.value}.${this.$inputM.value}.${this.$inputY.value}`; else return false;
        }
        dateEnd() {
            if (true === this.isLoad) if ("" !== this.$inputEndD.value && "" !== this.$inputEndM.value && "" !== this.$inputEndY.value && 2 === this.$inputEndD.value.length && 2 === this.$inputEndM.value.length && 4 === this.$inputEndY.value.length) return `${this.$inputEndD.value}.${this.$inputEndM.value}.${this.$inputEndY.value}`; else if ("" === this.$inputEndD.value && "" === this.$inputEndM.value && "" === this.$inputEndY.value) return "current"; else if (2 !== this.$inputEndD.value.length || 2 !== this.$inputEndM.value.length || 4 !== this.$inputEndY.value.length) return "error";
        }
        eventBtns() {
            const $elBtns = document.querySelectorAll(".btn");
            document.querySelector(".days-between-dates");
            const resultDbd = document.querySelector(".result-render-dbd");
            $elBtns.forEach((i => {
                console.log(i);
                i.addEventListener("click", (e => {
                    if (e.target.closest(`[data-btn="clear-start"]`)) {
                        this.$inputD.value = "";
                        this.$inputM.value = "";
                        this.$inputY.value = "";
                        this.$inputD.focus();
                        console.log("this.$el.innerHTML", this.$el.innerHTML);
                        console.log("this.$el", this.$el);
                        this.localStorageClear("start");
                        this.ifRenderResultDbd();
                    } else if (e.target.closest(`[data-btn="clear-end"]`)) {
                        this.$inputEndD.value = "";
                        this.$inputEndM.value = "";
                        this.$inputEndY.value = "";
                        this.$inputEndD.placeholder = this.currentEndD;
                        this.$inputEndM.placeholder = this.currentEndM;
                        this.$inputEndY.placeholder = this.currentEndY;
                        this.$inputEndD.focus();
                        this.localStorageClear("end");
                        this.ifRenderResultDbd();
                    } else if (e.target.closest(`[data-btn="clear-result"]`)) {
                        console.log(e.target);
                        console.log(resultDbd);
                        contentDefault(".days-between-dates");
                        this.resultDbdVisible = false;
                        localStorage.setItem("resultDbdVisible", this.resultDbdVisible);
                    }
                }));
            }));
        }
        setPlaceholder(evenTarget, count) {
            const originalPlaceholder = evenTarget.getAttribute("placeholder");
            if (evenTarget.getAttribute("placeholder") === originalPlaceholder) evenTarget.setAttribute("placeholder", "");
            evenTarget.addEventListener("blur", (() => {
                if ("" === evenTarget.getAttribute("placeholder")) evenTarget.setAttribute("placeholder", originalPlaceholder);
            }));
        }
        setChekbox() {
            const classNameChecked = "checked";
            if (true === this.$checkedFirstDay.checked || "true" === localStorage.getItem("includingFirstDay")) {
                this.$checkedFirstDay.parentNode.classList.add(classNameChecked);
                this.includingFirstDay = true;
            }
            if (false === this.$checkedFirstDay.checked || "false" === localStorage.getItem("includingFirstDay")) {
                this.$checkedFirstDay.parentNode.classList.remove(classNameChecked);
                this.includingFirstDay = false;
            }
            if (true === this.$checkedLastDay.checked || "true" === localStorage.getItem("includingLastDay")) {
                this.$checkedLastDay.parentNode.classList.add(classNameChecked);
                this.includingLastDay = true;
            }
            if (false === this.$checkedLastDay.checked || "false" === localStorage.getItem("includingLastDay")) {
                this.$checkedLastDay.parentNode.classList.remove(classNameChecked);
                this.includingLastDay = false;
            }
            this.btnsSettings.addEventListener("input", (e => {
                const setClassNameChekbox = (dataName, includingDay) => {
                    if (e.target.dataset.inputSetting === dataName) if (e.target.checked) {
                        e.target.parentNode.classList.add(classNameChecked);
                        if (1 === includingDay) {
                            this.includingFirstDay = true;
                            localStorage.setItem("includingFirstDay", this.includingFirstDay);
                        }
                        if (2 === includingDay) {
                            this.includingLastDay = true;
                            localStorage.setItem("includingLastDay", this.includingLastDay);
                        }
                    } else {
                        e.target.parentNode.classList.remove(classNameChecked);
                        if (1 === includingDay) {
                            this.includingFirstDay = false;
                            localStorage.setItem("includingFirstDay", this.includingFirstDay);
                        }
                        if (2 === includingDay) {
                            this.includingLastDay = false;
                            localStorage.setItem("includingLastDay", this.includingLastDay);
                        }
                    }
                };
                setClassNameChekbox("first-day", 1);
                console.log("this.includingFirstDay", this.includingFirstDay);
                setClassNameChekbox("last-day", 2);
                console.log("this.includingLastDay", this.includingLastDay);
            }));
        }
        isloadPage() {}
        errorInpust() {
            let countItems = 0;
            console.log("this.dateEnd() === error", this.dateEnd());
            this.$el.forEach((i => {
                countItems += 1;
                const errorInput = (mod, err) => {
                    i.classList.add("error-inputs");
                    contentDefault(".days-between-dates");
                    i.addEventListener("animationend", (() => {
                        i.classList.remove("error-inputs");
                    }));
                    if ("Error > 13M" === mod) resultRenderHtml(".days-between-dates", {
                        isError: true,
                        errorClassName: "error-result-dbd",
                        errorMessage: "Кількість місяців у році не може перевищувати 12!"
                    });
                };
                if (true === this.isLoad) {
                    if (2 === countItems && Number(i.value) > 12 || 5 === countItems && Number(i.value) > 12) {
                        console.log("countItems === 2 && Number(i.value) > 12");
                        errorInput("Error > 13M", i.value);
                    }
                    if (false === this.dateStart()) if (i.value.length < 2 && countItems <= 2) //! errorInpust Start date
                    errorInput(); else if (i.value.length < 4 && 3 === countItems) errorInput();
                    if ("error" === this.dateEnd()) if (i.value.length < 2 && countItems >= 4 && countItems <= 5) {
                        //! errorInpust End date
                        console.error("errrrrrooorrrr blinking last twooo=======================");
                        console.warn("i.value.length < 2 && countItems <= 5");
                        errorInput();
                    } else if (i.value.length < 4 && 6 === countItems) errorInput();
                }
            }));
        }
        scrollToElem() {
            this.$btnSubmit.addEventListener("click", (() => {
                const sparkPlan = document.querySelector(".days-between-dates");
                const sparkPlanBottom = sparkPlan.offsetTop - 30;
                window.scrollTo({
                    top: sparkPlanBottom,
                    behavior: "smooth"
                });
            }));
        }
    }
    const inputsDbd = new InputsDbd(".main__input");
    inputsDbd.runLocalStorage();
    inputsDbd.eventBtns();
    inputsDbd.isloadPage();
    for (let count = 0; count < inputsDbd.$el.length; count++) {
        let iInputs = inputsDbd.$el[count];
        iInputs.setAttribute("inputmode", "numeric");
        iInputs.addEventListener("focus", (event => {
            //! event FOCUS iInputs!!!==================
            inputsDbd.inputsFocusKey(event.target, count);
            inputsDbd.autoRenameDayInYear();
            inputsDbd.changeplaceholderContent(event.target, count);
            inputsDbd.setPlaceholder(event.target, count);
        }));
        iInputs.addEventListener("input", (event => {
            //! event INPUT iInputs!!!=================
            inputsDbd.validEventTargetInput(event.target, count);
            inputsDbd.autoRenameDayInYear();
            inputsDbd.changeplaceholderContent(event.target, count);
        }));
        window.addEventListener("load", (() => {
            //! event LOAD iInputs!!!=================
            inputsDbd.autoRenameDayInYear();
            inputsDbd.validEventTargetInput(iInputs, count);
            inputsDbd.changeplaceholderContent(iInputs, count);
        }));
    }
    inputsDbd.setChekbox();
    console.error("inputsDbd.includingFirstDay 1", inputsDbd.includingFirstDay);
    console.error("inputsDbd.includingLastDay 2", inputsDbd.includingLastDay);
    inputsDbd.runLocalStorage();
    inputsDbd.$btnSubmit.addEventListener("click", (e => {
        //! event CLICK btnSubmit!!!===========
        inputsDbd.errorInpust();
        for (let count = 0; count < inputsDbd.$el.length; count++) {
            let iInputs = inputsDbd.$el[count];
            inputsDbd.validEventTargetClick(iInputs, count);
            console.error("Number(inputsDbd.$inputM) <= 12", inputsDbd.$el[1].value <= 12);
        }
        if (false !== inputsDbd.dateStart() && inputsDbd.$el[1].value <= 12 && inputsDbd.$el[4].value <= 12) {
            console.error("inputsDbd.includingFirstDay 1", inputsDbd.includingFirstDay);
            console.error("inputsDbd.includingLastDay 2", inputsDbd.includingLastDay);
            const dbd = new DaysBetweenDates(".days-between-dates", {
                startDate: inputsDbd.dateStart(),
                endDate: inputsDbd.dateEnd(),
                includingFirstDay: inputsDbd.includingFirstDay,
                includingLastDay: inputsDbd.includingLastDay
            });
            console.warn("inputsDbd.dateStart()", inputsDbd.dateStart());
            console.warn("inputsDbd.dateEnd()", inputsDbd.dateEnd());
            //!====
            if (false !== dbd.errorMessage()) resultRenderHtml(".days-between-dates", {
                isError: false,
                totalDays: dbd.totalDays(),
                starDate: inputsDbd.dateStart(),
                endDate: inputsDbd.dateEnd(),
                curentData: inputsDbd.currentDate,
                years: dbd.calcYear,
                months: dbd.calcMonths,
                days: dbd.calcDays,
                includingFirstDay: inputsDbd.includingFirstDay
            }); else if (false === dbd.errorMessage() && "error" !== inputsDbd.dateEnd()) resultRenderHtml(".days-between-dates", {
                isError: true,
                errorClassName: "error-result-dbd",
                errorMessage: "Початкова дата більша за кінцеву дату!"
            });
        }
        inputsDbd.ifRenderResultDbd();
    }));
    inputsDbd.escapeFromFocusInputUnload();
    //!====================================RIPPLE Button================================
        function btnRipleEffect(data, className) {
        document.addEventListener("click", (function(e) {
            const targetItem = e.target;
            if (targetItem.closest(`[data-${data}]`)) {
                const button = targetItem.closest(`[data-${data}]`);
                const ripple = document.createElement("span");
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;
                ripple.style.width = ripple.style.height = `${diameter}px`;
                ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
                ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
                ripple.classList.add(className);
                //! Налаштування: якщо дописати в HTML data-ripple="once", то анімація не накладується!!!
                                button.dataset["ripple"] = true && button.querySelector(`.${className}`) ? button.querySelector(`.${className}`).remove() : null;
                button.appendChild(ripple);
                const timeOut = getAnimationDuration(ripple);
                setTimeout((() => {
                    ripple ? ripple.remove() : null;
                }), timeOut);
                function getAnimationDuration() {
                    const aDuration = window.getComputedStyle(ripple).animationDuration;
                    return aDuration.includes("ms") ? aDuration.replace("ms", "") : 1e3 * aDuration.replace("s", "");
                }
            }
        }));
    }
    btnRipleEffect("ripple", "ripple");
    btnRipleEffect("ripple-clear", "ripple-clear");
    btnRipleEffect("input-ripple-clear", "ripple-clear");
    window["FLS"] = true;
    isWebp();
})();