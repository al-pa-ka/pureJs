class FilterQuery {
  constructor() {
    this.idInput = this.getIdFilterInput();
    this.vacancyNameInput = this.getVacancyNameInput();
    this.sourceInput = this.getSourceInput();
    this.callback = () => {};
  }
  setCallback(callable) {
    this.callback = callable;
  }
  onInput() {
    this.callback();
  }
  getIdFilterInput() {
    return document.querySelector(".table__row-item.title.id>input");
  }
  getVacancyNameInput() {
    return document.querySelector(".table__row-item.title.vacancy-name>input");
  }
  getSourceInput() {
    return document.querySelector(".table__row-item.title.source>input");
  }
  setup() {
    this.idInput.oninput = () => {
      this.onInput();
    };
    this.vacancyNameInput.oninput = () => {
      this.onInput();
    };
    this.sourceInput.oninput = () => {
      this.onInput();
    };
  }
  filterVacancies(vacancies) {
    const filterQuery = [
      ["id", this.idInput.value],
      ["vacancyName", this.vacancyNameInput.value],
      ["source", this.sourceInput.value],
    ];
    const filterQueryWithoutEmptyValues = filterQuery.filter((el) => {
      return Boolean(el[1]);
    });
    let filteredVacancies = vacancies;
    for (let filter of filterQueryWithoutEmptyValues) {
      console.log(filter);
      filteredVacancies = filteredVacancies.filter((el) => {
        if (filter[0] == "vacancyName") {
          return String(el[filter[0]])
            .toLowerCase()
            .replace(/[^А-я0-9]/, "")
            .startsWith(filter[1].toLowerCase());
        } else {
          return String(el[filter[0]])
            .toLowerCase()
            .startsWith(filter[1].toLowerCase());
        }
      });
    }
    return filteredVacancies;
  }
}
