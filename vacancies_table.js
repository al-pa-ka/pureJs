class VacanciesTable {
  constructor(data, paginator, filterQuery, popupFactory, eventBus) {
    this.paginator = paginator;
    this.dataTable = document.querySelector(".table.vacancies");
    this.data = data
    this.filteredContent = [];
    this.paginatedContent = [];
    this.filterQuery = filterQuery;
    this.popupFactory = popupFactory;
    this.eventBus = eventBus;
  }

  filteredVacancies() {
    return this.data;
  }

  update() {
    this.filteredContent = this.filterQuery.filterVacancies(this.data);
    this.paginatedContent = this.paginator.paginateContent(
      this.filteredContent
    );
    this.paginator.redrawControlPanel(this.paginatedContent.length);
    this.render();
    this.setupRowsControl();
  }

  setupRowsControl() {
    console.log("setupRows");
    document.querySelectorAll(".row-wrapper").forEach((row) => {
      row.querySelector(".control-edit.edit").onclick = async () => {
        const vacancyId = Number(row.querySelector(".id>p").textContent);
        const vacancy = this.data.find((vacancy) => {
          return vacancy.id == vacancyId;
        });
        const vacancyIdInData = this.data.findIndex((vacancy) => {
          return vacancy.id == vacancyId;
        });
        const editVacancyPopup = this.popupFactory.build(
          this.popupFactory.EDIT
        );
        editVacancyPopup.setEventBus(this.eventBus);
        editVacancyPopup.setContext(vacancy);
        if ((await editVacancyPopup.open()) == editVacancyPopup.CANCEL) {
          return;
        }
        this.data[vacancyIdInData] = editVacancyPopup.result;
        this.update();
      };

      row.querySelector(".control-edit.delete").onclick = async () => {
        const vacancyId = Number(row.querySelector(".id>p").textContent);
        const vacancy = this.data.find((vacancy) => {
          return vacancy.id == vacancyId;
        });
        const vacancyIdInData = this.data.findIndex((vacancy) => {
          return vacancy.id == vacancyId;
        });
        const deleteVacancyPopup = this.popupFactory.build(
          this.popupFactory.DELETE
        );
        deleteVacancyPopup.setContext(vacancy);
        if ((await deleteVacancyPopup.open()) == deleteVacancyPopup.CANCEL) {
          return;
        }
        console.log("delete");
        this.data.splice(vacancyIdInData, 1);
        this.update();
      };
    });
  }

  setupEventBusCallbacks() {
    this.eventBus.addSubscriber((event) => {
      console.log("deleted");
      this.data.length = 0;
      this.update();
    }, "deleteEverything");

    this.eventBus.addSubscriber((event) => {
      console.log("added");
      event.id =
        this.data.reduce(
          (prev, curr) => {
            return prev.id > curr.id ? prev : curr;
          },
          { id: 0 }
        ).id + 1;
      this.data.push(event);
      this.update();
    }, "addVacancy");

    this.eventBus.addSubscriber((event) => {
      console.log(event.data);
      const searchResult = this.data.find((el) => {
        return el.vacancyName == event.data;
      });
      if (searchResult != undefined) {
        event.callback(searchResult);
      }
    }, "vacancyNameInput");
  }

  setup() {
    this.paginatedContent = this.paginator.paginateContent(this.data);
    this.paginator.redrawControlPanel(this.paginatedContent.length);
    this.paginator.setPageChangedCallback(() => {
      this.render();
    });
    this.filterQuery.setup();
    this.filterQuery.setCallback(() => {
      this.update();
    });
    this.setupRowsControl();
  }

  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  clear() {
    document.querySelectorAll(".row-wrapper").forEach((el) => {
      el.remove();
    });
  }

  render() {
    this.clear();
    const inTotalMarkup = document.querySelector(
      ".control-panel__segment.in-total>p>span"
    );
    inTotalMarkup.textContent = this.paginatedContent.flat(1).length;
    if (this.paginatedContent.length < 1) {
      return;
    }
    let number = 1;
    for (const vacancy of this.paginatedContent[
      this.paginator.currentPage - 1
    ]) {
      const itemNumberHTML = `<div class="table__row-item center selectable">
                                    <p>${number}</p>
                            </div>`;

      const idHTML = `<div class="table__row-item center selectable id">
                            <p>${vacancy.id}</p>
                    </div>`;
      const vacancyName = `<div class="table__row-item selectable">
                                    <p>${vacancy.vacancyName}</p>
                            </div>`;
      const edit = `<div class="table__row-item title selectable">
                            <span class="icon control-edit edit"></span>
                        </div>
                        <div class="table__row-item title selectable">
                            <span class="icon control-edit delete"></span>
                        </div>`;
      const source = `<div class="table__row-item">
                            <p class="source ${
                              vacancy.source == "Published" ? "published" : ""
                            }">${vacancy.source}</p>
                        </div>`;
      const date = `<div class="table__row-item">
                        <p class="date">${vacancy.date}</p>
                    </div>`;
      this.dataTable.insertAdjacentHTML(
        "beforeend",
        `<div class="row-wrapper">${
          itemNumberHTML + idHTML + vacancyName + edit + source + date
        }</div>`
      );
      number++;
    }
    this.setupRowsControl();
  }
}
