async function main() {
    const journalsTab = document.querySelector("#journals_tab");

    journalsTab.classList.add("tab_active");

    const eventBus = new EventBus();

    eventBus.addEvent("deleteEverything");
    eventBus.addEvent("addVacancy");
    eventBus.addEvent("vacancyNameInput");
    eventBus.addEvent("clearSearch");
    eventBus.addEvent("fieldNotEmpty");
    eventBus.addEvent("fieldEmpty");
    eventBus.addEvent("dateSetted");
    eventBus.addEvent("sourceSetted");
    eventBus.addEvent("filtersChanged");

    const popupFactory = new PopupFactory();
    const controlPanel = new ControlPanel(popupFactory, eventBus);
    const sortQuery = new SortQuery(eventBus);

    sortQuery.setupControl();
    controlPanel.setup();
    let data = await fetch("db.json");
    data = await data.json();
    console.log(data);
    // const data = plugData.map(vacancy => {
    //     const date = dateToFormat(vacancy.date);
    //     vacancy.date = date;
    //     return vacancy;
    // });

    window.onscroll = event => {
        console.log(this.scrollY);
        localStorage.setItem("vacancies__scroll", this.scrollY);
    };

    const filterQuery = new FilterQuery(data, eventBus);
    const paginators = document.body.querySelectorAll("pagination-control");
    console.log(paginators);
    const paginatorShadow = new PaginatorShadow(paginators[0], paginators[1]);
    const table = new VacanciesTable(data, paginatorShadow, filterQuery, popupFactory, sortQuery, eventBus);
    table.setup();
    const mutationObserver = new MutationObserver(() => {
        window.scrollTo(0, Number(localStorage.getItem("vacancies__scroll")));
        mutationObserver.disconnect();
    });
    mutationObserver.observe(document.querySelector(".table.vacancies"), { attributes: true, childList: true });
    table.render();
    table.setupEventBusCallbacks();
}

main();
