class ImportVacancies extends DeleteEverythingPopup {
    IMPORT = "import";
    bodyMarkup = /*html*/ `
        <p class="popup__content-wrapper-text">Название файла</p>
        <label class="pseudo-input">
            <span class="icon" style="color: gray; font-size: 20px"></span>
            <p class="placeholder">Выберите файл</p>
            <p class="filename"></p>
            <input accept=".xlsx" style="display: none" type="file" />
        </label>
    `;
    footerMarkup = /*html*/ `
        <button class="btn accept blue">Загрузить</button>
        <button class="btn cancel gray">Отмена</button>
    `;
    title = "Импорт вакансий";
    setEventBus(eventBus) {
        this.eventBus = eventBus;
    }

    setContext(context) {
        this.context = context;
    }

    setContext(context) {
        this.context = context;
    }

    setup() {
        super.setup();
        this.popup.querySelector(".accept").onclick = () => {
            if (this.popup.querySelector(".accept").classList.contains("inactive")) {
                return;
            }
            this.result = document.querySelector(".pseudo-input>input").files[0];
            this.close();
            this.resolve(this.IMPORT);
        };
        const fileInput = document.querySelector(".pseudo-input>input");
        fileInput.onchange = () => {
            document.querySelector(".placeholder").textContent = "";
            document.querySelector(".filename").textContent = fileInput.files[0].name;
        };
    }
}
