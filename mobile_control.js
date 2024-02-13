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

    const tabs = document.querySelectorAll(".mobile-control-wrapper__grid-nav");
    tabs.forEach((tab) => {
      tab.onclick = () => {
        tabs.forEach((tab) => {
          tab.classList.remove('mobile-control-wrapper__grid-nav_active')
        })
          tab.classList.add('mobile-control-wrapper__grid-nav_active')
          this.closeMenu()
      }
    });

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        controls.forEach((control) => {
          control.classList.remove(
            "mobile-control-wrapper__grid-control-wrapper_active"
          );
        });
        control.classList.add(
          "mobile-control-wrapper__grid-control-wrapper_active"
        );
      });
    });

    document.querySelector(".mobile-cocntrol-wrapper__go-back").onclick =
      () => {
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

class MobileControl {
  setup() {
    document.querySelector(".icon.burger").onclick = () => {
      const menu = document.querySelector("#mobile-menu-wrapper");
      console.log(menu.style.display);
      if (menu.classList.contains("mobile-menu-wrapper_active")) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    };
    window.addEventListener("resize", () => {
      console.log("resize");
      const menu = document.querySelector("#mobile-menu-wrapper");
      console.log(window.innerWidth);
      if (window.innerWidth <= 640) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else if (window.innerWidth >= 880) {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    });
  }
}
