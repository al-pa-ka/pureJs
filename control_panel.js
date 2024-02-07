class ControlPanel {
  constructor(popupFactory, eventBus) {
    this.eventBus = eventBus;
    this.popupFactory = popupFactory;
    this.addNewOneButton = document.querySelector(".add-a-new-one");
    this.deselectButton = document.querySelector(".deselect");
    this.importButton = document.querySelector(".import-button");
    this.exportButton = document.querySelector(".export-button");
    this.deleteEverythingButton = document.querySelector(".delete-everything");
  }

  setup() {
    this.deleteEverythingButton.onclick = async () => {
      const deleteEverythingPopup = this.popupFactory.build(
        this.popupFactory.DELETE_EVERYTHING
      );
      const result = await deleteEverythingPopup.open();
      console.log(result)
      if (result == deleteEverythingPopup.DELETE) {
        console.log("noticed");
        this.eventBus.notice({}, "deleteEverything");
      }
    };

    this.addNewOneButton.onclick = async () => {
      const addNewVacancy = this.popupFactory.build(this.popupFactory.ADD_NEW);
      addNewVacancy.setEventBus(this.eventBus)
      const result = await addNewVacancy.open();
      if (result == addNewVacancy.ADD) {
        this.eventBus.notice(addNewVacancy.result, "addVacancy");
      }
    };

    this.importButton.onclick = async () => {
      const importVacancies = this.popupFactory.build(this.popupFactory.IMPORT)
      await importVacancies.open()
    }

    this.exportButton.onclick = async () => {
      const exportVacancies = this.popupFactory.build(this.popupFactory.EXPORT)
      await exportVacancies.open()
    }
  }
}
