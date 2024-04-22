class SelectBehaviour extends Function {
    constructor() {
        super();
        this.functionsToCall = [];
        return new Proxy(this, {
            apply(target, thisArg, argumentList) {
                return target.onCall(...argumentList);
            },
        }); // Позволяет сделать функцию Callable
    }
    addBehaviour(callableFunction) {
        this.functionsToCall.push(callableFunction);
    }
    onCall(...args) {
        for (const functionToCall of this.functionsToCall) {
            functionToCall(...args);
        }
    }
    static defaultMonthChanged(dateInput, monthSelect, context) {
        const selectBehaviour = new SelectBehaviour();
        selectBehaviour.addBehaviour(onMonthChanged(dateInput, monthSelect, context));
        return selectBehaviour;
    }
    static defaultYearChanged(dateInput, context) {
        const selectBehaviour = new SelectBehaviour();
        selectBehaviour.addBehaviour(onYearChanged(context, dateInput));
        return selectBehaviour;
    }
}

function onYearChanged(context, dateInput) {
    return value => {
        context.model.setYear(value);
        dateInput.setYear(value);
    };
}

function onMonthChanged(dateInput, monthSelect, context) {
    return value => {
        const monthId = monthSelect.getVariables().findIndex(monthName => monthName == value);
        context.model.setMonth(monthId);
        dateInput.setMonth(monthId + 1);
    };
}
