class StatusSelectOnChangeBehaviour {
    ACTIVE_NOT_PUBLICATED = 0;
    ACTIVE = 1;
    ACTIVE_UPDATED = 2;
    CLOSED = 3;
    FORCED_CLOSED = 4;
    CLOSED_FORCE_DEPUBLISH = 5;
    NOT_PUBLICATED = 6;
    OVERDUE = 7;
    ALL = 8;
    ON_MODERATION = 9;
    constructor(lastState) {
        this.lastState = lastState;
    }
    /** @param {CustomSelect} selectInstance */
    process(selectInstance) {
        const inputs = selectInstance.getInputs();
        if (!this.lastState.includes(this.ALL) && inputs[this.ALL].checked) {
            inputs.forEach(input => {
                input.checked = true;
            });
        }
        inputs.forEach(input => {
            if (!input.checked) {
                inputs[this.ALL].checked = false;
            }
        });
        const inputsCheckedWithoutAllCheckbox = this.getInputsWithoutAll(inputs);
        if (!inputsCheckedWithoutAllCheckbox.includes(false)) {
            if (this.lastState.includes(this.ALL) && !inputs[this.ALL].checked) {
                inputs.forEach(input => {
                    input.checked = false;
                });
            } else inputs[this.ALL].checked = true;
        }
        selectInstance.setValue(inputs[this.ALL].checked ? "По всем" : selectInstance.computeValue());
        this.lastState = inputs
            .map((input, index) => {
                return input.checked ? index : null;
            })
            .filter(el => {
                return el != null;
            });
    }
    getInputsWithoutAll(inputs) {
        return inputs
            .slice(0, this.ALL)
            .concat(inputs.slice(this.ALL + 1, inputs.length))
            .map(el => {
                return el.checked;
            });
    }
}

class StatusSelectOnInputBehaviour {
    constructor(controllerInstance) {
        this.controllerInstance = controllerInstance;
    }
    /** @param {CustomSelect} _ */
    process(_) {
        this.controllerInstance.update();
    }
}

class RubpSelectOnChangeBehaviour extends StatusSelectOnChangeBehaviour {
    constructor(lastState) {
        super(lastState);
        this.ALL = 0;
    }
    getInputsWithoutAll(inputs) {
        const copy = Array.of(...inputs);
        const inputsWithoutAll = copy.slice(this.ALL + 1, copy.length).map(el => {
            return el.checked;
        });
        return inputsWithoutAll;
    }
}

class RubpSelectOnInputBehaviour extends StatusSelectOnInputBehaviour {}
