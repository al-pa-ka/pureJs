class DoubledCalendar extends HTMLElement {
    onLeftDateLaterThenRight = () => {};
    onDateApplied = () => {};
    STYLE = /*html*/ `    
    <style>
        .doubled-calendar__button{
            outline: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            font-size: 18px;
        }
        .doubled-calendar__button-apply{
            background-color: #2879FF;
            color: white;
        }
        .doubled-calendar__button-disable{
            color: #2879FF;
        }
        .doubled-calendar__button-apply_inactive{
            background-color: inherit;
        }
        .doubled-calendar__bottom-panel{
            display: flex;
            flex-direction: row;
            justify-content: end;
            grid-column: span 2;
            height: 40px;
            gap: 10px;
            padding-top: 20px;
            padding-bottom: 20px;
        }
    </style>
    `;
    constructor() {
        super();
        this.leftCalendar = new Calendar("Дата от");
        this.rightCalendar = new Calendar("Дата до");
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    createBottomPanel() {
        const bottomPanel = document.createElement("div");
        const resetButton = document.createElement("button");
        const applyButton = document.createElement("button");

        resetButton.textContent = "Сбросить";
        applyButton.textContent = "Применить";

        bottomPanel.classList.add("doubled-calendar__bottom-panel");
        resetButton.classList.add("doubled-calendar__button", "doubled-calendar__button-disable");
        applyButton.classList.add("doubled-calendar__button", "doubled-calendar__button-apply");

        bottomPanel.append(resetButton, applyButton);
        return bottomPanel;
    }

    render() {
        Object.assign(this.style, {
            display: "grid",
            "grid-template-columns": "1fr 1fr",
            padding: "20px",
            "background-color": "#F0F0F0",
            "column-gap": "5px",
        });

        this.leftCalendar.style.setProperty("flex", "1");
        this.rightCalendar.style.setProperty("flex", "1");
        this.appendChild(this.leftCalendar);
        this.appendChild(this.rightCalendar);
        this.appendChild(this.createBottomPanel());
        this.insertAdjacentHTML("beforeend", this.STYLE);
    }

    updateRange() {
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
        [this.leftCalendar, this.rightCalendar].forEach(el => {
            el.onDateChanged = () => this.updateRange();
            el.onDaysUpdated = () => this.updateRange();
            el.onDayChoiceOpened = () => this.updateRange();
        });
    }
}

class RangeCalculator {
    constructor(leftCalendarDate, rightCalendarDate) {
        this.leftCalendarDate = leftCalendarDate;
        this.rightCalendarDate = rightCalendarDate;
    }
    calculate() {
        let strategy;
        if (this.leftCalendarDate > this.rightCalendarDate) {
            strategy = new LeftGreaterThanRight();
        } else {
            strategy = new LeftLessThanRight();
        }
        return strategy.calculate(this.leftCalendarDate, this.rightCalendarDate);
    }
}

class AbstractRangeCalculatorStrategy {
    isInOneRange(leftDate, rightDate) {
        return leftDate.getMonth() == rightDate.getMonth() && leftDate.getFullYear() == rightDate.getFullYear();
    }
}

class LeftGreaterThanRight extends AbstractRangeCalculatorStrategy {
    calculate(leftDate, rightDate) {
        const isThisOneRange = this.isInOneRange(leftDate, rightDate);
        if (!isThisOneRange) {
            return [
                { from: 0, to: leftDate.getDate() },
                { from: rightDate.getDate(), to: 40 },
            ];
        } else {
            return [
                { from: rightDate.getDate(), to: leftDate.getDate() },
                { from: rightDate.getDate(), to: leftDate.getDate() },
            ];
        }
    }
}

class LeftLessThanRight extends AbstractRangeCalculatorStrategy {
    calculate(leftDate, rightDate) {
        const isThisOneRange = this.isInOneRange(leftDate, rightDate);
        if (!isThisOneRange) {
            return [
                { from: leftDate.getDate(), to: 40 },
                { from: 0, to: rightDate.getDate() },
            ];
        } else {
            return [
                { from: leftDate.getDate(), to: rightDate.getDate() },
                { from: leftDate.getDate(), to: rightDate.getDate() },
            ];
        }
    }
}

customElements.define("doubled-calendar", DoubledCalendar);
