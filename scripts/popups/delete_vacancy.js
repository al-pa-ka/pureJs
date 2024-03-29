class DeleteVacancy extends BasePopup {
    context;
    DELETE = "delete";
    footerMarkup = /*html*/ `
        <button class="btn accept red">Подтверждаю удаление</button>
        <button class="btn cancel gray">Отмена</button>
    `;
    title = "Удалить вакансию";

    setContext(context) {
        this.context = context;
        console.log("context");
        this.bodyMarkup = /*html*/ `
            <p class="popup__content-wrapper-text">
                <span class="icon" style="color: red;"></span> Вы собираетесь удалить вакансию id${this.context.id} - ${this.context.vacancyName}
            </p>
        `;
    }

    setup() {
        super.setup();
        this.popup.querySelector(".accept").onclick = () => {
            if (this.popup.querySelector(".accept").classList.contains("inactive")) {
                return;
            }
            this.close();
            this.resolve(this.DELETE);
        };
    }
}
