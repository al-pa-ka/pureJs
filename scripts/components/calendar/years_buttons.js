class YearButtons extends AbstractButtonsContainer {
    style = /*html*/ `
        <style>
            .calendar__years-wrapper {
                background-color: white;
                padding: 10px;
                display: grid; /* 1 */
                grid-template-columns: repeat(auto-fill, 55px); /* 2 */
                grid-gap: 10px; /* 3 */
                justify-content: space-between; /* 4 */
            }
            .calendar__year {
                height: 40px;
                width: 55px;
                border: 1px solid lightgray;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

        </style>
    `;

    update(years) {
        this.buttons.forEach(button => button.remove());
        this.buttons = years.map(year => createElement("span", { textContent: year, classes: ["calendar__year"] }));
        this.container.append(...this.buttons);
    }

    setupContainer() {
        this.container.insertAdjacentHTML("beforeend", this.style);
        this.container.classList.add("calendar__years-wrapper");
    }
}
customElements.define("year-buttons", YearButtons);
