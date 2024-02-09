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
      this.onInput();
    }, "dateSetted");
  }
  setup() {
    this.setupEventBus();
    // this.idInput.oninput = (event) => {
    //   this.onInput();
    //   this.currentHint?.update(event.target.value);
    // };

    this.idInput.onfocus = async (event) => {
      if (this.currentHint) {
        try {
          // this.currentHint.close();
          this.currentHint = null;
        } catch {}
      }
      const container = document.querySelector(".table__row-item.title.id");
      this.currentHint = new Hint(
        this.data.map((vacancy) => String(vacancy.id)),
        container
      );
      this.currentHint.setInitial(event.target.value);
      const result = await this.currentHint.open();
      if (result) {
        this.getIdFilterInput().value = result;
        this.callback();
      }
    };

    // this.vacancyNameInput.oninput = () => {
    //   this.onInput();
    //   this.currentHint?.update(event.target.value);
    // };
    this.vacancyNameInput.onfocus = async () => {
      if (this.currentHint) {
        try {
          // this.currentHint.close();
          this.currentHint = null;
        } catch {}
      }
      const container = document.querySelector(
        ".table__row-item.title.vacancy-name"
      );
      this.currentHint = new Hint(
        this.data.map((vacancy) => String(vacancy.vacancyName)),
        container
      );
      this.currentHint.setInitial(event.target.value);
      const result = await this.currentHint.open();
      if (result) {
        this.getVacancyNameInput().value = result;
        this.callback();
      }
    };

    this.sourceInput.onfocus = async () => {
      if (this.currentHint) {
        try {
          // this.currentHint.close();
          this.currentHint = null;
        } catch {}
      }
      const container = document.querySelector(".table__row-item.title.source");
      this.currentHint = new Hint(
        this.data.map((vacancy) => String(vacancy.source)),
        container
      );
      this.currentHint.setInitial(event.target.value);
      const result = await this.currentHint.open();
      if (result) {
        this.sourceInput.value = result;
        this.callback();
      }
    };

    // this.sourceInput.oninput = (event) => {
    //   this.onInput();
    //   this.currentHint?.update(event.target.value);
    // };

    // this.dateInput.oninput = (event) => {
    //   this.onInput();
    //   this.currentHint?.update(event.target.value);
    // };

    this.dateInput.onfocus = async (event) => {
      if (this.currentHint) {
        try {
          // this.currentHint.close();
          this.currentHint = null;
        } catch {}
      }
      const container = document.querySelector(".table__row-item.title.date");
      this.currentHint = new Hint(
        this.data.map((vacancy) => String(vacancy.date)),
        container
      );
      this.currentHint.setInitial(event.target.value);
      const result = await this.currentHint.open();
      if (result) {
        this.dateInput.value = result;
        this.callback();
      }
    };

    this.mobileInput.onfocus = async (event) => {
      if (this.currentHint) {
        try {
          // this.currentHint.close();
          this.currentHint = null;
        } catch {}
      }
      const container = document.querySelector(
        ".mobile-wrapper__input-vacancy-name"
      );
      this.currentHint = new Hint(
        this.data.map((vacancy) => String(vacancy.vacancyName)),
        container
      );
      this.currentHint.setInitial(event.target.value);
      const result = await this.currentHint.open();
      if (result) {
        this.mobileInput.value = result;
        this.callback();
      }
    };
    // this.mobileInput.oninput = (event) => {
    //   this.onInput();
    //   if (
    //     this.mobileInput.value &&
    //     !this.mobileInput.parentElement.querySelector(".litle-cross")
    //   ) {
    //     const cross = new Cross(
    //       this.mobileInput.parentElement,
    //       this.mobileInput
    //     );
    //     cross.setup();
    //   } else {
    //     this.mobileInput.parentElement.querySelector(".litle-cross")?.remove();
    //   }
    //   this.currentHint?.update(event.target.value);
    // };
    [
      this.mobileInput,
      this.idInput,
      this.vacancyNameInput,
      this.dateInput,
      this.sourceInput,
    ].forEach((input) => {
      input.oninput = (event) => {
        this.onInput();
        if (
          input.value &&
          !input.parentElement.querySelector(".litle-cross")
        ) {
          const cross = new Cross(
            input.parentElement,
            input
          );
          cross.setup();
        } else if (!input.value) {
          input.parentElement
            .querySelector(".litle-cross")
            ?.remove();
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
            .replace(/[^А-я0-9]/, "")
            .startsWith(filter[1].replace(/[^А-я0-9]/, "").toLowerCase());
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
