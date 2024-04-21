class ClosedCalendarBuilder {
    constructor(placeholder, container) {
        this.placeholder = placeholder;
        this.container = container;
    }

    createDateInput() {
        const dateInput = new DateInput();
        dateInput.setAttribute("placeholder", this.placeholder);
        if (this.initialData) {
            dateInput.value = `${this.initialData.day}.${this.initialData.month}.${this.initialData.year}`;
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
        super(placeholder, container);
        this.years = years;
        this.months = months;
        this.initialData = initialData;
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
        if (this.initialData && this.initialData.isMonthSetted) {
            //const monthIndex = yearSelect
            //    .getVariables()
            //    .findIndex(month => month.toUpperCase() == this.initialData.month);
            //monthSelect.setValue(this.initialData.month);
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
    constructor(placeholder, container, years) {
        super(placeholder, container);
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
        </style>
    `;

    createYearsContainer() {
        const container = createElement("div", { classes: ["calendar__years-container"] });
        return container;
    }

    createYearInput() {
        const spanInput = createElement("span");
        return spanInput;
    }

    createYearsButtons() {
        const yearsButtons = [];
        for (const year of this.years) {
            yearsButtons.push(createElement("span", { textContent: year, classes: ["calendar__year"] }));
        }
        return yearsButtons;
    }

    build() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        const calendar = new CalendarWithYearChoice(this.container);
        calendar.setDateInput(this.createDateInput());
        calendar.setYearInput(this.createYearInput());
        calendar.setYearsContainer(this.createYearsContainer());
        calendar.setYearsButtons(this.createYearsButtons());
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
