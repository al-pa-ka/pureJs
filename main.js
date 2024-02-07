const journalsTab = document.querySelector("#journals_tab");

journalsTab.classList.add("tab_active");

document.querySelectorAll(".second-panel__tab").forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.add("tab_active");
  });
  document.addEventListener("click", (event) => {
    const isAnotherTabClicked = Array.from(
      document.querySelectorAll(".second-panel__tab")
    ).filter((el) => {
      return el.contains(event.target);
    }).length;

    if (!el.contains(event.target) && isAnotherTabClicked) {
      el.classList.remove("tab_active");
    }
  });
});

document.querySelectorAll(".third-panel__tab").forEach((el, index) => {
  el.onclick = (event) => {
    document.querySelectorAll(".third-panel__tab").forEach((el) => {
      el.querySelector("span").style.setProperty("color", "white");
      el.querySelector("p").style.setProperty("color", "white");
    });
    console.log(event.target);
    el.querySelector("span").style.setProperty("color", "#FFE200");
    el.querySelector("p").style.setProperty("color", "#FFE200");
  };
});

const eventBus = new EventBus();

eventBus.addEvent("deleteEverything");
eventBus.addEvent("addVacancy");
eventBus.addEvent("vacancyNameInput");
eventBus.addEvent("clearSearch");
eventBus.addEvent("fieldNotEmpty");
eventBus.addEvent("fieldEmpty");
eventBus.addEvent("dateSetted");

const popupFactory = new PopupFactory();
const controlPanel = new ControlPanel(popupFactory, eventBus);
controlPanel.setup();

const filterQuery = new FilterQuery(plugData, eventBus);
const paginator = new Paginator();
const table = new VacanciesTable(
  plugData,
  paginator,
  filterQuery,
  popupFactory,
  eventBus
);
table.setup();
table.render();
table.setupEventBusCallbacks();
