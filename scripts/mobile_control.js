class MobileControlMini extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setup();
    }

    render() {
        this.innerHTML = `
            <style>
                @media (width <= 640px) {
                    div.mobile-control-wrapper__grid-nav-wrapper {
                        padding: 10px;
                        padding-top: 0;
                        display: grid;
                        grid-template-columns: 40px 1fr;
                        align-items: center;
                        height: 100%;
                        padding-bottom: 50px;
                        max-height: 600px;
                        box-sizing: border-box;
                    }
                    div.mobile-control-wrapper__grid-nav {
                        display: contents;
                        flex-direction: row;
                        gap: 10px;
                        font-size: 20px;
                        color: #414141;
                        cursor: pointer;
                    }
                    div.mobile-control-wrapper__grid-nav_active {
                        color: var(--yellow);
                        background-color: var(--blue);
                    }
                    .mobile-control-wrapper__grid-nav > span {
                        height: auto;
                        width: auto;
                        font-size: 22px;
                    }
                    .mobile-control-wrapper__grid-nav > p {
                        padding-left: 15px;
                    }
                    div.mobile-control-wrapper__grid {
                        z-index: 101;
                        display: flex;
                        height: 100dvh;
                        width: 100dvw;
                        position: absolute;
                        flex-direction: column;
                        justify-content: end;
                    }
                    div.mobile-control-wrapper__grid-control {
                        bottom: 0;
                        width: 100%;
                        gap: 5px;
                        padding: 10px;
                        padding-left: 0px;
                        padding-right: 0px;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        background-color: white;
                        border-top: 1px solid gray;
                    }
                    .mobile-control-wrapper__grid-control-wrapper {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        cursor: pointer;
                        color: #757575;
                    }
                    .more-button {
                        color: gray;
                    }
                    .mobile-control-wrapper__grid-control-wrapper > p {
                        font-size: 14px;
                        text-align: center;
                    }
                    .mobile-control-wrapper__grid-control-wrapper > span {
                        color: inherit;
                        font-size: 25px;
                    }
                    .mobile-control-wrapper__grid-control-wrapper_active {
                        color: var(--blue);
                    }
                    div.mobile-control-wrapper__grid-control-wrapper:hover {
                        color: var(--blue);
                    }
                    .mobile-control-wrapper__icon-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                        max-height: 40px;
                        box-sizing: border-box;
                        color: inherit;
                        background-color: inherit;
                        cursor: pointer;
                    }
                    .mobile-control__tab-name {
                        box-sizing: border-box;
                        background-color: inherit;
                        height: 100%;
                        max-height: 40px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        padding-left: 9px;
                    }
                    .mobile-control-wrapper__icon-wrapper > span {
                        color: inherit;
                    }
                    .medium-screen-size__table-name {
                        display: none;
                    }
                    .mobile-cocntrol-wrapper__go-back {
                        display: flex;
                        flex-direction: row;
                        color: #414141;
                        width: 100%;
                        margin-top: 20px;
                        font-size: 20px;
                        font-weight: bold;
                        gap: 15px;
                        align-items: center;
                    }
                    .mobile-cocntrol-wrapper__go-back > span.icon {
                        color: inherit;
                        cursor: pointer;
                        font-size: 18px;
                    }
                    .mobile-control__menu-button {
                        display: none;
                    }
                    .mobile-control-wrapper__grid-first-panel {
                        cursor: pointer;
                        font-size: 20px;
                        padding: 10px;
                        padding-left: 10px;
                        padding-top: 30px;
                        font-weight: bold;
                        height: fit-content;
                        display: flex;
                        flex-direction: row;
                        color: #414141;
                    }
                    .mobile-control-wrapper__grid-first-panel > span {
                        display: block;
                        color: inherit;
                        font-size: 30px;
                        font-weight: 400;
                        padding-left: 4px;
                        padding-right: 5px;
                    }
                    .mobile-control-wrapper__grid-first-panel > p {
                        padding-left: 10px;
                    }
                    .mobile-menu-mini {
                        display: none;
                        top: 0;
                        box-sizing: border-box;
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background-color: white;
                    }

                    .mobile-control.control {
                        display: none;
                    }
                }
                .mobile-control-wrapper__grid-nav_active {
                    color: var(--yellow);
                }
                .mobile-control-wrapper__grid {
                    display: none;
                }

                .mobile-control-wrapper__grid-nav-wrapper {
                    display: none;
                }
                .mobile-control-wrapper__grid-control {
                    display: none;
                }
                .mobile-control-wrapper__grid-control-wrapper > span.icon {
                    color: inherit;
                }

                .mobile-menu-mini-wrapper {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .mobile-menu-mini-wrapper_active {
                    display: flex;
                    height: 100%;
                }
                .mobile-control-wrapper__row {
                    display: flex;
                    flex-direction: row;
                }

                .mobile-control-wrapper__row.second {
                    display: none;
                }
            </style>
            <div class="mobile-menu-mini-wrapper">
                <div class="mobile-menu-mini">
                    <div class="mobile-control-wrapper__grid-first-panel">
                        <span class="icon"></span>
                        <p>Войти</p>
                    </div>
                    <div class="mobile-control-wrapper__grid-nav-wrapper">
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon too-big-icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Объявления</p>
                            </div>
                        </div>
                        <div
                            class="mobile-control-wrapper__grid-nav mobile-control-wrapper__grid-nav_active">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Вакансии</p>
                            </div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Соискатели</p>
                            </div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>E-mail рассылка</p>
                            </div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Отклики</p>
                            </div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name"><p>ФИО</p></div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Учебные заведения</p>
                            </div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon too-small-icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Адреса</p>
                            </div>
                        </div>
                        <div class="mobile-control-wrapper__grid-nav">
                            <div class="mobile-control-wrapper__icon-wrapper">
                                <span class="icon"></span>
                            </div>
                            <div class="mobile-control__tab-name">
                                <p>Компании</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mobile-control-wrapper__grid-down">
                    <div class="mobile-control-wrapper__grid-control">
                        <div class="mobile-control-wrapper__row">
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Интерфейс</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Соц. сети</p>
                            </div>
                            <div
                                class="mobile-control-wrapper__grid-control-wrapper mobile-control-wrapper__grid-control-wrapper_active journals">
                                <span class="icon"></span>
                                <p>Журнал</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Импорт</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more-button">
                                <span class="icon"></span>
                                <p>Еще</p>
                            </div>
                        </div>

                        <div class="mobile-control-wrapper__row second">
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Экспорт</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Пользователи</p>
                            </div>

                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>E-mail</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Ключи.Пароли</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Разное</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    openMenu() {
        const mobileMenu = document.querySelector(".mobile-menu-mini");
        const mobileMenuWrapper = document.querySelector(".mobile-menu-mini-wrapper");
        const mainContainer = document.querySelector(".main-container");
        mobileMenuWrapper.classList.add("mobile-menu-mini-wrapper_active");
        mobileMenu.style.setProperty("display", "flex");
        mainContainer.style.setProperty("display", "none");
    }

    closeMenu() {
        const mobileMenu = document.querySelector(".mobile-menu-mini");
        const mobileMenuWrapper = document.querySelector(".mobile-menu-mini-wrapper");
        const mainContainer = document.querySelector(".main-container");
        mobileMenuWrapper.classList.remove("mobile-menu-mini-wrapper_active");
        mobileMenu.style.setProperty("display", "none");
        mainContainer.style.setProperty("display", "flex");
    }

    openSecondRow() {
        const secondRow = document.querySelector(".mobile-control-wrapper__row.second");
        secondRow.style.display = "flex";
    }
    closeSecondRow() {
        const secondRow = document.querySelector(".mobile-control-wrapper__row.second");
        secondRow.style.display = "none";
    }

    setup() {
        document.querySelector(".mobile-control-wrapper__grid-control-wrapper.journals").onclick =
            () => {
                this.openMenu();
            };

        document.querySelectorAll(".mobile-control-wrapper__grid-nav").forEach(nav => {
            nav.onclick = () => {
                this.closeMenu();
            };
        });

        const controls = document.querySelectorAll(
            ".mobile-control-wrapper__grid-control-wrapper:not(.more-button)"
        );

        const tabs = document.querySelectorAll(".mobile-control-wrapper__grid-nav");
        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(tab => {
                    tab.classList.remove("mobile-control-wrapper__grid-nav_active");
                });
                tab.classList.add("mobile-control-wrapper__grid-nav_active");
                this.closeMenu();
            };
        });

        controls.forEach(control => {
            control.addEventListener("click", () => {
                controls.forEach(control => {
                    control.classList.remove("mobile-control-wrapper__grid-control-wrapper_active");
                });
                control.classList.add("mobile-control-wrapper__grid-control-wrapper_active");
            });
        });

        document.querySelector(".mobile-cocntrol-wrapper__go-back").onclick = () => {
            this.openMenu();
        };

        const more = document.querySelector(
            ".mobile-control-wrapper__grid-control-wrapper.more-button"
        );
        more.onclick = () => {
            if (more.querySelector("p").textContent == "Еще") {
                more.querySelector("p").textContent = "Меньше";
                this.openSecondRow();
            } else {
                more.querySelector("p").textContent = "Еще";
                this.closeSecondRow();
            }
        };
    }
}

customElements.define("mobile-ui", MobileControlMini);
