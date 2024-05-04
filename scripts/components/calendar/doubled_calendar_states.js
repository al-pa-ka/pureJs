class DoubledCalendarDesktopState {
    constructor(container, doubledCalendarModel) {
        this.container = container;
        this.doubledCalendarModel = doubledCalendarModel;
        this.leftCalendar = new Calendar("Дата от", { model: doubledCalendarModel.fromDate });
        this.rightCalendar = new Calendar("Дата до", { model: doubledCalendarModel.toDate });
        this.bottomPanel = new BottomPanel();
    }
    STYLE = /*html*/ `    
    <style>
        .doubled-calendar__calendars-container{
            display: flex;
            flex-direction: row;
        }
    </style>
    `;
    // это единственное состояние для десктопа. Оба календаря открыты
    render() {
        this.leftCalendar.style.setProperty("flex", "1");
        this.rightCalendar.style.setProperty("flex", "1");
        const calendarContainers = createElement("div", {
            classes: ["doubled-calendar__calendars-container"],
            nodesToAppend: [this.leftCalendar, this.rightCalendar],
        });
        this.container.classList.add("doubled-calendar__container");
        this.container.appendChild(calendarContainers);
        this.container.appendChild(this.bottomPanel);
        this.container.insertAdjacentHTML("beforeend", this.STYLE);
    }

    isBothDatesSetted() {
        const leftModel = this.doubledCalendarModel.fromDate;
        const rightModel = this.doubledCalendarModel.toDate;
        const isDatesSetted =
            leftModel.isYearSetted &&
            leftModel.isMonthSetted &&
            leftModel.isDaySetted &&
            rightModel.isYearSetted &&
            rightModel.isMonthSetted &&
            rightModel.isDaySetted;
        return isDatesSetted;
    }

    setupBottomPanel() {
        const isDateSetted = this.isBothDatesSetted();
        if (!isDateSetted) {
            this.bottomPanel.setInactive();
        }
        const mapper = index =>
            [
                "Января",
                "Февраля",
                "Марта",
                "Апреля",
                "Мая",
                "Июня",
                "Июля",
                "Августа",
                "Сентября",
                "Октября",
                "Ноября",
                "Декабря",
            ][index - 1];
        this.bottomPanel.onApply = () => {
            this.leftCalendar.state.calendar.dateInput.openViewWithFullName(mapper);
            this.rightCalendar.state.calendar.dateInput.openViewWithFullName(mapper);
            this.bottomPanel.onApply = () => {
                this.onClose();
            };
        };
        this.bottomPanel.onCancel = () => {
            this.leftCalendar.clearValues();
            this.rightCalendar.clearValues();
        };
    }
    updateRange() {
        console.log("updateRange");
        if (!(this.leftCalendar.model.isDaySetted && this.rightCalendar.model.isDaySetted)) return;

        const leftDate = this.leftCalendar.model.currentDate;
        const rightDate = this.rightCalendar.model.currentDate;
        const rangeCalculator = new RangeCalculator(leftDate, rightDate);
        const result = rangeCalculator.calculate();
        try {
            this.leftCalendar.setRange(result[0]["from"], result[0]["to"]);
            this.rightCalendar.setRange(result[1]["from"], result[1]["to"]);
        } catch {
            console.log("setRange on state without this operation");
        }
    }

    setup() {
        const onDateChanged = (() => {
            return () => {
                this.updateRange();
                console.log("dateChanged");
                if (this.isBothDatesSetted()) {
                    this.bottomPanel.setActive();
                } else {
                    this.bottomPanel.setInactive();
                }
            };
        })();

        [this.leftCalendar, this.rightCalendar].forEach(el => {
            el.onDateChanged = () => onDateChanged();
            el.onDaysUpdated = () => this.updateRange();
            el.onDayChoiceOpened = () => this.updateRange();
        });
        this.setupBottomPanel();
    }
}

class DoubledCalendarMobileState {
    // 2 состояния - открыт левый. открыт правый. открыты поля ввода
    style = /*html*/ `
        <style>
            .mobile-doubled-calendar__top-panel{
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
        </style>
    `;
    constructor(container, doubledCalendarModel) {
        this.container = container;
        this.doubledCalendarModel = doubledCalendarModel;
        this.currentState = new DoubledCalendarMobileStateClosed(this.container, this, this.doubledCalendarModel);
    }

    createTopPanel() {
        const topPanelContainer = createElement("div", { classes: ["mobile-doubled-calendar__top-panel"] });
        const goBackArrow = createElement("span", {
            textContent: "",
            classes: ["icon"],
            style: { fontSize: "20px", color: "black" },
        });
        const capture = createElement("span", {
            textContent: "Выберите период",
            style: {
                color: "#2879FF",
                fontSize: "19px",
            },
        });
        const cross = createElement("span", {
            textContent: "",
            classes: ["icon"],
            style: { fontSize: "20px", color: "black" },
        });
        topPanelContainer.append(goBackArrow, capture, cross);
        return topPanelContainer;
    }

    render() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        this.container.append(this.createTopPanel());
        this.currentState.render();
    }
    setup() {
        this.currentState.setup();
    }
    changeState(state) {
        this.container.innerHTML = "";
        this.currentState = state;
        this.render();
        this.setup();
    }

    closeCalendar() {
        this.changeState(new DoubledCalendarMobileStateClosed(this.container, this, this.doubledCalendarModel));
    }
    openCalendar(placeholder, model) {
        const state = new DobledCalendarMobileStateOpened(this.container, placeholder, model, this);
        this.changeState(state);
    }
}

class DobledCalendarMobileStateOpened {
    bottomPanel = new BottomPanel();
    constructor(container, placeholder, model, context) {
        this.container = container;
        this.placeholder = placeholder;
        this.model = model;
        this.context = context;
        this.calendar = new Calendar(placeholder, { model });
    }

    isDateSetted() {
        console.log(this.model);
        return this.model.isDaySetted && this.model.isMonthSetted && this.model.isYearSetted;
    }

    setupBottomPanel() {
        const isDateSetted = this.isDateSetted();
        if (!isDateSetted) {
            this.bottomPanel.setInactive();
        }
        const mapper = index =>
            [
                "Января",
                "Февраля",
                "Марта",
                "Апреля",
                "Мая",
                "Июня",
                "Июля",
                "Августа",
                "Сентября",
                "Октября",
                "Ноября",
                "Декабря",
            ][index - 1];
        this.bottomPanel.onApply = () => {
            console.log("apply");
            this.calendar.state.calendar.dateInput.openViewWithFullName(mapper);
        };
        this.bottomPanel.onCancel = () => {
            this.calendar.clearValues();
        };
    }

    render() {
        this.container.append(this.calendar, this.bottomPanel);
    }
    setup() {
        this.calendar.openCalendarWithSelects();
        this.calendar.onDateChanged = () => {
            console.log("dateChanged");
            if (this.isDateSetted()) {
                this.bottomPanel.setActive();
            }
        };
        this.setupBottomPanel();
        const topPanel = this.container.querySelector(".mobile-doubled-calendar__top-panel");
        topPanel.firstChild.onclick = () => {
            console.log("go back");
            this.context.closeCalendar();
        };
    }
}

class DoubledCalendarMobileStateClosed {
    constructor(container, context, doubledCalendarModel) {
        this.container = container;
        this.context = context;
        this.doubledCalendarModel = doubledCalendarModel;
        this.dateFrom = new DateInput();
        this.dateTo = new DateInput();
    }
    bottomPanel = new BottomPanel();
    setupDateInput(dateInput, model) {
        if (model.isDaySetted && model.isMonthSetted && model.isYearSetted) {
            const mapper = index =>
                [
                    "Января",
                    "Февраля",
                    "Марта",
                    "Апреля",
                    "Мая",
                    "Июня",
                    "Июля",
                    "Августа",
                    "Сентября",
                    "Октября",
                    "Ноября",
                    "Декабря",
                ][index];
            dateInput.setValue(model.getDay(), model.getMonth(), model.getYear());
            dateInput.openViewWithFullName(mapper);
        }
    }

    render() {
        this.dateFrom.setAttribute("placeholder", "Дата от");
        this.dateTo.setAttribute("placeholder", "Дата до");
        console.log(this.context);
        this.setupDateInput(this.dateFrom, this.context.doubledCalendarModel.fromDate);
        this.setupDateInput(this.dateTo, this.context.doubledCalendarModel.toDate);
        this.container.append(this.dateFrom, this.dateTo, this.bottomPanel);
    }

    setup() {
        this.dateFrom.onclick = () => this.context.openCalendar("Дата от", this.doubledCalendarModel.fromDate);
        this.dateTo.onclick = () => this.context.openCalendar("Дата до", this.doubledCalendarModel.toDate);
        this.bottomPanel.onApply = () => {};
        const topPanel = this.container.querySelector(".mobile-doubled-calendar__top-panel");
        [topPanel.firstChild, topPanel.lastChild].forEach(control => {
            control.onclick = () => {
                this.context.onClose();
            };
        });
    }
}
