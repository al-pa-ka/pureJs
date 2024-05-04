class BottomPanel extends HTMLElement {
    onApply = () => {};
    onCancel = () => {};
    cancelButton = createElement("button", {
        classes: ["bottom-panel__button", "bottom-panel__cancel-button"],
        textContent: "Отменить",
    });
    applyButton = createElement("button", {
        classes: ["bottom-panel__button", "bottom-panel__apply-button"],
        textContent: "Применить",
    });
    constructor() {
        super();
    }
    style = /*html*/ `
        <style>
            .bottom-panel__container{
                display: flex;
                justify-content: end;
                padding: 15px 10px 15px 10px;
                background-color: #F6F6F6;
                gap: 20px;
            }
            .bottom-panel__button{
                height: 30px;
                outline: none;
                border: none;
                cursor: pointer;
            }
            .bottom-panel__apply-button{
                background-color: #2879FF;
                color: white;
                box-sizing: border-box;
                padding: 4px 8px 4px 8px;
            }
            .bottom-panel__apply-button_inactive{
                background-color: #B2B4B4;
            }
            .bottom-panel__cancel-button{
                background-color: transparent;
                color:  #2879FF;
            }
        </style>
    `;
    setup() {
        this.applyButton.onclick = () => {
            if (!this.applyButton.classList.contains("bottom-panel__apply-button_inactive")) this.onApply();
        };
        this.cancelButton.onclick = () => {
            this.onCancel();
        };
    }
    connectedCallback() {
        this.render();
        this.setup();
    }
    setOnApply(callback) {
        this.onApply = callback;
    }
    setOnCancel(callback) {
        this.onCancel = callback;
    }
    setActive() {
        this.applyButton.classList.remove("bottom-panel__apply-button_inactive");
    }
    setInactive() {
        this.applyButton.classList.add("bottom-panel__apply-button_inactive");
    }
    render() {
        this.classList.add("bottom-panel__container");
        this.append(this.cancelButton, this.applyButton);
        this.insertAdjacentHTML("beforeend", this.style);
    }
}
customElements.define("bottom-panel", BottomPanel);
