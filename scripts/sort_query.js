class SortQuery {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.sortQuery = [{ name: "vacancyName", reversed: false }];
    }

    setupControl() {
        document.querySelector(".id-sort").onclick = () => {
            let reversed = false;
            this.sortQuery = this.sortQuery
                .map(sort => {
                    if (sort.name == "id") {
                        reversed = !sort.reversed;
                        return undefined;
                    } else return sort;
                })
                .filter(el => {
                    return Boolean(el);
                });
            this.sortQuery.push({ name: "id", reversed: reversed });
            this.eventBus.notice({}, "filtersChanged");
        };

        document.querySelector(".vacancy-name-sort").onclick = () => {
            let reversed = false;
            this.sortQuery = this.sortQuery
                .map(sort => {
                    if (sort.name == "vacancyName") {
                        reversed = !sort.reversed;
                        return undefined;
                    } else return sort;
                })
                .filter(el => {
                    return Boolean(el);
                });
            this.sortQuery.push({ name: "vacancyName", reversed: reversed });
            this.eventBus.notice({}, "filtersChanged");
        };

        document.querySelector(".source-sort").onclick = () => {
            let reversed = false;
            this.sortQuery = this.sortQuery
                .map(sort => {
                    if (sort.name == "source") {
                        reversed = !sort.reversed;
                        return undefined;
                    } else return sort;
                })
                .filter(el => {
                    return Boolean(el);
                });
            this.sortQuery.push({ name: "source", reversed: reversed });
            this.eventBus.notice({}, "filtersChanged");
        };

        document.querySelector(".date-sort").onclick = () => {
            console.log("sorted");
            let reversed = false;
            this.sortQuery = this.sortQuery
                .map(sort => {
                    if (sort.name == "date") {
                        reversed = !sort.reversed;
                        return undefined;
                    } else return sort;
                })
                .filter(el => {
                    return Boolean(el);
                });
            this.sortQuery.push({ name: "date", reversed: reversed });
            this.eventBus.notice({}, "filtersChanged");
        };
    }

    sort(data) {
        const compareNumbers = (a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        };
        for (const sortItem of this.sortQuery) {
            data.sort((a, b) => {
                if (Number(a[sortItem.name]) && Number(b[sortItem.name])) {
                    console.log("numbers!");
                    return sortItem.reversed
                        ? -compareNumbers(Number(a[sortItem.name]), Number(b[sortItem.name]))
                        : compareNumbers(Number(a[sortItem.name]), Number(b[sortItem.name]));
                }
                return sortItem.reversed
                    ? -String(a[sortItem.name]).localeCompare(String(b[sortItem.name]))
                    : String(a[sortItem.name]).localeCompare(String(b[sortItem.name]));
            });
        }
        return data;
    }
}
