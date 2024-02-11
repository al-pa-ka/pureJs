class MobileControlMini {
  constructor() {}

  openMenu() {
    const mobileMenu = document.querySelector(".mobile-menu-mini");
    mobileMenu.style.setProperty("display", "flex");
  }

  closeMenu() {
    const mobileMenu = document.querySelector(".mobile-menu-mini");
    mobileMenu.style.setProperty("display", "none");
  }

  openSecondRow() {
    const secondRow = document.querySelector(
      ".mobile-control-wrapper__row.second"
    );
    secondRow.style.display = "flex";
  }
  closeSecondRow() {
    const secondRow = document.querySelector(
      ".mobile-control-wrapper__row.second"
    );
    secondRow.style.display = "none";
  }

  setup() {
    document.querySelector(
      ".mobile-control-wrapper__grid-control-wrapper.journals"
    ).onclick = () => {
      this.openMenu();
    };

    document
      .querySelectorAll(".mobile-control-wrapper__grid-nav")
      .forEach((nav) => {
        nav.onclick = () => {
          this.closeMenu();
        };
      });

    const controls = document.querySelectorAll(
      ".mobile-control-wrapper__grid-control-wrapper:not(.more-button)"
    );

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        controls.forEach((control) => {
          control.style.color = "#202020";
        });
        control.style.color = "#00B0D9";
      });
    });

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

class MobileControl {
  setup() {
    document.querySelector(".icon.burger").onclick = () => {
      const menu = document.querySelector("#mobile-menu-wrapper");
      console.log(menu.style.display)
      if (menu.style.display == "none") {
        menu.style.setProperty("display", "grid");
      } else {
        menu.style.setProperty("display", "none");
      }
    };
  }
}
