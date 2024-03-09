class InputDecorator {
    constructor(input) {
        this.input = input;
    }
    set value(value) {
        this.input.value = value;
        this.input.dispatchEvent(new Event("input"));
        this.input.dispatchEvent(new Event("blur"));
    }
    get value() {
        return this.input.value;
    }
    set oninput(callback) {
        this.input.oninput = callback;
    }
}

class PhoneInputDecorator extends InputDecorator {
    constructor(input) {
        super(input);
        input.addEventListener("input", () => {
            // this.toFormat();
        });
    }
    toFormat() {
        // console.log(this.input.value);
        const value = this.input.value;
        if (value.startsWith("8")) {
            this.input.value = value.replace("8", "+7");
        }
    }
    set value(value) {
        super.value = value;
        this.toFormat();
    }
}
