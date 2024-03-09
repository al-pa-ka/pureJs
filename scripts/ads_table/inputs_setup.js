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
        const statuses = this.inputs.get("statuses")?.getCheckedValues();
        const rubp = this.inputs.get("rubp")?.getCheckedValues();
        return { id, phoneNumber, vacancyName, inn, statuses, rubp };
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
        this.inputs.set("id", new InputDecorator(document.querySelector("#id")));
        this.inputs.set("phone", new PhoneInputDecorator(document.querySelector("#phone")));
        this.inputs.set("vacancy", new InputDecorator(document.querySelector("#vacancy")));
        this.inputs.set("inn", new InputDecorator(document.querySelector("#inn")));
        this.inputs.set("prefix-account", new InputDecorator(document.querySelector("#prefix-account")));

        this.inputs.forEach((value, _) => {
            value.oninput = async () => {
                // this.onInput();
                await this.controller.update();
            };
        });
    }
}
