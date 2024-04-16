class ClosedDesktopCalendarView {
    dateInput;
    yearSelect;
    monthSelect;
    container;
    STYLE = /*html*/ `
        <style>
            .calendar-wrapper{
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 100%;
            }
        </style>
    `;

    clear() {
        this.container.textContent = "";
    }

    constructor(placeholder, years, months) {
        this.placeholder = placeholder;
        this.years = years;
        this.months = months;
    }

    createDateInput(placeholder) {
        const input = new DateInput();
        input.setAttribute("placeholder", placeholder);
        return input;
    }

    render(container) {
        this.container = container;
        this.dateInput = this.createDateInput(this.placeholder);
        this.yearSelect = new Select(this.years, "Выберите год");
        this.monthSelect = new Select(this.months, "Выберите месяц");
        container.appendChild(this.dateInput);
        container.appendChild(this.yearSelect);
        container.appendChild(this.monthSelect);
    }

    update(date) {
        this.setDateInputValue(date);
        this.setYearSelectValue(date);
        this.setMonthSelectValue(date);
    }

    setup(controller) {
        controller.setupClosedCalendar(this);
    }
    setDateInputValue(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        this.dateInput.value = `${date.getDate().toString().padStart(2, "0")}.${month}.${date.getFullYear()}`;
    }

    setYearSelectValue(date) {
        console.log(this.yearSelect.getVariables());
        const indexOfYear = this.yearSelect.getVariables().findIndex(variable => Number(variable) == date.getFullYear());
        this.yearSelect.setValue(indexOfYear == -1 ? 0 : indexOfYear);
    }

    setMonthSelectValue(date) {
        console.log(this.monthSelect.getVariables());
        const month = new Date(0, date.getMonth()).toLocaleDateString("ru", { month: "long" }).toLocaleUpperCase();
        const indexOfMonth = this.monthSelect.getVariables().findIndex(variable => variable.toUpperCase() == month);
        this.monthSelect.setValue(indexOfMonth == -1 ? 0 : indexOfMonth);
    }

    restoreState() {
        /**@type {Date} */
        const initialValue = this.extraDetails.initialValue;
        if (initialValue && initialValue.getTime() !== NULLABLE_DATE.getTime()) {
            this.update(initialValue);
        }
    }
}

class DesktopCalendarViewYearChoice extends ClosedDesktopCalendarView {
    yearInput;
    yearElems = [];
    yearClickedCallback;
    yearInputCallback;
    dateInput;
    STYLE =
        this.STYLE +
        /*html*/ `
        <style>
            .calendar__years-wrapper{
                padding: 10px;
                display: grid; /* 1 */
                grid-template-columns: repeat(auto-fill, 55px); /* 2 */
                grid-gap: 10px; /* 3 */
                justify-content: space-between; /* 4 */
            }
            .calendar__year{
                height: 40px;
                width: 55px;
                border: 1px solid lightgray;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .calendar__year-input-wrapper{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 50px;
                width: 100%;
                border: 1px solid lightgray;
                box-sizing: border-box;
            }
            .calendar__year-input{
                outline: none;
                min-width: 10px;
                font-family: Inter;
                font-size: 19px;
            }
        </style>
    `;

    setup(controller) {
        //pattern visitor
        controller.setupCalendarWithYearCohice(this);
        this.yearInput.oninput = e => {
            e.stopPropagation();
            const event = new CustomEvent("year-input", {
                detail: { target: this, value: this.yearInput.textContent.trim(), extraDetails: this.extraDetails },
            });
            this.yearInputCallback(event);
        };
        this.setupYearsElems();
    }

    setupYearsElems() {
        this.yearElems.forEach(elem => {
            elem.onclick = e => {
                e.stopPropagation();
                const event = new CustomEvent("year-clicked", {
                    detail: { target: this, value: elem.textContent.trim(), extraDetails: this.extraDetails },
                });
                this.yearClickedCallback(event);
            };
        });
    }

    updateYears(years) {
        this.yearElems = [];
        this.yearsWrapper.textContent = "";
        this.attachYearsToContainer(years);
        this.setupYearsElems();
    }

    attachYearsToContainer(years, container) {
        for (let year of years) {
            const yearElem = document.createElement("span");
            yearElem.textContent = year;
            yearElem.classList.add("calendar__year");
            this.yearsWrapper.appendChild(yearElem);
            this.yearElems.push(yearElem);
        }
        return container;
    }

    renderYears(years) {
        this.yearElems = [];
        this.yearsWrapper = document.createElement("div");
        this.yearsWrapper.classList.add("calendar__years-wrapper");
        this.attachYearsToContainer(years, this.yearsWrapper);
        return this.yearsWrapper;
    }

    render(container) {
        this.container = container;
        container.insertAdjacentHTML("beforeend", this.STYLE);
        this.dateInput = this.createDateInput(this.placeholder);
        const yearInputWrapper = document.createElement("div");
        yearInputWrapper.classList.add("calendar__year-input-wrapper");
        this.yearInput = document.createElement("span");
        this.yearInput.classList.add("calendar__year-input");
        this.yearInput.contentEditable = true;
        const yearsWrapper = this.renderYears(this.years);
        container.appendChild(this.dateInput);
        yearInputWrapper.appendChild(this.yearInput);
        container.appendChild(yearInputWrapper);
        container.appendChild(yearsWrapper);
    }
}

class DesktopCalendarViewMonthChoice extends ClosedDesktopCalendarView {
    monthElems = [];
    monthChangedCallback;
    STYLE =
        this.STYLE +
        /*html*/ `
        <style>
            .calendar__months-wrapper{
                box-sizing: border-box;
                padding: 10px;
                display: grid; /* 1 */
                grid-template-columns: repeat(auto-fill, 90px); /* 2 */
                gap: 10px; /* 3 */
                justify-content: space-between; /* 4 */
            }
            .calendar__month{
                height: 40px;
                width: 90px;
                border: 1px solid lightgray;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        </style>
    `;

    renderMonths(months) {
        this.monthElems = [];
        const monthsWrapper = document.createElement("div");
        monthsWrapper.classList.add("calendar__months-wrapper");
        for (let month of months) {
            const monthElem = document.createElement("span");
            monthElem.textContent = month;
            monthElem.classList.add("calendar__month");
            monthsWrapper.appendChild(monthElem);
            this.monthElems.push(monthElem);
        }
        return monthsWrapper;
    }
    render(container) {
        container.insertAdjacentHTML("beforeend", this.STYLE);
        super.render(container);
        const monthsWrapper = this.renderMonths(this.months);
        container.appendChild(monthsWrapper);
    }
}

class DesktopCalendarViewDayChoice extends ClosedDesktopCalendarView {
    daysWrapper;
    dayElems = [];
    STYLE =
        this.STYLE +
        /*html*/ `
        <style>
            .calendar__day{
                display: flex;
                justify-content: center;
                align-items: center;
                color: #4C7BFE;
                background-color: #F6F6F6;
                font-size: 19px;
                cursor: pointer;
            }
            .calendar__day_selected{

            }
            .calendar__day_member-of-range{
                background-color: #D4F6FF;
            }
        </style>  
    `;
    constructor(placeholder, years, months, days, startFrom) {
        super(placeholder, years, months);
        this.days = days;
        this.startFrom = startFrom;
    }

    renderDays(countOfDays, startFrom) {
        this.dayElems.forEach(el => el.remove());
        const filler = document.createElement("div");
        console.log(`start from - ${startFrom ? startFrom - 1 : 6}`);
        filler.style.setProperty("grid-column", `${startFrom ? startFrom - 1 : 6}`);
        startFrom - 1 ? this.daysWrapper.appendChild(filler) : null;
        for (let dayNum = 1; dayNum <= countOfDays; dayNum++) {
            const day = document.createElement("div");
            day.textContent = dayNum;
            Object.assign(day.style, {
                border: "1px solid lightgray",
            });
            day.classList.add("calendar__day");
            this.daysWrapper.appendChild(day);
            this.dayElems.push(day);
        }
    }

    mountDaysContainer() {
        this.daysWrapper = document.createElement("div");
        Object.assign(this.daysWrapper.style, {
            display: "grid",
            "grid-template-columns": "repeat(7, 1fr)",
            "grid-template-rows": "repeat(7, 1fr)",
        });
        ["пн", "вт", "ср", "чт", "пт", "сб", "вс"].forEach(dayName => {
            const day = document.createElement("div");
            day.textContent = dayName;
            Object.assign(day.style, {
                "aspect-ratio": "1/1",
                border: "1px solid lightgray",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                "text-transform": "capitalize",
                "font-size": "20px",
            });
            this.daysWrapper.appendChild(day);
        });
        return this.daysWrapper;
    }

    render(container) {
        this.container = container;
        super.render(container);
        const daysWrapper = this.mountDaysContainer();
        console.log(this.days, this.startFrom);
        this.renderDays(this.days, this.startFrom);
        container.insertAdjacentHTML("beforeend", this.STYLE);
        container.appendChild(daysWrapper);
    }

    setRange(from, to) {
        this.dayElems.forEach(el => {
            el.classList.remove("calendar__day_member-of-range");
            el.classList.remove("calendar__day_member-of-range");
            const value = Number(el.textContent.trim());
            if (value >= from && value <= to) {
                el.classList.add("calendar__day_member-of-range");
            }
            if (value == Number(from) && value == Number(to)) {
                el.classList.add("calendar__day_selected");
            }
        });
    }
}
