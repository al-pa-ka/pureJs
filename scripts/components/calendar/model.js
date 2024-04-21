var NULLABLE_DATE = new Date(1997, 0, 1);

class CalendarModel {
    currentDate = new Date(NULLABLE_DATE);
    isDaySetted = false;
    isMonthSetted = false;
    isYearSetted = false;
    states = Object.freeze({
        CLOSED: 0,
        SELECTS: 1,
        YEAR_CHOICE: 2,
        MONTH_CHOICE: 3,
        DAY_CHOICE: 4,
    });
    currentState = 0;
    onDateChanged = () => {};

    constructor() {}
    MIN_YEAR = 1996;
    getYears(startsWith) {
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let i = this.MIN_YEAR; i <= currentYear; i++) {
            years.push(i);
        }
        if (startsWith) {
            return years.filter(date => String(date).startsWith(startsWith));
        }
        return years;
    }
    getMonths(startsWith) {
        const dates = [...Array(12).keys()].map(key => {
            const month = new Date(0, key).toLocaleDateString("ru", { month: "long" });
            return month.charAt(0).toLocaleUpperCase() + month.slice(1, month.length);
        });
        if (startsWith) {
            return dates.filter(date => String(date).startsWith(startsWith));
        }
        return dates;
    }
    getMonthIndexByName(monthName) {
        console.log(monthName);
        const months = this.getMonths();
        return months.findIndex(name => name.toLocaleUpperCase() == monthName.toLocaleUpperCase());
    }
    getDaysOfYear() {
        const countOfDays = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        return countOfDays;
    }
    getDayweekIndexOfFirstDay() {
        const day = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
        return day;
    }
    getValues() {
        return { from: this.fromDate, to: this.toDate };
    }
    setYear(year) {
        this.currentDate.setFullYear(year);
        this.isYearSetted = true;
        this.onDateChanged();
    }
    setMonth(month) {
        this.currentDate.setMonth(month);
        this.isMonthSetted = true;
        this.onDateChanged();
    }
    setDate(date) {
        this.currentDate.setDate(date);
        this.isDaySetted = true;
        this.onDateChanged();
    }
    getYear() {
        return this.isYearSetted ? this.currentDate.getFullYear() : "";
    }

    getMonth() {
        return this.isMonthSetted ? this.currentDate.getMonth() : "";
    }

    getDay() {
        return this.isDaySetted ? this.currentDate.getDate() : "";
    }

    getInitialData() {
        return {
            isYearSetted: this.isYearSetted,
            year: this.getYear(),
            isMonthsetted: this.isMonthSetted,
            month: this.getMonth(),
            isDaySetted: this.isDaySetted,
            day: this.getDay(),
        };
    }
}
