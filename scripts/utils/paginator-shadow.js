class PaginatorShadow {
    constructor(firstPaginator, secondPaginator) {
        this.firstPaginator = firstPaginator;
        this.secondPaginator = secondPaginator;
    }
    paginateContent(data) {
        this.secondPaginator.paginateContent(data);
        return this.firstPaginator.paginateContent(data);
    }
    setPageChangedCallback(callback) {
        this.firstPaginator.setPageChangedCallback(() => {
            callback();
            this.secondPaginator.currentPage = this.firstPaginator.currentPage;
            this.secondPaginator.update();
        });
        this.secondPaginator.setPageChangedCallback(() => {
            callback();
            this.firstPaginator.currentPage = this.secondPaginator.currentPage;
            this.firstPaginator.update();
        });
    }
    update() {
        this.firstPaginator.update();
        this.secondPaginator.update();
    }
    get currentPage() {
        return this.firstPaginator.currentPage;
    }
}
