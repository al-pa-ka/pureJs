class IFilter {
    /**
     *
     * @returns {any[]}
     */
    async filter() {
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

    async filter() {
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
    async filter() {
        if (this.value) {
            console.log(`in phone filter`);
            const data = await this.prevFilter.filter();
            const filterObject = new AsyncFilter(data, row => {
                const matchPhones = row.phones.filter(phone => {
                    const clearedPhoneValue = phone.replace(/[^0-9+]+/g, "");
                    const clearedValue = this.value.replace(/[^0-9+]+/g, "");
                    return clearedPhoneValue.startsWith(clearedValue);
                });
                return matchPhones.length;
            });
            return await filterObject.filter(200, 100);
        } else {
            return await this.prevFilter.filter();
        }
    }
}

class FilterByINNDecorator {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    async filter() {
        if (this.value) {
            return await this.prevFilter.filter().filter(el => {
                return String(el.INN).startsWith(this.value);
            });
        } else {
            return await this.prevFilter.filter();
        }
    }
}

class FilterByVacancyNameDecorator {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    async filter() {
        if (this.value) {
            const data = await this.prevFilter.filter();
            return data.filter(el => {
                return el.vacancyName.toLowerCase().startsWith(this.value.toLowerCase());
            });
        } else {
            return await this.prevFilter.filter();
        }
    }
}

class FilterByStatus {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }

    async filter() {
        if (this.value?.length && !this.value.includes("all")) {
            const data = await this.prevFilter.filter();
            return data.filter(el => {
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
            return await this.prevFilter.filter();
        }
    }
}

class FilterByRubp {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    async filter() {
        if (this.value?.length && !this.value.includes("all")) {
            const data = await this.prevFilter.filter();
            return data.filter(el => {
                return this.value.includes(el.RUBP_ATTRYB.toLowerCase());
            });
        } else {
            return await this.prevFilter.filter();
        }
    }
}
