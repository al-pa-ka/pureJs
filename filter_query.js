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

    this.inputFieldMapping = new Map();

    this.inputFieldMapping.set(this.mobileInput, "vacancyName");
    this.inputFieldMapping.set(this.idInput, "id");
    this.inputFieldMapping.set(this.vacancyNameInput, "vacancyName");
    this.inputFieldMapping.set(this.dateInput, "date");
    this.inputFieldMapping.set(this.sourceInput, "source");
  }
  setCallback(callable) {
    console.log("settedCallback");
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
    [
      this.mobileInput,
      this.idInput,
      this.vacancyNameInput,
      this.dateInput,
      this.sourceInput,
    ].forEach((input) => {
      const fieldName = this.inputFieldMapping.get(input);
      window.localStorage.setItem(fieldName, input.value);
    });
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
      this.dateInput.dispatchEvent(new Event("input"));
      this.onInput();
    }, "dateSetted");
    this.eventBus.addSubscriber((event) => {
      this.sourceInput.value = event.source;
      this.sourceInput.dispatchEvent(new Event("input"));
      this.onInput();
    }, "sourceSetted");
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
      console.log(window.localStorage);
      const fieldName = this.inputFieldMapping.get(input);

      input.onfocus = async (event) => {
        const fieldName = this.inputFieldMapping.get(input);
        const container = input.parentElement;
        this.currentHint = new Hint(
          this.data.map((vacancy) => String(vacancy[fieldName])),
          container
        );
        this.currentHint.setInitial(event.target.value);
        const result = await this.currentHint.open();
        if (result) {
          input.value = result;
          input.dispatchEvent(new Event("input"));
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

  restoreState() {
    [
      this.mobileInput,
      this.idInput,
      this.vacancyNameInput,
      this.dateInput,
      this.sourceInput,
    ].forEach((input) => {
      if (
        input == this.mobileInput &&
        window.getComputedStyle(input.parentElement).display == "none"
      ) {
        input.value = null;
        return;
      }
      const fieldName = this.inputFieldMapping.get(input);
      console.log(window.localStorage.getItem(fieldName));
      input.value = window.localStorage.getItem(fieldName);
    });

    [
      this.mobileInput,
      this.idInput,
      this.vacancyNameInput,
      this.dateInput,
      this.sourceInput,
    ].forEach((input) => {
      input.dispatchEvent(new Event("input"));
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
