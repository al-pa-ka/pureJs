class Hint {
  constructor(data, container, eventBus) {
    this.data = data;
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
    console.log('setup')
    const hint = document.querySelector(".hint");
    const rows = hint.querySelectorAll(".hint__row");
    rows.forEach((row) => {
      row.onclick = () => {
        this.resolve(row.textContent)
        this.close()
      };
    });
    document.body.onclick = (event) => {
        if (this.firstClick){
            this.firstClick = false
            return
        }
        if (!hint.contains(event.target)){
            this.resolve(null)
            this.close()
        }
    }
  }

  setInitial(searchString){
    this.search = searchString
  }

  clear() {
    document.querySelector(".hint").remove();
  }

  close() {
    const hint = document.querySelector(".hint");
    hint?.remove();
    this.resolve(null)
  }

  redraw() {
    this.clear();
    this.insert(this.container);
  }

  filterData() {
    return [
      ...new Set(
        this.data.filter((row) => {
          return row.startsWith(this.search);
        })
      ),
    ].slice(0, 14);
  }

  insert() {
    const hint = document.createElement("div");
    hint.classList.add("hint");
    let markup = "";
    this.filterData().forEach((row) => {
      markup += `<p class='hint__row'>${row}</p>`;
    });
    console.log(markup);
    hint.insertAdjacentHTML("beforeend", markup);
    this.container.insertAdjacentElement("beforeend", hint);
  }

  async open() {
    this.insert();
    this.setup();
    return new Promise((resolve) => {
        this.resolve = resolve
    })
  }
}
