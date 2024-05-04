class MonthButtons extends AbstractButtonsContainer {
    style = /*html*/ `
        <style>
            .calendar__months-wrapper {
                background-color: white;
                box-sizing: border-box;
                padding: 10px;
                display: grid; /* 1 */
                grid-template-columns: repeat(auto-fill, 90px); /* 2 */
                gap: 10px; /* 3 */
                justify-content: space-between; /* 4 */
            }
            .calendar__month {
                height: 40px;
                width: 90px;
                border: 1px solid lightgray;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        </style>
    `;

    clear() {
        this.buttons.forEach(button => button.remove());
    }
    update(months) {
        this.clear();
        this.buttons = months.map(month => createElement("span", { textContent: month, classes: ["calendar__month"] }));
        this.container.append(...this.buttons);
    }
    setupContainer() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        this.container.classList.add("calendar__months-wrapper");
    }
}

customElements.define("month-buttons", MonthButtons);
