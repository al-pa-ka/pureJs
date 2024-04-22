//class AbstractClosedCalendarView {
//    STYLE;
//    dateInput;
//    constructor(placeholder, container) {
//        this.placeholder = placeholder;
//        this.container = container;
//    }

//    clear() {
//        this.container.textContent = "";
//    }

//    createDateInput(placeholder) {
//        const input = new DateInput();
//        input.setAttribute("placeholder", placeholder);
//        return input;
//    }

//    render() {
//        this.dateInput = this.createDateInput(this.placeholder);
//        this.container.append(this.dateInput);
//        this.container.insertAdjacentHTML(this.STYLE);
//    }

//    setDateInputValue(date) {
//        const month = (date.getMonth() + 1).toString().padStart(2, "0");
//        this.dateInput.value = `${date.getDate().toString().padStart(2, "0")}.${month}.${date.getFullYear()}`;
//    }

//    update(date) {
//        this.setDateInputValue(date);
//    }
//}

//class AbstractCalendarViewWithSelects extends AbstractClosedCalendarView {
//    yearSelect;
//    monthSelect;

//    constructor(placeholder, container, years, months) {
//        super(placeholder, container);
//        this.years = years;
//        this.months = months;
//    }

//    render() {
//        super.render();
//        this.yearSelect = this.createYearSelect();
//        this.monthSelect = this.createMonthSelect();
//        this.container.append(this.yearSelect, this.monthSelect);
//    }

//    setYearSelectValue(date) {
//        console.log(this.yearSelect.getVariables());
//        const indexOfYear = this.yearSelect
//            .getVariables()
//            .findIndex(variable => Number(variable) == date.getFullYear());
//        this.yearSelect.setValue(indexOfYear == -1 ? 0 : indexOfYear);
//    }

//    setMonthSelectValue(date) {
//        console.log(this.monthSelect.getVariables());
//        const month = new Date(0, date.getMonth()).toLocaleDateString("ru", { month: "long" }).toLocaleUpperCase();
//        const indexOfMonth = this.monthSelect.getVariables().findIndex(variable => variable.toUpperCase() == month);
//        this.monthSelect.setValue(indexOfMonth == -1 ? 0 : indexOfMonth);
//    }
//    update(date) {
//        super.update(date);
//        this.setYearSelectValue(date);
//        this.setMonthSelectValue(date);
//    }
//}

//class AbstractCalendarViewWithYearChoice extends AbstractClosedCalendarView {
//    yearInput;
//    yearsContainer;
//    constructor(placeholder, container, years) {
//        super(placeholder, container);
//        this.years = years;
//    }

//    createYearsList() {}

//    getYearsButtons() {}

//    updateYears() {}

//    render() {
//        super.render();
//        this.yearInput = this.createYearInput();
//        this.yearsContainer = this.createYearsList();
//        this.container.append(this.yearInput, this.yearsContainer);
//    }
//}

//class AbstractCalendarViewWithDayChoice extends AbstractCalendarViewWithSelects {
//    constructor(placeholder, container, years, months, countOfDays, startsWith) {
//        super(placeholder, container, years, months);
//        this.countOfDays = countOfDays;
//        this.startsWith = startsWith;
//    }
//}

//class AbstractCalendarViewWithMonthChoice extends AbstractClosedCalendarView {
//    yearSelect;
//    monthsContainer;
//    constructor(placeholder, container, years, months) {
//        super(placeholder, container);
//        this.years = years;
//        this.months = months;
//    }

//    getMonthsButtons() {}

//    render() {
//        super.render();
//        this.yearSelect = this.createYearSelect();
//        this.monthsContainer = this.createMonths();
//        this.container.append(this.yearSelect, this.monthsContainer);
//    }
//}

//class DesktopCalendarViewWithSelects {
//    dateInput;
//    yearSelect;
//    monthSelect;
//    container;
//    STYLE = /*html*/ `
//        <style>
//            .calendar-wrapper{
//                display: flex;
//                flex-direction: column;
//                flex: 1;
//                width: 100%;
//            }
//        </style>
//    `;

//    clear() {
//        this.container.textContent = "";
//    }

//    constructor(placeholder, years, months) {
//        this.placeholder = placeholder;
//        this.years = years;
//        this.months = months;
//    }

//    createDateInput(placeholder) {
//        const input = new DateInput();
//        input.setAttribute("placeholder", placeholder);
//        return input;
//    }

//    render(container) {
//        this.container = container;
//        this.dateInput = this.createDateInput(this.placeholder);
//        this.yearSelect = new Select(this.years, "Выберите год");
//        this.monthSelect = new Select(this.months, "Выберите месяц");
//        container.appendChild(this.dateInput);
//        container.appendChild(this.yearSelect);
//        container.appendChild(this.monthSelect);
//    }

//    update(date) {
//        this.setDateInputValue(date);
//        this.setYearSelectValue(date);
//        this.setMonthSelectValue(date);
//    }

//    setup(controller) {
//        controller.setupClosedCalendar(this);
//    }
//    setDateInputValue(date) {
//        const month = (date.getMonth() + 1).toString().padStart(2, "0");
//        this.dateInput.value = `${date.getDate().toString().padStart(2, "0")}.${month}.${date.getFullYear()}`;
//    }

//    setYearSelectValue(date) {
//        console.log(this.yearSelect.getVariables());
//        const indexOfYear = this.yearSelect
//            .getVariables()
//            .findIndex(variable => Number(variable) == date.getFullYear());
//        this.yearSelect.setValue(indexOfYear == -1 ? 0 : indexOfYear);
//    }

//    setMonthSelectValue(date) {
//        console.log(this.monthSelect.getVariables());
//        const month = new Date(0, date.getMonth()).toLocaleDateString("ru", { month: "long" }).toLocaleUpperCase();
//        const indexOfMonth = this.monthSelect.getVariables().findIndex(variable => variable.toUpperCase() == month);
//        this.monthSelect.setValue(indexOfMonth == -1 ? 0 : indexOfMonth);
//    }

//    restoreState() {
//        /**@type {Date} */
//        const initialValue = this.extraDetails.initialValue;
//        if (initialValue && initialValue.getTime() !== NULLABLE_DATE.getTime()) {
//            this.update(initialValue);
//        }
//    }
//}

//class DesktopCalendarViewYearChoice extends DesktopCalendarViewWithSelects {
//    yearInput;
//    yearElems = [];
//    yearClickedCallback;
//    yearInputCallback;
//    dateInput;
//    STYLE =
//        this.STYLE +
//        /*html*/ `
//        <style>
//            .calendar__years-wrapper{
//                padding: 10px;
//                display: grid; /* 1 */
//                grid-template-columns: repeat(auto-fill, 55px); /* 2 */
//                grid-gap: 10px; /* 3 */
//                justify-content: space-between; /* 4 */
//            }
//            .calendar__year{
//                height: 40px;
//                width: 55px;
//                border: 1px solid lightgray;
//                display: flex;
//                align-items: center;
//                justify-content: center;
//                cursor: pointer;
//            }
//            .calendar__year-input-wrapper{
//                display: flex;
//                align-items: center;
//                justify-content: center;
//                height: 50px;
//                width: 100%;
//                border: 1px solid lightgray;
//                box-sizing: border-box;
//            }
//            .calendar__year-input{
//                outline: none;
//                min-width: 10px;
//                font-family: Inter;
//                font-size: 19px;
//            }
//        </style>
//    `;

//    setup(controller) {
//        //pattern visitor
//        controller.setupCalendarWithYearCohice(this);
//        this.yearInput.oninput = e => {
//            e.stopPropagation();
//            const event = new CustomEvent("year-input", {
//                detail: { target: this, value: this.yearInput.textContent.trim(), extraDetails: this.extraDetails },
//            });
//            this.yearInputCallback(event);
//        };
//        this.setupYearsElems();
//    }

//    setupYearsElems() {
//        this.yearElems.forEach(elem => {
//            elem.onclick = e => {
//                e.stopPropagation();
//                const event = new CustomEvent("year-clicked", {
//                    detail: { target: this, value: elem.textContent.trim(), extraDetails: this.extraDetails },
//                });
//                this.yearClickedCallback(event);
//            };
//        });
//    }

//    updateYears(years) {
//        this.yearElems = [];
//        this.yearsWrapper.textContent = "";
//        this.attachYearsToContainer(years);
//        this.setupYearsElems();
//    }

//    attachYearsToContainer(years, container) {
//        for (let year of years) {
//            const yearElem = document.createElement("span");
//            yearElem.textContent = year;
//            yearElem.classList.add("calendar__year");
//            this.yearsWrapper.appendChild(yearElem);
//            this.yearElems.push(yearElem);
//        }
//        return container;
//    }

//    renderYears(years) {
//        this.yearElems = [];
//        this.yearsWrapper = document.createElement("div");
//        this.yearsWrapper.classList.add("calendar__years-wrapper");
//        this.attachYearsToContainer(years, this.yearsWrapper);
//        return this.yearsWrapper;
//    }

//    render(container) {
//        this.container = container;
//        container.insertAdjacentHTML("beforeend", this.STYLE);
//        this.dateInput = this.createDateInput(this.placeholder);
//        const yearInputWrapper = document.createElement("div");
//        yearInputWrapper.classList.add("calendar__year-input-wrapper");
//        this.yearInput = document.createElement("span");
//        this.yearInput.classList.add("calendar__year-input");
//        this.yearInput.contentEditable = true;
//        const yearsWrapper = this.renderYears(this.years);
//        container.appendChild(this.dateInput);
//        yearInputWrapper.appendChild(this.yearInput);
//        container.appendChild(yearInputWrapper);
//        container.appendChild(yearsWrapper);
//    }
//}

//class DesktopCalendarViewMonthChoice extends DesktopCalendarViewWithSelects {
//    monthElems = [];
//    monthChangedCallback;
//    STYLE =
//        this.STYLE +
//        /*html*/ `
//        <style>
//            .calendar__months-wrapper{
//                box-sizing: border-box;
//                padding: 10px;
//                display: grid; /* 1 */
//                grid-template-columns: repeat(auto-fill, 90px); /* 2 */
//                gap: 10px; /* 3 */
//                justify-content: space-between; /* 4 */
//            }
//            .calendar__month{
//                height: 40px;
//                width: 90px;
//                border: 1px solid lightgray;
//                display: flex;
//                align-items: center;
//                justify-content: center;
//                cursor: pointer;
//            }
//        </style>
//    `;

//    renderMonths(months) {
//        this.monthElems = [];
//        const monthsWrapper = document.createElement("div");
//        monthsWrapper.classList.add("calendar__months-wrapper");
//        for (let month of months) {
//            const monthElem = document.createElement("span");
//            monthElem.textContent = month;
//            monthElem.classList.add("calendar__month");
//            monthsWrapper.appendChild(monthElem);
//            this.monthElems.push(monthElem);
//        }
//        return monthsWrapper;
//    }
//    render(container) {
//        container.insertAdjacentHTML("beforeend", this.STYLE);
//        super.render(container);
//        const monthsWrapper = this.renderMonths(this.months);
//        container.appendChild(monthsWrapper);
//    }
//}

//class DesktopCalendarViewDayChoice extends DesktopCalendarViewWithSelects {
//    daysWrapper;
//    dayElems = [];
//    STYLE =
//        this.STYLE +
//        /*html*/ `
//        <style>
//            .calendar__day{
//                display: flex;
//                justify-content: center;
//                align-items: center;
//                color: #4C7BFE;
//                background-color: #F6F6F6;
//                font-size: 19px;
//                cursor: pointer;
//                border: 1px solid lightgray;
//            }
//            .calendar__day_member-of-range{
//                background-color: #D4F6FF;
//            }
//            .calendar__day_selected{
//                background-color: #2879FF;
//                color: white;
//                border-color: #2879FF;
//            }
//            .calendar__days-container{
//                display: grid;
//                grid-template-columns: repeat(7, 1fr);
//                grid-auto-rows: 1fr;
//                border: 1px solid lightgray;
//                border-top: none;
//            }
//        </style>
//    `;
//    constructor(placeholder, years, months, days, startFrom) {
//        super(placeholder, years, months);
//        this.days = days;
//        this.startFrom = startFrom;
//    }

//    renderDays(countOfDays, startFrom) {
//        this.dayElems.forEach(el => el.remove());
//        const filler = document.createElement("div");
//        filler.style.setProperty("grid-column", `${startFrom ? startFrom - 1 : 6}`);
//        startFrom - 1 ? this.daysWrapper.appendChild(filler) : null;
//        for (let dayNum = 1; dayNum <= countOfDays; dayNum++) {
//            const day = document.createElement("div");
//            day.textContent = dayNum;
//            day.classList.add("calendar__day");
//            this.daysWrapper.appendChild(day);
//            this.dayElems.push(day);
//        }
//    }

//    mountDaysContainer() {
//        this.daysWrapper = document.createElement("div");
//        this.daysWrapper.classList.add("calendar__days-container");
//        ["пн", "вт", "ср", "чт", "пт", "сб", "вс"].forEach(dayName => {
//            const day = document.createElement("div");
//            day.textContent = dayName;
//            Object.assign(day.style, {
//                "aspect-ratio": "1/1",
//                border: "1px solid lightgray",
//                display: "flex",
//                "justify-content": "center",
//                "align-items": "center",
//                "text-transform": "capitalize",
//                "font-size": "20px",
//            });
//            this.daysWrapper.appendChild(day);
//        });
//        return this.daysWrapper;
//    }

//    render(container) {
//        this.container = container;
//        super.render(container);
//        const daysWrapper = this.mountDaysContainer();
//        this.renderDays(this.days, this.startFrom);
//        container.insertAdjacentHTML("beforeend", this.STYLE);
//        container.appendChild(daysWrapper);
//    }

//    setRange(from, to) {
//        this.dayElems.forEach(el => {
//            el.classList.remove("calendar__day_member-of-range");
//            el.classList.remove("calendar__day_selected");
//            const value = Number(el.textContent.trim());
//            if (value >= from && value <= to) {
//                el.classList.add("calendar__day_member-of-range");
//            }
//            if (value == Number(from) || value == Number(to)) {
//                el.classList.add("calendar__day_selected");
//            }
//        });
//    }
//}

//class ClosedMobileCalendarView extends DesktopCalendarViewWithSelects {
//    STYLE = /*html*/ `
//        <style>
//        .mobile-calendar__top-panel{
//            display: flex;
//            flex-direction: row;
//            justify-content: space-between;
//        }
//        .mobile-calendar__top-panel-span{
//            color: #2879FF;
//            font-size: 19px;
//        }
//        </style>
//    `;
//    createTopPanel(text) {
//        const contanier = document.createElement("div");
//        const arrowBack = document.createElement("span");
//        const cross = document.createElement("span");
//        const label = document.createElement("span");
//        label.textContent = text;
//        label.classList.add("mobile-calendar__top-panel-span");
//        contanier.classList.add("mobile-calendar__top-panel");
//        contanier.append(arrowBack, label, cross);
//        return contanier;
//    }

//    render(container) {
//        this.container = container;
//        const topPanel = this.createTopPanel("Выберите период");
//        this.dateInput = this.createDateInput(this.placeholder);
//        this.yearSelect = new Select(this.years, "Выберите год");
//        this.monthSelect = new Select(this.months, "Выберите месяц");
//        this.container.append(topPanel, this.dateInput, this.yearSelect, this.monthSelect);
//        this.container.insertAdjacentHTML("beforeend", this.STYLE);
//    }
//}

//class MobileYearSelectView extends ClosedMobileCalendarView {
//    STYLE =
//        this.STYLE +
//        /*html*/ `
//            <style>
//                .mobile-calendar__search-elem{

//                }
//                .mobile-calendar__search-icon{
//                    width: 100px;
//                    height: 100px;
//                }
//                .mobile-calendar__search-icon::before{
//                    content: "";
//                    font-family: "Icons";
//                    color: black;
//                    font-size: 20px;
//                }
//            </style>
//        `;

//    createSearchInput() {
//        const searchContainer = createElement("span", { classes: ["mobile-calendar__search-icon"] });
//        return searchContainer;
//    }

//    render(container) {
//        this.container = container;
//        const topPanel = this.createTopPanel("Выберите год");
//        const search = this.createSearchInput();
//        console.log(search);
//        this.container.append(topPanel);
//        this.container.append(search);
//        this.container.insertAdjacentHTML("beforeend", this.STYLE);
//    }
//}

class ClosedCalendar {
    constructor(container) {
        this.container = container;
    }
    dateInput;
    setDateInput(dateInput) {
        this.dateInput = dateInput;
        return this;
    }
    render() {
        this.container.append(this.dateInput);
    }
}

class CalendarWithSelects extends ClosedCalendar {
    yearSelect;
    monthSelect;
    setYearSelect(yearSelect) {
        this.yearSelect = yearSelect;
    }
    setMonthSelect(monthSelect) {
        this.monthSelect = monthSelect;
    }
    render() {
        super.render();
        this.container.append(this.monthSelect, this.yearSelect);
    }
}

class CalendarWithYearChoice extends ClosedCalendar {
    yearInput;
    yearsButtons;
    setYearInput(yearInput) {
        this.yearInput = yearInput;
    }
    setYearsButtons(yearsButtons) {
        this.yearsButtons = yearsButtons;
    }
    render() {
        console.log(this.yearInput);
        this.container.append(this.dateInput, this.yearInput);
        this.container.append(this.yearsButtons.container);
    }
}

class CalendarWithMonthChoice extends ClosedCalendar {
    yearSelect;
    monthsButtons;
    setYearSelect(yearSelect) {
        this.yearSelect = yearSelect;
    }
    setMonthsButtons(monthButtons) {
        this.monthsButtons = monthButtons;
    }

    render() {
        super.render();
        this.container.append(this.yearSelect);
        this.container.append(this.monthsButtons.container);
    }
}

class CalendarWithDayChoice extends CalendarWithSelects {
    days;
    setDays(days) {
        this.days = days;
    }

    render() {
        super.render();
        this.container.append(this.days.container);
    }
}

class DaysButtons {}
