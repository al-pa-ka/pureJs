class DaysContainer extends AbstractButtonsContainer {
    style = /*html*/ `
        <style>
            .calendar__days-container{
                display: grid;
                grid-template-columns: repeat(7, 1fr);
            }
            .calendar__days-cell{
                border: 1px solid lightgray;
                aspect-ratio: 1 / 1;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                cursor: pointer;
                text-transform: capitalize;
                color: #6CA3FE;
                background-color: white;
            }
            .calendar__days-cell_selected{
                background-color: #2879ff;
                color: white;
            }
            .calendar__days-cell_in-range{
                background-color: #D4f6ff;
                color: #6CA3FE;
            }
            @media(width <= 700px) {
                .calendar__days-cell{
                    font-size: 16px;
                }
            }
        </style>
    `;

    filler = null;

    clear() {
        this.filler ? this.filler.remove() : null;
        this.buttons.forEach(el => el.remove());
        this.buttons = [];
    }

    update(days, startsWith) {
        this.clear();
        for (let day = 1; day <= days; day++) {
            this.buttons.push(createElement("span", { textContent: day, classes: ["calendar__days-cell"] }));
        }
        if (startsWith - 1) {
            this.filler = createElement("span", { style: { gridColumn: `span ${startsWith - 1}` } });
            this.container.append(this.filler);
        }
        this.container.append(...this.buttons);
    }

    setupContainer() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        this.container.classList.add("calendar__days-container");
        ["пн", "вт", "ср", "чт", "пт", "сб", "вс"].forEach(day =>
            this.container.append(createElement("span", { textContent: day, classes: ["calendar__days-cell"] }))
        );
    }

    setRange(from, to) {
        this.buttons.forEach(button => {
            button.classList.remove("calendar__days-cell_in-range");
            button.classList.remove("calendar__days-cell_selected");
            const value = Number(button.textContent.trim());
            const inRange = value >= from && value <= to;
            if (inRange) {
                button.classList.add("calendar__days-cell_in-range");
            }
            if (value == from || value == to) {
                button.classList.remove("calendar__days-cell_in-range");
                button.classList.add("calendar__days-cell_selected");
            }
        });
    }
}
