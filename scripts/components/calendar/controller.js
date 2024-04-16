class CalendarController {
    currentState = 5;
    currentView = null;
    constructor(model, viewFactory) {
        this.model = model;
        this.viewFactory = viewFactory;
    }
    open() {}
    close() {}
    render() {
        this.currentView?.clear();
        this.currentView = this.viewFactory.getStrategy(this.currentState, this.model.getValues());
        this.currentView.render(this.model.getYears(), this.model.getMonths());
        this.currentView.setup(this);
    }
    setupCalendarWithYearCohice(calendar) {}
}
