class Select extends HTMLElement {
    onChangeCallback = () => {};
    onValueClicked = () => {};
    arrowLeft;
    arrowRight;
    valueSpan;
    constructor(variables, defailtValue) {
        super();
        this.defaultValue = defailtValue;
        this.variables = variables;
        this.value = variables[0];
        this.currentIndex = 0;
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
                color: blue;
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
        this.valueSpan.textContent = this.defaultValue;
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
        if (!this.variables.length) {
            return;
        }
        if (this.value == this.defaultValue) {
            this.value = this.variables[this.currentIndex];
            return;
        }
        if (this.currentIndex + 1 >= this.variables.length) {
            return;
        } else {
            this.currentIndex++;
            this.value = this.variables[this.currentIndex];
        }
        this.update();
    }

    prev() {
        if (!this.variables.length) {
            return;
        }
        if (this.value == this.defaultValue) {
            this.currentIndex = this.variables.length - 1;
            this.value = this.variables[this.currentIndex];
            return;
        }
        if (this.currentIndex - 1 < 0) {
            return;
        } else {
            this.currentIndex--;
            this.value = this.variables[this.currentIndex];
        }
        this.update();
    }

    update() {
        this.valueSpan.textContent = this.value;
    }

    setup() {
        this.arrowRight.onclick = () => {
            this.next(); 
            this.onChangeCallback(this.value);
            console.log(this.onChangeCallback);
            console.log("after change callback");
        };
        this.arrowLeft.onclick = () => {
            this.prev();
            this.onChangeCallback(this.value);
        };
        this.valueSpan.onclick = () => {
            this.onValueClicked();
        };
    }

    setValue(index) {
        this.currentIndex = index;
        this.value = this.variables[this.currentIndex];
        console.log(this.value, this.currentIndex);
        this.update();
    }

    getVariables() {
        return this.variables;
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    setOnChangeCallback(callable) {
        this.onChangeCallback = callable;
    }
    setOnValueClickedCallback(callable) {
        this.onValueClicked = callable;
    }
}

customElements.define("horizontal-select", Select);
