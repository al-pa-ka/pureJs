class AbstractButtonsContainer {
    container = createElement("div");
    style = ``;
    buttons = [];
    getButtons() {
        return this.buttons;
    }

    applyStyle() {
        this.container.insertAdjacentHTML("beforeend", this.style);
    }

    clear() {
        this.container.innerHTML = ``;
    }

    render() {
        this.clear();
        this.applyStyle();
    }
}
