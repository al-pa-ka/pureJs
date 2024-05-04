class ActionsSet {
    constructor(input) {
        this.checks = [];
        this.input = input;
        this.lastValue = "";
    }

    add(rule) {
        this.checks.push(rule);
        return this;
    }

    setup() {
        this.input.oninput = () => {
            this.checks.forEach(rule => rule(this.input, this.lastValue, this.input.getValue()));
            this.lastValue = this.input.getValue();
        };
    }
}

const maxCharactersRule = max => {
    return (input, oldValue, newValue) => {
        console.log(input);
        if (input.getValue().length > max) {
            input.setValue(input.getValue().slice(0, max));
        }
    };
};

const startFrom = startFrom => {
    const _startsWith = (startFrom, value) => {
        console.log(startFrom, value);
        for (let i = 0; i < Math.min(startFrom.length, value.length); i++) {
            isStartsWith = startFrom[i] == value[i];
            console.log(isStartsWith);
            if (!isStartsWith) return false;
        }
        return true;
    };
    return (input, oldValue, newValue) => {
        if (!newValue) return;
        const checkPassed = startFrom.reduce((accumulator, startFromString) => {
            return accumulator || _startsWith(startFromString, newValue);
        }, false);
        if (!checkPassed) {
            input.setValue(oldValue);
        }
    };
};

const maxValue = maxValue => {
    return (input, oldValue, newValue) => {
        if (Number(input.getValue()) > maxValue) {
            input.setValue(maxValue);
        }
    };
};

const onlyDigits = _ => {
    return (input, oldValue, newValue) => {
        const value = input.getValue();
        console.log(value);
        if (!/^\d{0,100}$/g.test(value)) {
            input.setValue(oldValue);
        }
    };
};

class AbstractStrategy {
    style = /*html*/ `
        <style>
            date-input{
                width: 100%;
            }
            .input-container{
                background-color: white;
                padding: 5px;
                box-sizing: border-box;
                border: 1px solid lightgray;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .input-container_inactive{
                background-color: #F6F6F6;
            }
            .date-with-placeholder{
                padding-left: 5px;
                flex: 1;
                display: flex;
                align-items: center;
                flex-direction: row;
                width: fit-content;
                gap: 10px;
                margin-left: 20px;
            }
            .date-with-placeholder_blue-bg{
                background-color: #D4F6FF;
            }
            .date{
                display: flex;
                align-items: center;
            }

            .date-input{
                font-size: 18px;
                font-weight: medium;
                font-family: Roboto;
                outline: none;
                border: none;
                padding: 0;
                width: 10px;
                text-transform: uppercase;
            }
            .day:empty{
                width: 27px;
            }
            .month:empty{
                width: 30px;
            }
            @keyframes date-input_selected{ 
                0% {
                    box-shadow: 0px 0px 0px 0px;
                }
                59%{
                    box-shadow: 0px 0px 0px 0px;
                }
                60%{
                    box-shadow: -1px 0px 0px 0px;
                }
                100% {
                    box-shadow: -1px 0px 0px 0px; 
                }
            }
            .date-input[contentEditable=true]:empty.selected{
                animation-name: date-input_selected;
                animation-timing-function: cubic-bezier(1.000, 0.0, 1.000, 0);
                animation-duration: 1.3s;
                animation-iteration-count: infinite;
            }
            .date-input-wrapper:has(.dot-before)::before{
                content: ".";
            }
            .space-before{
                padding-left: 5px;
            }
            .date-input.year{
                width: 130px;
            }
            p.date-label{
                font-weight: 300;
                font-family: Roboto;
                font-size: 18px;
                text-transform: uppercase;
                height: fit-content;
            }
        </style>
    `;
}

class DefaultDateInputRenderStrategy extends AbstractStrategy {
    constructor(container) {
        super();
        this.container = container;
    }
    container;
    onFullFilled = () => {};
    dayInput = createElement("resizable-input", { classes: ["date-input", "day"] });
    monthInput = createElement("resizable-input", { classes: ["date-input", "month", "dot-before"] });
    yearInput = createElement("resizable-input", { classes: ["date-input", "dot-before", "year"] });
    cross = createElement("span", {
        textContent: "",
        classes: ["icon"],
        style: {
            fontSize: "20px",
            color: "black",
            paddingLeft: "20px",
            cursor: "pointer",
        },
    });
    setDay(day) {
        if (!/\d{1,2}/g.test(day.toString())) {
            throw new Error(`${day} - bad format`);
        }
        console.log(this.dayInput);
        this.dayInput.setValue(day.toString().padStart(2, "0"));
        this.onInteract();
    }
    setMonth(month) {
        if (!/\d{1,2}/g.test(month.toString())) {
            throw new Error(`${month} - bad format`);
        }
        this.monthInput.setValue(month.toString().padStart(2, "0"));
        this.onInteract();
    }
    setYear(year) {
        if (!/\d{4}/.test(year.toString())) {
            throw new Error(`${year} - bad format`);
        }
        this.yearInput.setValue(year.toString());
        this.onInteract();
    }
    render(outerContainer) {
        this.dayInput.setAttribute("placeholder", "ДД");
        this.monthInput.setAttribute("placeholder", "ММ");
        this.yearInput.setAttribute("placeholder", "ГГГГ");

        outerContainer.innerHTML = ``;
        outerContainer.classList.add("input-container");
        const dateWithPlaceholder = createElement("div", { classes: ["date-with-placeholder"] });
        const dateLabel = createElement("p", { classes: ["date-label"] });
        const date = createElement("div", { classes: ["date"] });

        const calendarIcon = createElement("span", {
            textContent: "",
            classes: ["icon"],
            style: { fontSize: "30px", color: "black", flex: "1", justifyContent: "end", display: "flex" },
        });

        for (let input of [this.dayInput, this.monthInput, this.yearInput]) {
            const inputWrapper = createElement("div", { classes: ["date-input-wrapper"], nodesToAppend: [input] });
            date.appendChild(inputWrapper);
        }

        outerContainer.appendChild(dateWithPlaceholder);
        outerContainer.appendChild(this.cross);
        dateWithPlaceholder.append(dateLabel, date, calendarIcon);

        dateLabel.textContent = outerContainer.getAttribute("placeholder");

        outerContainer.insertAdjacentHTML("afterbegin", this.style);
        this.container = outerContainer;
    }

    checkIsAnyFilled() {
        const anyValue = [this.dayInput, this.monthInput, this.yearInput].reduce(
            (accumulator, input) => accumulator + input.getValue(),
            ""
        );
        return anyValue;
    }

    _onFullFilled() {
        this.onFullFilled(this.dayInput.getValue(), this.monthInput.getValue(), this.yearInput.getValue());
    }

    checkIsFullFilled() {
        const day = this.dayInput.getValue();
        const month = this.monthInput.getValue();
        const year = this.yearInput.getValue();
        return day && month && year;
    }

    onInteract() {
        const anyValue = this.checkIsAnyFilled();
        if (!anyValue) {
            this.container.classList.add("input-container_inactive");
            this.cross.style.setProperty("display", "none");
        } else {
            this.container.classList.remove("input-container_inactive");
            this.cross.style.setProperty("display", "block");
        }
    }

    setup(context) {
        new ActionsSet(this.dayInput)
            .add(maxCharactersRule(2))
            .add(startFrom(["0", "1", "2", "3"]))
            .add(maxValue(31))
            .add(onlyDigits())
            .setup();
        this.dayInput.addEventListener("focusout", () => {
            if (!this.dayInput.getValue()) return;
            this.dayInput.setValue(this.dayInput.getValue().padStart(2, "0"));
        });
        this.dayInput.addEventListener("focusout", () => {
            if (this.checkIsFullFilled()) {
                this._onFullFilled();
            }
        });
        new ActionsSet(this.monthInput)
            .add(maxCharactersRule(2))
            .add(startFrom(["0", "1"]))
            .add(maxValue(12))
            .add(onlyDigits())
            .setup();
        this.monthInput.addEventListener("focusout", () => {
            if (!this.monthInput.getValue()) return;
            this.monthInput.setValue(this.monthInput.getValue().padStart(2, "0"));
        });
        this.monthInput.addEventListener("focusout", () => {
            if (this.checkIsFullFilled()) {
                this._onFullFilled();
            }
        });
        new ActionsSet(this.yearInput)
            .add(maxCharactersRule(4))
            .add(startFrom(["19", "2"]))
            .add(onlyDigits())
            .setup();
        this.yearInput.addEventListener("focusout", () => {
            if (this.checkIsFullFilled()) {
                this._onFullFilled();
            }
        });
        const onInteract = () => {};
        this.cross.onclick = e => {
            e.preventDefault();
            [this.dayInput, this.monthInput, this.yearInput].forEach(input => input.setValue(null));
            onInteract();
        };
        this.onInteract();
        [this.dayInput, this.monthInput, this.yearInput].forEach(input =>
            input.addEventListener("input", _ => this.onInteract())
        );
    }

    get value() {
        return `${this.day}.${this.month}.${this.year}`;
    }

    setValue(day, month, year) {
        this.dayInput.setValue(day ? day.toString().padStart(2, "0") : "");
        this.monthInput.setValue(month ? month.toString().padStart(2, "0") : "");
        this.yearInput.setValue(year ? year : "");
    }
}

class FullNameRenderStrategy extends DefaultDateInputRenderStrategy {
    dayInput = createElement("span", { classes: ["date-input"] });
    monthInput = createElement("span", { classes: ["date-input", "space-before"] });
    yearInput = createElement("span", { classes: ["date-input", "year", "space-before"] });

    render(outerContainer) {
        super.render(outerContainer);
        const dateWithPlaceholder = outerContainer.querySelector(".date-with-placeholder");
        dateWithPlaceholder.classList.add("date-with-placeholder_blue-bg");
    }

    setup(context) {
        [this.dayInput, this.monthInput, this.yearInput].forEach(input => {
            input.getValue = () => input.textContent;
            input.setValue = value => {
                console.log(value);
                input.innerText = value;
            };
        });
        this.container.onclick = () => {
            context.openDefaultView();
            this.container.onclick = null;
        };
        this.cross.onclick = () => {
            context.month = "";
            context.year = "";
            context.day = "";
        };
    }

    setMonth(month) {
        this.monthInput.textContent = month;
    }
}

class DateInput extends HTMLElement {
    onDayInput = () => {};
    onMonthInput = () => {};
    onYearInput = () => {};
    onFullFilled = (d, m, y) => {};
    onDateChanged = () => {};
    constructor({ day, month, year } = { day: "", month: "", year: "" }) {
        super();
        this.day = day;
        this.month = month;
        this.year = year;
        this.currentState = new DefaultDateInputRenderStrategy();
    }

    update(day, month, year) {
        this.dayInput.textContent = day ? day.toString().padStart(2, "0") : "";
        this.monthInput.textContent = month ? month.toString().padStart(2, "0") : "";
        this.yearInput.textContent = year;
    }

    setDay(day) {
        this.day = day;
        if (this.currentState.constructor.name != "DefaultDateInputRenderStrategy") this.openDefaultView();
        this.currentState.setDay(day);
    }
    setMonth(month) {
        this.month = month;
        if (this.currentState.constructor.name != "DefaultDateInputRenderStrategy") this.openDefaultView();
        this.currentState.setMonth(month);
    }
    setYear(year) {
        this.year = year;
        if (this.currentState.constructor.name != "DefaultDateInputRenderStrategy") this.openDefaultView();
        this.currentState.setYear(year);
    }
    render() {
        this.currentState.render(this);
    }

    setup() {
        this.currentState.setup(this);

        this.currentState.onFullFilled = (d, m, y) => {
            console.log("on full filled");
            this.day = d;
            this.month = m;
            this.year = y;
            this.onFullFilled(d, m, y);
        };
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    get value() {
        return this.currentState.value;

    }
    clear() {
        this.day = "";
        this.month = "";
        this.year = "";
        this.render();
    }

    setValue(day, month, year) {
        [this.day, this.month, this.year] = [day, month, year];
        this.currentState.setValue(day, month, year);
    }

    changeState(state) {
        this.innerHTML = ``;
        this.currentState = state;
        this.render();
        this.setup();
    }

    openDefaultView() {
        this.changeState(new DefaultDateInputRenderStrategy(this));
        console.log(this.currentState);
        this.day && this.currentState.setDay(this.day);
        this.month && this.currentState.setMonth(this.month);
        this.year && this.currentState.setYear(this.year);
    }

    openViewWithFullName(mapper) {
        this.changeState(new FullNameRenderStrategy(this));
        this.currentState.setMonth(mapper(this.month));
        this.currentState.setDay(this.day);
        this.currentState.setYear(this.year);
    }
}

customElements.define("date-input", DateInput);
