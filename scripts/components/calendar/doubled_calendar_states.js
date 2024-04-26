class DoubledCalendarDesktopState {
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
    // это единственное состояние для десктопа. Оба календаря открыты
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
    setup() {}
    constructor() {
        super();
        this.leftCalendar = new Calendar("Дата от");
        this.rightCalendar = new Calendar("Дата до");
    }
}

class DoubledCalendarMobileState {
    // 2 состояния - открыт левый. открыт правый. открыты поля ввода
    render() {}
    setup() {}
}

class DobledCalendarMobileStateOpened {
    constructor(date) {
        this.date = date;
    }
}

class DoubledCalendarMobileStateClosed {
    constructor(dateFrom, dateTo) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    setDateFrom(date) {}
    setDateTo(date) {}
    
}
