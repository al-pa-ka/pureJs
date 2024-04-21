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
        this.viewFactory = new ViewFactory();
        this.setupFactory = new SetupFactory();
    }
    connectedCallback() {
        this.openClosedCalendar();
    }

    openClosedCalendar() {
        this.currentBehaviour.clear();
        this.model.currentState = this.model.states.CLOSED;
        const view = this.viewFactory.createClosedCalendar(this.placeholder, this, this.model.getInitialData());
        this.currentBehaviour = this.setupFactory.createClosedCalendarBehaviour(this, this.model, view);
        this.currentBehaviour.setup();
    }
    openCalendarWithSelects() {
        this.currentBehaviour.clear();
        this.model.currentState = this.model.states.SELECTS;
        const view = this.viewFactory.createCalendarWithSelects(
            this.placeholder,
            this,
            this.model.getYears(),
            this.model.getMonths(),
            this.model.getInitialData()
        );
        console.log(view);
        this.currentBehaviour = this.setupFactory.createCalendarWithSelectsBehaviour(this, this.model, view);
        this.currentBehaviour.setup();
    }
    openCalendarWithYearChoice() {
        this.currentBehaviour.clear();
        this.model.currentState = this.model.states.YEAR_CHOICE;
        const view = this.viewFactory.createCalendarWithYearChoice(
            this.placeholder,
            this,
            this.model.getYears(),
            this.model.getInitialData()
        );
        this.currentBehaviour = this.setupFactory.createCalendarWithYearChoiceBehaviour(this, this.model, view);
        this.currentBehaviour.setup();
    }
    openCalendarWithMonthChoice() {
        this.currentBehaviour.clear();
        this.model.currentState = this.model.states.MONTH_CHOICE;
        const view = this.viewFactory.createCalendarWithMonthChoice(
            this.placeholder,
            this,
            this.model.getYears,
            this.model.getMonths(),
            this.model.getInitialData()
        );
        this.currentBehaviour = this.setupFactory.createCalendarWithMonthChoiceBehaviour(this, this.model, view);
        this.currentBehaviour.setup();
    }
    openCalendarWithDayChoice() {
        this.currentBehaviour.clear();
        this.model.currentState = this.model.states.YEAR_CHOICE;
        const view = this.viewFactory.createCalendarWithDayChoice(
            this.placeholder,
            this,
            this.model.getYears(),
            this.model.getMonths(),
            this.model.getDaysOfYear(),
            this.model.getInitialData()
        );
        this.currentBehaviour = this.setupFactory.createCalendarWithDayChoiceBehaviour(this, this.model, view);
        this.currentBehaviour.setup();
    }
    //open(constructor, setupFunction, ...args) {
    //    this.currentView?.clear();
    //    this.currentView = new constructor(...args);
    //    this.currentView.render(this);
    //    setupFunction();
    //    this.currentView.dateInput.value = `${this.model.getDay()}.${
    //        this.model.getMonth() !== "" ? this.model.getMonth() + 1 : ""
    //    }.${this.model.getYear()}`;
    //}

    //openDayChoice() {
    //    console.log(this.model.getDaysOfYear(), this.model.getDayweekIndexOfFirstDay());
    //    this.open(
    //        DesktopCalendarViewDayChoice,
    //        this.setupCalendarWithDayChoice.bind(this),
    //        this.placeholder,
    //        this.model.getYears(),
    //        this.model.getMonths(),
    //        this.model.getDaysOfYear(),
    //        this.model.getDayweekIndexOfFirstDay()
    //    );
    //}

    //openMonthChoice() {
    //    this.open(
    //        DesktopCalendarViewMonthChoice,
    //        this.setupCalendarWithMonthChoice.bind(this),
    //        this.placeholder,
    //        this.model.getYears(),
    //        this.model.getMonths()
    //    );
    //}

    //openYearChoice() {
    //    this.open(
    //        DesktopCalendarViewYearChoice,
    //        this.setupCalendarWithYearChoice.bind(this),
    //        this.placeholder,
    //        this.model.getYears(),
    //        this.model.getMonths()
    //    );
    //}

    //openClosedView() {
    //    this.open(
    //        DesktopCalendarViewWithSelects,
    //        this.setupClosedCalendar.bind(this),
    //        this.placeholder,
    //        this.model.getYears(),
    //        this.model.getMonths()
    //    );
    //}

    //setupYearSelect() {
    //    const yearSelect = this.currentView.yearSelect;
    //    const dateInput = this.currentView.dateInput;
    //    yearSelect.onChangeCallback = value => {
    //        this.model.setYear(value);
    //        dateInput.value = `${this.model.getDay()}.${this.model.getMonth()}.${this.model.getYear()}`;
    //        if (!(this.currentView.constructor.name == "DesktopCalendarViewMonthChoice")) {
    //            this.model.isMonthSetted ? this.openDayChoice() : this.openClosedView();
    //        }
    //        this.onDateChanged();
    //    };
    //    yearSelect.onValueClicked = _ => {
    //        this.openYearChoice();
    //    };
    //    this.model.getYear() ? yearSelect.setValue(yearSelect.getVariables().findIndex(year => year == this.model.getYear())) : null;
    //}

    //setupMonthSelect() {
    //    const monthSelect = this.currentView.monthSelect;
    //    const dateInput = this.currentView.dateInput;
    //    monthSelect.onChangeCallback = value => {
    //        this.model.setMonth(this.model.getMonthIndexByName(value));
    //        dateInput.value = `${this.model.getDay()}.${this.model.getMonth() + 1}.${this.model.getYear()}`;
    //        this.model.isYearSetted ? this.openDayChoice() : this.openClosedView();
    //        this.onDateChanged();
    //    };
    //    monthSelect.onValueClicked = _ => {
    //        this.openMonthChoice();
    //    };
    //    this.model.getMonth() !== "" ? monthSelect.setValue(this.model.getMonth()) : null;
    //}

    //setupYearsButtons() {
    //    this.currentView.yearElems.forEach(el => {
    //        el.onclick = e => {
    //            const year = e.target.textContent;
    //            this.model.setYear(year);
    //            this.model.isMonthSetted ? this.openDayChoice() : this.openClosedView();
    //            this.onDateChanged();
    //        };
    //    });
    //}

    //setupClosedCalendar() {
    //    this.setupMonthSelect();
    //    this.setupYearSelect();
    //}

    //setupCalendarWithDayChoice() {
    //    this.setupYearSelect();
    //    this.setupMonthSelect();
    //    this.currentView.dayElems.forEach(el => {
    //        el.onclick = () => {
    //            this.model.setDate(String(el.textContent.trim()));
    //            this.currentView.dateInput.value = `${this.model.getDay()}.${this.model.getMonth()}.${this.model.getYear()}`;
    //            this.onDateChanged();
    //        };
    //    });
    //}
    //setupCalendarWithMonthChoice() {
    //    this.setupMonthSelect();
    //    this.setupYearSelect();
    //    this.currentView.monthElems.forEach(el => {
    //        el.onclick = e => {
    //            const zeroBasedMonthIndex = this.model.getMonthIndexByName(el.textContent.trim());
    //            this.model.setMonth(zeroBasedMonthIndex);
    //            this.model.isYearSetted ? this.openDayChoice() : this.openClosedView();
    //            this.onDateChanged();
    //        };
    //    });
    //}
    //setupCalendarWithYearChoice() {
    //    const dateInput = this.currentView.dateInput;
    //    this.setupYearsButtons();

    //    this.currentView.yearInput.oninput = e => {
    //        this.currentView.updateYears(this.model.getYears(e.target.textContent.trim()));
    //        this.setupYearsButtons();
    //        this.onDateChanged();
    //    };
    //}

    //setRange(from, to) {
    //    if (this.currentView.constructor.name !== "DesktopCalendarViewDayChoice") return;
    //    this.currentView.setRange(from, to);
    //}
}

customElements.define("custom-calendar", Calendar);
