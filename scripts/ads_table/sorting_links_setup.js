// maybe in future
class SortingLinksVisitor {}

class SortSetupTemplateMethod {
    constructor(name) {
        this.name = name;
    }
    getElement() {}
    createSortInstance() {}

    setup(controller) {
        this.getElement().onclick = async () => {
            let sortInstance = controller.getSortInstance(this.name);
            console.log(sortInstance);
            if (!sortInstance) {
                sortInstance = this.createSortInstance();
            } else {
                sortInstance.reversed = !Boolean(sortInstance.reversed);
            }
            controller.updateQuery(sortInstance);
            await controller.update();
        };
    }
}

class NubmerSort extends SortSetupTemplateMethod {
    getElement() {
        return document.querySelector(".ads-table__title.number");
    }
    createSortInstance() {
        const sortObject = new AsyncSort(
            el => {
                return el.number;
            },
            (a, b) => {
                return a > b ? 1 : a < b ? -1 : 0;
            }
        );
        const sortInstance = new SortInstance(this.name, sortObject);
        return sortInstance;
    }
    accept(visitor) {
        visitor.setupNumberSort(this);
    }
}

class IdSort extends SortSetupTemplateMethod {
    getElement() {
        return document.querySelector(".ads-table__title.id");
    }
    createSortInstance() {
        const sortObject = new AsyncSort(
            el => {
                return el.id;
            },
            (a, b) => {
                return a > b ? 1 : a < b ? -1 : 0;
            }
        );
        const sortInstance = new SortInstance(this.name, sortObject);
        return sortInstance;
    }
    accept(visitor) {
        visitor.setupIdSort(this);
    }
}

class VacancySort extends SortSetupTemplateMethod {
    getElement() {
        return document.querySelector(".ads-table__title.vacancy");
    }
    createSortInstance() {
        const sortObject = new AsyncSort(
            el => {
                return el.vacancyName;
            },
            (a, b) => {
                const aLowerCased = a.toLowerCase();
                const bLowerCased = b.toLowerCase();
                return aLowerCased.localeCompare(bLowerCased);
            }
        );
        const sortInstance = new SortInstance(this.name, sortObject);
        return sortInstance;
    }

    accept(visitor) {
        visitor.setupVacancySort(this);
    }
}

class SortingLinks {
    constructor(controller) {
        this.controllerInstance = controller;
    }

    setup() {
        [new NubmerSort("number"), new IdSort("id"), new VacancySort("vacancy")].forEach(value => {
            value.setup(this.controllerInstance);
        });
    }
}
