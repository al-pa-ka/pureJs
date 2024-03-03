class SearchHint extends HTMLElement {
    constructor() {
        super();
        this.dataToSearch = [];
        this.inputToAutoFill = null;
        this.bufferToMouseDownElement = null;
    }

    setDataToSearch(value) {
        this.dataToSearch = value;
    }

    clear() {
        this.innerHTML = "";
        document.querySelector(".search-hint__dimmer")?.remove();
    }

    setup() {
        this.inputToAutoFill.addEventListener("focus", () => {
            if (this.inputToAutoFill.value) {
                this.render();
                this.setupControll();
            }
        });
        this.inputToAutoFill.addEventListener("input", () => {
            if (this.inputToAutoFill.value) {
                this.render();
                this.setupControll();
            } else {
                this.clear();
            }
        });
        this.inputToAutoFill.addEventListener("blur", event => {
            this.clear();
        });
    }

    setupControll() {
        const rows = Array.from(this.querySelectorAll(".search-hint__row"));
        rows.forEach(row => {
            row.onmousedown = event => {
                event.preventDefault();
                this.bufferToMouseDownElement = row;
                console.log("mousedown");
            };
            row.onmouseup = () => {
                if (this.bufferToMouseDownElement == row) {
                    this.inputToAutoFill.value = row.getAttribute("value");
                    this.inputToAutoFill.dispatchEvent(new Event("input"));
                    this.inputToAutoFill.blur();
                    this.inputToAutoFill.dispatchEvent(new Event("focusout"));
                }
            };
        });
    }

    connectedCallback() {
        const inputSelector = this.getAttribute("queryfor");
        this.inputToAutoFill = document.querySelector(inputSelector);
        this.setup();
    }

    matchData() {
        const value = this.inputToAutoFill.value;
        return Array.from(
            new Set(
                this.dataToSearch.filter(row => {
                    return String(row).toLowerCase().startsWith(String(value).toLowerCase());
                })
            )
        ).slice(0, 13);
    }

    divideOnParts(row, value) {
        const matchPart = String(row).slice(0, value.length);
        const otherPart = String(row).slice(matchPart.length, row.length);
        return [matchPart, otherPart];
    }

    render() {
        this.clear();
        if (!this.matchData().length) {
            return;
        }
        const style = `
        <style>
            .search-hint__dimmer{
                position: fixed;
                background-color: rgba(0,0,0,0.6);
                top: 0;
                right: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1;
            }
            .search-hint__wrapper{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0px;
            }
            .search-hint{
                padding: 10px 0 10px 0;
                box-sizing: border-box;
                position: absolute;
                width: 100%;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                background-color: white;
                z-index: 2;
                row-gap: 10px;
            }
            .search-hint__row{
                padding-left: 10px;
            }
            .search-hint__row:hover{
                background-color: lightblue;
            }
            .search-hint__match-highlight{
                color: var(--blue);
            }

        </style>`;

        const markup = `
        ${style}
        <div class="search-hint__wrapper">
            <div class="search-hint">
                ${this.matchData()
                    .map(row => {
                        const value = this.inputToAutoFill.value;
                        const [matchPart, otherPart] = this.divideOnParts(row, value);
                        return `<span class="search-hint__row" value="${row}"><span class="search-hint__match-highlight">${matchPart}</span>${otherPart}</span>`;
                    })
                    .join("")}
            </div>
        </div>
        `;
        this.innerHTML = markup;
        const dimmer = document.createElement("div");
        dimmer.classList.add("search-hint__dimmer");
        document.body.append(dimmer);
    }
}

customElements.define("search-hint", SearchHint);
