class FilterQuery {
  constructor(data, eventBus) {
    this.data = data;
    this.idInput = this.getIdFilterInput();
    this.vacancyNameInput = this.getVacancyNameInput();
    this.sourceInput = this.getSourceInput();
    this.dateInput = document.querySelector(
      ".table__row-item.title.date>input"
    );
    this.mobileInput = document.querySelector(
      ".mobile-wrapper__input-vacancy-name>input"
    );
    this.callback = () => {};
    this.currentHint = null;
    this.eventBus = eventBus;
  }
  setCallback(callable) {
    this.callback = callable;
  }
  onInput() {
    this.callback();
    if (
      this.vacancyNameInput.value ||
      this.idInput.value ||
      this.sourceInput.value ||
      this.dateInput.value ||
      this.mobileInput.value
    ) {
      this.eventBus.notice({}, "fieldNotEmpty");
    } else {
      this.eventBus.notice({}, "fieldEmpty");
    }
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
  setupEventBus() {
    this.eventBus.addSubscriber(() => {
      this.vacancyNameInput.value = "";
      this.idInput.value = "";
      this.sourceInput.value = "";
      this.dateInput.value = "";
      this.mobileInput.value = "";
      this.onInput();
    }, "clearSearch");
    this.eventBus.addSubscriber((event) => {
      this.dateInput.value = event.date;
      this.dateInput.dispatchEvent(new Event('input'))
      this.onInput();
    }, "dateSetted");
    this.eventBus.addSubscriber((event) => {
      this.sourceInput.value = event.source
      this.sourceInput.dispatchEvent(new Event('input'))
      this.onInput()
    }, "sourceSetted")
    this.eventBus.addSubscriber(() => {
      document.querySelectorAll(".litle-cross")?.forEach((cross) => {
        cross.remove();
      });
    }, "clearSearch");
  }
  setup() {
    this.setupEventBus();

    [
      this.mobileInput,
      this.idInput,
      this.vacancyNameInput,
      this.dateInput,
      this.sourceInput,
    ].forEach((input) => {

      const inputFieldMapping = new Map();

      inputFieldMapping.set(this.mobileInput, 'vacancyName')
      inputFieldMapping.set(this.idInput, 'id')
      inputFieldMapping.set(this.vacancyNameInput,'vacancyName')
      inputFieldMapping.set(this.dateInput, 'date')
      inputFieldMapping.set(this.sourceInput, 'source' )

      input.onfocus = async (event) => {
        const fieldName = inputFieldMapping.get(input)
        const container = input.parentElement;
        this.currentHint = new Hint(
          this.data.map((vacancy) => String(vacancy[fieldName])),
          container
        );
        this.currentHint.setInitial(event.target.value);
        const result = await this.currentHint.open();
        if (result) {
          input.value = result;
          this.callback();
        }
      };

      input.onblur = () => {
        this.currentHint?.close();
        this.currentHint = null;
      };

      input.oninput = (event) => {
        this.onInput();
        if (input.value && !input.parentElement.querySelector(".litle-cross")) {
          const cross = new Cross(input.parentElement, input);
          cross.setup();
        } else if (!input.value) {
          input.parentElement.querySelector(".litle-cross")?.remove();
        }
        this.currentHint?.update(event.target.value);
      };
    });
  }

  filterVacancies(vacancies) {
    const filterQuery = [
      ["id", this.idInput.value],
      ["vacancyName", this.vacancyNameInput.value],
      ["vacancyName", this.mobileInput.value],
      ["source", this.sourceInput.value],
      ["date", this.dateInput.value],
    ];
    const filterQueryWithoutEmptyValues = filterQuery.filter((el) => {
      return Boolean(el[1]);
    });
    let filteredVacancies = vacancies;
    for (let filter of filterQueryWithoutEmptyValues) {
      filteredVacancies = filteredVacancies.filter((el) => {
        if (filter[0] == "vacancyName") {
          return String(el[filter[0]])
            .toLowerCase()
            .replace(/[^А-я0-9A-z]/, "")
            .startsWith(filter[1].replace(/[^А-я0-9A-z]/, "").toLowerCase());
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
