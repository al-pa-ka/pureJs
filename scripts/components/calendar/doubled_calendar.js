class DoubledCalendar extends HTMLElement {
    constructor() {
        super();
        this.leftCalendar = new Calendar("Дата от");
        this.rightCalendar = new Calendar("Дата до");
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    render() {
        Object.assign(this.style, {
            display: "flex",
            "flex-direction": "row",
        });
        this.leftCalendar.style.setProperty("flex", "1");
        this.rightCalendar.style.setProperty("flex", "1");
        this.appendChild(this.leftCalendar);
        this.appendChild(this.rightCalendar);
    }

    setup() {
        [this.leftCalendar, this.rightCalendar].forEach(el => {
            el.onDateChanged = () => {
                console.log("changed");
                const leftDate = this.leftCalendar.model.currentDate;
                const rightDate = this.rightCalendar.model.currentDate;
                if (leftDate > rightDate) {
                    if (leftDate.getMonth() !== rightDate.getMonth()) {
                        this.leftCalendar.setRange(0, leftDate.getDate());
                    } else {
                    }
                } else {
                    if (leftDate.getMonth() !== rightDate.getMonth() && leftDate.getFullYear() !== rightDate.getFullYear()) {
                        this.leftCalendar.setRange(leftDate.getDate(), 40);
                        this.rightCalendar.setRange(0, rightDate.getDate());
                    } else {
                        this.leftCalendar.setRange(leftDate.getDate(), rightDate.getDate());
                        this.rightCalendar.setRange(leftDate.getDate(), rightDate.getDate());
                    }
                }
            };
        });
    }
}

customElements.define("doubled-calendar", DoubledCalendar);
