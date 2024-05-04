class ResizableInput extends HTMLElement {
    style = `
        <style>
            span.resizable-input{
                outline: none;
            }
            span.resizable-input[contenteditable=true]:empty::before{
                content: attr(placeholder);
                color: gray;
            }
            span.resizable-input[contenteditable=true]:empty:focus-within{
                background-color: #D4F6FF;
            }
        </style>
    `;
    input = createElement("span", { classes: ["resizable-input"] });
    render() {
        this.input.setAttribute("contenteditable", "true");
        this.input.setAttribute("placeholder", this.getAttribute("placeholder"));
        this.append(this.input);
        this.insertAdjacentHTML("beforeend", this.style);
    }

    setup() {
        this.onkeydown = e => {
            if (e.code == "Enter") {
                e.preventDefault();
            }
        };
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    setValue(value) {
        this.input.innerText = value;
    }

    getValue() {
        return this.input.innerText;
    }
}

customElements.define("resizable-input", ResizableInput);
