class MonthButtons extends AbstractButtonsContainer {
    monthsContainer = createElement("div");

    update() {
        this.container.forEach(button => button.remove());
        this.container = years.map(year => createElement("span", { textContent: year }));
        this.container.append(...this.buttons);
    }
    render() {
        return this.monthsContainer;
    }
}

customElements.define("month-buttons", MonthButtons);
