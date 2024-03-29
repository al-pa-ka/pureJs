class Inputs {
    constructor(controller, eventBus) {
        this.controller = controller;
        this.eventBus = eventBus;
        this.inputs = new Map();
    }

    collectInputValues() {
        const id = this.inputs.get("id")?.value;
        const phoneNumber = this.inputs.get("phone")?.value;
        const vacancyName = this.inputs.get("vacancy")?.value;
        const inn = this.inputs.get("inn")?.value;
        const account = this.inputs.get("account")?.value;
        const statuses = this.inputs.get("statuses")?.getCheckedValues();
        const rubp = this.inputs.get("rubp")?.getCheckedValues();
        return { id, phoneNumber, vacancyName, inn, statuses, rubp, account };
    }

    clear() {
        for (let [key, input] of this.inputs.entries()) {
            if (key != "rubp" && key != "statuses") {
                input.value = "";
            }
        }
    }

    onInput() {
        const inputValues = this.collectInputValues();
        let empty = true;
        Object.keys(inputValues).forEach(key => {
            const value = inputValues[key];
            if (value && !value instanceof Array) {
                empty = false;
            }
        });
        if (empty) {
            this.eventBus?.notice({}, "inputsEmpty");
        } else {
            this.eventBus?.notice({}, "inputsNotEmpty");
        }
    }

    setup() {
        const rubp = document.querySelector("#rubp");
        const statuses = document.querySelector("#statuses");
        const phoneInput = document.querySelector("#phone");
        if (phoneInput) {
            this.inputs.set("phone", new PhoneInputDecorator(phoneInput));
        }
        this.inputs.set("rubp", rubp);
        this.inputs.set("statuses", statuses);

        [
            ["account", "#account"],
            ["id", "#id"],
            ["vacancy", "#vacancy"],
            ["inn", "#inn"],
        ].forEach(el => {
            const element = document.querySelector(el[1]);
            element ? this.inputs.set(el[0], new InputDecorator(element)) : null;
        });

        this.inputs.forEach((value, _) => {
            if (value) {
                value.oninput = async () => {
                    // this.onInput();
                    await this.controller.update();
                };
            }
        });
    }
}
