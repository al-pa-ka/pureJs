class DateInput extends HTMLElement {
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
            }
            .date-with-placeholder{
                display: flex;
                flex-direction: row;
                width: fit-content;
                gap: 10px;
                margin-left: 20px;
            }
            .date{
                display: flex;
                align-items: center;
            }
            .date-input[contentEditable=true]:empty::before{
                content: attr(placeholder);
                color: gray;
            }
            .date-input{
                font-size: 18px;
                font-weight: medium;
                font-family: Roboto;
                outline: none;
                border: none;
                width: fit-content;
                min-width: 20px;
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
            .date-input.year{
                width: 130px;
            }
            p.date-label{
                font-weight: 300;
                font-family: Roboto;
                font-size: 18px;
                text-transform: uppercase;
            }
        </style>
    `;

    constructor({ day, month, year } = { day: "", month: "", year: "" }) {
        super();
        this.day = day;
        this.month = month;
        this.year = year;
    }

    dayInput = createElement("span", { classes: ["date-input"] });
    monthInput = createElement("span", { classes: ["date-input", "dot-before"] });
    yearInput = createElement("span", { classes: ["date-input", "dot-before", "year"] });

    update(day, month, year) {
        this.dayInput.textContent = day ? day.toString().padStart(2, "0") : "";
        this.monthInput.textContent = month ? month.toString().padStart(2, "0") : "";
        this.yearInput.textContent = year;
    }

    setDay(day) {
        if (!/\d{1,2}/g.test(day.toString())) {
            throw new Error(`${day} - bad format`);
        }
        this.dayInput.textContent = day.toString().padStart(2, "0");
    }
    setMonth(month) {
        if (!/\d{1,2}/g.test(month.toString())) {
            throw new Error(`${month} - bad format`);
        }
        this.monthInput.textContent = month.toString().padStart(2, "0");
    }
    setYear(year) {
        console.log(year);
        if (!/\d{4}/.test(year.toString())) {
            throw new Error(`${year} - bad format`);
        }
        this.yearInput.textContent = year.toString();
    }
    render() {
        const container = createElement("div", { classes: ["input-container"] });
        const dateSection = document.createElement("div", { classes: ["date-section"] });
        const dateWithPlaceholder = createElement("div", { classes: ["date-with-placeholder"] });
        const dateLabel = createElement("p", { classes: ["date-label"] });
        const date = createElement("div", { classes: ["date"] });

        for (let input of [this.dayInput, this.monthInput, this.yearInput]) {
            input.contentEditable = true;
            const inputWrapper = createElement("div", { classes: ["date-input-wrapper"], nodesToAppend: [input] });
            date.appendChild(inputWrapper);
        }

        container.appendChild(dateSection);
        dateSection.appendChild(dateWithPlaceholder);
        dateWithPlaceholder.appendChild(dateLabel);
        dateWithPlaceholder.appendChild(date);
        dateLabel.textContent = this.getAttribute("placeholder");

        this.dayInput.setAttribute("placeholder", "ДД");
        this.monthInput.setAttribute("placeholder", "ММ");
        this.yearInput.setAttribute("placeholder", "ГГГГ");

        this.insertAdjacentHTML("afterbegin", this.style);
        this.appendChild(container);
    }

    setup() {
        const selectHackClosure = () => {
            let selectedElement = null;
            const selectHack = () => {
                selectedElement ? selectedElement?.classList?.remove("selected") : null;
                selectedElement = window.getSelection().focusNode;
                selectedElement?.focus ? selectedElement.focus() : null;
                selectedElement?.classList?.add("selected");
            };
            return selectHack;
        };

        const selectHack = selectHackClosure();

        document.onclick = selectHack;
        document.onkeydown = selectHack;

        this.dayInput.addEventListener("input", this.onDayInput);
        this.monthInput.addEventListener("input", this.onMonthInput);
        this.yearInput.addEventListener("input", this.onYearInput);

        document.addEventListener("keydown", e => {
            e.key == "Enter" && [this.dayInput, this.monthInput, this.yearInput].includes(document.activeElement)
                ? e.preventDefault()
                : null;
        });

        this.dayInput.addEventListener("blur", () => {
            if (this.dayInput.textContent) {
                this.dayInput.textContent = this.dayInput.textContent.padStart(2, "0");
            }
        });

        const dayValidator = (() => {
            let prevValue = "";
            return () => {
                if (!/^\d{0,2}$/g.test(this.dayInput.textContent)) {
                    this.dayInput.textContent = prevValue;
                    setEndOfContenteditable(this.dayInput);
                } else {
                    prevValue = this.dayInput.textContent;
                }
            };
        })();
        const monthValidator = (() => {
            let prevValue = "";
            return () => {
                const number = this.monthInput.textContent === "" ? 1 : Number(this.monthInput.textContent);
                if (
                    !/^\d{0,2}$/g.test(this.monthInput.textContent) ||
                    number > 12 ||
                    (this.monthInput.textContent.length >= 2 && number <= 0)
                ) {
                    this.monthInput.textContent = prevValue;
                    setEndOfContenteditable(this.monthInput);
                    if (this.monthInput.textContent.length == 2) {
                        this.yearInput.focus();
                    }
                } else {
                    prevValue = this.monthInput.textContent;
                }
            };
        })();
        const yearValidator = (() => {
            let prevValue = "";
            return () => {
                if (!/^[12]{1}\d{0,3}?$/g.test(this.yearInput.textContent) && !/^$/.test(this.yearInput.textContent)) {
                    this.yearInput.textContent = prevValue;
                    setEndOfContenteditable(this.yearInput);
                } else {
                    prevValue = this.yearInput.textContent;
                }
            };
        })();
        this.dayInput.addEventListener("input", dayValidator);
        this.monthInput.addEventListener("input", monthValidator);
        this.yearInput.addEventListener("input", yearValidator);
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    get value() {
        return `${this.day}.${this.month}.${this.year}`;
    }

    set value(value) {
        const [day, month, year] = value;
        this.dayInput.textContent = day ? day.toString().padStart(2, "0") : "";
        this.monthInput.textContent = month ? month.toString().padStart(2, "0") : "";
        this.yearInput.textContent = year ? year : "";
    }
}

customElements.define("date-input", DateInput);
