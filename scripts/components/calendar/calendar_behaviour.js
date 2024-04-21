class AbstractBehaviour {
    clear() {
        this.view.container.innerHTML = "";
    }
    /**@param {CalendarModel } model */
    /**@param {Calendar} controller  */
    constructor(controller, model, view) {
        this.controller = controller;
        this.model = model;
        this.view = view;
    }
}

class ClosedCalendarBehaviour extends AbstractBehaviour {
    setupDateOnClick() {
        this.view.dateInput.onclick = () => {
            this.controller.openCalendarWithSelects();
        };
        return this;
    }

    setup() {
        this.setupDateOnClick();
    }
}

class MonthSelectBehaviour extends AbstractBehaviour {
    setupMonthSelectOnClick() {
        this.view.monthSelect.onValueClicked = () => {
            this.controller.openCalendarWithMonthChoice();
        };
        return this;
    }
    setupMonthOnChangeCallback() {
        this.view.monthSelect.onChangeCallback = value => {
            this.model.setMonth(this.model.getMonthIndexByName(value));
            this.view.dateInput.value = `${this.model.getDay()}.${
                this.model.getMonth() !== "" ? this.model.getMonth() + 1 : ""
            }.${this.model.getYear()}`;
            if (this.model.isYearSetted && this.model.currentState === this.model.states.SELECTS) {
                this.controller.openCalendarWithDayChoice();
            }
            this.controller.onDateChanged();
        };
    }
}

class YearSelectBehaviour extends AbstractBehaviour {
    setupYearSelectOnClick() {
        this.view.yearSelect.onValueClicked = () => {
            this.controller.openCalendarWithYearChoice();
        };
        return this;
    }
    setupYearOnChangeCallback() {
        this.view.yearSelect.onChangeCallback = value => {
            this.model.setYear(value);
            console.log("setupYearOnChangeCallback");
            this.view.dateInput.value = `${this.model.getDay()}.${
                this.model.getMonth() !== '' ? this.model.getMonth() + 1 : null
            }.${this.model.getYear()}`;
            if (this.model.isMonthSetted && this.model.currentState == this.model.states.SELECTS) {
                this.controller.openCalendarWithDayChoice();
            }
            this.controller.onDateChanged();
        };
    }
}

class CalendarWithSelectsBehaviour extends AbstractBehaviour {
    constructor(controller, model, view) {
        super(controller, model, view);
        this.monthSelectBehaviour = new MonthSelectBehaviour(controller, model, view);
        this.yearSelectBehaviour = new YearSelectBehaviour(controller, model, view);
    }
    setupMonthSelectOnClick() {
        this.monthSelectBehaviour.setupMonthSelectOnClick();
        return this;
    }
    setupMonthOnChangeCallback() {
        this.monthSelectBehaviour.setupMonthOnChangeCallback();
        return this;
    }

    setupYearSelectOnCLick() {
        this.yearSelectBehaviour.setupYearSelectOnClick();
        return this;
    }
    setupYearOnChangeCallback() {
        this.yearSelectBehaviour.setupYearOnChangeCallback();
        return this;
    }
    setup() {
        this.setupMonthSelectOnClick()
            .setupMonthOnChangeCallback()
            .setupYearOnChangeCallback()
            .setupYearSelectOnCLick();
    }
}

class CalendarWithYearChoiceBehaviour extends AbstractBehaviour {
    setupYearsButtons() {
        this.view.yearsButtons.forEach(el => {
            el.onclick = e => {
                const year = e.target.textContent.trim();
                this.model.setYear(year);
                this.model.isMonthSetted
                    ? this.controller.openCalendarWithDayChoice()
                    : this.controller.openCalendarWithSelects();
                this.controller.onDateChanged();
            };
        });
        return this;
    }

    setupYearInput() {
        this.view.yearInput.oninput = e => {
            this.view.updateYears(this.model.getYears(e.target.textContent.trim()));
            this.setupYearsButtons();
            this.controller.onDateChanged();
        };
        return this;
    }

    setup() {
        this.setupYearInput();
        this.setupYearsButtons();
    }
}

class CalendarWithMonthChoiceBehaviour extends AbstractBehaviour {
    constructor(controller, model, view) {
        super(controller, model, view);
        this.yearSelectBehaviour = new YearSelectBehaviour(controller, model, view);
    }

    setupYearSelectOnCLick() {
        this.yearSelectBehaviour.setupYearSelectOnClick();
        return this;
    }

    setupYearOnChangeCallback() {
        this.view.yearSelect.onChangeCallback = value => {
            this.model.setMonth(this.model.getMonthIndexByName(value));
            dateInput.value = `${this.model.getDay()}.${this.model.getMonth() + 1}.${this.model.getYear()}`;
            this.controller.onDateChanged();
        };
        return this;
    }

    setupMonthButtons() {
        this.view.monthsButtons.forEach(el => {
            el.onclick = () => {
                const month = e.target.textContent.trim();
                this.model.setMonth(this.model.getMonthIndexByName(month));
                this.model.isYearSetted
                    ? this.controller.openCalendarWithDayChoice()
                    : this.controller.openCalendarWithSelects();
                this.controller.onDateChanged();
            };
        });
        return this;
    }

    setup() {
        this.setupMonthButtons();
        this.setupYearOnChangeCallback();
        this.setupYearSelectOnCLick();
    }
}

class CalendarWithDayChoiceBehaviour extends CalendarWithSelectsBehaviour {
    setupDaysButtons() {
        this.view.days.update(this.model.getDaysOfYear(), this.model.getDayweekIndexOfFirstDay())
    }

    setup() {
        super.setup();
        this.setupDaysButtons();
    }
}
