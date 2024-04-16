class CalendarView {
    constructor(container) {
        this.container = container;
        this.strategyFactory = new RenderStrategyFactory();
    }
    update(currentDate) {}
    render(currentDate) {
        const renderStrategy = RenderStrategyFactory.getStrategy(currentDate);
        renderStrategy.render(this.container);
    }
}
