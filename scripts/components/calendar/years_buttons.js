class YearButtons extends AbstractButtonsContainer {
    style = /*html*/ `
        <style>
            .calendar__years-buttons-container{

            }
        </style>
    `;

    update(years) {
        this.buttons.forEach(button => button.remove());
        this.buttons = years.map(year => createElement("span", { textContent: year }));
        this.container.append(...this.buttons);
    }

    render() {
        super.render();
        this.container.append(...this.buttons);
        return this.container;
    }
}
customElements.define("year-buttons", YearButtons);
