class BottomPanel extends HTMLElement {
    onApply = () => { }
    onCancel = () => { }
    cancelButton = createElement('button', { classes: [''], textContent: 'Отменить' });
    applyButton = createElement('button', { classes: [''], textContent: 'Применить' });

    style = `
        <style>
            .bottom-panel__container{
                display: flex;
                justify-content: end;
                padding: 30px;

            }
            .bottom-panel__button{
                height: 25px;
            }
            .bottom-panel__apply-button{}
            .bottom-panel__apply-button_inactive{}
            .bottom-panel__cancel-button{}
        </style>
    `

    setOnApply(callback) {
        this.onApply = callback;
    }
    setOnCancel(callback) {
        this.onCancel = callback;
    }
    setActive() { }
    setInactive() { }
    render() {
        this.classList.add('bottom-panel__container');
        this.append(this.cancelButton, this.applyButton)
    }
}


