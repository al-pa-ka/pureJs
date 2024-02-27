
class Navbar extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setup();
    }
    render() {
        this.innerHTML = `
            <style>
                navbar-elem{
                    width: 100%;
                }
                #navbar {
                    display: grid;
                    width: 100%;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: 1fr 1.5fr;
                }
                .second-panel {
                    display: contents;
                }
                .second-panel__tab {
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    height: 60px;
                    box-sizing: border-box;
                    font-size: 18px;
                }
                .second-panel__tab > p {
                    font-size: inherit;
                }
                .second-panel .tab > span.icon {
                    font-size: 35px;
                }

                .second-panel .tab:hover > span.icon {
                    color: white;
                }
                .second-panel .tab:hover {
                    background-color: var(--blue);
                    color: white;
                }

                .second-panel .tab {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .third-panel__tab {
                    background-color: var(--blue);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                }
                .third-panel__tab-icon {
                    color: inherit;
                    font-size: 25px;
                }
                .third-panel__tab-text {
                    color: inherit;
                    font-size: inherit;
                    text-transform: uppercase;
                    text-align: center;
                }
                .panels {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .panels__panel {
                    padding: 0 20px 0 20px;
                    display: contents;
                    flex-direction: row;
                    width: 100%;
                }
                .panels__panel > div:first-child {
                    padding-left: 20px;
                }
                .panels__panel > div:last-child {
                    padding-right: 20px;
                }
                @media (width <= 880px) {
                    p.third-panel__tab-text{
                        font-size: 18px;
                    }
                    div#navbar {
                        display: none;
                        grid-template-rows: repeat(9, 1fr);
                        grid-auto-flow: column;
                        grid-template-columns: 1fr 1fr;
                        padding: 0;
                    }
                    .panels {
                        display: grid;
                        width: 100%;
                        grid-template-rows: 1fr;
                    }

                    .panels__panel > div:first-child {
                        padding: 0;
                    }
                    .second-panel__tab {
                        height: 50px;
                        background-color: white;
                        color: var(--blue);
                    }
                    .tab_active {
                        background-color: var(--blue);
                    }
                    .tab_active > p {
                        color: white;
                    }
                    .second-panel__tab > p {
                        font-size: 18px;
                        text-align: left;
                        width: 100%;
                        padding-left: 50px;
                    }
                    .third-panel__tab > * {
                        font-size: 18px;
                        color: inherit;
                        text-transform: capitalize;
                    }
                    .third-panel__tab-text {
                        padding-left: 15px;
                        width: fit-content;
                        text-align: end;
                        padding-right: 60px;
                    }
                    .third-panel__tab-icon.icon {
                        display: block;
                        font-size: 26px;
                    }
                    .third-panel__tab {
                        display: flex;
                        flex-direction: row;
                        justify-content: end;
                        color: white;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    div.control-panel {
                        margin-top: 20px;
                    }
                    .third-panel__content-wrapper {
                        background-color: white;
                    }
                }
                @media (width <= 1560px) {
                    .third-panel__tab {
                        flex: 1;
                        text-align: center;
                    }
                }
                @media (width <= 1250px) {
                    .second-panel__tab {
                        font-size: 16px;
                    }
                    .third-panel__tab-text {
                        font-size: 16px;
                    }
                }
                @media (width <= 1150px) {
                    .second-panel__tab {
                        font-size: 14px;
                    }
                    .third-panel__tab-text {
                        font-size: 14px;
                    }
                    .panels__panel > div:first-child {
                        padding-left: 5px;
                    }
                    .panels__panel > div:last-child {
                        padding-right: 5px;
                    }
                }
            </style>
            <div class="mobile-control__menu-button">
                <p>Меню</p>
                <span class="icon burger"></span>
            </div>
            <div id="navbar">
                <div class="second-panel panels__panel">
                    <div class="tab second-panel__tab" id="interface_tab">
                        <p>Интерфейс</p>
                    </div>
                    <div class="tab second-panel__tab" id="social_tab">
                        <p>Соц. сети</p>
                    </div>
                    <div class="tab second-panel__tab" id="journals_tab">
                        <p>Журналы</p>
                    </div>
                    <div class="tab second-panel__tab" id="import_tab">
                        <p>Импорт</p>
                    </div>
                    <div class="tab second-panel__tab" id="export_tab">
                        <p>Экспорт</p>
                    </div>

                    <div class="tab second-panel__tab" id="users_tab">
                        <p>Пользователи</p>
                    </div>
                    <div class="tab second-panel__tab" id="emails_tab">
                        <p>Email ящики</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Ключи.Пароли</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Разное</p>
                    </div>
                </div>
                <div class="third-panel journals panels__panel">
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon ads-icon in-panel"></span>
                        <p class="third-panel__tab-text">объявления</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon vacancies-icon in-panel"></span>
                        <p class="third-panel__tab-text">вакансии</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon offerors-icon in-panel"></span>
                        <p class="third-panel__tab-text">соискатели</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon email-icon in-panel"></span>
                        <p class="third-panel__tab-text">email рассылка</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon reply-icon in-panel"></span>
                        <p class="third-panel__tab-text">отклики</p>
                    </div>

                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon fio-icon in-panel"></span>
                        <p class="third-panel__tab-text">фио</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon stydies-icon in-panel"></span>
                        <p class="third-panel__tab-text">учебные заведения</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon addresses-icon in-panel"></span>
                        <p class="third-panel__tab-text">адреса</p>
                    </div>
                    <div class="third-panel__tab">
                        <span class="third-panel__tab-icon icon companies-icon in-panel"></span>
                        <p class="third-panel__tab-text">компании</p>
                    </div>
                </div>
            </div>
        `;
    }
    setup() {
        this.querySelectorAll(".second-panel__tab").forEach(el => {
            el.addEventListener("click", () => {
                el.classList.add("tab_active");
            });
            document.addEventListener("click", event => {
                const isAnotherTabClicked = Array.from(
                    document.querySelectorAll(".second-panel__tab")
                ).filter(el => {
                    return el.contains(event.target);
                }).length;

                if (!el.contains(event.target) && isAnotherTabClicked) {
                    el.classList.remove("tab_active");
                }
            });
        });

        this.querySelectorAll(".third-panel__tab").forEach((el, index) => {
            el.onclick = event => {
                this.querySelectorAll(".third-panel__tab").forEach(el => {
                    el.querySelector("span").style.setProperty("color", "white");
                    el.querySelector("p").style.setProperty("color", "white");
                });
                el.querySelector("span").style.setProperty("color", "#FFE200");
                el.querySelector("p").style.setProperty("color", "#FFE200");
            };
            if (index == 1) {
                el.querySelector("span").style.setProperty("color", "#FFE200");
                el.querySelector("p").style.setProperty("color", "#FFE200");
            }
        });
        document.querySelector(".icon.burger").onclick = () => {
            const menu = document.querySelector("#navbar");
            if (menu.classList.contains("mobile-menu-wrapper_active")) {
                menu.classList.remove("mobile-menu-wrapper_active");
            } else {
                menu.classList.add("mobile-menu-wrapper_active");
            }
        };
        window.addEventListener("resize", () => {
            const menu = document.querySelector("#navbar");
            if (window.innerWidth <= 640) {
                menu.classList.remove("mobile-menu-wrapper_active");
            } else if (window.innerWidth >= 880) {
                menu.classList.add("mobile-menu-wrapper_active");
            }
        });
    }
}

customElements.define("navbar-elem", Navbar);
