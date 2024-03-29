class Hint {
    constructor(data, container, eventBus) {
        this.data = data;
        this.dimmer = null;
        this.search = "";
        this.eventBus = eventBus;
        this.container = container;
        this.firstClick = true;
    }

    update(searchString) {
        this.search = searchString;
        this.redraw();
        this.setup();
    }

    rowOnClick(row) {
        this.resolve(row.textContent);
        this.close();
    }

    setup() {
        const hint = document.querySelector(".hint");
        const rows = hint?.querySelectorAll(".hint__row");

        if (this.dimmer) {
            this.dimmer.onclick = () => {
                this.close();
            };
        }

        rows?.forEach(row => {
            row.onmousedown = event => {
                this.rowOnClick(row);
            };
        });
    }

    setInitial(searchString) {
        this.search = searchString;
    }

    clear() {
        console.log("clearing");
        this.dimmer?.remove();
        console.log(document.querySelector(".hint"));
        document.querySelector(".hint")?.remove();
        this.container.classList.remove("search_active");
    }

    close() {
        this.clear();
    }

    redraw() {
        this.clear();
        this.insert();
    }

    filterData() {
        return [
            ...new Set(
                this.data.filter(row => {
                    return row.toLowerCase().startsWith(this.search.toLowerCase());
                })
            ),
        ].slice(0, 13);
    }

    insert() {
        if (this.search && this.filterData().length) {
            console.log("insert");
            console.log(this.filterData());
            this.dimmer = document.createElement("div");
            this.dimmer.classList.add("dimmer");
            document.body.insertAdjacentElement("beforebegin", this.dimmer);

            const hint = document.createElement("div");
            hint.classList.add("hint");
            let markup = "";
            this.filterData().forEach(row => {
                const match = this.search.toLowerCase();

                markup += `<p class='hint__row'><span style="color: #40C4E2;">${match.charAt(0).toUpperCase() + match.slice(1)}</span>${row
                    .toLowerCase()
                    .replace(match, "")}</p>`;
            });
            hint.insertAdjacentHTML("beforeend", markup);
            this.container.insertAdjacentElement("beforeend", hint);
            this.container.classList.add("search_active");
        }
    }

    async open() {
        this.insert();
        this.setup();
        return new Promise(resolve => {
            this.resolve = resolve;
        });
    }
}

class VacancyHint extends Hint {
    constructor(data, container, eventBus, isNeedToShowFrequency) {
        super(data, container, eventBus);
        this.isNeedToShowFrequency = isNeedToShowFrequency;
    }
    rowOnClick(row) {
        const valueToResolve = /\(\d+\)$/g.test(row.textContent) ? row.textContent.slice(0, row.textContent.length - 3).trim() : row.textContent;
        this.resolve(valueToResolve);
        this.close();
    }
    filterData() {
        const vacancies = this.data.filter(row => {
            return row.vacancyName.toLowerCase().startsWith(this.search.toLowerCase());
        });
        const vacanciesWithoutDuplicates = [...new Set(vacancies)];
        const vacanciesSelectedByFrequencyCriteria = vacanciesWithoutDuplicates
            .sort((el, el2) => {
                const frequency1 = el.frequency ? el.frequency : 0;
                const frequency2 = el2.frequency ? el2.frequency : 0;
                return -(frequency1 - frequency2);
            })
            .map(row => (this.isNeedToShowFrequency ? `${row.vacancyName}${row.frequency ? ` (${row.frequency})` : ``}` : `${row.vacancyName}`))
            .slice(0, 13);
        return vacanciesSelectedByFrequencyCriteria
            .map(vacancy => [vacancy, vacancy.replace(/[^A-zА-я]/g, "").toLowerCase()])
            .sort((a, b) => {
                return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
            })
            .map(vacancy => vacancy[0]);
    }
}
