class ClosedCalendarBuilder {
    constructor(placeholder, container, initialData) {
        this.placeholder = placeholder;
        this.container = container;
        this.initialData = initialData;
    }

    createDateInput() {
        console.log(this.initialData);
        const dateInput = new DateInput();
        dateInput.setAttribute("placeholder", this.placeholder);
        if (this.initialData) {
            const month = this.initialData.month !== "" ? this.initialData.month + 1 : "";
            console.log(month);
            dateInput.value = [this.initialData.day, month, this.initialData.year];
        }
        return dateInput;
    }

    build() {
        const calendar = new ClosedCalendar(this.container);
        calendar.setDateInput(this.createDateInput());
        calendar.render();
        return calendar;
    }
}

class CalendarWithSelectsBuilder extends ClosedCalendarBuilder {
    constructor(placeholder, container, years, months, initialData) {
        super(placeholder, container, initialData);
        this.years = years;
        this.months = months;
        console.log(`constructor initial data is ${initialData}`);
        console.log(initialData);
    }

    createYearSelect() {
        const yearSelect = new Select(this.years, "Выберите год");
        if (this.initialData && this.initialData.isYearSetted) {
            const yearIndex = yearSelect.getVariables().findIndex(year => year == this.initialData.year);
            yearSelect.setValueIndex(yearIndex);
        }
        return yearSelect;
    }

    createMonthSelect() {
        console.log(this.months);
        const monthSelect = new Select(this.months, "Выберите месяц");
        console.log(!!this.initialData);
        console.log(this.initialData.isMonthSetted);
        console.log(!!this.initialData && !!this.initialData.isMonthSetted);
        if (this.initialData && this.initialData.isMonthSetted) {
            console.log("in select setup");
            monthSelect.setValueIndex(this.initialData.month);
        }
        return monthSelect;
    }

    build() {
        const calendar = new CalendarWithSelects(this.container);
        calendar.setDateInput(this.createDateInput());
        calendar.setYearSelect(this.createYearSelect());
        calendar.setMonthSelect(this.createMonthSelect());
        calendar.render();
        return calendar;
    }
}

class CalendarWithYearChoiceBuilder extends ClosedCalendarBuilder {
    constructor(placeholder, container, years, initialData) {
        super(placeholder, container, initialData);
        this.years = years;
    }

    style = /*html*/ `
        <style>
            .calendar__years-container{
                gap: 20px;
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
                border: 1px solid lightgray;
                height: 50px;
                width: 100%;
            }
            .calendar__year-input{
                width: 100%;
                box-sizing: border-box;
                display:inline-block;
                vertical-align: middle;
                text-align: center;
                height: fit-content;
                outline: none;
            }
        </style>
    `;

    createYearsButtons() {
        const yearButtons = new YearButtons();
        yearButtons.update(this.years);
    }

    createYearInput() {
        const spanInput = createElement("span", { classes: ["calendar__year-input"] });
        spanInput.contentEditable = true;
        const inputWrapper = createElement("div", {
            classes: ["calendar__year-input-wrapper"],
            nodesToAppend: [spanInput],
        });

        return inputWrapper;
    }

    createYearsButtons() {
        const yearsButtons = new YearButtons();
        yearsButtons.setupContainer();
        yearsButtons.update(this.years);
        return yearsButtons;
    }

    build() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        const calendar = new CalendarWithYearChoice(this.container);
        calendar.setDateInput(this.createDateInput());
        calendar.setYearInput(this.createYearInput());
        calendar.setYearsButtons(this.createYearsButtons());
        calendar.render();
        return calendar;
    }
}

class CalendarWithMonthChoiceBuilder extends ClosedCalendarBuilder {
    constructor(placeholder, container, months, initialData) {
        super(placeholder, container, initialData);
        this.months = months;
    }

    createYearSelect() {
        const yearSelect = new Select(this.months, "Выберите год");
        if (this.initialData && this.initialData.isMonthSetted) {
            const yearIndex = yearSelect.getVariables().findIndex(year => year == this.initialData.year);
            yearSelect.setValueIndex(yearIndex);
        }
        return yearSelect;
    }

    createMonthButtons() {
        const monthButtons = new MonthButtons();
        monthButtons.setupContainer();
        monthButtons.update(this.months);
        return monthButtons;
    }

    build() {
        const calendar = new CalendarWithMonthChoice(this.container);
        calendar.setDateInput(this.createDateInput());
        calendar.setYearSelect(this.createYearSelect());
        calendar.setMonthsButtons(this.createMonthButtons());
        calendar.render();
        return calendar;
    }
}

class CalendarWithDayChoiceBuilder extends CalendarWithSelectsBuilder {
    constructor(placeholder, container, years, months, days, startsWith, initialData) {
        super(placeholder, container, years, months, initialData);
        this.days = days;
        this.startsWith = startsWith;
    }

    createDaysButtons() {
        const daysButtons = new DaysContainer();
        daysButtons.setupContainer();
        daysButtons.update(this.days, this.startsWith);
        return daysButtons;
    }

    build() {
        const calendar = new CalendarWithDayChoice(this.container);
        calendar.setDateInput(this.createDateInput());
        calendar.setYearSelect(this.createYearSelect());
        calendar.setMonthSelect(this.createMonthSelect());

        calendar.setDays(this.createDaysButtons());
        calendar.render();
        return calendar;
    }
}
