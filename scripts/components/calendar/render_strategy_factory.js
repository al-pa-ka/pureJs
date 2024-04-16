class RenderStrategyFactory {
    constructor(container) {
        this.container = container;
    }
    getStrategy(state, initialValues) {
        switch (state) {
            case CALENDAR_STATES.LEFT_YEAR:
                return new DesktopRenderStrategyLeftCalendarChoiceYear(this.container, initialValues);
            case CALENDAR_STATES.RIGHT_YEAR:
                return new DesktopRenderStrategyRightCalendarChoiceYear(this.container, initialValues);
            case CALENDAR_STATES.LEFT_DAY:
                return new DesktopRenderStrategyLeftCalendar(this.container, initialValues);
            case CALENDAR_STATES.RIGHT_DAY:
                return new DesktopRenderStrategyRightCalendar(this.container, initialValues);
            case CALENDAR_STATES.BOTH_DAY:
                return new DesktopRenderStrategyBothCalendar(this.container, initialValues);
            case CALENDAR_STATES.BOTH_CLOSED:
                return new DesktopRenderStrategy(this.container, initialValues);
            case CALENDAR_STATES.BOTH_YEAR:
                return new DesktopRenderStrategyBothOpenedYearChoice(this.container, initialValues);
            case CALENDAR_STATES.LEFT_MONTH:
                return new DesktopRenderStrategyLeftCalendarChoiceMonth(this.container, initialValues);
            case CALENDAR_STATES.RIGHT_MONTH:
                return new DesktopRenderStrategyRightCalendarChoiceMonth(this.container, initialValues);
            case CALENDAR_STATES.YEAR_MONTH:
                return new DesktopRenderStrategyLeftYearRightMonth(this.container, initialValues);
            case CALENDAR_STATES.MONTH_YEAR:
                return new DesktopRenderStrategyLeftMonthRightYear(this.container, initialValues);
            case CALENDAR_STATES.YEAR_DAY:
                return new DesktopRenderStrategyRightCalendarLefrYear(this.container, initialValues);
            case CALENDAR_STATES.DAY_YEAR:
                return new DesktopRenderStrategyLeftMonthRightYear(this.container, initialValues);
            case CALENDAR_STATES.MONTH_DAY:
                return new DesktopCalendarViewLeftMonthRightDay(this.container, initialValues);
            case CALENDAR_STATES.DAY_MONTH:
                return new DesktopCalendarViewLeftDayRightMonth(this.container, initialValues);
        }
    }
}
