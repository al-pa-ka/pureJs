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
      console.log('clicked')
      this.input.value = null;
      this.input.dispatchEvent(new Event('input', { bubbles: true }))
      this.close()
    };
  }
  close() {
    this.cross.remove();
  }
}
