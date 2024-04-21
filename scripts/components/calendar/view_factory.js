class ViewFactory {
    createClosedCalendar(placeholder, container, initialData) {
        const builder = new ClosedCalendarBuilder(placeholder, container, initialData);
        return builder.build();
    }
    createCalendarWithSelects(placeholder, container, years, months, initialData) {
        const builder = new CalendarWithSelectsBuilder(placeholder, container, years, months, initialData);
        return builder.build();
    }
    createCalendarWithYearChoice(placeholder, container, years, initialData) {
        const builder = new CalendarWithYearChoiceBuilder(placeholder, container, years, initialData);
        return builder.build();
    }
    createCalendarWithMonthChoice(placeholder, container, years, months, initialData) {
        const builder = new CalendarWithSelectsBuilder(placeholder, container, years, months, initialData);
        return builder.build();
    }
    createCalendarWithDayChoice(placeholder, container, years, months, days, initialData) {
        const builder = new CalendarWithDayChoiceBuilder(placeholder, container, years, months, days, initialData);
        return builder.build();
    }
}
