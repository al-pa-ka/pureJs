class EventBusDecorator {
    constructor(controller, eventBus) {
        this.controller = controller;
        this.eventBus = eventBus;
    }
    setupOnDateSetted() {
        this.eventBus.addSubscriber(event => {}, "dateSetted");
    }
    setupDeselect() {
        this.eventBus.addSubscriber(event => {
            console.log("eventBusDeselect");
            this.controller.clearSearch();
        }, "deselect");
    }
    setup() {
        this.setupDeselect();
        this.setupOnDateSetted();
    }
    onUpdateInputs() {
        this.eventBus.notice();
    }
    noticeTotalRows(totalRows) {
        this.eventBus.notice({ totalRows }, "totalRows");
    }
}
