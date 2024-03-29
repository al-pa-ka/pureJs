class ExportVacancies extends BasePopup {
    bodyMarkup = /*html*/ `
        <p class="popup__content-wrapper-text">Название файла</p>
        <label class="pseudo-input">
            <span class="icon" style="color: gray; font-size: 20px"></span>
            <p style="width: 100%; outline: none; border: none; padding: 0; padding-left: 10px;" contenteditable="true" class="placeholder">
            Введите название файла
            </p>
        </label>
    `;
    footerMarkup = /*html*/ `
        <button class="btn accept blue inactive">Выгрузить</button>
        <button class="btn cancel gray">Отмена</button>
        <a class="download" href="./test.xlsx"></a>
    `;
    title = "Экспорт вакансий";

    setEventBus(eventBus) {
        this.eventBus = eventBus;
    }

    setContext(context) {
        this.context = context;
    }

    setup() {
        super.setup();
        const pseudoInput = document.querySelector(".placeholder");
        pseudoInput.onfocus = () => {
            const defaultValue = "Введите название файла";
            pseudoInput.textContent = pseudoInput.textContent.trim() == defaultValue ? "" : pseudoInput.textContent;
            pseudoInput.classList.remove("placeholder");
        };
        pseudoInput.onblur = () => {
            const defaultValue = "Введите название файла";
            if (pseudoInput.textContent != defaultValue) {
                pseudoInput.textContent = pseudoInput.textContent.endsWith(".xlsx") ? pseudoInput.textContent : pseudoInput.textContent + ".xlsx";
            }
            document.querySelector(".download").setAttribute("download", pseudoInput.textContent);
        };
        pseudoInput.oninput = () => {
            const button = document.querySelector(".btn.accept.blue");
            if (pseudoInput.textContent) {
                button.classList.remove("inactive");
            } else {
                button.classList.add("inactive");
            }
        };
        this.popup.querySelector(".accept").onclick = () => {
            if (this.popup.querySelector(".accept").classList.contains("inactive")) {
                return;
            }
            document.querySelector(".download").click();
            this.close();
            this.resolve(this.IMPORT);
        };
    }
}
