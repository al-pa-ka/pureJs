class DeleteEverythingPopup extends BasePopup {
    DELETE = "delete";
    bodyMarkup = /*html*/ `
        <div class="delete-everething" style="display: flex; flex-direction: row; align-items: center; width: 100%;">
            <span class="icon attention"></span>
            <p style="padding-left: 10px;" class="popup__content-wrapper-text">Удалить ВСЕ объявления из БД</p>
        </div>
    `;
    footerMarkup = /*html*/ `
        <button class="btn accept red">Подтверждаю удаление</button>
        <button class="btn cancel gray">Отмена</button>
    `;
    title = "Удалить всё в данной таблице";


    setup() {
        super.setup();
        this.popup.querySelector(".accept").onclick = () => {
            this.close();
            this.resolve(this.DELETE);
        };
    }
}
