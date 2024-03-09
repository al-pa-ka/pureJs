class CancellablePromise extends Promise {
    constructor(executor) {
        let _reject;
        super((resolve, reject) => {
            executor(resolve, reject);
            _reject = reject;
        });
        this.reject = _reject;
    }
    cancel() {
        this.reject(new Error("canceled"));
    }
}
