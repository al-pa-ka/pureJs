class CustomSelect extends HTMLElement {
    constructor() {
        super();
        this.optionViews = [];
        this.value = "";
        this.default = "Не выбрано";
        this.onChangeBehaviour = null;
        this.onInputBehaviour = null;
        this.lastState = [];
    }

    onResize() {
        const parent = this.parentElement;
        const parentWidth = parent.offsetWidth;
        const parentHeight = parent.offsetHeight;
        this.style.width = parentWidth + "px";
        this.querySelector(".custom-select__options-container").style.transform = `translateY(${parentHeight}px)`;
    }

    setChecked(indexes) {
        const inputs = Array.from(this.querySelectorAll("input"));
        indexes.forEach(index => {
            inputs[index].checked = true;
        });
    }
    setValue(value) {
        this.value = value;
        this.update();
    }

    closeWithoutSavingStates() {
        this.close();
        const inputs = Array.from(this.querySelectorAll("input"));
        inputs.forEach((input, index) => {
            input.checked = this.lastState.includes(Number(index));
        });
        this.update();
    }

    closeWithSavingStates() {
        this.close();
        const inputs = Array.from(this.querySelectorAll("input"));
        this.lastState = inputs
            .map((input, index) => {
                return input.checked ? index : null;
            })
            .filter(el => {
                return el != null;
            });
        this.onInputBehaviour.process(this);
    }

    close() {
        const optionsContainer = this.querySelector(".custom-select__options-container");
        optionsContainer.classList.remove("custom-select__options-container_active");
    }

    open() {
        const optionsContainer = this.querySelector(".custom-select__options-container");
        optionsContainer.classList.add("custom-select__options-container_active");
    }

    computeValue() {
        const inputs = Array.from(this.querySelectorAll("input"));
        return inputs
            .map(input => {
                if (input.checked) {
                    const optionValue = String(this.optionViews[Number(input.getAttribute("optionIndex"))]);
                    const valueWithoutHtml = optionValue.replace(/<\/?[^>]+>/g, "");
                    const valueWithoueExtraSpaces = valueWithoutHtml.replace(/\s\s+/g, " ");
                    return valueWithoueExtraSpaces;
                } else {
                    return "";
                }
            })
            .join(" ");
    }

    setup() {
        const optionsContainer = this.querySelector(".custom-select__options-container");
        this.querySelector(".custom-select__arrow-down").onclick = () => {
            if (optionsContainer.classList.contains("custom-select__options-container_active")) {
                this.closeWithoutSavingStates();
            } else {
                this.open();
            }
        };
        const inputs = Array.from(this.querySelectorAll("input"));
        inputs.forEach(input => {
            input.oninput = event => event.stopPropagation();
            input.onchange = () => {
                this.update();
                this.onChangeBehaviour.process(this);
            };
        });
        this.querySelector("button").onclick = () => {
            this.closeWithSavingStates();
        };
        window.addEventListener("click", event => {
            if (!this.contains(event.target)) {
                this.closeWithoutSavingStates();
            }
        });
    }
    connectedCallback() {
        this.initialRender();
        this.onResize();
        window.addEventListener("resize", () => {
            this.onResize();
        });
        this.setup();
    }
    initialRender() {
        const options = this.querySelectorAll("option");
        const optionViews = [];
        const optionValues = [];
        options.forEach(option => {
            optionViews.push(option.innerHTML);
            optionValues.push(option.getAttribute("value"));
            option.remove();
        });

        this.optionViews = optionViews;
        const style = `
            <style>
                custom-select {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    height: 100%;
                }
                .custom-select__value {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                    width: 100%;
                    text-wrap: nowrap;
                }
                .custom-select__value-wrapper{
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                    padding-left: 5px;
                    display: flex;
                    flex-direction: row;
                    overflow: hidden;
                    box-sizing: border-box;
                }
                .custom-select__arrow-down{
                    display: block;
                    margin-top: 6px;
                    cursor: pointer;
                    border: 6px solid transparent;
                    border-top: 8px solid lightgray;
                }
                .custom-select__container {
                    box-sizing: border-box;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                    // background-color: white;
                }
                .custom-select__options-container {
                    box-sizing: border-box;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    display: none;
                    border: 2px solid var(--blue);
                    // flex-direction: column;
                    gap: 10px;
                    overflow: hidden;
                    padding: 10px 15px 10px 15px;
                }
                .custom-select__options-container_active {
                    display: grid;
                    grid-template-columns: 5fr 1fr;
                    background-color: white;
                    grid-auto-flow: row;
                    align-items: center;
                    z-index: 10;
                }
                .custom-select__row {
                    display: contents;
                    padding: 15px;
                    padding-bottom: 2.5px;
                    padding-top: 2.5px;
                }
                .custom-select__option {
                    text-wrap: wrap;
                    font-size: 14px;
                    padding-right: 10px;
                }
                .custom-select__label{
                    justify-self: end;
                }
                .custom-select__checkbox {
                    opacity: 0;
                    position: absolute;
                    justify-self: end;
                }
                .custom-select__checkbox+label::before {
                    display: none;
                    display: inline;
                    opacity: 1;
                    color: black;
                    content: '';
                    font-family: Icons;
                    color: var(--blue);
                    font-size: 18px;
                    justify-self: end;
                }
                .custom-select__checkbox:checked+label::before{
                    content: '';
                    font-size: 18px;
                }
                .custom-select__accept-button{
                    background-color: var(--blue);
                    color: var(--yellow);
                    cursor: pointer;
                    border: none;
                    outline: none;
                    padding: 10px;
                    grid-column: span 2;
                }
            </style>
        `;
        const markup = `
        ${style} 
        <div class="custom-select__container">
                <div class="custom-select__value-wrapper"><span class="custom-select__value">${
                    this.default
                }</span><span class="custom-select__arrow-down"></span></div>
                <div class="custom-select__options-container">
                    ${optionViews
                        .map((option, index) => {
                            const randomID =
                                Math.random().toString(12).slice(2) +
                                Math.random().toString(36).slice(2) +
                                Math.random().toString(15).slice(2) +
                                Math.random().toString(12).slice(2) +
                                Math.random().toString(36).slice(2) +
                                Math.random().toString(15).slice(2);
                            return `
                            <div class="custom-select__row">
                                <span class="custom-select__option">${option}</span>
                                <input value=${optionValues[index]} optionIndex="${index}" id=${randomID} class="custom-select__checkbox" type="checkbox" />
                                <label class="custom-select__label" for=${randomID}></label> 
                            </div>`;
                        })
                        .join("\n")}
                        <button class="custom-select__accept-button">Выбрать</button>
                </div>
        </div> 
        `;
        this.insertAdjacentHTML("beforeend", markup);
    }
    setDefault(index) {
        Array.from(this.querySelectorAll("input"))[index].checked = true;
        this.closeWithSavingStates();
    }
    update() {
        this.querySelector(".custom-select__value").textContent = this.value.trim().length ? this.value : this.default;
    }
    getInputs() {
        return Array.from(this.querySelectorAll("input"));
    }
    getCheckedValues() {
        const inputs = Array.from(this.querySelectorAll("input"));
        return Array.from(
            inputs
                .filter(input => {
                    return input.checked;
                })
                .map(input => {
                    return input.getAttribute("value");
                })
        );
    }
}

customElements.define("custom-select", CustomSelect);
