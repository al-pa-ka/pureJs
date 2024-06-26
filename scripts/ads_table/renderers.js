class BigScreenRenderer {
    STYLE = /*html*/ `
        <style>
        .description-edit:hover{
            text-decoration: var(--blue) solid underline;
            color: var(--blue);
            cursor: pointer;
        }
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
            grid-template-columns: 1fr minmax(50px, 1fr) minmax(200px, 2fr) minmax(200px, 2fr) minmax(200px, 2fr) minmax(130px, 1fr) minmax(100px, 3fr) minmax(100px, 3fr) minmax(80px, 2fr);
            grid-auto-rows: minmax(50px, auto);
        }
        .ads-table__titles_wrapper {
            display: contents;
        }
        .ads-table__cell {
            background-color: white;
            width: 100%;
            text-wrap: wrap;
            overflow-wrap: break-word;
            white-space: normal;
            border: 1px solid lightgray;
            padding: 5px;
            box-sizing: border-box;
        }
        .ads-table__title.pointer{
            cursor: pointer;
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
            color: #1037FF;
            cursor: pointer;
        }
        .ads-table__phone:hover{
            /* text-decoration: underline; */
            color: var(--blue);
        }
        .ads-table__status_notPublicated{
            color: red;
        }
        .ads-table__status_active{
            color: purple;
        }
        .ads-table__status_closed{
            color: green;
        }
        .ads-table__status_onModeration{
            color: purple;
        }
        .ads-table__status_overdue{
            color: red;
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
        .ads-table__inn{
            color: #1037FF;
            display: block;
            cursor: pointer;
        }
        .ads-table__inn:hover{
            color: var(--blue);
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
            overflow-wrap: break-word;
        }
        .ads-table__publ-and-date{
            display: flex;
            flex-direction: column;
        }
        .ads-table__cell-id{
            width: 100%;
            white-space: normal;
            overflow: hidden;
            white-space: break-spaces;
        }
        .ads-table__cell-description{
            overflow-wrap: break-word;
        }
        </style>`;
    constructor(container) {
        this.container = container;
        this.statusMapping = {
            active: "Активное",
            notPublicated: "Еще не опубликовано",
            closed: "Завершенное",
            activeUpdated: "Активное обновленное",
            overdue: "Просроченное",
            forceClosed: "Завершенное (принудительное)",
            onModeration: "На модерации",
        };
    }

    initialRender() {
        this.container.innerHTML = /*html*/ `
        ${this.STYLE}
        <div class="ads-table">
            <div class="ads-table__titles_wrapper">
                <div class="ads-table__title ads-table__cell number pointer"><p class="ads-table__title-text">№</p></div>
                <div class="ads-table__title ads-table__cell id pointer"><p class="ads-table__title-text">ID</p></div>
                <div class="ads-table__title ads-table__cell vacancy pointer"><p class="ads-table__title-text">ВАКАНСИЯ</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ОПИСАНИЕ/ТЕЛЕФОНЫ</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">СТАТУС</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">RUBP_ATRYB</p></div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">PUBLON/ PUBLOFF ИНН И НАЗВАНИЕ КОНТРАГЕНТА</p></div>
                <div class="ads-table__title ads-table__cell">
                    <p class="ads-table__title-text" style="text-transform: uppercase;">ФАЙЛ / ССЫЛКА НА САЙТ<br> Рубрика начальная/Рубрика новая/Рубрика номер</p>
                </div>
                <div class="ads-table__title ads-table__cell"><p class="ads-table__title-text">ПРЕФИКС/СЧЕТ/ДАТА СЧЕТА</p></div>
            </div>
            <div class="ads-table__search-wrapper">
                <div class="ads-table__cell search-wrapper"></div>
                <div class="ads-table__cell search-wrapper ads-table__cell-search-wrapper-id">
                    <input id="id" class="ads-table__search id" type="text" />
                    <little-cross queryfor=".ads-table__search.id"></little-cross>
                    <search-hint id='hint-id' queryfor='.ads-table__search.id' nodark="div.ads-table__cell:has(#id)"></search-hint>
                </div>
                <div class="ads-table__cell search-wrapper ads-table__cell-search-wrapper-vacancy">
                    <search-hint queryfor=".ads-table__search.vacancy"></search-hint>
                    <span class="icon"></span>
                    <input id="vacancy" class="ads-table__search vacancy" type="text" />
                    <little-cross queryfor=".ads-table__search.vacancy"> </little-cross>
                    <search-hint id='hint-vacancy' queryfor='.ads-table__search.vacancy' nodark="div.ads-table__cell:has(#vacancy)"> </search-hint>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <span class="icon"></span>
                    <input id="phone" class="ads-table__search phone" type="text" />
                    <little-cross queryfor=".ads-table__search.phone" ></little-cross>
                    <search-hint id='hint-phone' queryfor='.ads-table__search.phone' nodark="div.ads-table__cell:has(#phone)"> </search-hint>
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
                    <search-hint id="hint-inn" queryfor=".inn" nodark="div.ads-table__cell:has(#inn)"></search-hint>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <input id="source" class="ads-table__search inn" type="text" />
                    <little-cross queryfor="#source" ></little-cross>
                    <search-hint id="hint-source" queryfor="#source" nodark="div.ads-table__cell:has(#source)"></search-hint>
                </div>
                <div class="ads-table__cell search-wrapper">
                    <input id="account" class="ads-table__search" type="text" />
                    <little-cross queryfor="#account" ></little-cross>
                    <search-hint-account id="hint-account" queryfor="#account" nodark="div.ads-table__cell:has(#account)"></search-hint>
                </div>
            </div>
        </div>
    `;
    }

    formattedDateFromUnix(unixtime) {
        const date = new Date(unixtime * 1000);
        const day = String(date.getDay()).padStart(2, "0");
        const month = String(date.getMonth()).padStart(2, "0");
        const year = date.getFullYear();
        const formatted = `${day}/${month}/${year}`;
        return formatted;
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

        const formatedPublon = this.formattedDateFromUnix(item.PUBLON);
        const formatedPubloff = this.formattedDateFromUnix(item.PUBLOFF);

        const links = item.sources
            .map(source => {
                return `<a href="${source.link}" class="ads-table__${source.type}">${source.link}</a>`;
            })
            .join("<br>");

        return /*html*/ `
            <div class="content-row">
                <div class="ads-table__cell"><p class="ads-table__cell-number">${item.number}</p></div>
                <div class="ads-table__cell"><p class="ads-table__cell-id">${item.id}</p></div>
                <div class="ads-table__cell"><p class="ads-table__cell-vacancy-name">${item.vacancyName}</p></div>
                <div class="ads-table__cell">
                    <p class="ads-table__cell-description description-edit" itemId='${item.id}'>${
            item.description || ""
        }<span class="ads-table__edit-icon"></span></p>
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
                        </span>
                        <span class="ads-table__contragent-name"> ${item.CONTRAGENT_NAME} </span>
                        <a style="text-decoration: none;" href="contragents/${item.INN}"><span class="ads-table__edit-icon"></span></a>
                    </div>
                </div>
                <div class="ads-table__cell">
                    ${links}
                </div>
                <div class="ads-table__cell">
                    <div style="display: flex; flex-direction: column;">
                        <span class="ads-table__account-prefix">${item.account.id.replace(/[^A-zА-я]+/g, "")}</span>
                        <span class="ads-table__account-id">${item.account.id}</span>
                        <span class="ads-table__account-date">${item.account.date}</span>
                    </div>
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
    async render(dataToView, interval, timeToFreeze, { signal } = { signal: null }) {
        let contentMarkup = "";
        this.clear();
        for (const [index, item] of dataToView.entries()) {
            if (!index % interval) {
                await new Promise(resolve => setTimeout(resolve, timeToFreeze));
                if (signal && signal.aborted) {
                    throw new DOMException("Render aborted", "AbortError");
                }
                this.insert(contentMarkup);
                contentMarkup = "";
            }
            contentMarkup += this.TEMPLATE_ROW(item, index);
        }

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
        .ads-table-mobile{
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
        }
        .ads-table-mobile__search-panel{
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
        }
        .ads-table-mobile__search-wrapper{
            position: relative;
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
        .ads-table-mobile__item{
            display: grid;
            grid-template-columns: 1fr 5fr;
            row-gap: 10px;
            column-gap: 15px;
        }
        .ads-table-mobile__item-vacancy-name{
            grid-column: span 2;
            background-color: var(--blue);
            padding: 10px 0 10px 10px;
        }
        span.ads-table-mobile-item-vacancy-name{
            color: white;
        }
        .ads-table-mobile__item-title > span{
            color: #9C9C9C;
        }
        .ads-table-mobile__item-title{
            padding-left: 10px;
        }
        .ads-table-mobile__item-statuses{
            display: flex;
            flex-direction: column;
            row-gap: 9px;
        }
        .ads-table__publon-container, .ads-table__publoff-container, .ads-table__inn-container{
            display: flex;
            flex-direction: column;
        }
        .ads-table-mobile__item-publ-and-inn{
            display: flex;
            flex-direction: column;
            row-gap: 10px;
        }
        .ads-table__cell_mobile{
            display: flex;
            flex-direction: column;
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
                <search-hint id="hint-id" queryfor="#id"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="Название вакансии" id="vacancy" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#vacancy"></little-cross>
                <search-hint id="hint-vacancy" queryfor="#vacancy"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="Телефон" id="phone" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#phone"></little-cross>
                <search-hint id="hint-phone" queryfor="#phone"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="ИНН" id="inn" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#inn"></little-cross>
                <search-hint id="hint-inn" queryfor="#inn"></search-hint>
            </div>

            <div class="ads-table-mobile__search-wrapper">
                <span class="ads-table__search-icon"></span>
                <input placeholder="Счёт / префикс счёта" id="account" class="ads-table__search ads-table-mobile__search" type="text" name="" id="" />
                <little-cross queryfor="#account"></little-cross>
                <search-hint id="hint-account" queryfor="#account"></search-hint>
            </div>
        </div>
        <div class="ads-table-mobile"></div>
    `;
    TEMPLATE_ROW = (item, index) => {
        const phonesMarkup = item.phones
            ?.map(phone => {
                return /*html*/ `
                <span class="ads-table__phone">${formatPhoneNumber(phone)}</span>
            `;
            })
            .join("<br>");
        const statusesMarkup = item.statuses
            .map(status => {
                return `<span class="ads-table__status ads-table__status_${status.status}">${this.statusMapping[status.status]} ${
                    status.date
                }</span>`;
            })
            .join("");

        const links = item.sources
            .map(source => {
                return `<a href="${source.link}" class="ads-table__${source.type}">${source.link}</a>`;
            })
            .join("<br>");

        const formatedPublon = this.formattedDateFromUnix(item.PUBLON);
        const formatedPubloff = this.formattedDateFromUnix(item.PUBLOFF);

        return /*html*/ `
            <div class="content-row ads-table-mobile__item">
                <div class="ads-table-mobile__item-vacancy-name">
                    <span class="ads-table-mobile-item-vacancy-name ads-table__cell-vacancy-name">${item.vacancyName}</span>
                </div>
                <div class="ads-table-mobile__item-title">
                    <span>№</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-number">${index}</div>
                <div class="ads-table-mobile__item-title">
                    <span>ID</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-id ads-table__cell-id">${item.id}</div>
                <div class="ads-table-mobile__item-title">
                    <span>Дата</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-data"></div>
                <div class="ads-table-mobile__item-title">
                    <span>Описание/Телефоны</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-description-phones">
                    <p class="description-edit" itemId='${item.id}'>${item.description}</p><br>
                    ${phonesMarkup}
                </div>
                <div class="ads-table-mobile__item-title">
                    <span>Статус</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-statuses">
                    ${statusesMarkup}
                </div>
                <div class="ads-table-mobile__item-title">
                    <span>RUBR_ATRYB</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-rubp">
                    ${item.RUBP_ATTRYB}
                </div>
                <div class="ads-table-mobile__item-title">
                    <span>PUBLON/ PUBLOFF/ ИНН И НАЗВАНИЕ КОНТРАГЕНТА</span>
                </div>
                <div class="ads-table-mobile__item-info ads-table-mobile__item-publ-and-inn">
                    <div class="ads-table__publon-container">
                        <span>${item.PUBLON}</span>
                        <span>${formatedPublon}</span>
                    </div>
                    <div class="ads-table__publon-container">
                        <span>${item.PUBLOFF}</span>
                        <span>${formatedPubloff}</span>
                    </div>
                    <div class="ads-table__inn-container">
                        <span class="ads-table__inn">${item.INN}</span>
                        <span>${item.CONTRAGENT_NAME}</span>
                    </div>
                </div>
                <div class="ads-table-mobile__item-title">
                    <span>Файл/ссылка на сайт</span>
                </div>
                <div class="ads-table-mobile__item-info">
                    ${links}
                </div>
                <div class="ads-table-mobile__item-title">
                    <span>Префикс/ счет/ дата счета </span>
                </div>
                <div class="ads-table__cell_mobile">
                    <span class="ads-table__account-prefix">${item.account.id.replace(/[^A-zА-я]+/g, "")}</span>
                    <span class="ads-table__account-id">${item.account.id}</span>
                    <span class="ads-table__account-date">${item.account.date}</span>
                </div>
            </div>
        `;
    };
    initialRender() {
        this.container.innerHTML = this.CONTROL_TEMPLATE;
    }
    clear() {
        this.container.querySelector(".ads-table-mobile").innerText = "";
    }
    insert(contentMarkup) {
        this.container.querySelector(".ads-table-mobile").insertAdjacentHTML("beforeend", contentMarkup);
    }
}
