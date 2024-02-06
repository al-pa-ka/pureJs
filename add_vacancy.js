class AddVacancy extends DeleteEverythingPopup {
  constructor() {
    super();
    this.ADD = "add";
    this.CANCEL = "cancel";
    this.resolve = null;
    this.result = null;
    this.eventBus = null;
  }

  setEventBus(eventBus) {
    console.log("eventBusSetted");
    console.log(eventBus);
    this.eventBus = eventBus;
  }

  formResult() {
    const jsDate = new Date();
    const date = jsDate
      .toLocaleString()
      .split(",")[0]
      .replace(new RegExp(/\./, "g"), "/");
    const vacancyName = this.popup.querySelector(".popup__content-input").value;
    const source = "Published";
    return { date, vacancyName, source };
  }

  insert() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="popup-wrapper">
      <div class="popup">
        <div class="popup__mobile-control">
          <span class="icon cross"></span>
        </div>
        <div class="popup__title">
          <p class="popup__title-text">Добавить название вакансии</p>
        </div>
        <div class="popup__content">
          <div class="popup__content-wrapper">
            <p class="popup__content-wrapper-text">
              Название вакансии
            </p>
            <input class="popup__content-input" type="text">
          </div>
          <p class="error-output"><span class="icon error-output"></span></p>
        </div>
        <div class="popup__footer">
          <button class="btn accept blue">Добавить</button>
          <button class="btn cancel gray">Отмена</button>
        </div>
        <span class="icon cross"></span>
      </div>
    </div>
      `
    );
  }

  setup() {
    this.popup = document.querySelector(".popup-wrapper");
    this.popup.querySelectorAll(".cross").forEach((cross) => {
      cross.onclick = () => {
        this.close();
        this.resolve(this.CANCEL);
      };
    });
    this.popup.querySelector(".cancel").onclick = () => {
      this.close();
      this.resolve(this.CANCEL);
    };
    this.popup.querySelector(".accept").onclick = () => {
      this.result = this.formResult();
      if (this.popup.querySelector(".accept").classList.contains('inactive')) {
        return
      }
      this.close();
      this.resolve(this.ADD);
    };

    this.popup.querySelector(".popup__content-input").oninput = (event) => {
      this.popup.querySelector(".error-output").textContent = "";
      this.popup.querySelector('.accept').classList.remove('inactive')
      this.eventBus.notice(
        {
          data: this.popup.querySelector(".popup__content-input").value,
          callback: () => {
            this.popup
              .querySelector(".error-output")
              .insertAdjacentHTML(
                "beforeend",
                `<span class="icon" style="color: red;"></span> Уже есть в БД вакансия с таким названием`
              );
            this.popup.querySelector('.accept').classList.add('inactive')
          },
        },
        "vacancyNameInput"
      );
    };
  }
}
