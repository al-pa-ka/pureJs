class SortQuery {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.sortQuery = [];
  }

  setupControl() {
    document.querySelector(".id-sort").onclick = () => {
      let reversed = false;
      this.sortQuery = this.sortQuery
        .map((sort) => {
          if (sort.name == "id") {
            reversed = !sort.reversed;
            return undefined;
          } else return sort;
        })
        .filter((el) => {
          return Boolean(el);
        });
      this.sortQuery.push({ name: "id", reversed: reversed });
      this.eventBus.notice({}, "filtersChanged");
    };

    document.querySelector(".vacancy-name-sort").onclick = () => {
      let reversed = false;
      this.sortQuery = this.sortQuery
        .map((sort) => {
          if (sort.name == "vacancyName") {
            reversed = !sort.reversed;
            return undefined;
          } else return sort;
        })
        .filter((el) => {
          return Boolean(el);
        });
      this.sortQuery.push({ name: "vacancyName", reversed: reversed });
      this.eventBus.notice({}, "filtersChanged");
    };

    document.querySelector(".source-sort").onclick = () => {
      let reversed = false;
      this.sortQuery = this.sortQuery
        .map((sort) => {
          if (sort.name == "source") {
            reversed = !sort.reversed;
            return undefined;
          } else return sort;
        })
        .filter((el) => {
          return Boolean(el);
        });
      this.sortQuery.push({ name: "source", reversed: reversed });
      this.eventBus.notice({}, "filtersChanged");
    };

    document.querySelector(".date-sort").onclick = () => {
      console.log("sorted");
      let reversed = false;
      this.sortQuery = this.sortQuery
        .map((sort) => {
          if (sort.name == "date") {
            reversed = !sort.reversed;
            return undefined;
          } else return sort;
        })
        .filter((el) => {
          return Boolean(el);
        });
      this.sortQuery.push({ name: "date", reversed: reversed });
      this.eventBus.notice({}, "filtersChanged");
    };
  }

  sort(data) {
    for (const sortItem of this.sortQuery) {
      //   data.sort((a, b) => {
      //     return sortItem.reversed
      //       ? Number(a[sortItem.name] > b[sortItem.name])
      //       : Number(a[sortItem.name] < b[sortItem.name]);
      //   });
      data.sort((a, b) => {
        if (a[sortItem.name] > b[sortItem.name]) {
          return sortItem.reversed ? -1 : 1;
        } else if (a[sortItem.name] < b[sortItem.name]) {
            return sortItem.reversed ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return data;
  }
}
