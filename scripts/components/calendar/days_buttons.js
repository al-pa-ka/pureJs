class DaysContainer extends AbstractButtonsContainer {
    style = /*html*/ `
        <style>
            .calendar__days-container{

            }
        </style>
    `;

    clear() {
        this.buttons.forEach(el => el.remove());
        this.buttons = [];
        super.clear();
    }

    update(days, startsWith) {
        createElement("span", { style: { gridColumn: `span ${startsWith}` } });
        for (let day = 1; day <= days; day++) {
            this.buttons.push(createElement("span", { textContent: day }));
        }
    }

    render() {
        super.render();
        this.container.append(...this.buttons);
        return this.container;
    }
}
