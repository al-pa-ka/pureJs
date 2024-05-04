class DataProvider {
    constructor(model, container, placeholder, eventBus) {
        this.model = model;
        this.container = container;
        this.placeholder = placeholder;
        this.eventBus = eventBus;
    }

    getDataToClosedCalendar() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            initData: this.model.getInitialData(),
            eventBus: this.eventBus,
        };
    }

    getDataToCalendarWithSelects() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            years: this.model.getYears(),
            months: this.model.getMonths(),
            initData: this.model.getInitialData(),
            eventBus: this.eventBus,
        };
    }
    getDataToCalendarWithYearChoice() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            years: this.model.getYears(),
            initData: this.model.getInitialData(),
            eventBus: this.eventBus,
        };
    }
    getDataToCalendarWithMonthChoice() {
        return {
            placeholder: this.placeholder,
            container: this.container,
            months: this.model.getMonths(),
            years: this.model.getYears(),
            initData: this.model.getInitialData(),
            eventBus: this.eventBus,
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
            eventBus: this.eventBus,
        };
    }
}

class Calendar extends HTMLElement {
    onDayChoiceOpened = () => {};
    onMonthChoiceOpened = () => {};
    onYearChoiceOpened = () => {};
    onClosed = () => {};
    onDateChanged = () => {};
    onDaysUpdated = () => {};
    onFullFilled = () => {};
    constructor(placeholder, { model }) {
        super();
        this.currentBehaviour = { clear() {} };
        this.model = model || new CalendarModel();
        this.placeholder = placeholder;
        this.dataProvider = new DataProvider(this.model, this, this.placeholder, {
            onFullFilled: ((dayString, monthString, yearString) => {
                this._onFullFilled(dayString, monthString - 1, yearString);
                this.openCalendarWithDayChoice();
            }).bind(this),
        });
    }
    connectedCallback() {
        this.openClosedCalendar();
        this.model.onDateChanged = () => {
            this.onDateChanged();
        };
    }

    _onFullFilled(dayString, monthString, yearString) {
        this.model.setDate(dayString);
        this.model.setMonth(monthString);
        this.model.setYear(yearString);
        this.onFullFilled();
        console.log(this.model);
    }

    clear() {
        this.innerHTML = ``;
    }

    clearValues() {
        this.model.clear();
        this.openClosedCalendar();
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
        this.onDayChoiceOpened();
    }
    openCalendarWithYearChoice() {
        this.changeState(new CalendarWithYearChoiceState());
    }
    openCalendarWithMonthChoice() {
        this.changeState(new CalendarWithMonthChoiceState());
    }

    setRange(from, to) {
        if (this.state.constructor.name !== "CalendarWithDayChoiceState") {
            throw new Error("This state has no setRange operation");
        }
        this.state.calendar.days.setRange(from, to);
    }
}

customElements.define("custom-calendar", Calendar);
