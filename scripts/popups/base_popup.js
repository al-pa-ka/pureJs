class BasePopup {
    title;
    bodyMarkup;
    footerMarkup;
    resolve;
    CANCEL = "cancel";

    buildFooter(markup) {
        return /*html*/ `
            <div class="popup__footer">
                    ${markup}
            </div>
        `;
    }
    buildDimmerWrapper(markup) {
        return /*html*/ `
            <div class="popup-wrapper">
                <div class="popup">${markup}</div>
            </div> 
        `;
    }
    buildBody(markup) {
        return /*html*/ `
            <div class="popup__content">
                <div class="popup__content-wrapper">
                    ${markup}
                </div>
            </div>
        `;
    }
    buildPopupTitle(markup) {
        return /*html*/ `
            <div class="popup__mobile-control">
                <span class="icon cross"></span>
            </div>
            <div class="popup__title">
                <p class="popup__title-text">${markup}</p>
            </div>
            <span class="icon cross"></span>
        `;
    }

    insert() {
        const markup = this.buildDimmerWrapper(
            this.buildPopupTitle(this.title) + this.buildBody(this.bodyMarkup) + this.buildFooter(this.footerMarkup)
        );
        document.body.insertAdjacentHTML("beforeend", markup);
    }

    setup() {
        this.popup = document.querySelector(".popup-wrapper");
        this.popup.querySelectorAll(".cross").forEach(cross => {
            cross.onclick = () => {
                this.close();
                this.resolve(this.CANCEL);
            };
        });
        this.popup.querySelector(".cancel").onclick = () => {
            this.close();
            this.resolve(this.CANCEL);
        };
    }

    close() {
        this.popup.remove();
    }

    async open() {
        return new Promise(resolve => {
            this.resolve = resolve;
            this.insert();
            this.setup();
        });
    }
}
