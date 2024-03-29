class AddVacancy extends DeleteEverythingPopup {
    ADD = "add";
    bodyMarkup = "";
    footerMarkup = /*html*/ `
        <button class="btn accept blue">Добавить</button>
        <button class="btn cancel gray">Отмена</button>
    `;
    title = "Добавить вакансию";

    setEventBus(eventBus) {
        this.eventBus = eventBus;
    }

    formResult() {
        const jsDate = new Date();
        const date = jsDate.toLocaleString().split(",")[0].replace(new RegExp(/\./, "g"), "/");
        const vacancyName = this.popup.querySelector(".popup__content-input.vacancy").value;
        const frequency = this.popup.querySelector(".popup__content-input.frequency").value;
        const source = "Published";
        return { date, vacancyName, source, frequency };
    }

    buildBody(_) {
        return /*html*/ `
            <div class="popup__content">
                <div class="popup__content-wrapper">
                    <p style="width: 130px;" class="popup__content-wrapper-text">Название вакансии</p>
                    <input class="popup__content-input vacancy" type="text" />
                </div>
                <div class="popup__content-wrapper">
                    <p style="width: 130px;" class="popup__content-wrapper-text">Частота</p>
                    <input class="popup__content-input frequency" type="text" />
                </div>
                <p class="error-output"><span class="icon error-output"></span></p>
            </div>
        `;
    }

    setup() {
        super.setup();
        this.popup.querySelector(".accept").onclick = () => {
            this.result = this.formResult();
            if (this.popup.querySelector(".accept").classList.contains("inactive")) {
                return;
            }
            this.close();
            this.resolve(this.ADD);
        };

        this.popup.querySelector(".popup__content-input").oninput = event => {
            const input = this.popup.querySelector(".popup__content-input");
            const value = input.value;
            input.value = value.charAt(0).toUpperCase() + value.slice(1);
            this.popup.querySelector(".error-output").textContent = "";
            this.popup.querySelector(".accept").classList.remove("inactive");
            this.eventBus.notice(
                {
                    data: this.popup.querySelector(".popup__content-input").value,
                    callback: context => {
                        this.popup
                            .querySelector(".error-output")
                            .insertAdjacentHTML(
                                "beforeend",
                                `<span class="icon" style="color: red;"></span> Уже есть в БД id ${context.id}, поэтому нельзя добавить в БД`
                            );
                        this.popup.querySelector(".accept").classList.add("inactive");
                    },
                },
                "vacancyNameInput"
            );
        };
    }
}
