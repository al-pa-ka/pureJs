class IFilter {
    /**
     *
     * @returns {any[]}
     */
    async filter() {
        return data;
    }
}

class FilterDecorator {
    constructor(filter, value) {
        this.prevFilter = filter;
        this.value = value;
    }
    async filter({ signal }) {
        if (signal && signal.aborted) {
            throw new DOMException("AbortError");
        }
        if (this.value) {
            return await this._filter({ signal });
        } else {
            return await this.prevFilter.filter({ signal });
        }
    }
    async _filter({ signal }) {
        if (signal && signal.aborted) {
            throw new DOMException("AbortError");
        }
    }
}

class FilterId {
    constructor(data, value) {
        this.data = data;
        this.value = value;
    }
    async filter({ signal }) {
        if (this.value) {
            return this.data.filter(el => {
                if (signal && signal.aborted) throw new DOMException("AbortError");
                return String(el.id).startsWith(String(this.value));
            });
        } else {
            return this.data;
        }
    }
}

class FilterPhoneNumberDecorator extends FilterDecorator {
    async _filter({ signal }) {
        await super._filter({ signal });
        const data = await this.prevFilter.filter({ signal });
        const filterObject = new AsyncFilter(data, row => {
            if (signal && signal.aborted) {
                throw new DOMException("AbortError");
            }
            const matchPhones = row.phones.filter(phone => {
                if (signal && signal.aborted) {
                    throw new DOMException("AbortError");
                }
                const clearedPhoneValue = phone.replace(/[^0-9+]+/g, "");
                const clearedValue = this.value.replace(/[^0-9+]+/g, "");
                return clearedPhoneValue.startsWith(clearedValue);
            });
            return matchPhones.length;
        });
        return await filterObject.filter(100, 10, { signal });
    }
}

class FilterByINNDecorator extends FilterDecorator {
    async _filter({ signal }) {
        await super._filter({ signal });
        return (await this.prevFilter.filter({ signal })).filter(el => {
            if (signal && signal.aborted) throw new DOMException("AbortError");
            return String(el.INN).startsWith(this.value);
        });
    }
}

class FilterByVacancyNameDecorator extends FilterDecorator {
    async _filter({ signal }) {
        await super._filter({ signal });
        const data = await this.prevFilter.filter({ signal });
        return data.filter(el => {
            if (signal && signal.aborted) throw new DOMException("AbortError");
            return el.vacancyName.toLowerCase().startsWith(this.value.toLowerCase());
        });
    }
}

class FilterByStatus extends FilterDecorator {
    async filter({ signal }) {
        if (this.value?.length && !this.value.includes("all")) {
            const data = await this.prevFilter.filter({ signal });
            return data.filter(el => {
                if (signal && signal.aborted) throw new DOMException("AbortError");
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
            return await this.prevFilter.filter({ signal });
        }
    }
}

class FilterByRubp extends FilterDecorator {
    async filter({ signal }) {
        if (this.value?.length && !this.value.includes("all")) {
            const data = await this.prevFilter.filter({ signal });
            return data.filter(el => {
                if (signal && signal.aborted) throw new DOMException("AbortError");
                return this.value.includes(el.RUBP_ATTRYB.toLowerCase());
            });
        } else {
            return await this.prevFilter.filter({ signal });
        }
    }
}

class FilterByAccount extends FilterDecorator {
    async _filter({ signal }) {
        console.log(this.value);
        await super._filter({ signal });
        const data = await this.prevFilter.filter({ signal });
        if (/[А-яA-z]+\d{0,50}/.test(this.value)) {
            const filterObject = new AsyncFilter(data, row => {
                return row.account.id.toLowerCase().startsWith(this.value.toLowerCase());
            });
            const filteredDta = await filterObject.filter(100, 10, { signal });
            console.log(filteredDta);
            return filteredDta;
        } else {
            const filterObject = new AsyncFilter(data, row => {
                return row.account.id.match(/\d+/)[0].startsWith(this.value);
            });
            return await filterObject.filter(100, 10, { signal });
        }
    }
}

class FilterByLink extends FilterDecorator {
    async _filter({ signal }) {
        await super._filter({ signal });
        const data = await this.prevFilter.filter({ signal });
        if (signal && signal.aborted) throw new DOMException("AbortError");
        const filterObject = new AsyncFilter(data, row => {
            const criterias = row.sources.map(source => source.link.startsWith(this.value));
            return criterias.includes(true);
        });
        return await filterObject.filter(300, 10, { signal });
    }
}
