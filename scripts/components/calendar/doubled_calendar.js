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

    setup() {
        [this.leftCalendar, this.rightCalendar].forEach(el => {
            el.onDateChanged = () => {
                const bothDaySetted = this.leftCalendar.model.isDaySetted && this.rightCalendar.model.isDaySetted;
                const leftDate = this.leftCalendar.model.currentDate;
                const rightDate = this.rightCalendar.model.currentDate;

                if (!bothDaySetted) {
                    this.leftCalendar.model.isDaySetted ? this.leftCalendar.setRange(leftDate.getDate(), leftDate.getDate()) : null;
                    this.rightCalendar.model.isDaySetted ? this.rightCalendar.setRange(rightDate.getDate(), rightDate.getDate()) : null;
                    return;
                }

                const isThisOneRange = leftDate.getMonth() == rightDate.getMonth() && leftDate.getFullYear() == rightDate.getFullYear();
                if (leftDate > rightDate) {
                    if (isThisOneRange) {
                        this.leftCalendar.setRange(rightDate.getDate(), leftDate.getDate());
                        this.rightCalendar.setRange(rightDate.getDate(), leftDate.getDate());
                    } else {
                        this.leftCalendar.setRange(0, leftDate.getDate());
                        this.rightCalendar.setRange(rightDate.getDate(), 40);
                    }
                } else {
                    if (isThisOneRange) {
                        this.leftCalendar.setRange(leftDate.getDate(), rightDate.getDate());
                        this.rightCalendar.setRange(leftDate.getDate(), rightDate.getDate());
                    } else {
                        this.leftCalendar.setRange(leftDate.getDate(), 40);
                        this.rightCalendar.setRange(0, rightDate.getDate());
                    }
                }
            };
        });
    }
}

customElements.define("doubled-calendar", DoubledCalendar);
