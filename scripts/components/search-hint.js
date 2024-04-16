class SearchHint extends HTMLElement {
    constructor() {
        super();
        this.dataToSearch = [];
        this.inputToAutoFill = null;
        this.bufferToMouseDownElement = null;
        this.lastInputIsClicked = false;
        this.signal = null;
    }

    setDataToSearch(value) {
        this.dataToSearch = value;
        return this;
    }

    setupNoDarkElems() {
        const notDarkenedElems = this.getNoDarkenedElems();
        notDarkenedElems.forEach(elem => {
            elem.style.setProperty("z-index", "10");
        });
    }

    clearNoDarkElems() {
        const notDarkenedElems = this.getNoDarkenedElems();
        notDarkenedElems.forEach(elem => {
            elem.style.setProperty("z-index", "0");
        });
    }

    setup() {
        this.inputToAutoFill.addEventListener("focus", async () => {
            if (this.inputToAutoFill.value && !this.lastInputIsClicked) {
                console.log("focus");
                this.setupNoDarkElems();
                await this.render();
                this.setupControll();
            }
        });
        this.inputToAutoFill.addEventListener("input", async () => {
            if (this.inputToAutoFill.value && !this.lastInputIsClicked) {
                this.setupNoDarkElems();
                await this.render();
                this.setupControll();
            } else {
                this.close();
            }
        });
        this.inputToAutoFill.addEventListener("blur", event => {
            this.close();
            this.clearNoDarkElems();
        });
    }

    setupControll() {
        const rows = Array.from(this.querySelectorAll(".search-hint__row"));
        rows.forEach(row => {
            row.onmousedown = event => {
                event.preventDefault();
                this.bufferToMouseDownElement = row;
            };
            row.onmouseup = () => {
                if (this.bufferToMouseDownElement == row) {
                    this.lastInputIsClicked = true;
                    this.inputToAutoFill.value = row.getAttribute("value");
                    this.inputToAutoFill.dispatchEvent(new Event("input"));
                    this.inputToAutoFill.dispatchEvent(new Event("blur"));
                }
            };
        });
    }

    getNoDarkenedElems() {
        const selectors = this.getAttribute("nodark")?.split(",");
        if (!selectors) return [];
        return selectors.map(selector => {
            return document.querySelector(selector);
        });
    }

    connectedCallback() {
        const inputSelector = this.getAttribute("queryfor");
        this.inputToAutoFill = document.querySelector(inputSelector);
        this.setup();
    }

    async matchData() {
        const value = this.inputToAutoFill.value;
        const filterObject = new AsyncFilter(this.dataToSearch, row => {
            return String(row).replace(/ /g, "").toLowerCase().startsWith(String(value).toLowerCase().replace(/ /g, ""));
        });
        const result = await filterObject.filter(500, 10, { maxLength: 13 });
        return result;
    }

    highlightString(string, value) {
        const regex = new RegExp(`^(${value.replace("+", "\\+").replace(/([^+\\])/g, "$1\\s*")})`, "gi");
        return string.replace(regex, '<span class="search-hint__match-highlight">$1</span>');
    }

    async render() {
        this.clear();

        const data = await this.matchData();
        console.log(data);
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

        const hintMarkup = data
            .map(row => {
                const value = this.inputToAutoFill.value;
                return `<span class="search-hint__row" value="${row}">${this.highlightString(row, value)}</span>`;
            })
            .join("");

        let hint;
        if ((hint = this.querySelector(".serch-hint"))) {
            hint.innerHTML = hintMarkup;
        } else {
            const markup = `
                ${style}
                <div class="search-hint__wrapper">
                    <div class="search-hint">
                        ${hintMarkup}
                    </div>
                </div>
            `;
            this.innerHTML = markup;
        }
        if (!document.querySelector(".search-hint__dimmer")) {
            const dimmer = document.createElement("div");
            dimmer.classList.add("search-hint__dimmer");
            document.body.append(dimmer);
        }
    }
}

customElements.define("search-hint", SearchHint);

class SearchHintController {
    constructor() {

    }
    setupControll() {}
}

class SearchHintModel {
    
}
