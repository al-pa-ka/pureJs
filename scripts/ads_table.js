class BigScreenRenderer {
    STYLE = `
        <style>
        .ads-table__search-icon{
            color: gray;
            font-size: 20px;
            font-family: Icons;
        }
        .ads-table__link{
            cursor: pointer;
            overflow-wrap: break-word;
            color: #1037FF;
        }
        .ads-table__file{
            text-wrap: wrap;
            overflow-wrap: break-word;
            cursor: pointer;
            color: #FF8A00;
        }
        .ads-table__publon-date-format, .ads-table__publoff-date-format{
            color: #1037FF;
            text-decoration: underline;
            cursor: pointer;
        }
        .ads-table__edit-icon{
            display: inline;
            font-family: Icons;
            font-size: 18px;
            line-height: 0.1;
            cursor: pointer;
            opacity: 0.5;
            color: var(--blue);
        }
        .ads-table__edit-icon:hover{
            opacity: 1;
        }
        .ads-table {
            display: grid;
            grid-template-columns: 1fr minmax(50px, 1fr) 3fr 4fr minmax(200px, 4fr) 3fr minmax(100px, 3fr) minmax(100px, 4fr) 2fr;
            grid-auto-rows: minmax(50px, auto);
        }
        .ads-table__titles_wrapper {
            display: contents;
        }
        .ads-table__cell {
            width: 100%;
            text-wrap: wrap;
            white-space: normal;
            border: 1px solid lightgray;
            padding: 5px;
            box-sizing: border-box;
        }
        .ads-table__title {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .ads-table__title-text {
            width: 100%;
            color: gray;
            font-size: 18px;
            overflow-wrap: break-word;
        }
        .ads-table__search-wrapper {
            display: contents;
        }
        .ads-table__search {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            padding: 0;
            font-size: 18px;
            font-weight: 600;
        }
        .ads-table__cell.search-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }
        .ads-table__cell-search-wrapper-id{
            gap: 0px !important;
            width: 100%;
        }
        .ads-table__phone{
            color: var(--blue);
        }
        .ads-table__status_notPublicated{
            color: red;
        }
        .ads-table__status_active{
            color: purple;
        }
        .ads-table__status_finished{
            color: green;
        }
        .search-wrapper > span.icon {
            font-size: 20px;
            color: gray;
        }
        .content-row{
            display: contents;
        }
        .ads-table__punlon-off-cell{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .ads-table__inn-contragent{
            display: flex;
            flex-direction: column;
        }
        .ads-table__account-prefix{
            color: red;
            cursor: pointer;
            text-decoration: underline;
        }
        .ads-table__account-id{
            color: #1037FF;
            cursor: pointer;
            text-decoration: underline;
        }
        .ads-table__account-date{
            color: #1037FF;
            cursor: pointer;
            text-decoration: underline;
        }
        .ads-table__publ-and-date{
            display: flex;
            flex-direction: column;
        }
        </style>`;
    constructor(container) {
        this.container = container;
        this.statusMapping = {
            active: "Активное",
            notPublicated: "Еще не опубликовано",
            finished: "Завершенное",
        };
    }
    initialRender() {
        this.container.innerHTML = /*html*/ `
        ${this.STYLE}
        <div class="ads-table">
            <div class="ads-table__titles_wrapper">
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">№</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ID</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ВАКАНСИЯ</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ОПИСАНИЕ/ТЕЛЕФОНЫ</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">СТАТУС</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">RUBP_ATRYB</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">PUBLON/ PUBLOFF ИНН И НАЗВАНИЕ КОНТРАГЕНТА</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ФАЙЛ/ССЫЛКА НА САЙТ</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ПРЕФИКС/СЧЕТ/ДАТА СЧЕТА</p></div>
            </div>
            <div class="ads-table__search-wrapper">
                <div class="ads-table__cell search-wrapper"></div>
                <div class="ads-table__cell search-wrapper ads-table__cell-search-wrapper-id">
                    <input id="id" class="ads-table__search id" type="text" />
                    <little-cross queryfor=".ads-table__search.id"></little-cross>
                    <search-hint id='hint-id' queryfor='.ads-table__search.id'></search-hint>
                </div>
                <div class="ads-table__cell search-wrapper ads-table__cell-search-wrapper-vacancy">
                    <search-hint queryfor=".ads-table__search.vacancy"></search-hint>
                    <span class="icon"></span>
                    <input id="vacancy" class="ads-table__search vacancy" type="text" />
                    <little-cross queryfor=".ads-table__search.vacancy"> </little-cross>
                    <search-hint id='hint-vacancy' queryfor='.ads-table__search.vacancy'> </search-hint>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <span class="icon"></span>
                    <input id="phone" class="ads-table__search phone" type="text" />
                    <little-cross queryfor=".ads-table__search.phone" ></little-cross>
                    <search-hint id='hint-phone' queryfor='.ads-table__search.phone'> </search-hint>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <custom-select id="statuses">
                        <option value="active+notPublicated">Активное +
                        Еще не опубликованное</option>
                        <option value="active">Активное</option>
                        <option value="activeUpdated">Активное обновленное</option>
                        <option value="closed">Завершенное</option>
                        <option value="forceClosed"><span>Завершенное <span style="font-size: 14px; color: lightgray;">(принудительное)</span></span></option>
                        <option value="closed+forceDepublished">Завершенное +
                        Вынужденная депубликация</option>
                        <option value="notPublicated">Еще не опубликованное</option>
                        <option value="overdue">Просроченное</option>
                        <option value="all"><span>По всем <span style="font-size: 14px; color: lightgray;">(все объявления строятся в алфавитном порядке)</span></span></option>
                        <option value="onModeration">На модерации</option>
                    </custom-select>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <custom-select id="rubp">
                        <option value="all">По всем</option>
                        <option value="lenta">Lenta</option>
                        <option value="skrepka">Skrepka</option>
                        <option value="srochno">Srochno</option>
                    </custom-select>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <span class="icon"></span>
                    <input id="inn" class="ads-table__search inn" type="text" />
                    <little-cross queryfor=".ads-table__search.inn" ></little-cross>
                    <search-hint id="hint-inn" queryfor=".inn"></search-hint>
                </div>
                <div class="ads-table__cell search-wrapper"><input class="ads-table__search" type="text" /></div>
                <div class="ads-table__cell search-wrapper"><input class="ads-table__search" type="text" /></div>
            </div>
        </div>
    `;
    }
    TEMPLATE_ROW = (item, index) => {
        const phones = item.phones
            .map(phone => {
                return `<span class="ads-table__phone">${formatPhoneNumber(phone)}</span>`;
            })
            .join("<br>");

        const statuses = item.statuses
            .map(status => {
                return `<span class="ads-table__status ads-table__status_${status.status}">${this.statusMapping[status.status]} ${
                    status.date
                }</span>`;
            })
            .join("<br>");

        const publonDate = new Date(item.PUBLON * 1000);
        const publonDay = String(publonDate.getDay()).padStart(2, "0");
        const publonMonth = String(publonDate.getMonth()).padStart(2, "0");
        const publonYear = publonDate.getFullYear();
        const formatedPublon = `${publonDay}/${publonMonth}/${publonYear}`;

        const publoffDate = new Date(item.PUBLOFF * 1000);
        const publoffDay = String(publoffDate.getDay()).padStart(2, "0");
        const publoffMonth = String(publoffDate.getMonth()).padStart(2, "0");
        const publoffYear = publoffDate.getFullYear();
        const formatedPubloff = `${publoffDay}/${publoffMonth}/${publoffYear}`;

        const links = item.sources
            .map(source => {
                return `<a href="${source.link}" class="ads-table__${source.type}">${source.link}</a>`;
            })
            .join("<br>");

        return `
            <div class="content-row">
                <div class="ads-table__cell"><p>${index}</p></div>
                <div class="ads-table__cell"><p>${item.id}</p></div>
                <div class="ads-table__cell"><p>${item.vacancyName}</p></div>
                <div class="ads-table__cell">
                    <p>${item.description || ""}<span class="ads-table__edit-icon"></span></p>
                    ${phones}
                </div>
                <div class="ads-table__cell">
                    ${statuses}
                </div>
                <div class="ads-table__cell"><p>${item.RUBP_ATTRYB}</p></div>
                <div class="ads-table__cell ads-table__punlon-off-cell">
                    <div class="ads-table__publ-and-date">
                        <span class="ads-table__publon">${item.PUBLON}</span>
                        <span class="ads-table__publon-date-format">
                            ${formatedPublon}
                        </span>
                    </div>
                    <div class="ads-table__publ-and-date">
                        <span class="ads-table__publoff">${item.PUBLON}</span>
                        <span class="ads-table__publoff-date-format">
                            ${formatedPubloff}
                        </span>
                    </div>
                    <div class="ads-table__inn-contragent">
                        <span class="ads-table__inn">
                            ${item.INN}
                            <a style="text-decoration: none;" href="contragents/${item.INN}"><span class="ads-table__edit-icon"></span></a>
                        </span>
                        <span class="ads-table__contragent-name"> ${item.CONTRAGENT_NAME} </span>
                    </div>
                </div>
                <div class="ads-table__cell">
                    ${links}
                </div>
                <div class="ads-table__cell">
                    <span class="ads-table__account-prefix">${item.account.id.replace(/[^A-zА-я]+/g, "")}</span>
                    <span class="ads-table__account-id">${item.account.id}</span>
                    <span class="ads-table__account-date">${item.account.date}</span>
                </div>
            </div>
        `;
    };

    clear() {
        this.container
            .querySelector(".ads-table")
            .querySelectorAll(".content-row")
            .forEach(row => {
                row.remove();
            });
    }
    insert(contentMarkup) {
        this.container.querySelector(".ads-table").insertAdjacentHTML("beforeend", contentMarkup);
    }
    render(dataToView) {
        let contentMarkup = "";

        for (const [index, item] of dataToView.entries()) {
            contentMarkup += this.TEMPLATE_ROW(item, index);
        }

        this.clear();
        this.insert(contentMarkup);
    }
}

class MobileRenderer extends BigScreenRenderer {
    STYLE =
        this.STYLE +
        /*html*/ `
    <style>
        ads-table{
            width: 100%;
            margin-top: 20px;
        }
        .ads-table-mobile__search-panel{
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
        }
        .ads-table-mobile__search-wrapper{
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
            height: 50px;
            box-sizing: border-box;
            padding: 10px;

            width: 100%;
            border: 2px solid lightgray;
        }
        .ads-table-mobile__search{
            padding-left: 10px;
            padding-right: 10px;
        }
        .ads-table-mobile__search::-webkit-input-placeholder{
            color: gray;
            font-weight: normal;
        }
        .icon{
            color: gray;
        }
    </style>
    `;
    CONTROL_TEMPLATE = /*html*/ `
        ${this.STYLE}
        <div class="ads-table-mobile__search-panel">
            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="id" id="id" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#id"></little-cross>
                <search-hint id="hint-id" queryfor=".ads-table__search.id"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="Название вакансии" id="vacancy" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#vacancy"></little-cross>
                <search-hint id="hint-id" queryfor=".ads-table__search.id"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="Телефон" id="phone" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#phone"></little-cross>
                <search-hint id="hint-id" queryfor=".ads-table__search.id"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="ИНН" id="inn" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#inn"></little-cross>
                <search-hint id="hint-id" queryfor=".ads-table__search.id"></search-hint>
            </div>
        </div>
        <div class="ads-table-mobile"></div>
    `;
    TEMPLATE_ROW = () => {
        return ``;
    };
    initialRender() {
        this.container.innerHTML = this.CONTROL_TEMPLATE;
    }
    render() {}
}

class AdsTableModel {
    constructor(data) {
        this.data = data;
    }
    filter(filterData) {
        return new FilterByRubp(
            new FilterByStatus(
                new FilterByVacancyNameDecorator(
                    new FilterByINNDecorator(
                        new FilterPhoneNumberDecorator(new FilterId(this.data, filterData.id), filterData.phoneNumber),
                        filterData.inn
                    ),
                    filterData.vacancyName
                ),
                filterData.statuses
            ),
            filterData.rubp
        ).filter();
    }
}

class AdsTableContoller {
    constructor(model, renderStrategy, paginatorController) {
        this.model = model;
        this.renderer = renderStrategy;
        this.paginator = paginatorController;
    }

    setRenderStrategy(renderStrategy) {
        this.renderer = renderStrategy;
        this.init();
    }

    collectFilterData() {
        const id = document.querySelector("#id")?.value;
        const phoneNumber = document.querySelector("#phone")?.value;
        const vacancyName = document.querySelector("#vacancy")?.value;
        const inn = document.querySelector("#inn")?.value;
        const statuses = document.querySelector("#statuses")?.getCheckedValues();
        const rubp = document.querySelector("#rubp")?.getCheckedValues();
        console.log({ id, phoneNumber, vacancyName, inn, statuses, rubp });
        return { id, phoneNumber, vacancyName, inn, statuses, rubp };
    }

    setup() {
        const rubpSelect = document.querySelector("#rubp");
        if (rubpSelect) {
            rubpSelect.customOnChange = () => {
                const values = rubpSelect.getCheckedValues();
                if (values.includes("all")) {
                    rubpSelect.setValue("По всем");
                    rubpSelect.setChecked([0, 1, 2, 3]);
                } else {
                    rubpSelect.setValue(rubpSelect.computeValue());
                }
            };
            rubpSelect.customOnInput = () => {
                this.update();
            };
            rubpSelect.setDefault(0);
        }

        const statusSelect = document.querySelector("#statuses");
        if (statusSelect) {
            statusSelect.customOnChange = () => {
                const values = statusSelect.getCheckedValues();
                if (values.includes("all")) {
                    statusSelect.setValue("По всем");
                    statusSelect.setChecked([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                } else {
                    statusSelect.setValue(statusSelect.computeValue());
                }
            };

            statusSelect.customOnInput = () => {
                this.update();
            };

            statusSelect?.setDefault(8);
        }

        ["#id", "#phone", "#vacancy", "#inn"].forEach(id => {
            try {
                document.querySelector(id).addEventListener("input", () => {
                    this.update();
                });
            } catch {}
        });
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
        );
        document.querySelector("#hint-inn").setDataToSearch(
            this.model.data.map(el => {
                return String(el.INN);
            })
        );
        document.querySelector("#statuses").customOnInput = () => {
            this.update();
        };
        document.querySelector("#rubp").customOnInput = () => {
            this.update();
        };
    }

    init() {
        this.renderer.initialRender();
        this.update();
        this.setup();
    }

    update() {
        const filteredData = this.model.filter(this.collectFilterData());
        const paginatedData = this.paginator.paginateContent(filteredData);
        const dataToView = paginatedData[this.paginator.currentPage - 1];
        this.renderer.render(dataToView);
        this.paginator.redrawControlPanel(this.paginator.numberOfPages);
    }
}

class AdsTable extends HTMLElement {
    constructor() {
        super();
        this.model = new AdsTableModel([
            {
                phones: ["89375691412", ""],
                id: 2,
                vacancyName: "Погрузчик",
                description: "Таскать мешки",
                RUBP_ATTRYB: "Lenta",
                statuses: [
                    { status: "active", date: "26.05.2022" },
                    { status: "notPublicated", date: "25.04.2020" },
                ],
                PUBLON: 1652140860,
                PUBLOFF: 17002990860,
                INN: 5404092269,
                CONTRAGENT_NAME: "ООО РБ",
                sources: [
                    { type: "link", link: "https://web.telegram.org/k/" },
                    { type: "file", link: "str_ob_20220829__111 понедельник_form_20220901__011624.xml" },
                ],
                account: { id: "ОМ0000022962", date: "08.05.2023" },
            },
            {
                phones: ["89375691412", ""],
                id: 22,
                vacancyName: "Загрузчик",
                description: `Обязанности: сбор второсырья на мусоровозе, погрузка и разгрузка, работа с накладными, обработка рабочих поверхностей, поддержание оборудования в рабочем состоянии.
                Требования: внимательность, дисциплинированность, ответственность, без рабоих привычек, желание работать. 
                Условия: график работы: дни работы: 5/2, время работы: 08:00-17:00, зарплата: 70000руб/мес, премия за стаж, корпоративные подарки, мероприятия, материальная помощь, адрес места работы: город Нижний Новгород, ответственный за прием на работу: Анастасия, звонить: 09:00-17:00`,
                RUBP_ATTRYB: "Lenta",
                statuses: [
                    { status: "active", date: "26.05.2022" },
                    { status: "notPublicated", date: "25.04.2020" },
                ],
                PUBLON: 1652140860,
                PUBLOFF: 17002990860,
                INN: 5404091669,
                CONTRAGENT_NAME: "ООО РБ",
                sources: [
                    { type: "link", link: "https://web.telegram.org/k/" },
                    { type: "file", link: "str_ob_20220829__111 понедельник_form_20220901__011624.xml" },
                ],
                account: { id: "ОМ0000022962", date: "08.05.2023" },
            },
        ]);
        this.renderer = window.innerWidth > this.RENDER_THRESHOLD ? new BigScreenRenderer(this) : new MobileRenderer(this);
        const paginator = document.querySelector("pagination-control");
        this.controller = new AdsTableContoller(this.model, this.renderer, paginator);
    }

    RENDER_THRESHOLD = 1000;

    connectedCallback() {
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
