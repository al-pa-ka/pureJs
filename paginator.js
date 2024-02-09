class Paginator {
  constructor() {
    this.currentPage = 1;
    this.numberOfPages = 1;
    this.callback = () => {};
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
    document.querySelectorAll(".pagination").forEach((el) => {
      el.querySelectorAll(".pagination__page-number").forEach((el) => {
        if (!el.classList.contains("page-control-element")) {
          el.remove();
        }
      });
    });
  }
  setStateToControl(numberOfPages) {
    document.querySelectorAll(".pagination").forEach((el) => {
      const controlElements = el.querySelectorAll(
        ".pagination__page-number.page-control-element"
      );
      if (this.currentPage > 1) {
        Array.from(controlElements)
          .slice(0, 2)
          .forEach((el) => {
            el.classList.remove("inactive");
          });
      } else {
        Array.from(controlElements)
          .slice(0, 2)
          .forEach((el) => {
            el.classList.add("inactive");
          });
      }
      if (this.currentPage == this.numberOfPages) {
        Array.from(controlElements)
          .slice(2, 4)
          .forEach((el) => {
            el.classList.add("inactive");
          });
      } else {
        Array.from(controlElements)
          .slice(2, 4)
          .forEach((el) => {
            el.classList.remove("inactive");
          });
      }
    });
  }
  drawPages(numberOfPages) {
    const pagesControlContainer = document.querySelector(
      ".pagination__pages-control"
    );
    const containerWidth = pagesControlContainer;
    const numberOfPagesToDraw = document
      .querySelectorAll(".pagination")
      .forEach((el) => {
        for (let index of Array.from(Array(numberOfPages).keys()).reverse()) {
          console.log(index);
          el.querySelectorAll(
            ".pagination__page-number.page-control-element"
          )[1].insertAdjacentHTML(
            "afterend",
            `<div class="pagination__page-number"><p>${
              Number(index) + 1
            }</p></div>`
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
    specifyPage.forEach((el) => {
      const specifyPageInput = el.querySelector("input");
      specifyPageInput.dispatchEvent(new Event("input", {}));
    });
  }

  setupPageInput() {
    const specifyPage = document.querySelectorAll(".pagination__specify-page");
    specifyPage.forEach((el) => {
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
    document.querySelectorAll(".pagination").forEach((paginationElement) => {
      const prev = 0,
        first = 1,
        next = 2,
        last = 3;
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
      controlElements[next].onclick = () => {
        if (this.currentPage + 1 <= this.numberOfPages) {
          this.currentPage++;
          this.onCurrentPageChanged();
        }
      };
      controlElements[last].onclick = () => {
        if (this.currentPage + 1 <= this.numberOfPages) {
          this.currentPage++;
          this.onCurrentPageChanged();
        }
      };
      const pageNumbers = paginationElement.querySelectorAll(
        ".pagination__page-number:not(.page-control-element)"
      );
      pageNumbers.forEach((pageNumber) => {
        pageNumber.onclick = (event) => {
          this.currentPage = Number(event.target.textContent);
          console.log(this.currentPage);
          this.onCurrentPageChanged();
        };
      });
    });

    this.setClassToCurrentPage(this.currentPage);
  }

  setClassToCurrentPage(pageNumber) {
    document.querySelectorAll(".pagination__page-number").forEach((el) => {
      if (Number(el.textContent) == pageNumber) {
        console.log("=");
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
    this.currentPage =
      pages.length > this.currentPage ? this.currentPage : pages.length;

    this.numberOfPages = pages.length;
    return pages;
  }
}
