class IFilter {
    /**
     *
     * @returns {any[]}
     */
    filter() {
        return data;
    }
}

class FilterId {
    /**
     *
     * @param {any[]} data
     */
    constructor(data, value) {
        this.data = data;
        this.value = value;
    }

    filter() {
        if (this.value) {
            return this.data.filter(el => {
                return String(el.id).startsWith(String(this.value));
            });
        } else {
            return this.data;
        }
    }
}

class FilterPhoneNumberDecorator {
    /**
     *
     * @param {IFilter} filter
     */
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    filter() {
        if (this.value) {
            return this.prevFilter.filter().filter(el => {
                const matchPhones = el.phones.filter(phone => {
                    return String(phone).startsWith(this.value);
                });
                return matchPhones.length;
            });
        } else {
            return this.prevFilter.filter();
        }
    }
}

class FilterByINNDecorator {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    filter() {
        if (this.value) {
            return this.prevFilter.filter().filter(el => {
                return String(el.INN).startsWith(this.value);
            });
        } else {
            return this.prevFilter.filter();
        }
    }
}

class FilterByVacancyNameDecorator {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    filter() {
        if (this.value) {
            return this.prevFilter.filter().filter(el => {
                return el.vacancyName.toLowerCase().startsWith(this.value.toLowerCase());
            });
        } else {
            return this.prevFilter.filter();
        }
    }
}

class FilterByStatus {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }

    filter() {
        if (this.value?.length && !this.value.includes("all")) {
            return this.prevFilter.filter().filter(el => {
                const elStatuses = el.statuses.map(el => {
                    return el.status;
                });
                for (const status of this.value) {
                    if (status == "active+notPublicated") {
                        if (elStatuses.includes("active") && elStatuses.includes("notPublicated")) {
                            return true;
                        }
                    } else if (status == "closed+forceDepublished") {
                        if (elStatuses.includes("closed") && elStatuses.includes("forceDepublished")) {
                            return true;
                        }
                    } else {
                        if (elStatuses.includes(status)) {
                            return true;
                        }
                    }
                }
            });
        } else {
            return this.prevFilter.filter();
        }
    }
}

class FilterByRubp {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    filter() {
        if (this.value?.length && !this.value.includes("all")) {
            return this.prevFilter.filter().filter(el => {
                return this.value.includes(el.RUBP_ATTRYB.toLowerCase());
            });
        } else {
            return this.prevFilter.filter();
        }
    }
}
