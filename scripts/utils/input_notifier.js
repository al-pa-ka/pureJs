
class InputNotifier {
    constructor() {
        this.value = ''
        this.subs = []
    }

    setEventListener(_, subscriber) {
        this.subs.push(subscriber)
    }

    onchange() {
        this.subs.forEach(sub => {
            sub()
        })
    }

}