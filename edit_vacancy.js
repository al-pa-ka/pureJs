class EditVacancy extends DeleteEverythingPopup {
  constructor() {
    super();
    this.ADD = "add";
    this.CANCEL = "cancel";
    this.resolve = null;
    this.result = null;
    this.eventBus = null;
    this.context = null;
  }

  setEventBus(eventBus) {
    console.log("eventBusSetted");
    console.log(eventBus);
    this.eventBus = eventBus;
  }

  setContext(context){
    this.context = context
  }

  formResult() {
    const vacancyName = this.popup.querySelector(".popup__content-input").value;
    this.context['vacancyName'] = vacancyName
    return this.context;
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
            <p class="popup__title-text">Изменить название вакансии</p>
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
            <button class="btn accept blue">Сохранить изменения</button>
            <button class="btn cancel gray">Отмена</button>
          </div>
          <span class="icon cross"></span>
        </div>
      </div>
        `
    );
    document.querySelector('.popup__content-input').value = this.context.vacancyName
  }

  setContext(context) {
    this.context = context;
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
      if (this.popup.querySelector(".accept").classList.contains("inactive")) {
        return;
      }
      this.close();
      this.resolve(this.ADD);
    };

    this.popup.querySelector(".popup__content-input").oninput = (event) => {
      this.popup.querySelector(".error-output").textContent = "";
      this.popup.querySelector(".accept").classList.remove("inactive");
      this.eventBus.notice(
        {
          data: this.popup.querySelector(".popup__content-input").value,
          callback: (context) => {
            this.popup
              .querySelector(".error-output")
              .insertAdjacentHTML(
                "beforeend",
                `<span class="icon" style="color: red;"></span> Уже есть в БД id${context.id}, поэтому нельзя изменить`
              );
            this.popup.querySelector(".accept").classList.add("inactive");
          },
        },
        "vacancyNameInput"
      );
    };
  }
}
