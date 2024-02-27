class Paginator extends HTMLElement {
    constructor() {
        super();
        this.currentPage = 1;
        this.numberOfPages = 1;
        this.callback = () => {};
        // this.pagination = (items) => {

        // }
    }
    connectedCallback() {
        this.paginateAlias = this.paginate
        this.render();
    }
    render() {
        const styles = `
            <style>
                @media (width <= 750px) {
                    pagination-control {
                        display: none;
                    }
                }
                @media (width <= 880px) {
                    div.pagination {
                        display: flex;
                        margin-top: 20px;
                    }
                    .pagination__page-number {
                        width: 50px;
                        height: 50px;
                    }
                    .control-panel {
                        width: 100%;
                    }
                    div.pagination__specify-page {
                        display: none;
                    }
                    .pagination__specify-page > input {
                        width: 50px;
                        height: 45px;
                    }
                    .pagination__pages-control {
                        width: 100%;
                        justify-content: center;
                        gap: 10px;
                    }
                    .pagination__specify-page-text {
                        display: none;
                    }
                    .pagination__go-button {
                        width: 50px;
                        height: 45px;
                    }
                }
                pagination-control {
                    width: 100%;
                }
                .pagination__specify-page > input {
                    box-sizing: border-box;
                    width: 76px;
                    height: 100%;
                    outline: none;
                    border: 2px solid lightgray;
                    font-size: 15px;
                    padding: 10px;
                    color: #414141;
                }
                .pagination__pages-control {
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                }
                .pagination {
                    width: 100%;
                    margin-top: 70px;
                    height: 50px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .pagination__specify-page {
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 20px;
                }
                .pagination__page-number {
                    box-sizing: border-box;
                    width: 50px;
                    height: 50px;
                    box-sizing: border-box;
                    border: 2px solid var(--blue);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: 0.5s;
                }
                .pagination__page-number.active {
                    background-color: var(--blue);
                    color: var(--yellow);
                }
                .pagination__page-number > * {
                    cursor: pointer;
                }
                .pagination__page-number.inactive {
                    border: 2px solid lightgray;
                    color: lightgray;
                    cursor: default;
                }
                .pagination__page-number.inactive > span.icon {
                    color: lightgray;
                    cursor: default;
                }
                .pagination__page-number.inactive:hover {
                    color: lightgray;
                    border: 2px solid lightgray;
                    background: none;
                    cursor: default;
                }
                .pagination__page-number.inactive:hover > span.icon {
                    color: lightgray;
                    cursor: default;
                }
                .pagination__page-number.inactive:hover > p {
                    cursor: default;
                }
                .page-control-element > p {
                    cursor: pointer;
                }
                .page-control-element > span.icon {
                    cursor: pointer;
                    color: var(--blue);
                    transition: 0.5s;
                }
                .page-control-element:hover > span.icon {
                    transition: 0.5s;
                    color: white;
                }
                .pagination__page-number:hover {
                    background-color: var(--blue);
                    color: white;
                    transition: 0.5s;
                }
                .pagination__go-button {
                    box-sizing: border-box;
                    border: 2px solid var(--blue);
                    color: var(--blue);
                    width: 76px;
                    height: 50px;
                    font-size: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                .pagination__go-button.inactive {
                    border-color: lightgray;
                    color: lightgray;
                    cursor: default;
                }
            </style>
        `;
        this.innerHTML =
            `
                <div class="pagination">
                    <div class="pagination__specify-page">
                        <p class="pagination__specify-page-text">Укажите страницу</p>
                        <input type="text" />
                        <div class="pagination__go-button inactive">Go</div>
                    </div>
                    <div class="pagination__pages-control">
                        <div class="pagination__page-number page-control-element">
                            <span class="icon"></span>
                        </div>
                        <div class="pagination__page-number page-control-element">
                            <p>First</p>
                        </div>
                        <div class="pagination__page-number page-control-element">
                            <p>Last</p>
                        </div>
                        <div class="pagination__page-number page-control-element">
                            <span class="icon"></span>
                        </div>
                    </div>
                </div>
            ` + styles;
    }
    setPageChangedCallback(callable) {
        this.callback = callable;
    }
    onCurrentPageChanged() {
        this.callback();
        this.setClassToCurrentPage(this.currentPage);
        this.setStateToControl(this.numberOfPages);
    }
    deleteLastPages() {
        document.querySelectorAll(".pagination").forEach(el => {
            el.querySelectorAll(".pagination__page-number").forEach(el => {
                if (!el.classList.contains("page-control-element")) {
                    el.remove();
                }
            });
        });
    }
    setStateToControl(numberOfPages) {
        document.querySelectorAll(".pagination").forEach(el => {
            const controlElements = el.querySelectorAll(
                ".pagination__page-number.page-control-element"
            );
            if (this.currentPage > 1) {
                Array.from(controlElements)
                    .slice(0, 2)
                    .forEach(el => {
                        el.classList.remove("inactive");
                    });
            } else {
                Array.from(controlElements)
                    .slice(0, 2)
                    .forEach(el => {
                        el.classList.add("inactive");
                    });
            }
            if (this.currentPage == this.numberOfPages) {
                Array.from(controlElements)
                    .slice(2, 4)
                    .forEach(el => {
                        el.classList.add("inactive");
                    });
            } else {
                Array.from(controlElements)
                    .slice(2, 4)
                    .forEach(el => {
                        el.classList.remove("inactive");
                    });
            }
        });
    }
    drawPages(numberOfPages) {
        const pagesControlContainer = document.querySelector(".pagination__pages-control");
        const containerWidth = pagesControlContainer;
        const numberOfPagesToDraw = document.querySelectorAll(".pagination").forEach(el => {
            for (let index of Array.from(Array(numberOfPages).keys()).reverse()) {
                el.querySelectorAll(
                    ".pagination__page-number.page-control-element"
                )[1].insertAdjacentHTML(
                    "afterend",
                    `<div class="pagination__page-number"><p>${Number(index) + 1}</p></div>`
                );
            }
        });
    }
    redrawControlPanel(numberOfPages) {
        this.deleteLastPages();
        this.setStateToControl(numberOfPages);
        this.drawPages(numberOfPages);
        this.redrawPageInput();
        this.setupControl();
    }

    redrawPageInput() {
        const specifyPage = document.querySelectorAll(".pagination__specify-page");
        specifyPage.forEach(el => {
            const specifyPageInput = el.querySelector("input");
            specifyPageInput.dispatchEvent(new Event("input", {}));
        });
    }

    setupPageInput() {
        const specifyPage = document.querySelectorAll(".pagination__specify-page");
        specifyPage.forEach(el => {
            const specifyPageInput = el.querySelector("input");
            const specifyPageGoButton = el.querySelector(".pagination__go-button");
            specifyPageGoButton.onclick = () => {
                if (specifyPageGoButton.classList.contains("inactive")) {
                    return;
                } else {
                    this.currentPage = Number(specifyPageInput.value);
                    this.onCurrentPageChanged();
                }
            };

            specifyPageInput.oninput = () => {
                const convertedUserInput = Number(specifyPageInput.value);
                if (
                    !isNaN(convertedUserInput) &&
                    convertedUserInput >= 1 &&
                    convertedUserInput <= this.numberOfPages
                ) {
                    specifyPageGoButton.classList.remove("inactive");
                } else {
                    specifyPageGoButton.classList.add("inactive");
                }
            };
        });
    }

    setupControl() {
        this.setupPageInput();
        document.querySelectorAll(".pagination").forEach(paginationElement => {
            const prev = 0,
                first = 1,
                last = 2,
                next = 3;
            const controlElements = paginationElement.querySelectorAll(
                ".pagination__page-number.page-control-element"
            );
            controlElements[prev].onclick = () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.onCurrentPageChanged();
                }
            };
            controlElements[first].onclick = () => {
                this.currentPage = 1;
                this.onCurrentPageChanged();
            };
            controlElements[last].onclick = () => {
                console.log(this.numberOfPages);
                this.currentPage = this.numberOfPages;
                this.onCurrentPageChanged();
            };
            controlElements[next].onclick = () => {
                if (this.currentPage + 1 <= this.numberOfPages) {
                    this.currentPage++;
                    this.onCurrentPageChanged();
                }
            };
            const pageNumbers = paginationElement.querySelectorAll(
                ".pagination__page-number:not(.page-control-element)"
            );
            pageNumbers.forEach(pageNumber => {
                pageNumber.onclick = event => {
                    this.currentPage = Number(event.target.textContent);
                    this.onCurrentPageChanged();
                };
            });
        });

        this.setClassToCurrentPage(this.currentPage);
    }

    setClassToCurrentPage(pageNumber) {
        document.querySelectorAll(".pagination__page-number").forEach(el => {
            if (Number(el.textContent) == pageNumber) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    }
    paginateContent(itemsArray) {
        const itemsInPage = 500;
        const pages = [];
        for (let i = 0; i < itemsArray.length; i += itemsInPage) {
            const page = itemsArray.slice(i, i + itemsInPage);
            pages.push(page);
        }
        if (pages.length == 0) {
            pages.push([]);
        }
        this.currentPage = pages.length > this.currentPage ? this.currentPage : pages.length;

        this.numberOfPages = pages.length;
        return pages;
    }
}

customElements.define("pagination-control", Paginator);
