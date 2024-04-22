class DataProvider {
    constructor(model, container, placeholder) {
        this.model = model;
        this.container = container;
        this.placeholder = placeholder;
    }

    getDataToClosedCalendar() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            initData: this.model.getInitialData(),
        };
    }

    getDataToCalendarWithSelects() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            years: this.model.getYears(),
            months: this.model.getMonths(),
            initData: this.model.getInitialData(),
        };
    }
    getDataToCalendarWithYearChoice() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            years: this.model.getYears(),
            initData: this.model.getInitialData(),
        };
    }
    getDataToCalendarWithMonthChoice() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            months: this.model.getMonths(),
            initData: this.model.getInitialData(),
        };
    }
    getDataToCalendarWithDayChoice() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            years: this.model.getYears(),
            months: this.model.getMonths(),
            days: this.model.getDaysOfMonth(),
            startsWith: this.model.getDayweekIndexOfFirstDay(),
            initData: this.model.getInitialData(),
        };
    }
}

class Calendar extends HTMLElement {
    onDayChoiceOpened = () => {};
    onMonthChoiceOpened = () => {};
    onYearChoiceOpened = () => {};
    onClosed = () => {};
    onDateChanged = () => {};
    constructor(placeholder) {
        super();
        this.currentBehaviour = { clear() {} };
        this.model = new CalendarModel();
        this.placeholder = placeholder;
        this.dataProvider = new DataProvider(this.model, this, this.placeholder);
    }
    connectedCallback() {
        this.openClosedCalendar();
    }

    clear() {
        this.innerHTML = ``;
    }

    changeState(state) {
        this.clear();
        this.state = state;
        this.state.render(this.dataProvider);
        this.state.setup(this);
    }

    openClosedCalendar() {
        this.changeState(new ClosedCalendarState());
    }
    openCalendarWithSelects() {
        this.changeState(new CalendarWithSelectsState());
    }
    openCalendarWithDayChoice() {
        this.changeState(new CalendarWithDayChoiceState());
    }
    openCalendarWithYearChoice() {
        this.changeState(new CalendarWithYearChoiceState());
    }
    openCalendarWithMonthChoice() {
        this.changeState(new CalendarWithMonthChoiceState());
    }
}

customElements.define("custom-calendar", Calendar);
