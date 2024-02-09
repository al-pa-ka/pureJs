class Hint {
  constructor(data, container, eventBus) {
    this.data = data;
    this.dimmer = null;
    this.search = "";
    this.eventBus = eventBus;
    this.container = container;
    this.firstClick = true;
  }

  update(searchString) {
    this.search = searchString;
    this.redraw();
    this.setup();
  }

  setup() {
    const hint = document.querySelector(".hint");
    const rows = hint?.querySelectorAll(".hint__row");

    if (this.dimmer) {
      this.dimmer.onclick = () => {
        this.close();
      };
    }

    rows?.forEach((row) => {
      row.onclick = () => {
        this.resolve(row.textContent);
        this.close();
      };
    });
    document.body.onclick = (event) => {
      if (this.firstClick) {
        this.firstClick = false;
        return;
      }
      if (!hint.contains(event.target)) {
        this.resolve(null);
        this.close();
      }
    };
  }

  setInitial(searchString) {
    this.search = searchString;
  }

  clear() {
    this.dimmer?.remove();
    document.querySelector(".hint")?.remove();
  }

  close() {
    const hint = document.querySelector(".hint");
    hint?.remove();
    this.dimmer?.remove();
  }

  redraw() {
    this.clear();
    this.insert();
  }

  filterData() {
    return [
      ...new Set(
        this.data.filter((row) => {
          return row.toLowerCase().startsWith(this.search.toLowerCase());
        })
      ),
    ].slice(0, 14);
  }

  insert() {
    if (this.search != "") {
      this.dimmer = document.createElement("div");
      this.dimmer.classList.add("dimmer");
      document.body.insertAdjacentElement("beforebegin", this.dimmer);

      const hint = document.createElement("div");
      hint.classList.add("hint");
      let markup = "";
      this.filterData().forEach((row) => {
        const match = this.search.toLowerCase();

        markup += `<p class='hint__row'><span style="color: #40C4E2;">${
          match.charAt(0).toUpperCase() + match.slice(1)
        }</span>${row.toLowerCase().replace(match, "")}</p>`;
      });
      hint.insertAdjacentHTML("beforeend", markup);
      this.container.insertAdjacentElement("beforeend", hint);
    }
  }

  async open() {
    this.insert();
    this.setup();
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
}
