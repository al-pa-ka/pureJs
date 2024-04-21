class SetupFactory {
    createClosedCalendarBehaviour(controller, model, view) {
        return new ClosedCalendarBehaviour(controller, model, view);
    }
    createCalendarWithSelectsBehaviour(controller, model, view) {
        return new CalendarWithSelectsBehaviour(controller, model, view);
    }   
    createCalendarWithYearChoiceBehaviour(controller, model, view) {
        return new CalendarWithYearChoiceBehaviour(controller, model, view);
    }
    createCalendarWithMonthChoiceBehaviour(controller, model, view) {
        return new CalendarWithMonthChoiceBehaviour(controller, model, view);
    }
    createCalendarWithDayChoiceBehaviour(controller, model, view) {
        return new CalendarWithDayChoiceBehaviour(controller, model, view);
    }
}
