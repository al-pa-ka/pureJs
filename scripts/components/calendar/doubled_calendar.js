class DoubledCalendar extends HTMLElement {
    threshold = 640;
    openedDesktopVersion;
    onLeftDateLaterThenRight = () => {};
    onDateApplied = () => {};
    onClose = () => {};
    model = {
        fromDate: new CalendarModel(),
        toDate: new CalendarModel(),
    };
    constructor() {
        super();
    }

    connectedCallback() {
        window.innerWidth > this.threshold ? this.openDesktopVersion() : this.openMobileVersion();
        window.addEventListener("resize", () => {
            if (this.openedDesktopVersion && window.innerWidth < this.threshold) {
                this.openMobileVersion();
            } else if (!this.openedDesktopVersion && window.innerWidth > this.threshold) {
                this.openDesktopVersion();
            }
        });
        let lastDevicePixelRatio = 1;
        const originalScale = window.devicePixelRatio;
        this.style.display = "block";
        this.style.width = window.innerWidth + "px";
        this.style.transformOrigin = "left top";
        this.style.setProperty("background-color", "rgba(0, 0, 0, 0.1)");
        this.style.setProperty("z-index", "30");
        this.style.setProperty("position", "absolute");
        this.style.setProperty("max-width", "890px");
        window.addEventListener("resize", () => {
            if (lastDevicePixelRatio === window.devicePixelRatio) {
                lastDevicePixelRatio = window.devicePixelRatio;
                this.style.width = window.innerWidth + "px";
                return;
            }
            const currentScale = window.devicePixelRatio;
            const scaleRatio = originalScale / currentScale;
            this.style.transform = `scale(${scaleRatio})`;
            lastDevicePixelRatio = window.devicePixelRatio;
        });
    }

    render() {
        this.currentState.render();
    }

    _onClose() {
        this.onClose(this.model.fromDate, this.model.toDate);
    }

    setup() {
        this.currentState.setup();
        this.currentState.onClose = () => {
            this.style.setProperty("display", "none");
            this._onClose();
        };
    }

    changeState(state) {
        this.innerHTML = ``;
        this.currentState = state;
        this.render();
        this.setup();
    }

    openDesktopVersion() {
        this.changeState(new DoubledCalendarDesktopState(this, this.model));
        this.openedDesktopVersion = true;
    }
    openMobileVersion() {
        this.changeState(new DoubledCalendarMobileState(this, this.model));
        this.openedDesktopVersion = false;
    }
}

class RangeCalculator {
    constructor(leftCalendarDate, rightCalendarDate) {
        this.leftCalendarDate = leftCalendarDate;
        this.rightCalendarDate = rightCalendarDate;
    }
    calculate() {
        let strategy;
        if (this.leftCalendarDate > this.rightCalendarDate) {
            strategy = new LeftGreaterThanRight();
        } else {
            strategy = new LeftLessThanRight();
        }
        return strategy.calculate(this.leftCalendarDate, this.rightCalendarDate);
    }
}

class AbstractRangeCalculatorStrategy {
    isInOneRange(leftDate, rightDate) {
        return leftDate.getMonth() == rightDate.getMonth() && leftDate.getFullYear() == rightDate.getFullYear();
    }
}

class LeftGreaterThanRight extends AbstractRangeCalculatorStrategy {
    calculate(leftDate, rightDate) {
        const isThisOneRange = this.isInOneRange(leftDate, rightDate);
        if (!isThisOneRange) {
            return [
                { from: 0, to: leftDate.getDate() },
                { from: rightDate.getDate(), to: 40 },
            ];
        } else {
            return [
                { from: rightDate.getDate(), to: leftDate.getDate() },
                { from: rightDate.getDate(), to: leftDate.getDate() },
            ];
        }
    }
}

class LeftLessThanRight extends AbstractRangeCalculatorStrategy {
    calculate(leftDate, rightDate) {
        const isThisOneRange = this.isInOneRange(leftDate, rightDate);
        if (!isThisOneRange) {
            return [
                { from: leftDate.getDate(), to: 40 },
                { from: 0, to: rightDate.getDate() },
            ];
        } else {
            return [
                { from: leftDate.getDate(), to: rightDate.getDate() },
                { from: leftDate.getDate(), to: rightDate.getDate() },
            ];
        }
    }
}

customElements.define("doubled-calendar", DoubledCalendar);
