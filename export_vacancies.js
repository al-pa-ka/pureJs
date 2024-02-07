class ExportVacancies extends DeleteEverythingPopup {
  constructor() {
    super();
    this.IMPORT = "import";
    this.CANCEL = "cancel";
    this.resolve = null;
    this.result = null;
    this.eventBus = null;
  }

  setEventBus(eventBus) {
    this.eventBus = eventBus;
  }

  setContext(context) {
    this.context = context;
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
                          <p class="popup__title-text">Экспорт вакансий</p>
                      </div>
                      <div class="popup__content">
                          <div class="popup__content-wrapper">
                          <p class="popup__content-wrapper-text">Название файла</p>
                          <label class="pseudo-input" >
                                  <span class="icon" style="color: gray; font-size: 20px"></span>
                                  <p style="width: 100%; height: 100%; outline: none; border: none; padding: 0; padding-left: 10px;"
                                   contenteditable="true" class="placeholder ">Введите название файла</p>
                          </label>
                          </div>
                          <p class="error-output"><span class="icon error-output"></span></p>
                      </div>
                      <div class="popup__footer">
                          <a class="download" href="./test.xlsx"><button class="btn accept blue">Выгрузить</button></a>
                          <button class="btn cancel gray">Отмена</button>
                      </div>
                      <span class="icon cross"></span>
                  </div>
              </div>
            `
    );
    const pseudoInput = document.querySelector(".placeholder");
    pseudoInput.onfocus = () => {
      const defaultValue = "Введите название файла";
      console.log("focused");
      pseudoInput.textContent =
        pseudoInput.textContent == defaultValue ? "" : pseudoInput.textContent;
      pseudoInput.classList.remove("placeholder");
    };
    pseudoInput.onblur = () => {
      const defaultValue = "Введите название файла";
      if (pseudoInput.textContent != defaultValue) {
        pseudoInput.textContent = pseudoInput.textContent.endsWith(".xlsx")
          ? pseudoInput.textContent
          : pseudoInput.textContent + ".xlsx";
      }
      document.querySelector('.download').setAttribute('download', pseudoInput.textContent)
    };
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
      if (this.popup.querySelector(".accept").classList.contains("inactive")) {
        return;
      }
      this.close();
      this.resolve(this.IMPORT);
    };
  }
}
