class LittleCross extends HTMLElement {
    constructor() {
        super();
        this.bindedInput = null;
    }

    connectedCallback() {
        const inputSelector = this.getAttribute("queryfor");
        this.bindedInput = document.querySelector(inputSelector);
        this.render();
        this.setup();
    }

    setup() {
        this.querySelector(".little-cross__cross").onclick = () => {
            this.bindedInput.value = "";
            this.bindedInput.dispatchEvent(new Event('input'))
            this.update();
        };
        this.bindedInput.addEventListener("input", () => {
            this.update();
        });
    }

    update() {
        if (this.bindedInput.value) {
            this.querySelector(".little-cross__cross").classList.add("little-cross__cross_active");
        } else {
            this.querySelector(".little-cross__cross").classList.remove("little-cross__cross_active");
        }
    }

    render() {
        const style = `
            <style>
                .little-cross__cross{
                    cursor: pointer;
                    display: none;
                    font-family: Icons;
                    color: rgb(189, 189, 189);
                    font-size: 30px;
                }
                .little-cross__cross_active{
                    display: block;
                }
                .little-cross__cross:hover{
                    color: rgb(65, 65, 65);
                }
            </style>
        `;
        this.innerHTML = `${style} <span class="little-cross__cross ${this.bindedInput.value ? "little-cross__cross_active" : ""}"></span>`;
    }
}
customElements.define("little-cross", LittleCross);
