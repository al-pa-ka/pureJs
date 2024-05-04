class IState {
    render(dataProvider) {} // -> DOM
    setup() {} // -> void
}

class ClosedCalendarState {
    render(dataProvider) {
        const { placeholder, container, initData, eventBus } = dataProvider.getDataToClosedCalendar();
        const builder = new ClosedCalendarBuilder(placeholder, container, initData, eventBus);
        this.calendar = builder.build();
        return this.calendar;
    }

    setup(context) {
        this.calendar.dateInput.onclick = () => {
            context.openCalendarWithSelects();
        };
    }
}

class CalendarWithSelectsState {
    render(dataProvider) {
        const { placeholder, container, years, months, initData, eventBus } =
            dataProvider.getDataToCalendarWithSelects();
        const builder = new CalendarWithSelectsBuilder(placeholder, container, years, months, initData, eventBus);
        this.calendar = builder.build();
        return this.calendar;
    }

    createMonthSelectOnChangeBehaviour(context) {
        const monthSelectBehaviour = SelectBehaviour.defaultMonthChanged(
            this.calendar.dateInput,
            this.calendar.monthSelect,
            context
        );
        monthSelectBehaviour.addBehaviour(() => {
            if (context.model.isYearSetted) {
                context.openCalendarWithDayChoice();
            }
        });
        return monthSelectBehaviour;
    }

    createYearChangedBehaviour(context) {
        const yearSelectBehaviour = SelectBehaviour.defaultYearChanged(this.calendar.dateInput, context);
        yearSelectBehaviour.addBehaviour(() => {
            if (context.model.isMonthSetted) {
                context.openCalendarWithDayChoice();
            }
        });
        return yearSelectBehaviour;
    }

    setup(context) {
        this.calendar.monthSelect.onChangeCallback = this.createMonthSelectOnChangeBehaviour(context);
        this.calendar.monthSelect.onValueClicked = () => context.openCalendarWithMonthChoice();

        this.calendar.yearSelect.onChangeCallback = this.createYearChangedBehaviour(context);
        this.calendar.yearSelect.onValueClicked = () => context.openCalendarWithYearChoice();
    }
}

class CalendarWithYearChoiceState {
    render(dataProvider) {
        const { placeholder, container, years, initData, eventBus } = dataProvider.getDataToCalendarWithYearChoice();
        const builder = new CalendarWithYearChoiceBuilder(placeholder, container, years, initData, eventBus);
        this.calendar = builder.build();
        return this.calendar;
    }

    onYearButtonClicked(button, context) {
        return () => {
            const value = button.textContent.trim();
            context.model.setYear(value);
            if (context.model.isMonthSetted) {
                context.openCalendarWithDayChoice();
            } else {
                context.openCalendarWithSelects();
            }
        };
    }

    setupButtons(context) {
        this.calendar.yearsButtons.buttons.forEach(button => {
            button.onclick = this.onYearButtonClicked(button, context);
        });
    }

    setup(context) {
        this.setupButtons(context);
        this.calendar.yearInput.oninput = e => {
            let years = [];
            years =
                e.target.nodeName == "INPUT"
                    ? context.model.getYears(e.target.value)
                    : context.model.getYears(e.target.textContent);
            console.log(this.calendar.yearsButtons);
            this.calendar.yearsButtons.update(years);
            this.setupButtons(context);
        };
    }
}

class CalendarWithMonthChoiceState {
    render(dataProvider) {
        const { placeholder, container, months, years, initData, eventBus } =
            dataProvider.getDataToCalendarWithMonthChoice();
        const builder = new CalendarWithMonthChoiceBuilder(placeholder, container, months, years, initData, eventBus);
        this.calendar = builder.build();
        return this.calendar;
    }

    setup(context) {
        this.calendar.yearSelect.onValueClicked = () => {
            context.openCalendarWithDayChoice();
        };
        this.calendar.monthsButtons.buttons.forEach(button => {
            button.onclick = () => {
                const value = button.textContent.trim();
                const monthIndex = context.model.getMonthIndexByName(value);
                context.model.setMonth(monthIndex);
                console.log(context.model);
                if (context.model.isYearSetted) {
                    context.openCalendarWithDayChoice();
                } else {
                    context.openCalendarWithSelects();
                }
            };
        });
        this.calendar.yearSelect.onChangeCallback = value => {
            context.model.setYear(value);
            this.calendar.dateInput.setYear(value);
        };
    }
}

class CalendarWithDayChoiceState {
    render(dataProvider) {
        const { placeholder, container, years, months, days, startsWith, initData, eventBus } =
            dataProvider.getDataToCalendarWithDayChoice();
        const builder = new CalendarWithDayChoiceBuilder(
            placeholder,
            container,
            years,
            months,
            days,
            startsWith,
            initData,
            eventBus
        );
        this.calendar = builder.build();
        return this.calendar;
    }

    setupDaysButtons(context) {
        this.calendar.days.buttons.forEach(button => {
            button.onclick = () => {
                const value = button.textContent.trim();
                context.model.setDate(value);
                this.calendar.dateInput.setDay(value);
                const day = context.model.getDay();
            };
        });
    }

    setup(context) {
        const updateDays = (() => {
            const calendar = this.calendar;
            return () => {
                const startsWith = context.model.getDayweekIndexOfFirstDay();
                const daysCount = context.model.getDaysOfMonth();
                calendar.days.update(daysCount, startsWith);
                this.setupDaysButtons(context);
                const month = context.model.getMonth() !== "" ? context.model.getMonth() + 1 : "";
                calendar.dateInput.setValue(context.model.getDay(), month, context.model.getYear());
                context.onDaysUpdated();
            };
        })();
        this.calendar.yearSelect.onValueClicked = () => context.openCalendarWithYearChoice();
        this.calendar.monthSelect.onValueClicked = () => context.openCalendarWithMonthChoice();
        this.calendar.monthSelect.onChangeCallback = SelectBehaviour.defaultMonthChanged(
            this.calendar.dateInput,
            this.calendar.monthSelect,
            context
        ).addBehaviour(updateDays);
        this.calendar.yearSelect.onChangeCallback = SelectBehaviour.defaultYearChanged(
            this.calendar.dateInput,
            context
        ).addBehaviour(updateDays);
        this.setupDaysButtons(context);
    }
}
