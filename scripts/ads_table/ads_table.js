class AdsTableModel {
    constructor(data) {
        this.data = data;
        this.inputs = null;
        this.filter = this.filterClosure();
        this.sortingQuery = new SortingQuery();
        this.sort = this.sortClosure();
    }

    filterClosure() {
        return async function filter(inputValues, { signal } = { signal: null }) {
            const filterQuery = new FilterByAccount(
                new FilterByRubp(
                    new FilterByStatus(
                        new FilterByVacancyNameDecorator(
                            new FilterByINNDecorator(
                                new FilterPhoneNumberDecorator(new FilterId(this.data, inputValues.id), inputValues.phoneNumber),
                                inputValues.inn
                            ),
                            inputValues.vacancyName
                        ),
                        inputValues.statuses
                    ),
                    inputValues.rubp
                ),
                inputValues.account
            );
            const filterResult = await filterQuery.filter({ signal: signal });
            return filterResult;
        };
    }

    sortClosure() {
        let lastCall = null;

        return async function sort(data, { signal }) {
            return await this.sortingQuery.sort(data);
        };
    }

    addNumberFieldToData(data) {
        return data.map((el, index) => {
            el.number = index + 1;
            return el;
        });
    }

    async getData() {
        const response = await fetch("./data.json", {
            method: "GET",
        });
        const data = await response.json();
        return this.addNumberFieldToData(data);
    }
}

class AdsTableContoller {
    constructor(model, renderStrategy, paginatorController, eventBus) {
        this.model = model;
        this.eventBus = new EventBusDecorator(this, eventBus);
        this.renderer = renderStrategy;
        this.paginator = paginatorController;
        this.inputs = new Inputs(this);
        this.sortingLinks = new SortingLinks(this);
        this.update = this.updateClosure();
    }

    clearSearch() {
        this.inputs.clear();
    }

    setRenderStrategy(renderStrategy) {
        this.renderer = renderStrategy;
        this.init();
    }

    deleteEverything() {
        this.model.data = [];
        this.update();
    }

    getSortInstance(name) {
        return this.model.sortingQuery.getSortInstance(name);
    }

    updateQuery(newSortingInstance) {
        this.model.sortingQuery.updateQuery(newSortingInstance);
    }

    setup() {
        this.eventBus.setup();

        this.sortingLinks.setup();
        this.inputs.setup();
        const rubpSelect = document.querySelector("#rubp");
        if (rubpSelect) {
            rubpSelect.onChangeBehaviour = new RubpSelectOnChangeBehaviour(rubpSelect.lastState);
            rubpSelect.onInputBehaviour = new RubpSelectOnInputBehaviour(this);
        }

        const statusSelect = document.querySelector("#statuses");
        if (statusSelect) {
            statusSelect.onChangeBehaviour = new StatusSelectOnChangeBehaviour(statusSelect.lastState);
            statusSelect.onInputBehaviour = new StatusSelectOnInputBehaviour(this);
        }

        document.querySelector("#hint-vacancy").setDataToSearch(
            this.model.data.map(el => {
                return el.vacancyName;
            })
        );
        document.querySelector("#hint-id").setDataToSearch(
            this.model.data.map(el => {
                return el.id;
            })
        );
        document.querySelector("#hint-phone").setDataToSearch(
            this.model.data
                .map(el => {
                    return el.phones;
                })
                .flat()
                .map(phone => {
                    return phone.replace(/[^[0-9+]/g, "");
                })
        );
        document.querySelector("#hint-inn").setDataToSearch(
            this.model.data.map(el => {
                return String(el.INN);
            })
        );
        document.querySelector("#hint-account").setDataToSearch(
            this.model.data.map(el => {
                return el.account.id;
            })
        );

        this.paginator.setPageChangedCallback(() => {
            this.update();
        });
    }

    async init() {
        this.renderer.initialRender();
        this.setup();
        await this.update();
    }

    setupRows() {
        document.body.querySelectorAll(".description-edit").forEach(description => {
            description.onclick = () => {
                const editPopup = document.createElement("edit-text");
                editPopup.setAttribute("value", description.textContent);
                editPopup.setCallback(value => {
                    if (value != null) {
                        const id = Number(description.getAttribute("itemId"));
                        this.model.data[id].description = value;
                        this.update();
                    }
                });
                document.body.append(editPopup);
            };
        });
        document.body.querySelectorAll(".content-row")?.forEach(row => {
            const id = row.querySelector(".ads-table__cell-id");
            const vacancyName = row.querySelector(".ads-table__cell-vacancy-name");
            const phones = row.querySelectorAll(".ads-table__phone");
            const inn = row.querySelector(".ads-table__inn");
            const accountPrefix = row.querySelector(".ads-table__account-prefix");
            const account = row.querySelector(".ads-table__account-id");
            id.onclick = () => {
                this.inputs.inputs.get("id").value = id.textContent.trim();
            };
            vacancyName.onclick = () => {
                console.log("clicked");
                this.inputs.inputs.get("vacancy").value = vacancyName.textContent.trim();
            };
            inn.onclick = () => {
                this.inputs.inputs.get("inn").value = inn.textContent.trim();
            };
            accountPrefix.onclick = () => {
                this.inputs.inputs.get("account").value = accountPrefix.textContent.trim();
            };
            account.onclick = () => {
                this.inputs.inputs.get("account").value = account.textContent.trim();
            };
            phones.forEach(phone => {
                phone.onclick = () => {
                    this.inputs.inputs.get("phone").value = phone.textContent.trim();
                };
            });
            console.log('setup')
        });
    }

    updateClosure() {
        let lastCall = {
            abortController: new AbortController(),
            finished: false,
        };
        return async function update() {
            if (!lastCall.finished) {
                lastCall.abortController.abort();
                await new Promise(resolve => {
                    setTimeout(resolve, 500);
                });
                lastCall.abortController = new AbortController();
            }
            lastCall.finished = false;

            const filteredData = await this.model.filter(this.inputs.collectInputValues(), { signal: lastCall.abortController.signal });
            this.eventBus.noticeTotalRows(filteredData.length);
            const sortedData = await this.model.sort(filteredData, { signal: lastCall.abortController.signal });
            const paginatedData = this.paginator.paginateContent(sortedData, { signal: lastCall.abortController.signal });
            const dataToView = paginatedData[this.paginator.currentPage - 1];
            await this.renderer.render(dataToView, 100, 100, { signal: lastCall.abortController.signal });
            this.setupRows();
            this.paginator.update();
            lastCall.finished = true;
        };
    }
}

class AdsTable extends HTMLElement {
    constructor(paginator, eventBus) {
        super();
        this.model = new AdsTableModel();
        this.renderer = window.innerWidth > this.RENDER_THRESHOLD ? new BigScreenRenderer(this) : new MobileRenderer(this);
        this.controller = new AdsTableContoller(this.model, this.renderer, paginator, eventBus);
    }

    RENDER_THRESHOLD = 1100;

    async connectedCallback() {
        const data = await this.model.getData();
        this.model.data = data;
        this.controller.init();
        window.addEventListener("resize", () => {
            if (window.innerWidth > this.RENDER_THRESHOLD && this.controller.renderer instanceof MobileRenderer) {
                this.controller.setRenderStrategy(new BigScreenRenderer(this));
            } else if (window.innerWidth <= this.RENDER_THRESHOLD && !(this.controller.renderer instanceof MobileRenderer)) {
                this.controller.setRenderStrategy(new MobileRenderer(this));
            }
        });
    }
}

customElements.define("ads-table", AdsTable);
