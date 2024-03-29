class EditVacancy extends BasePopup {
    ADD = "add";
    title = "Редактировать вакансию";
    footerMarkup = /*html*/ `
        <button class="btn accept blue">Сохранить изменения</button>
        <button class="btn cancel gray">Отмена</button>
    `;

    setEventBus(eventBus) {
        this.eventBus = eventBus;
    }

    setContext(context) {
        this.context = context;
    }

    formResult() {
        const vacancyName = this.popup.querySelector(".popup__content-input.vacancy").value;
        const frequency = this.popup.querySelector(".popup__content-input.frequency").value;
        this.context["vacancyName"] = vacancyName;
        this.context["frequency"] = frequency;
        return this.context;
    }

    buildBody(_) {
        return /*html*/ `
            <div class="popup__content">
                <div class="popup__content-wrapper">
                    <p style="width: 130px;" class="popup__content-wrapper-text">Название вакансии</p>
                    <input class="popup__content-input vacancy" value="${this.context.vacancyName}" type="text" />
                </div>
                <div class="popup__content-wrapper">
                    <p style="width: 130px;" class="popup__content-wrapper-text">Частота</p>
                    <input class="popup__content-input frequency" value="${this.context.frequency}" type="text" />
                </div>
                <p class="error-output"><span class="icon error-output"></span></p>
            </div>
        `;
    }

    setContext(context) {
        this.context = context;
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
