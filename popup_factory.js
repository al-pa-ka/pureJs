

class PopupFactory{
    constructor() {
        this.DELETE_EVERYTHING = 'delete_everething'
        this.ADD_NEW = 'add_new'
    }

    build(popupName) {
        if (popupName == this.DELETE_EVERYTHING) {
            return new DeleteEverythingPopup()
        } else if (popupName == this.ADD_NEW) {
            return new AddVacancy()
        }
    }
}