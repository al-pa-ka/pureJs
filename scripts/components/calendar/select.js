class Select extends HTMLElement {
    onChangeCallback = () => {};
    onValueClicked = () => {};
    arrowLeft;
    arrowRight;
    valueSpan;
    constructor(variables, placeholder) {
        super();
        this.placeholder = placeholder;
        this.variables = variables;
        this.currentIndex = null;
    }

    STYLE = /*html*/ `
        <style>
            .horizontal-select__container{
                display: flex;
                flex-direction: row;
                height: 50px;
                width: 100%;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding-left: 30px;
                padding-right: 30px;
                border: 1px solid lightgray;
            }
            .horizontal-select__arrow {
                font-family: 'Icons';
                display: inline-block;
                width: 10px;
                font-size: 20px;
                transform-origin: center center;
                font-weight: bold;
                height: fit-content;
                width: fit-content;
                cursor: pointer;
                user-select:none;
            }
            .horizontal-select__arrow_left{
                transform: rotateZ(-90deg);
            }
            .horizontal-select__arrow_right{
                transform: rotateZ(90deg);
            }
            .horizontal-select__value{
                color: #2879FF;
                font-size: 19px;
                cursor: pointer;
                width: 100%;
                text-align: center;
            }
        </style>
    `;

    render() {
        const container = document.createElement("div");
        this.insertAdjacentHTML("beforeend", this.STYLE);
        this.arrowLeft = document.createElement("span");
        this.arrowRight = document.createElement("span");

        this.arrowLeft.textContent = "";
        this.arrowRight.textContent = "";

        this.valueSpan = document.createElement("span");
        this.valueSpan.textContent = this.currentIndex !== null ? this.variables[this.currentIndex] : this.placeholder;
        container.appendChild(this.arrowLeft);
        container.appendChild(this.valueSpan);
        container.appendChild(this.arrowRight);
        this.appendChild(container);

        container.classList.add("horizontal-select__container");
        this.arrowLeft.classList.add("horizontal-select__arrow", "horizontal-select__arrow_left");
        this.arrowRight.classList.add("horizontal-select__arrow", "horizontal-select__arrow_right");
        this.valueSpan.classList.add("horizontal-select__value");
    }

    next() {
        if (this.currentIndex === null) {
            this.currentIndex = 0;
            this.update();
            return;
        }
        if (!this.variables.length || this.currentIndex + 1 >= this.variables.length) {
            return;
        } else {
            this.currentIndex++;
        }
        this.update();
    }

    prev() {
        if (this.currentIndex === null) {
            this.currentIndex = 0;
            this.update();
            return;
        }
        if (!this.variables.length || this.currentIndex - 1 < 0) {
            return;
        } else {
            this.currentIndex--;
        }
        this.update();
    }

    update() {
        console.log(this.valueSpan);
        if (this.valueSpan) {
            this.valueSpan.textContent = this.variables[this.currentIndex];
        }
    }

    get value() {
        if (typeof this.currentIndex != "number") {
            throw new Error(`Index is not number, index is - ${this.currentIndex}`);
        }
        return this.variables[this.currentIndex];
    }

    setup() {
        this.arrowRight.onclick = () => {
            this.next();
            this.onChangeCallback(this.value);
        };
        this.arrowLeft.onclick = () => {
            this.prev();
            this.onChangeCallback(this.value);
        };
        this.valueSpan.onclick = () => {
            this.onValueClicked();
        };
    }

    setValueIndex(index) {
        this.currentIndex = index;
        this.update();
    }

    getVariables() {
        return this.variables;
    }

    connectedCallback() {
        this.render();
        this.setup();
    }
}

customElements.define("horizontal-select", Select);
