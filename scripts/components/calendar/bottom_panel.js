class BottomPanel extends HTMLElement {
    onApply = () => { }
    onCancel = () => { }

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
        const applyButton = createElement('button', { classes: [''], textContent: 'Применить' });
        const cancelButton = createElement('button', { classes: [''], textContent: 'Отменить' });
        this.classList.add('bottom-panel__container');
    }
}


