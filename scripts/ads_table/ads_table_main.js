const eventBus = new EventBus();
eventBus.addEvent("deleteEverything");
eventBus.addEvent("dateSetted");
eventBus.addEvent("totalRows");
eventBus.addEvent("deselect");

const paginator = document.querySelector("pagination-control");

const container = document.querySelector(".content-wrapper");

const adsTable = new AdsTable(paginator, eventBus);
const adsTableController = adsTable.controller;

container.insertAdjacentElement("beforeend", adsTable);

const addNewOneButton = document.querySelector(".add-a-new-one");
const deselectButton = document.querySelector(".deselect");
const importButton = document.querySelector(".import-button");
const exportButton = document.querySelector(".export-button");
const inTotal = document.querySelector(".in-total");
const deleteEverythingButton = document.querySelector(".delete-everything");

deselectButton.onclick = () => {
    console.log("deselect");
    eventBus.notice({}, "deselect");
};

importButton.onclick = () => {
    const importPopup = document.createElement("import-ads");
    document.body.appendChild(importPopup);
};

exportButton.onclick = () => {
    const exportButton = document.createElement("export-ads");
    document.body.appendChild(exportButton);
};

deleteEverythingButton.onclick = async () => {
    const result = await new DeleteEverythingPopup().open();
    if (result == "delete") {
        adsTableController.deleteEverything();
    }
};

eventBus.addSubscriber(() => {
    console.log("deleteEverything");
    adsTableController.deleteEverything();
}, "deleteEverything");

eventBus.addSubscriber(event => {
    inTotal.querySelector("span.green").textContent = event.totalRows;
}, "totalRows");
