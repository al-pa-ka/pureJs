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
eventBus.addEvent("filtersChanged")

const popupFactory = new PopupFactory();
const controlPanel = new ControlPanel(popupFactory, eventBus);
const sortQuery = new SortQuery(eventBus)

sortQuery.setupControl()
controlPanel.setup();

const data = plugData.map((vacancy) => {
  const date = dateToFormat(vacancy.date)
  vacancy.date = date
  return vacancy
})


const filterQuery = new FilterQuery(data, eventBus);
const paginator = new Paginator();
const table = new VacanciesTable(
  data,
  paginator,
  filterQuery,
  popupFactory,
  sortQuery,
  eventBus
);
table.setup();
table.render();
table.setupEventBusCallbacks();
