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
            }
        </style>
    `;

    clear() {
        this.buttons.forEach(el => el.remove());
        this.buttons = [];
    }

    update(days, startsWith) {
        const filler = createElement("span", { style: { gridColumn: `span ${startsWith}` } });
        for (let day = 1; day <= days; day++) {
            this.buttons.push(createElement("span", { textContent: day, classes: ["calendar__days-cell"] }));
        }
        this.container.append(filler);
        this.container.append(...this.buttons);
    }

    setupContainer() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        this.container.classList.add("calendar__days-container");
        ["пн", "вт", "ср", "чт", "пт", "сб", "вс"].forEach(day =>
            this.container.append(createElement("span", { textContent: day, classes: ["calendar__days-cell"] }))
        );
    }
}
