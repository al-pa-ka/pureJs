class Cross {
  constructor(container, input) {
    /** @type {HTMLDivElement}**/
    this.container = container;
    this.input = input;
    this.cross = null;
  }

  draw() {
    this.cross = document.createElement("span");
    this.cross.classList.add("litle-cross", "icon");
    this.cross.textContent = "";
    this.container.insertAdjacentElement('beforeend',this.cross);
  }
  setup() {
    this.draw();
    this.cross.onclick = () => {
      this.input.value = "";
      this.close()
      this.input.dispatchEvent(new Event('input', { bubbles: true }))
    };
  }
  close() {
    this.cross.remove();
  }
}
